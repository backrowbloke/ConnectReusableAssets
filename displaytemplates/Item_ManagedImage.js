function ULSKKT(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_ManagedImage.js";return o;}

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

function parseNumber(number){
    var stringNum = number.toString();
    var returnString = stringNum.substring(0,stringNum.indexOf("."));
    returnString = returnString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}

function DisplayTemplate_ManagedImage(ctx) {ULSKKT:;
	
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
  DisplayTemplate_ManagedImage.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedImage.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={ 'Path':null, 'Title':['Title'],'Description':['Description'],'Url':['Url'], 'EditorOWSUSER':['EditorOWSUSER'], 'LastModifiedTime':['LastModifiedTime'], 'CollapsingStatus':['CollapsingStatus'], 'DocId':['DocId'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'FileExtension':['FileExtension'], 'ViewsLifeTime':['ViewsLifeTime'], 'ParentLink':['ParentLink'], 'FileType':['FileType'], 'IsContainer':['IsContainer'], 'SecondaryFileExtension':['SecondaryFileExtension'], 'DisplayAuthor':['DisplayAuthor'],'UniqueId':['UniqueId'],'ServerRedirectedEmbedURL':['ServerRedirectedEmbedURL'], 'ServerRedirectedPreviewURL':['ServerRedirectedPreviewURL'], 'AverageRating':['AverageRating'], 'RatingCount':['RatingCount'],'ContentType':['ContentType'],'Organisation':['Organisation'],'Classification':['Classification'],'DocumentOwner':['DocumentOwner'],'DocumentReference':['DocumentReference'],'DocumentReviewDate':['DocumentReviewDate'],'DocumentFunction':['DocumentFunction'],'DocumentVersion':['DocumentVersion'],'SiteTitle':['SiteTitle'],'PictureHeight': ['PictureHeight'],'PictureWidth':['PictureWidth'],'ImageDateCreated':['ImageDateCreated'],'PictureThumbnailURL':['PictureThumbnailURL'],'PictureURL':['PictureURL'],'ImageReviewDate':['ImageReviewDate'],'ImageUse':['ImageUse'],'Location':['Location'],'Author':['Author'],'Keywords':['Keywords'],'SPContentType':['SPContentType'],'ReleasedOWSBOOL':['ReleasedOWSBOOL']};
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
            
            var reviewdate = 'N/A';
            var docOwner = ctx.CurrentItem.DocumentOwner;
            if (docOwner == null || docOwner.length < 2) {
            	docOwner = 'N/A';
            }
            var docRef = ctx.CurrentItem.DocumentReference;
            if (docRef == null || docRef.length < 2) {
            	docRef = 'N/A';
            }
            
            //image
            var docFunction = ctx.CurrentItem.DocumentFunction;
            if (docFunction == null || docFunction.length < 2) {
            	docFunction = 'N/A';
            }
            
            var organisation = ctx.CurrentItem.Organisation;
            if (organisation == null || organisation.length < 2) {
            	organisation = 'No Sector applied';
            }
 
 

            var imageuse = ctx.CurrentItem.ImageUse;
            var Location = ctx.CurrentItem.Location;
            var author = ctx.CurrentItem.Author;
            var keywords = ctx.CurrentItem.Keywords;
   
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
            
            var htmlMarkup = "";
            
                

ms_outHtml.push('',''
); 
        if(!$isNull(ctx.CurrentItem) && !$isNull(ctx.ClientControl)){


								var id = ctx.ClientControl.get_nextUniqueId();
                var itemId = id + Srch.U.Ids.item;
                var hoverId = id + Srch.U.Ids.hover;
                var hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/ContentManagement/Item_ManagedImage_HoverPanel.js";
                $setResultItem(itemId, ctx.CurrentItem);
                if(ctx.CurrentItem.IsContainer){
                ctx.CurrentItem.csr_Icon = Srch.U.getFolderIconUrl();
                }
								ctx.currentItem_ShowHoverPanelCallback = Srch.U.getShowHoverPanelCallback(itemId, hoverId, hoverUrl);
                ctx.currentItem_HideHoverPanelCallback = Srch.U.getHideHoverPanelCallback();

                var previewMarkup = "";
                if (previewUrl != null && previewUrl.length > 0) {
                    previewMarkup = String.format( '<div class="bidpreview" resultcol>' +
                                                        '<img src="{0}"/ alt="{1}" title="{1}">' + 
                                                    '</div>', previewUrl, title);
                }
                

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
                htmlMarkup = String.format('<div id="{0}" title="{1}" name="Item" data-displaytempalte="DefaultItem" class="ms-srch-item  resultrow managedimageresult" onmouseover="' + ctx.currentItem_ShowHoverPanelCallback + '" onmouseout="{3}">' + 
                	'<div class="imagedetail" >' +
                	'<img src="{5}"/>' +
                	'</div><div id="{2}" class="ms-srch-hover-outerContainer"></div></div>' ,$htmlEncode(itemId),title, hoverId, ctx.currentItem_HideHoverPanelCallback, $htmlEncode(hoverId), ctx.CurrentItem.PictureThumbnailURL);//5

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
  Srch.U.registerRenderTemplateByName("Item_ManagedImage", DisplayTemplate_ManagedImage);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedImage.js", DisplayTemplate_ManagedImage);
}

}
RegisterTemplate_ManagedDocument();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedImage.js"), RegisterTemplate_ManagedDocument);
}
