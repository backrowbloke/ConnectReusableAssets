//DEBUG - Injects dummy previews etc.
var debug = false;


///Override function to open the panel. Used to set styles on load with timeout
function launchHoverPanel(itemId1, hoverId1, hoverUrl1, contentTypeClass) {
        EnsureScriptParams('SearchUI.js', 'HP.Show', itemId1, hoverId1, hoverUrl1, true);
    return false;
}

///get content type from built in value
function parseContentType(rawValue) {
    var contentTypeText = rawValue.split('\n')[rawValue.split('\n').length-1];
    return contentTypeText;
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
    var returnDate = String.format("{0}/{1}/{2}",("0" + inputDate.getDate()).slice(-2), ("0" + inputDate.getMonth()+1).slice(-2), inputDate.getFullYear());
    return returnDate;
}

///add commas to large numbers
function parseNumber(number){
    var stringNum = number.toString();
    var returnString = stringNum.substring(0,stringNum.indexOf("."));
    returnString = returnString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}

(function () {
    'use strict';
    
    $includeCSS(location.href, '~sitecollection/_catalogs/masterpage/Enhancements/css_babcocktechforum.css');
    
    // Config contains variables that are defined in one place
    var config = {
        /* IMPORTANT: update these settings before uploading the file to the master page gallery */
        /* IF USING RESULT TYPES, THEY MUST BE COMPILED AFTER CHANGING*/
        template: 'Item_CommunityDocument.js',
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
                            'TargetControlType': ['SearchResults', 'Content Web Parts'],
                            'ManagedPropertyMapping': config.propertyMappings
            };
            var cachePreviousItemValuesFunction = ctx.ItemValues;
            ctx.ItemValues = function(slotOrPropName) {
                    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName);
            };

                        // Retrieve managed property data
            var previewUrl = "";
            var redirectUrl = "";
            var targetPath = "";
            
            var path = ctx.CurrentItem.Path;
            var title = ctx.CurrentItem.Title;
            var fileType = ctx.CurrentItem.FileExtension;
            var highlights = ctx.CurrentItem.HitHighlightedSummary;
            var guid = ctx.CurrentItem.UniqueId;
        

            var ratingCount = ctx.CurrentItem.RatingCount;
            var averageRating = ctx.CurrentItem.AverageRating;        
            previewUrl = ctx.CurrentItem.ServerRedirectedPreviewURL;
            var contentType = ctx.CurrentItem.ContentType;
            
            var sector = ctx.CurrentItem.TechForumSector;
            var topic = ctx.CurrentItem.TechForumTopic;
            var keywords = ctx.CurrentItem.TechForumKeywords;
   
            redirectUrl = ctx.CurrentItem.ServerRedirectedURL;
            
            var pathLength = ctx.CurrentItem.csr_PathLength;
        		if(!pathLength) {pathLength = Srch.U.pathTruncationLength}
        		
        		
						
						var contentTypeClass = "";
						try
						{
	            contentType = parseContentType(contentType);
	            var contentTypeClass = contentType.replace(/\s+/g, '');
	            contentTypeClass = contentTypeClass.toLowerCase();
	          }
	          catch(err) {
	          }


            var htmlMarkup = "";
            if(!$isNull(ctx.CurrentItem) && !$isNull(ctx.ClientControl)){
                var id = ctx.ClientControl.get_nextUniqueId();
                var itemId = id + Srch.U.Ids.item;
                var hoverId = id + Srch.U.Ids.hover;
                var hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/ContentManagement/Item_CommunityDocument_HoverPanel.js";
                $setResultItem(itemId, ctx.CurrentItem);
                if(ctx.CurrentItem.IsContainer){
                ctx.CurrentItem.csr_Icon = Srch.U.getFolderIconUrl();
                }

                ctx.currentItem_HideHoverPanelCallback = Srch.U.getHideHoverPanelCallback();

                var previewMarkup = "";
                //TODO add icon
                if (previewUrl != null && previewUrl.length > 0) {
                    previewMarkup = String.format( '<div class="bidpreview" resultcol>' +
                                                        '<img src="{0}"/ alt="{1}" title="{1}">' + 
                                                    '</div>', previewUrl, title);
                }
                
                //if redirect is not null, use owa
                if (redirectUrl != null && redirectUrl.length > 0) {
                    targetPath = redirectUrl;
                }
                else
                {
                    targetPath = path;
                }
                
                var truncatedUrl = Srch.U.truncateHighlightedUrl(targetPath, pathLength);
                var imageUrl = String.format('<img src="{0}/_layouts/15/images/ic{1}.png" style="margin-bottom:-2px; margin-right:5px;"/>',_spPageContextInfo.siteAbsoluteUrl,fileType);
                if (fileType == null) {
                	imageUrl = '';
                }
                
                

                // HTML markup for an item
                htmlMarkup = String.format('<div id="{0}" title="{5}" name="Item" data-displaytempalte="DefaultItem" class="ms-srch-item  resultrow" onmouseover="launchHoverPanel(\'{8}\',\'{1}\',\'{9}\', \'{10}\')" onmouseout="{2}">' + 
                	'{7}<div class="biddetail" >' +
                	'<h3>{17}<a href="{4}" title="{5}" target="_blank">{5}</a></h3>' +
                	'<div class="detailscolumn"><div class="itemdetail"><div class="detailsitem detailslabel">Topic: </div><div>{19}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Sector: </div><div>{20}</div></div><div class="itemdetail">{21}</div></div>' +
                	 
                	'<div class="ms-srch-item-summary">{18}</div>' +
                	'</div>' + 
                	'<div id="{11}" tabindex="0" class="ms-srch-item-path" title="{12}" onblur="Srch.U.restorePath(this, \'{13}\', \'{12}\')" onclick="Srch.U.selectPath(\'{14}\', this)" onkeydown="Srch.U.setPath(event, this, \'{14}\', \'{13}\')">{15}</div>' +              	
                	 '<div id="{3}" class="ms-srch-hover-outerContainer"></div></div>' ,$htmlEncode(itemId),hoverId, ctx.currentItem_HideHoverPanelCallback, $htmlEncode(hoverId), targetPath, title, previewUrl, previewMarkup, itemId, hoverUrl, contentTypeClass,$htmlEncode(id + Srch.U.Ids.path), $htmlEncode(ctx.CurrentItem.Path), $scriptEncode(truncatedUrl),$scriptEncode(ctx.CurrentItem.Path), truncatedUrl, _spPageContextInfo.siteAbsoluteUrl, imageUrl, Srch.U.processHHXML(highlights), topic, sector, generateRatingStars(averageRating), 'General');//22
            }
                        
            AddPostRenderCallback(ctx, function(){

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
})();
