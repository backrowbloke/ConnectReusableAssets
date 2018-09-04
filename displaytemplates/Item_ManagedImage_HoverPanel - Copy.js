function ULSWtC(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_ManagedImage_HoverPanel.js";return o;}

function parseContentType(rawValue) {
	try {
    var contentTypeText = rawValue.split('\n')[rawValue.split('\n').length-1];
    return contentTypeText;
  }
  catch (err) {
  	return "Document";
  }
}

function getImageLargePreview(imageUrl) {
	imageUrl = imageUrl.replace('_t','_w');
	return imageUrl;
}

function getRelatedContent(relatedId, type, keywords, title, sitePath){
	if(keywords != undefined || keywords != null || keywords != "") {
    var keywordColl = keywords.split('\n\n');
    var query = String.format("{0}:\"{1}\"",type,keywordColl[0]);
    if (keywordColl.length > 1){
        query = "(" + query + ")";
        for (var i = 1; i < keywordColl.length; i++){
            query+= String.format(" OR ({0}:\"{1}\")",type, keywordColl[i]);
        }
    }
		var searchurl = String.format("{0}/_api/search/query?querytext='{1} path:\"{0}\" ContentType:\"Media Library Image\" NOT \"{2}\"'&rowlimit=3&selectproperties='Title,Path,ContentType,UniqueId,ServerRedirectedURL'", _spPageContextInfo.siteAbsoluteUrl, query, title);

    jQuery.ajax({
        url:searchurl,
        type:"GET",
        headers:{
            "Accept": "application/json; odata=verbose"
        },
        success:function(data){processResult(type, relatedId, data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results)},
        error:function(data, message,s){
        }
    });
  }
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
                                                '<div class="contenttypecolor {2} resultcol">&nbsp;</div>' + 
                                            '</div>' + 
                                        '</li>', path, title, contentType);
        jQuery(target).append(resultHtml);
    });
    
}

