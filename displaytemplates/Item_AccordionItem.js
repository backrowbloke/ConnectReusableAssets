function ULS16h(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_AccordionItem.js";return o;}

function DisplayTemplate_Accordion(ctx) {ULS16h:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_Accordion.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_AccordionItem.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Link URL':['Path'], 'Line 1':['Title'], 'Line 2':[], 'FileExtension':null, 'SecondaryFileExtension':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULS16h:;
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
	};
	
	ms_outHtml.push('',''
	);
	var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_accordionitem_");
	
	var linkURL = $getItemValue(ctx, "Link URL");
	var linkURLFromPath = ctx.CurrentItem.Path;
	linkURL.overrideValueRenderer($urlHtmlEncode);
	if (linkURL.isEmpty){
		linkURL = linkURLFromPath;
	}
	var iconURL = Srch.ContentBySearch.getIconSourceFromItem(ctx.CurrentItem);
	
	var line1 = $getItemValue(ctx, "Line 1");
	var line2 = $getItemValue(ctx, "Line 2");
	line1.overrideValueRenderer($contentLineText);
	line2.overrideValueRenderer($contentLineText);
	
	var containerId = encodedId + "container";
	var pictureLinkId = encodedId + "pictureLink";
	var pictureId = encodedId + "picture";
	var dataContainerId = encodedId + "dataContainer";
	var line1LinkId = encodedId + "line1Link";
	var line1Id = encodedId + "line1";
	var line2Id = encodedId + "line2";
	ms_outHtml.push(''
	
	,'<h3 class="connect-accordion-title">',line1.defaultValueRenderer(line1),'</h3>'
	,'<div class="connect-accordion-info">',line2,'<br/><a href="', linkURL, '" target="_blank" class="connect-widget-button accordionlink">See Full Page...</a></div>');


  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
  
}
function RegisterTemplate_Accordion() {ULS16h:;

	if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
	  Srch.U.registerRenderTemplateByName("Item_Accordion", DisplayTemplate_Accordion);
	}
	
	if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
	  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_AccordionItem.js", DisplayTemplate_Accordion);
	}

  $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_AccordionItem.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

}
RegisterTemplate_Accordion();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_AccordionItem.js"), RegisterTemplate_Accordion);
}
