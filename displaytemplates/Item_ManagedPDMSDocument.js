function ULSKKT(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_ManagedPDMSDocument.js";return o;}

function launchHoverPanel(itemId1, hoverId1, hoverUrl1, contentTypeClass) {
	
  EnsureScriptParams('SearchUI.js', 'HP.Show', itemId1, hoverId1, hoverUrl1, true);
  if(jQuery("#contentRow").get(0).scrollHeight > jQuery("#contentRow").innerHeight()){
		jQuery("#contentRow").height(jQuery("#contentRow").height()+300);
	}
  return false;
}

function parseContentType(rawValue) {
    var contentTypeText = rawValue.split('\n')[rawValue.split('\n').length-1];
    return contentTypeText;
}

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

function parseDateFromUTC(date){
    var inputDate = new Date(date);
    var month = inputDate.getMonth()+1
    var returnDate = String.format("{0}/{1}/{2}",("0" + inputDate.getDate()).slice(-2), ("0" + month).slice(-2), inputDate.getFullYear());
    return returnDate;
}

function getRAGStatus(reviewDateISO, docType, id){
    //TODO Query the document type list for the rules
    // var ragStatus = '<img src="_layouts/15/images/ITTHGBRG.png" alt="Green"  title="Unknown"/>';
    // if (reviewDateISO != "N/A" && reviewDateISO != null && reviewDateISO != "") {
    //     var today = new Date();
    //     var reviewDate = new Date(reviewDateISO);
    //     var compareDate = new Date();
    //     compareDate.setDate(compareDate.getDate() + 7);
    //     if(reviewDate >= today ){
    //         if (reviewDate > compareDate) {
    //             ragStatus = '<img src="_layouts/15/images/kpinormal-0.gif" alt="Green" title="Green"/>';
    //         }
    //         else {
    //             ragStatus = '<img src="_layouts/15/images/kpinormal-1.gif" alt="Amber" title="Amber"/>';
    //         }
    //     }
    //     else{
    //         ragStatus = '<img src="_layouts/15/images/kpinormal-2.gif" alt="Red"  title="Red"/>';
    //     }
    // } 

    // return ragStatus;

    //var id = 'rag_' + ctx.CurrentItem.ID;
    //var currentItem = ctx.CurrentItem;
    //var lookupId =  doctype[0].lookupId;
    var refUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('Document Types')/items?$filter=Title eq '" + docType + "'";
    jQuery.ajax({
        url:refUrl,
        method: 'GET',
        headers: { 'accept': 'application/json;odata=verbose' },
        success:function(data){documentTypeSuccess(data, id, reviewDateISO)},
        error:function(err){alert(err.responseText);}
    });
    return '<div id="' + id + '" class="' + id + '" style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%">&nbsp</div>';
}

function documentTypeSuccess(data, id, reviewDateISO){
    var ragStatus = "Unknown";
    if (data.d.results.length > 0) {
        var rule =  JSON.parse(data.d.results[0].RAGRule);
        //check review date
        var amberRule = rule.Amber;
        var amberDate = amberRule.Document_x0020_Review_x0020_Date;
        var amberState = amberRule.DocState;

        var redRule = rule.Red;
        var redDate = redRule.Document_x0020_Review_x0020_Date;
        var redState = redRule.DocState;

        //var reviewDateFieldVal = currentItem['Document_x0020_Review_x0020_Date'];
        //var docStateField = currentItem['DocState'];
        //date is UK format for change to create 
        //var dateParts = reviewDateFieldVal.split('/');
        if (reviewDateISO != null || reviewDateISO != "") {
            //var usReviewDate = dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];
            var reviewDate = new Date(reviewDateISO);
            var compareDateAmber = new Date();
            var compareDateRed = new Date();
            var today = new Date();

            compareDateAmber.setDate(compareDateAmber.getDate() + amberDate);
            if(reviewDate >= today ){
                if (reviewDate > compareDateAmber) {
                    ragStatus = 'Green';
                }
                else {
                    ragStatus = 'Amber';
                }
            }

            compareDateRed.setDate(compareDateRed.getDate() + redDate);
            if(compareDateRed <= today ){
                ragStatus = 'Red';
            } 
        }
    }
    switch (ragStatus) {
        case 'Green':
            ragStatus =  '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-0.gif" alt="Green" title="Green"/></div>';
        break;
        case 'Amber':
            ragStatus =   '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-1.gif" alt="Amber" title="Amber"/></div>';
        break;
        case 'Red':
            ragStatus =   '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-2.gif" alt="Red" title="Red"/></div>';
        break;     
        default:
            ragStatus =   '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/ITTHGBRG.png" alt="Unknown" title="Unknown"/></div>';
        break;
    }

    jQuery("#" + id).html(ragStatus);
 }

function parseNumber(number){
    var stringNum = number.toString();
    var returnString = stringNum.substring(0,stringNum.indexOf("."));
    returnString = returnString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}

function DisplayTemplate_ManagedDocument(ctx) {ULSKKT:;
	
	widgetsCssLoaded =  jQuery('link[href*="css_babcocksearch.css"]').length;
	if (widgetsCssLoaded < 1) {
		corecss = document.createElement('link');
		corecss.href = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/css_babcocksearch.css';
		corecss.type = 'text/css';
		corecss.rel = 'stylesheet';
		jQuery('head').append(corecss);
	}
	
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_ManagedDocument.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedPDMSDocument.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  //WE ARE USING RefinableString03 for 'DocTypeRef and RefinableInt00 for moderation status'
  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':null, 'Title':['Title'],'Description':['Description'],'Url':['Url'], 'EditorOWSUSER':['EditorOWSUSER'], 'LastModifiedTime':['LastModifiedTime'], 'CollapsingStatus':['CollapsingStatus'], 'DocId':['DocId'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'FileExtension':['FileExtension'], 'ViewsLifeTime':['ViewsLifeTime'], 'ParentLink':['ParentLink'], 'FileType':['FileType'], 'IsContainer':['IsContainer'], 'SecondaryFileExtension':['SecondaryFileExtension'], 'DisplayAuthor':['DisplayAuthor'],'UniqueId':['UniqueId'],'ServerRedirectedEmbedURL':['ServerRedirectedEmbedURL'], 'ServerRedirectedPreviewURL':['ServerRedirectedPreviewURL'], 'AverageRating':['AverageRating'], 'RatingCount':['RatingCount'],'ContentType':['ContentType'],'Organisation':['Organisation'],'Classification':['Classification'],'DocumentOwner':['DocumentOwner'],'DocumentReference':['DocumentReference'],'DocumentReviewDate':['DocumentReviewDate'],'DocumentFunction':['DocumentFunction'],'DocumentVersion':['DocumentVersion'],'SiteTitle':['SiteTitle'],'SPContentType':['SPContentType'],'ManagedDocumentTitle':['ManagedDocumentTitle'],'dlcDocIdUrlOWSURLH':['dlcDocIdUrlOWSURLH'],'ProjectGateOWSCHCS':['ProjectGateOWSCHCS'],'RefinableString03':['RefinableString03'],'DocRAGStatusOWSTEXT':['DocRAGStatusOWSTEXT'],'RefinableInt00':['RefinableInt00'],'RefinableString05':['RefinableString05'],'UIVersionStringOWSTEXT':['UIVersionStringOWSTEXT']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULSKKT:;
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};
						
						
            var previewUrl = "";
            var redirectUrl = "";
            var targetPath = "";
            
            var path = ctx.CurrentItem.Path;
            var title = ctx.CurrentItem.ManagedDocumentTitle;
            var fileType = ctx.CurrentItem.FileExtension;
            var highlights = ctx.CurrentItem.HitHighlightedSummary;
            var guid = ctx.CurrentItem.UniqueId;
        

            var ratingCount = ctx.CurrentItem.RatingCount;
            var averageRating = ctx.CurrentItem.AverageRating;        
            previewUrl = ctx.CurrentItem.ServerRedirectedPreviewURL;
            var contentType = ctx.CurrentItem.SPContentType;
            
            var reviewdate = ctx.CurrentItem.DocumentReviewDate;
            if(reviewdate == undefined || reviewdate == null) {
                reviewdate = "N/A";
            }

            var docOwner = ctx.CurrentItem.DocumentOwner;
            if (docOwner == null || docOwner.length < 2) {
            	docOwner = 'N/A';
            }
            
            var docref = 'N/A';
            if (ctx.CurrentItem.dlcDocIdUrlOWSURLH == null || ctx.CurrentItem.dlcDocIdUrlOWSURLH.length < 2) {
	            docRef = ctx.CurrentItem.DocumentReference;
	            if (docRef == null || docRef.length < 2) {
	            	docRef = 'N/A';
	            }
	          }
	          else {
	          	var docIdUrlArray = ctx.CurrentItem.dlcDocIdUrlOWSURLH.split(',');
							docRef = docIdUrlArray[1];
	          }
            
            var docFunction = ctx.CurrentItem.DocumentFunction;
            if (docFunction == null || docFunction.length < 2) {
            	docFunction = 'N/A';
            }
   
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
	          if (contentType == null || contentType.length < 2) {
            	contentType = 'N/A';
            }

            var projectGate = ctx.CurrentItem.ProjectGateOWSCHCS
            
            var htmlMarkup = "";
            
                

ms_outHtml.push('',''
); 
        if(!$isNull(ctx.CurrentItem) && !$isNull(ctx.ClientControl)){


								var id = ctx.ClientControl.get_nextUniqueId();
                var itemId = id + Srch.U.Ids.item;
                var hoverId = id + Srch.U.Ids.hover;
                var hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/ContentManagement/Item_ManagedPDMSDocument_HoverPanel.js";
                $setResultItem(itemId, ctx.CurrentItem);
                if(ctx.CurrentItem.IsContainer){
                ctx.CurrentItem.csr_Icon = Srch.U.getFolderIconUrl();
                }
								ctx.currentItem_ShowHoverPanelCallback = Srch.U.getShowHoverPanelCallback(itemId, hoverId, hoverUrl);
                ctx.currentItem_HideHoverPanelCallback = Srch.U.getHideHoverPanelCallback();

                var previewMarkup = "";
                if (previewUrl != null && previewUrl.length > 0) {
                    previewMarkup = String.format( '<div class="bidpreview" resultcol>' +
                                                        '<img src="{0}"/ alt="{1}" title="{1}" >' + 
                                                    '</div>', previewUrl, title);
                }
                

                if (redirectUrl != null && redirectUrl.length > 0) {
                    targetPath = redirectUrl;
                }
                else
                {
                    targetPath = path;
                }
                var siteTitle = ctx.CurrentItem.SiteTitle;

                var pdmsDoctype = ctx.CurrentItem.RefinableString03;
                var moderationStatus = "Unknown";
                var moderationStatusVal = 0;
                try {
                    moderationStatusVal = ctx.CurrentItem.RefinableInt00;
                }
                catch (err){};
                switch (moderationStatusVal) {
                    case '0':
                    moderationStatus = "Approved";
                    break;
                    case '1':
                    moderationStatus = "Rejected";
                    break;
                    case '2':
                    moderationStatus = "Pending";
                    break;
                    case '3':
                    moderationStatus = "Draft";
                    break;
                }

                var docVersion = "";
                try{
                    docVersion = ctx.CurrentItem.UIVersionStringOWSTEXT;
                }
                catch (err) {}

                var ragstatus = getRAGStatus(reviewdate, pdmsDoctype, itemId);
                
                var truncatedUrl = Srch.U.truncateHighlightedUrl(targetPath, pathLength);
                var imageUrl = String.format('<img src="{0}/_layouts/15/images/ic{1}.png" style="margin-bottom:-2px; margin-right:5px;" onError="this.src = \'{0}/_layouts/15/images/icgen.gif\'"/>',_spPageContextInfo.siteAbsoluteUrl,fileType);
                if (fileType == null) {
                	imageUrl = '';
                }
                                    
                     htmlMarkup = String.format('<tr id="pdmsdocument{8}" class="ms-itmHoverEnabled ms-itmhover babcockpdmsdocument" onmouseover="' + ctx.currentItem_ShowHoverPanelCallback + '" onmouseout="{2}">'+
                     '<td class="ms-cellstyle ms-vb-icon">{17}<div id="{3}" class="ms-srch-hover-outerContainer"></div></td><td class="ms-cellstyle ms-vb-title"><div class="ms-vb"><a href="{4}" target="_blank">{5}</a></div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb">{20}</div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb"><a href="{27}" target="_blank">{25}</a></div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb">{28}</div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb">{26}</div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb">{29}</div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb">{30}</div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb" id=rag_{8}">{24}</div></td>' +
                     '</tr>' ,$htmlEncode(itemId),hoverId, ctx.currentItem_HideHoverPanelCallback, $htmlEncode(hoverId), targetPath, title, previewUrl, previewMarkup, itemId, hoverUrl, contentTypeClass, $htmlEncode(id + Srch.U.Ids.path), $htmlEncode(ctx.CurrentItem.Path), $scriptEncode(truncatedUrl),$scriptEncode(ctx.CurrentItem.Path), truncatedUrl, _spPageContextInfo.siteAbsoluteUrl, imageUrl, Srch.U.processHHXML(highlights), docOwner, docRef, contentType, 'General', docFunction, ragstatus, siteTitle, projectGate, ctx.CurrentItem.ParentLink, pdmsDoctype, moderationStatus, docVersion);//30

				ms_outHtml.push(htmlMarkup);
	        } 
ms_outHtml.push(''
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_ManagedDocument() {ULSKKT:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_ManagedPDMSDocument", DisplayTemplate_ManagedDocument);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedPDMSDocument.js", DisplayTemplate_ManagedDocument);
}

}
RegisterTemplate_ManagedDocument();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedPDMSDocument.js"), RegisterTemplate_ManagedDocument);
}