function DisplayTemplate_ManagedImageHoverPanel(ctx) {ULSWtC:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_ManagedImageHoverPanel.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedImage_HoverPanel.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchHoverPanel'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':null, 'Title':['Title'],'Description':['Description'],'Url':['Url'], 'EditorOWSUSER':['EditorOWSUSER'], 'LastModifiedTime':['LastModifiedTime'], 'CollapsingStatus':['CollapsingStatus'], 'DocId':['DocId'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'FileExtension':['FileExtension'], 'ViewsLifeTime':['ViewsLifeTime'], 'ParentLink':['ParentLink'], 'FileType':['FileType'], 'IsContainer':['IsContainer'], 'SecondaryFileExtension':['SecondaryFileExtension'], 'DisplayAuthor':['DisplayAuthor'],'UniqueId':['UniqueId'],'ServerRedirectedEmbedURL':['ServerRedirectedEmbedURL'], 'ServerRedirectedPreviewURL':['ServerRedirectedPreviewURL'], 'AverageRating':['AverageRating'], 'RatingCount':['RatingCount'],'ContentType':['ContentType'],'Organisation':['Organisation'],'Classification':['Classification'],'DocumentOwner':['DocumentOwner'],'DocumentReference':['DocumentReference'],'DocumentReviewDate':['DocumentReviewDate'],'DocumentFunction':['DocumentFunction'],'DocumentVersion':['DocumentVersion'],'SiteTitle':['SiteTitle'],'PictureHeight': ['PictureHeight'],'PictureWidth':['PictureWidth'],'ImageDateCreated':['ImageDateCreated'],'PictureThumbnailURL':['PictureThumbnailURL'],'PictureURL':['PictureURL'],'ImageReviewDate':['ImageReviewDate'],'ImageUse':['ImageUse'],'Location':['Location'],'Author':['Author'],'Keywords':['Keywords'],'SPContentType':['SPContentType']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULSWtC:;
	    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
	};
	
	var showRelatedContent = true;

	var redirectUrl = "";
  var targetPath = "";
  var id = ctx.CurrentItem.csr_id;
  var path = ctx.CurrentItem.Path;
  var title = ctx.CurrentItem.Title;
  var ratingCount = ctx.CurrentItem.RatingCount;
  var averageRating = ctx.CurrentItem.AverageRating; 
  var previewUrl = ctx.CurrentItem.ServerRedirectedEmbedURL;
  var fileType = ctx.CurrentItem.FileExtension;
  var contentType = ctx.CurrentItem.SPContentType;
  var highlights = ctx.CurrentItem.HitHighlightedSummary;
  var author = $getItemValue(ctx, "EditorOWSUSER")
  var modifiedDate = ctx.CurrentItem.LastModifiedTime;
  var siteTitle = ctx.CurrentItem.SiteTitle;
  

  var classification = ctx.CurrentItem.Classification;
  
  var reviewdate = ctx.CurrentItem.DocumentReviewDate;
  if(reviewdate == undefined || reviewdate == null) {
  	reviewdate = "N/A";
  }
  
  
  var docowner = ctx.CurrentItem.DocumentOwner;
  if(docowner == undefined || docowner == null || docowner == "") {
  	docowner = "N/A";
  }
  var docRef = ctx.CurrentItem.DocumentReference;
  if(docRef == undefined || docRef == null || docRef == "") {
  	docRef = "N/A";
  }

  redirectUrl = ctx.CurrentItem.ServerRedirectedURL;

  var contentTypeText = parseContentType(contentType);
  var controlText = String.format("Open {0}",contentTypeText);

	var imageuse = ctx.CurrentItem.ImageUse;
  if(imageuse == undefined || imageuse == null || imageuse == "") {
  	imageuse = "N/A";
  }
  
  var organisation = ctx.CurrentItem.Organisation;
  if (organisation == null || organisation.length < 2) {
  	organisation = 'No Sector applied';
  }
  
  var keywords = ctx.CurrentItem.Keywords;
     if(keywords == undefined || keywords == null || keywords == "") {
  	keywords = "N/A";
  }
  

  if (redirectUrl != null && redirectUrl.length > 0) {
      targetPath = redirectUrl;
  }
  else{
      targetPath = path;
  }
  
  var imageUrl = getImageLargePreview(ctx.CurrentItem.PictureThumbnailURL);
  

  var appAttribs = "";
  if (!$isEmptyString(ctx.CurrentItem.csr_OpenApp)) { appAttribs += "openApp=\"" + $htmlEncode(ctx.CurrentItem.csr_OpenApp) + "\"" }; 
  if (!$isEmptyString(ctx.CurrentItem.csr_OpenControl)) { appAttribs += " openControl=\"" + $htmlEncode(ctx.CurrentItem.csr_OpenControl) + "\"" };
  var actionsHtml = String.format('<div class="actioncontrol"><a clicktype="ActionEdit" id="openimage" class="ms-calloutLink ms-uppercase bidactionbutton" href="{1}" title="{2}" {3} target="_blank">{4}</a></div>', '', $urlHtmlEncode(ctx.CurrentItem.PictureURL), $htmlEncode(controlText), appAttribs, $htmlEncode(controlText));

  var relatedHtml = "";
  var relatedId = "related" + ctx.CurrentItem.id;
  if (showRelatedContent){
      relatedHtml = String.format('<div class="relatedsearch">' +
                                      '<div class="relatedtitle">Similar Usage </div>'+ 
                                      '<div><ul class="relatedresults" id="{0}_ImageUse"></ul></div>' + 
                                  '</div>' + 

                                  '<div class="relatedsearch">' +
                                      '<div class="relatedtitle">Similar Sector </div>'+ 
                                      '<div><ul class="relatedresults" id="{0}_Organisation"></ul></div>' + 
                                  '</div>',relatedId);
  }

  	var htmlMarkup = String.format('<div class="ms-srch-hover-innerContainer ms-srch-hover-standardSize" id="{0}">' +
                                      '<div class="ms-srch-hover-arrowBorder" id="{1}"></div>' +
                                      '<div class="ms-srch-hover-arrow" id="{2}"></div>' +
                                      '<div class="ms-srch-hover-content" id="{3}" data-displaytemplate="ImageHoverPanel">{4}</div>' +
                                      '<div id="{5}" class="ms-srch-hover-body">' +
                                      	'<div>',$htmlEncode(id + HP.ids.inner), $htmlEncode(id + HP.ids.arrowBorder), $htmlEncode(id + HP.ids.arrow), $htmlEncode(id + HP.ids.content), ctx.RenderHeader(ctx));
    
    htmlMarkup += String.format('<div class="ms-srch-hover-imageContainer">' +
                                   '<img id="{0}" alt="{1}" src="{2}" onload="this.style.display=\'block\';" />' +
            										'</div>', $htmlEncode(id + HP.ids.preview), $htmlEncode(Srch.Res.hp_Alt_ImagePreview), $urlHtmlEncode(imageUrl));                                  		

 		htmlMarkup += String.format('<div class="moredetails">' +
                                  '<div class="itemdetail"><div class="detailsitem detailslabel">Sector: </div><div>{4}</div></div><div class="detailscolumn"><div class="detailsitem detailslabel">Image Use: </div><div>{8}</div></div><div class="detailsitem detailslabel">Last Updated: </div><div>{6}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Owner: </div><div>{1}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Keywords: </div><div style="overflow:hidden">{7}</div></div></div>', title, docowner, reviewdate, docRef, organisation, author, parseDateFromUTC(modifiedDate), keywords, imageuse);//8
 	htmlMarkup += String.format('<div id="{2}" class="ms-srch-hover-actions"><div class="actionbuttoncontainer">{3}</div><div>{4}</div></div>' +
                      '</div>'+
                      '</div>'+
                  '</div>', $htmlEncode(id + HP.ids.preview), $htmlEncode(Srch.Res.item_Alt_Preview), $htmlEncode(id + HP.ids.actions), actionsHtml, relatedHtml);
	ms_outHtml.push(htmlMarkup);
	
	AddPostRenderCallback(ctx, function(){
			var titleTarget = '#' + ctx.CurrentItem.id + '_hoverTitle';
			jQuery(titleTarget).html(title);
			var sitePath = ctx.CurrentItem.SiteName;
			var title = ctx.CurrentItem.Title.replace(/'/g,"''");
	    if (showRelatedContent){
	      if (imageuse != null) {
	      	getRelatedContent(relatedId, 'ImageUse', imageuse, title, sitePath);
	      }
	      if (organisation != null) {
	      	getRelatedContent(relatedId, 'Organisation', organisation, title, sitePath);
	      }
	    }
	    jQuery(".ms-srch-hover-viewer").css("display","inline");
	    
	
	});

	ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_ManagedImageHoverPanel() {ULSWtC:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_ManagedImage_HoverPanel.js", DisplayTemplate_ManagedImageHoverPanel);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedImage_HoverPanel.js", DisplayTemplate_ManagedImageHoverPanel);
}

}
RegisterTemplate_ManagedImageHoverPanel();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedImage_HoverPanel.js"), RegisterTemplate_ManagedImageHoverPanel);
}
