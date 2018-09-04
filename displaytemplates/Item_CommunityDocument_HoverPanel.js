var debug = false;
var showRelatedContent = true;
var resultsPage = "Case%20Study%20Results.aspx";
//TODO tidy

///get content type from built in value
function parseContentType(rawValue) {
    var contentTypeText = rawValue.split('\n')[rawValue.split('\n').length-1];
    return contentTypeText;
}

///get related search results for the current item & ignore current item
function getRelatedContent(relatedId, type, keywords, path){
    var keywordColl = keywords.split('\n\n');
    var query = String.format("{0}:\"{1}\"",type,keywordColl[0]);
    if (keywordColl.length > 1){
        query = "(" + query + ")";
        for (var i = 1; i < keywordColl.length; i++){
            query+= String.format(" OR ({0}:\"{1}\")",type, keywordColl[i]);
        }
    }
    // exclude the current doucment from any relevant results
    var searchurl = String.format("{0}/_api/search/query?querytext='{1} NOT path=\"{2}\" IsDocument=1'&rowlimit=3&selectproperties='Title,Path,ContentType,UniqueId,ServerRedirectedURL'", _spPageContextInfo.siteAbsoluteUrl, query, path);

    jQuery.ajax({
        url:searchurl,
        type:"GET",
        headers:{
            "Accept": "application/json; odata=verbose"
                                },
                                success:function(data){processResult(type, relatedId, data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results)},
                                error:function(data, message,s){
            if (debug) {
                alert(s);
            }
        }
    });
}

///generate rating stars
function generateRatingStars(rating, ratingCount) {
    var totalStars = 5;
    var html = "";
    if (ratingCount == "") {
        ratingCount = 0;
    }
    var filledImage = _spPageContextInfo.siteAbsoluteUrl +"/_layouts/15/images/RatingsSmallStarFilled.png";
    var emptyImage = _spPageContextInfo.siteAbsoluteUrl +"/_layouts/15/images/RatingsSmallStarEmpty.png";
    html += "<div class='ms-comm-noWrap'>";
    html += String.format("<span id='averageRatingElement-{0}'>",rating);
    for (var i = 0; i < totalStars; i++) {
        var count = i + 1;
        var img = emptyImage;
        if (count <= rating) {
            img = filledImage;
        }

        html += String.format("<span class='ms-comm-ratingsImageContainer'><img id=averageRatingElement-{0}-img-{1}' src='{2}'/></span>",rating , (i + 1),img);
    }
    html += String.format("</span><span class='ms-comm-ratingSeparator'/><span class='ms-comm-ratingCountContainer' id='averageRatingElement-{0}-count'>&nbsp{0}</span></span></div>", ratingCount);
    return html;
}

///get UK format date
function parseDateFromUTC(date){
    var inputDate = new Date(date);
    var month = inputDate.getMonth()+1
    var returnDate = String.format("{0}/{1}/{2}",("0" + inputDate.getDate()).slice(-2), ("0" + month).slice(-2), inputDate.getFullYear());
    return returnDate;
}

///add commas to large numbers
function parseNumber(number){
    var stringNum = number.toString();
    var returnString = stringNum.substring(0,stringNum.indexOf("."));
    returnString = returnString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}

///process related items results
function processResult(type, relatedId, results){
    var target = String.format("#{0}_{1}",relatedId,  type);
    jQuery.each(results, function(index, obj){
        var targetPath = "";
        var title = obj.Cells.results[2].Value;
        var path = obj.Cells.results[3].Value;
        var guid = obj.Cells.results[5].Value;
        var redirectUrl = obj.Cells.results[6].Value;
        var contentType = parseContentType(obj.Cells.results[4].Value);
        contentType = contentType.replace(/\s+/g, '');
        contentType = contentType.toLowerCase();

        var resultHtml = String.format('<li>' + 
                                            '<div class="additionalresult resultrow">' + 
                                                '<div class="additionalresulttext resultcol"><a href="{0}" title="{1}" target="_blank">{1}</a></div>' + 
                                                // '<div class="additionalresulttext resultcol"><a href="{4}?k={3}" title="{1}">{1}</a></div>' + 
                                                '<div class="contenttypecolor {2} resultcol">&nbsp;</div>' + 
                                            '</div>' + 
                                        '</li>', path, title, contentType, guid, resultsPage, redirectUrl);
        jQuery(target).append(resultHtml);
    });
    
}

