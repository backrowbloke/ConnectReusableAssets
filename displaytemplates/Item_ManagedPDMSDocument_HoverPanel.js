function ULSWtC(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_ManagedPDMSDocument_HoverPanel.js";return o;}

function parseContentType(rawValue) {
	try {
    var contentTypeText = rawValue.split('\n')[rawValue.split('\n').length-1];
    return contentTypeText;
  }
  catch (err) {
  	return "Document";
  }
}

function getRelatedContent(relatedId, type, keywords, path, sitePath){
	if(keywords != undefined || keywords != null || keywords != "") {
    var keywordColl = keywords.split('\n\n');
    var query = String.format("{0}:\"{1}\"",type,keywordColl[0]);
    if (keywordColl.length > 1){
        query = "(" + query + ")";
        for (var i = 1; i < keywordColl.length; i++){
            query+= String.format(" OR ({0}:\"{1}\")",type, keywordColl[i]);
        }
    }
    var searchurl = String.format("{0}/_api/search/query?querytext='{1} path:\"{0}\" NOT path=\"{2}\" IsDocument=1 NOT fileextension=aspx'&rowlimit=3&selectproperties='ManagedDocumentTitle,Path,ContentType,UniqueId,ServerRedirectedURL'", sitePath, query, path);

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
    if (date == 'N/A' || date == null){
        return 'N/A';
    }
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
                                        '</li>', path, title, contentType, guid, resultsPage, redirectUrl);
        jQuery(target).append(resultHtml);
    });
    
}

