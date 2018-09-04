function ULSwTY(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_NewsArchive.js";return o;}
function DisplayTemplate_NewsArchive(ctx) {ULSwTY:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_NewsArchive.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_NewsArchive.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Picture URL':['PublishingImage', 'PictureURL', 'PictureThumbnailURL'], 'Link URL':['Path'], 'Line 1':['Title'], 'Line 2':['CommentsOWSMTXT'], 'Line 3':[], 'SecondaryFileExtension':null, 'ContentTypeId':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULSwTY:;
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
	};
	
	ms_outHtml.push('',''
	,''
	);
	
	var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_featuredNewsItem_");
	
	var linkURL = $getItemValue(ctx, "Link URL");
	linkURL.overrideValueRenderer($urlHtmlEncode);
	
	var line1 = $getItemValue(ctx, "Line 1");
	var line2 = $getItemValue(ctx, "Line 2");
	var line3 = $getItemValue(ctx, "Line 3");
	var byline = line2.inputValue
	//if (byline.length > 150){
	//	byline = byline.substring(0,250) + "...";
	//}
	
	var pictureURL = $getItemValue(ctx, "Picture URL");
	var pictureId = encodedId + "picture";
	
	//TODO change markup for picture
	var pictureMarkup = Srch.ContentBySearch.getPictureMarkup(pictureURL, 465, 350, ctx.CurrentItem, "cbs-picture3LinesImg", line1, pictureId);
	
	line1.overrideValueRenderer($contentLineText);
	line2.overrideValueRenderer($contentLineText);
	line3.overrideValueRenderer($contentLineText);
	
	var containerId = encodedId + "container";
	var pictureLinkId = encodedId + "pictureLink";
	var pictureContainerId = encodedId + "pictureContainer";
	var dataContainerId = encodedId + "dataContainer";
	var line1LinkId = encodedId + "line1Link";
	var line1Id = encodedId + "line1";
	var line2Id = encodedId + "line2";
	var line3Id = encodedId + "line3";
	
	var dataDisplayTemplateTitle = "ItemFeaturedNewsItem";
	
	 ms_outHtml.push(''
	,'        <div class="connect-featurednews-item" id="', containerId ,'" data-displaytemplate="', $htmlEncode(dataDisplayTemplateTitle) ,'" style="margin-bottom:20px">'
	,'            <div class="connect-featurednews-image" id="', pictureContainerId ,'" style="display:inline-flex">', pictureMarkup
	,'            </div>'
	,'            <div class="connect-featurednews-content">'
	,'              <div class="connect-featurednews-contenttext"><h1>', line1 ,'</h1><p>', byline ,'</p></div>'
	,'              <div class="connect-featurednews-contentlink">'
	,'                 <a href="', linkURL ,'" title="Read More" target="_blank">Read More</a>'
	,'              </div>'
	,'            </div>'
	,'        </div>'
	,'    '
	);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_FeaturedNews() {ULSwTY:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_FeaturedNewsItem", DisplayTemplate_NewsArchive);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_NewsArchive.js", DisplayTemplate_NewsArchive);
}

        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\ContentManagement\u002fItem_NewsArchive.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

}
RegisterTemplate_FeaturedNews();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\ContentManagement\u002fItem_NewsArchive.js"), RegisterTemplate_FeaturedNews);
}