(function () {
    'use strict';
    
    // Config contains variables that are defined in one place
    var config = {
        /* IMPORTANT: update these settings before uploading the file to the master page gallery */
        /* IF USING RESULT TYPES, THEY MUST BE COMPILED AFTER CHANGING*/
        template: 'item_CommunityDocument_HoverPanel.js',
        propertyMappings: { 'Path':null, 'Title':['Title'],'Description':['Description'],'Url':['Url'], 'EditorOWSUSER':['EditorOWSUSER'], 'LastModifiedTime':['LastModifiedTime'], 'CollapsingStatus':['CollapsingStatus'], 'DocId':['DocId'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'FileExtension':['FileExtension'], 'ViewsLifeTime':['ViewsLifeTime'], 'ParentLink':['ParentLink'], 'FileType':['FileType'], 'IsContainer':['IsContainer'], 'SecondaryFileExtension':['SecondaryFileExtension'], 'DisplayAuthor':['DisplayAuthor'],'UniqueId':['UniqueId'],'ServerRedirectedEmbedURL':['ServerRedirectedEmbedURL'], 'ServerRedirectedPreviewURL':['ServerRedirectedPreviewURL'], 'AverageRating':['AverageRating'], 'RatingCount':['RatingCount'],'ContentType':['ContentType'],'owstaxIdOrganisation':['owstaxIdOrganisation'],'owstaxIdClassificationLevel':['owstaxIdClassificationLevel'], 'TechForumSector':['TechForumSector'], 'TechForumTopic':['TechForumTopic'],'TechForumKeywords':['TechForumKeywords']}
    };
    var templateUrl;

    var register = function () {
        if ("undefined" !== typeof (Srch) && "undefined" !== typeof (Srch.U) && typeof (Srch.U.registerRenderTemplateByName) === "function") {
                Srch.U.registerRenderTemplateByName(templateUrl, render);
            }
        },
        render = function (ctx) {
        	
            // Display template data
            var cachePreviousTemplateData = ctx.DisplayTemplateData;
            ctx.DisplayTemplateData = {
                            'TemplateUrl': templateUrl,
                            'TemplateType': 'Item',
                            'TargetControlType': ['SearchHoverPanel'],
                            'ManagedPropertyMapping': config.propertyMappings
            };
            var cachePreviousItemValuesFunction = ctx.ItemValues;
            ctx.ItemValues = function(slotOrPropName) {
                    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName);
            };

                        // Retrieve managed property data
            var redirectUrl = "";
            var targetPath = "";
            var id = ctx.CurrentItem.csr_id;
            var path = ctx.CurrentItem.Path;
            var title = ctx.CurrentItem.Title;
            var ratingCount = ctx.CurrentItem.RatingCount;
            var averageRating = ctx.CurrentItem.AverageRating; 
            var previewUrl = ctx.CurrentItem.ServerRedirectedEmbedURL;
            var fileType = ctx.CurrentItem.FileExtension;
            var contentType = ctx.CurrentItem.ContentType;
            var highlights = ctx.CurrentItem.HitHighlightedSummary;
            var author = $getItemValue(ctx, "EditorOWSUSER")
            var modifiedDate = ctx.CurrentItem.LastModifiedTime;

            var classification = ctx.CurrentItem.owstaxIdClassificationLevel;
            
            var sector = ctx.CurrentItem.TechForumSector;
            var topic = ctx.CurrentItem.TechForumTopic;
            var keywords = ctx.CurrentItem.TechForumKeywords;

            redirectUrl = ctx.CurrentItem.ServerRedirectedURL;

            var contentTypeText = parseContentType(contentType);
            var controlText = String.format("Open {0}",contentTypeText);

            

            //if redirect is not null, use owa
            if (redirectUrl != null && redirectUrl.length > 0) {
                targetPath = redirectUrl;
            }
            else{
                targetPath = path;
            }

            var appAttribs = "";
            if (!$isEmptyString(ctx.CurrentItem.csr_OpenApp)) { appAttribs += "openApp=\"" + $htmlEncode(ctx.CurrentItem.csr_OpenApp) + "\"" }; 
            if (!$isEmptyString(ctx.CurrentItem.csr_OpenControl)) { appAttribs += " openControl=\"" + $htmlEncode(ctx.CurrentItem.csr_OpenControl) + "\"" };
            var actionsHtml = String.format('<div class="actioncontrol"><a clicktype="ActionEdit" id="opencasestudy" class="ms-calloutLink ms-uppercase bidactionbutton" href="{1}" title="{2}" {3} target="_blank">{4}</a></div>', '', $urlHtmlEncode(targetPath), $htmlEncode(controlText), appAttribs, $htmlEncode(controlText));

            var relatedHtml = "";
            var relatedId = "related" + ctx.CurrentItem.id;
            if (showRelatedContent){
                relatedHtml = String.format('<div class="relatedsearch">' +
                                                '<div class="relatedtitle">Similar Technology </div>'+ 
                                                '<div><ul class="relatedresults" id="{0}_techforumtopic"></ul></div>' + 
                                            '</div>' + 
      
                                            '<div class="relatedsearch">' +
                                                '<div class="relatedtitle">Similar Sector </div>'+ 
                                                '<div><ul class="relatedresults" id="{0}_techforumsector"></ul></div>' + 
                                            '</div>',relatedId);
            }

                        // HTML markup for an item
            	var htmlMarkup = String.format('<div class="ms-srch-hover-innerContainer ms-srch-hover-standardSize" id="{0}">' +
                                                '<div class="ms-srch-hover-arrowBorder" id="{1}"></div>' +
                                                '<div class="ms-srch-hover-arrow" id="{2}"></div>' +
                                                '<div class="ms-srch-hover-content" id="{3}" data-displaytemplate="WordHoverPanel">{4}</div>' +
                                                '<div id="{5}" class="ms-srch-hover-body">' +
                                                	'<div>',$htmlEncode(id + HP.ids.inner), $htmlEncode(id + HP.ids.arrowBorder), $htmlEncode(id + HP.ids.arrow), $htmlEncode(id + HP.ids.content), ctx.RenderHeader(ctx));
            if (previewUrl == null || previewUrl.length < 1){
//            		if (fileType == 'pdf') {
//            			htmlMarkup +='<img src="/sites/bidportaldev/_layouts/15/images/256_ICGEN.PNG" alt="' + fileType + '"/>';
//            		}
//            		else {			
//            			htmlMarkup +=String.format('<img src="/sites/bidportaldev/_layouts/15/images/256_IC{0}.PNG" alt="{0}"/>',fileType);
//            		}
               					htmlMarkup +=String.format('<div class="ms-srch-item-summary hoversummary">{0}</div>', Srch.U.processHHXML(highlights));
            }
            else
            {
                			htmlMarkup += String.format('<div class="ms-srch-hover-viewerContainer"><iframe id="{0}" src="{1}" scrolling="no" frameborder="0px" class="ms-srch-hover-viewer"></iframe></div>', $htmlEncode(id + HP.ids.viewer), previewUrl);
            }
            //close div of view container
            					htmlMarkup += String.format('<div class="ms-srch-hover-wacImageContainer">' +
                                            				'<img id="{0}" alt="{1}" onload="this.parentNode.style.display=\'block\';" />',$htmlEncode(id + HP.ids.preview), $htmlEncode(Srch.Res.item_Alt_Preview), $htmlEncode(id + HP.ids.actions), actionsHtml, relatedHtml);
           					htmlMarkup += String.format('</div>' + 
           																	'<div class="moredetails">' +
                                            '<div class="detailscolumn"><div class="detailsitem detailslabel">Author: </div><div>{5}</div></div><div class="detailsitem detailslabel">Modified: </div><div>{6}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Topic: </div><div>{1}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Sector: </div><div>{2}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Keywords: </div><div>{3}</div></div><div class="itemdetail">{4}</div></div>', title, topic, sector, keywords, generateRatingStars(averageRating), author, parseDateFromUTC(modifiedDate));//6
           	htmlMarkup += String.format('<div id="{2}" class="ms-srch-hover-actions"><div class="actionbuttoncontainer">{3}</div><div>{4}</div></div>' +
                                '</div>'+
                                '</div>'+
                            '</div>', $htmlEncode(id + HP.ids.preview), $htmlEncode(Srch.Res.item_Alt_Preview), $htmlEncode(id + HP.ids.actions), actionsHtml, relatedHtml);
            
            AddPostRenderCallback(ctx, function(){
                //DO NOT NEED THIS - IT HIDES THE IFRAME AND SHOWS AN IMAGE INSTEAD
                // if(!Srch.U.n(ctx.CurrentItem.ServerRedirectedEmbedURL)){
                //     ULS4hR:;
                //     HP.loadViewer(ctx.CurrentItem.id, ctx.CurrentItem.id + HP.ids.inner, ctx.CurrentItem.id + HP.ids.viewer, ctx.CurrentItem.id + HP.ids.preview, ctx.CurrentItem.ServerRedirectedEmbedURL, ctx.CurrentItem.ServerRedirectedPreviewURL);

                // }
                if (showRelatedContent){
                   // getRelatedContent(relatedId, 'capability', capability, path);
                   // getRelatedContent(relatedId, 'customer', customer, path);
	                if (topic != null) {
	                	getRelatedContent(relatedId, 'techforumtopic', topic, path);
	                }
	                if (sector != null) {
	                	getRelatedContent(relatedId, 'techforumsector', sector, path);
	                }
                }
                jQuery(".ms-srch-hover-viewer").css("display","inline");

            });

            // Caching
            ctx.ItemValues = cachePreviousItemValuesFunction;
            ctx.DisplayTemplateData = cachePreviousTemplateData;

            // Return the HTML markup
            return htmlMarkup;
        };

    /* DO NOT REMOVE THE FOLLOWING LINES OF CODE */
    // MDS needs to start on the head
    // Retrieve all the loaded scripts
    var allScripts = document.head.getElementsByTagName("script");
    var scriptUrl = null;
    var scriptNr = allScripts.length;
    while(scriptNr--) {
        var crntScript = allScripts[scriptNr];
        if (crntScript.src !== null) {
            // Check if the right script is retrieved based on the filename of the template
            if (crntScript.src.indexOf('/_catalogs/') > 0 && crntScript.src.toLowerCase().indexOf(config.template.toLowerCase()) > 0) {
                scriptUrl = crntScript.src;
                break;
            }
        }
    }    
    if (scriptUrl !== null) {
                    // Remove the query string 
                    if (scriptUrl.indexOf('?') > 0) {
                        scriptUrl = scriptUrl.split("?")[0];
                    }
                    // Insert the site collection token
                    templateUrl = '~sitecollection' + scriptUrl.substr(scriptUrl.indexOf('/_catalogs/'));
                    templateUrl = decodeURI(templateUrl);
                    // Register the template to load
                    register();
                    if (typeof (RegisterModuleInit) === "function" && typeof(Srch.U.replaceUrlTokens) === "function") {
                        RegisterModuleInit(Srch.U.replaceUrlTokens(templateUrl), register);
                    }
    }
})()