function DisplayTemplate_ManagedDocumentHoverPanel(ctx) {ULSWtC:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_ManagedDocumentHoverPanel.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedPDMSDocument_HoverPanel.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchHoverPanel'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Path':null, 'Title':['Title'],'Description':['Description'],'Url':['Url'], 'EditorOWSUSER':['EditorOWSUSER'], 'LastModifiedTime':['LastModifiedTime'], 'CollapsingStatus':['CollapsingStatus'], 'DocId':['DocId'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'FileExtension':['FileExtension'], 'ViewsLifeTime':['ViewsLifeTime'], 'ParentLink':['ParentLink'], 'FileType':['FileType'], 'IsContainer':['IsContainer'], 'SecondaryFileExtension':['SecondaryFileExtension'], 'DisplayAuthor':['DisplayAuthor'],'UniqueId':['UniqueId'],'ServerRedirectedEmbedURL':['ServerRedirectedEmbedURL'], 'ServerRedirectedPreviewURL':['ServerRedirectedPreviewURL'], 'AverageRating':['AverageRating'], 'RatingCount':['RatingCount'],'ContentType':['ContentType'],'Organisation':['Organisation'],'Classification':['Classification'],'DocumentOwner':['DocumentOwner'],'DocumentReference':['DocumentReference'],'DocumentReviewDate':['DocumentReviewDate'],'DocumentFunction':['DocumentFunction'],'DocumentVersion':['DocumentVersion'],'SiteTitle':['SiteTitle'],'SPContentType':['SPContentType'],'ManagedDocumentTitle':['ManagedDocumentTitle'],'dlcDocIdUrlOWSURLH':['dlcDocIdUrlOWSURLH'],'ProjectGateOWSCHCS':['ProjectGateOWSCHCS'],'RefinableString03':['RefinableString03'],'DocRAGStatusOWSTEXT':['DocRAGStatusOWSTEXT'],'RefinableInt00':['RefinableInt00'],'RefinableString05':['RefinableString05'],'UIVersionStringOWSTEXT':['UIVersionStringOWSTEXT']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULSWtC:;
	    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
	};
	
	var showRelatedContent = false;

	var redirectUrl = "";
  var targetPath = "";
  var id = ctx.CurrentItem.csr_id;
  var path = ctx.CurrentItem.Path;
  var title = ctx.CurrentItem.ManagedDocumentTitle;
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
  
  var docFunction = ctx.CurrentItem.DocumentFunction;
  if (docFunction == null || docFunction.length < 2) {
  	docFunction = 'N/A';
  }

  var docowner = ctx.CurrentItem.DocumentOwner;
  if(docowner == undefined || docowner == null || docowner == "") {
  	docowner = "N/A";
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

  redirectUrl = ctx.CurrentItem.ServerRedirectedURL;

  var contentTypeText = parseContentType(contentType);
  var controlText = String.format("Open {0}",contentTypeText);

  

  if (redirectUrl != null && redirectUrl.length > 0) {
      targetPath = redirectUrl;
  }
  else{
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

    var docVersion = "?";
    try{
        docVersion = ctx.CurrentItem.UIVersionStringOWSTEXT;
    }
    catch (err) {}

  var appAttribs = "";
  if (!$isEmptyString(ctx.CurrentItem.csr_OpenApp)) { appAttribs += "openApp=\"" + $htmlEncode(ctx.CurrentItem.csr_OpenApp) + "\"" }; 
  if (!$isEmptyString(ctx.CurrentItem.csr_OpenControl)) { appAttribs += " openControl=\"" + $htmlEncode(ctx.CurrentItem.csr_OpenControl) + "\"" };
  var actionsHtml = String.format('<div class="actioncontrol"><a clicktype="ActionEdit" id="opencasestudy" class="ms-calloutLink ms-uppercase bidactionbutton" href="{1}" title="{2}" {3} target="_blank">{4}</a></div>', '', $urlHtmlEncode(targetPath), $htmlEncode(controlText), appAttribs, $htmlEncode(controlText));

  var relatedHtml = "";
  var relatedId = "related" + ctx.CurrentItem.id;
  if (showRelatedContent){
      relatedHtml = String.format('<div class="relatedsearch">' +
                                      '<div class="relatedtitle">Similar Type </div>'+ 
                                      '<div><ul class="relatedresults" id="{0}_SPContentType"></ul></div>' + 
                                  '</div>' + 

                                  '<div class="relatedsearch">' +
                                      '<div class="relatedtitle">Similar Function </div>'+ 
                                      '<div><ul class="relatedresults" id="{0}_DocumentFunction"></ul></div>' + 
                                  '</div>',relatedId);
  }

  	var htmlMarkup = String.format('<div class="ms-srch-hover-innerContainer ms-srch-hover-standardSize" id="{0}">' +
                                      '<div class="ms-srch-hover-arrowBorder" id="{1}"></div>' +
                                      '<div class="ms-srch-hover-arrow" id="{2}"></div>' +
                                      '<div class="ms-srch-hover-content" id="{3}" data-displaytemplate="WordHoverPanel">{4}</div>' +
                                      '<div id="{5}" class="ms-srch-hover-body">' +
                                      	'<div>',$htmlEncode(id + HP.ids.inner), $htmlEncode(id + HP.ids.arrowBorder), $htmlEncode(id + HP.ids.arrow), $htmlEncode(id + HP.ids.content), ctx.RenderHeader(ctx));
  if (previewUrl == null || previewUrl.length < 1){
     					htmlMarkup +=String.format('<div class="ms-srch-item-summary hoversummary">{0}</div>', Srch.U.processHHXML(highlights));
  }
  else
  {
      			htmlMarkup += String.format('<div class="ms-srch-hover-viewerContainer"><iframe id="{0}" src="{1}" scrolling="no" frameborder="0px" class="ms-srch-hover-viewer"></iframe></div>', $htmlEncode(id + HP.ids.viewer), previewUrl);
  }
  					htmlMarkup += String.format('<div class="ms-srch-hover-wacImageContainer">' +
                                  				'<img id="{0}" alt="{1}" onload="this.parentNode.style.display=\'block\';" />',$htmlEncode(id + HP.ids.preview), $htmlEncode(Srch.Res.item_Alt_Preview), $htmlEncode(id + HP.ids.actions), actionsHtml, relatedHtml);
 					htmlMarkup += String.format('</div>' + 
 																	'<div class="moredetails">' +
                                  '<div class="itemdetail"><div class="detailsitem detailslabel">Type: </div><div>{4}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Reference: </div><div>{3}</div></div><div class="detailscolumn"><div class="detailsitem detailslabel">Author: </div><div>{5}</div></div><div class="detailsitem detailslabel">Modified: </div><div>{6}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Owner: </div><div>{1}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Type: </div><div>{9}</div><div class="itemdetail"><div class="detailsitem detailslabel">Status: </div><div>{8}</div></div><div class="itemdetail"><div class="detailsitem detailslabel">Version: </div><div>{10}</div></div<div class="itemdetail"><div class="detailsitem detailslabel">Review Date: </div><div>{2}</div></div></div>', title, docowner, parseDateFromUTC(reviewdate), docRef, contentTypeText, author, parseDateFromUTC(modifiedDate),docFunction, moderationStatus, pdmsDoctype, docVersion);//10
 	htmlMarkup += String.format('<div id="{2}" class="ms-srch-hover-actions"><div class="actionbuttoncontainer">{3}</div><div>{4}</div></div>' +
                      '</div>'+
                      '</div>'+
                  '</div>', $htmlEncode(id + HP.ids.preview), $htmlEncode(Srch.Res.item_Alt_Preview), $htmlEncode(id + HP.ids.actions), actionsHtml, relatedHtml);
	ms_outHtml.push(htmlMarkup);

	
	AddPostRenderCallback(ctx, function(){
			var titleTarget = '#' + ctx.CurrentItem.id + '_hoverTitle';
			jQuery(titleTarget).html(title);
			var sitePath = ctx.CurrentItem.SiteName;
	    // }
	    if (showRelatedContent){
	      if (contentType != null) {
	      	getRelatedContent(relatedId, 'SPContentType', contentType, path, sitePath);
	      }
	      if (docFunction != null) {
	      	getRelatedContent(relatedId, 'DocumentFunction', docFunction, path, sitePath);
	      }
	    }
	    jQuery(".ms-srch-hover-viewer").css("display","inline");
	    
	
	});

	ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_ManagedDocumentHoverPanel() {ULSWtC:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_ManagedPDMSDocument_HoverPanel.js", DisplayTemplate_ManagedDocumentHoverPanel);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedPDMSDocument_HoverPanel.js", DisplayTemplate_ManagedDocumentHoverPanel);
}

}
RegisterTemplate_ManagedDocumentHoverPanel();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ManagedPDMSDocument_HoverPanel.js"), RegisterTemplate_ManagedDocumentHoverPanel);
}
