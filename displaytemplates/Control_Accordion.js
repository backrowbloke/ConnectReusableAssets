function ULS9sP(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Control_Accordion.js";return o;}
function DisplayTemplate_Accordion(ctx) {ULS9sP:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_Accordion.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_Accordion.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['ContentManagement'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

 
if (!$isNull(ctx.ClientControl) &&
    !$isNull(ctx.ClientControl.shouldRenderControl) &&
    !ctx.ClientControl.shouldRenderControl())
{
    return "";
}
ctx.ListDataJSONGroupsKey = "ResultTables";
var $noResults = Srch.ContentBySearch.getControlTemplateEncodedNoResultsMessage(ctx.ClientControl);

var noResultsClassName = "ms-srch-result-noResults";

var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl)
{ULS9sP:;
    var iStr = [];
    iStr.push(itemRenderResult);
    return iStr.join('');
}

ctx.OnPostRender = [];
ctx.OnPostRender.push(function(){ULS9sP:;
	var widgetsCssLoaded =  jQuery('link[href*="css_babcockwidgets.css"]').length;
	if (widgetsCssLoaded < 1) {
		var corecss = document.createElement('link');
		corecss.href = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/css_babcockwidgets.css';
		corecss.type = 'text/css';
		corecss.rel = 'stylesheet';
		jQuery('head').append(corecss);
	}
	
	var jqueryuiCssLoaded =  jQuery('link[href*="jquery-ui.min.css"]').length;
	if (jqueryuiCssLoaded < 1) {
		var css = document.createElement('link');
		css.href = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/jquery-ui.min.css';
		css.type = 'text/css';
		css.rel = 'stylesheet';
		jQuery('head').append(css);
	}
	var jqueryUiLoaded =  jQuery('script[src*="jquery-ui.min..js"]').length;
	if (jqueryUiLoaded < 1) {
		var script = document.createElement('script');
		script.src = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/jquery-ui.min.js';
		script.type = 'text/javascript';
		jQuery('head').append(script);
	}
  jQuery('#connect-accordion-container').accordion({
		collapsible: true,
		active: false,
		heightStyle: 'content',
	});
	jQuery('#FilterLink[title*="CONFIDENCE"]').parent().hide();
	jQuery('#FilterLink[title*="UNCLASSIFIED"]').parent().hide();
	jQuery('#FilterLink[title*="OFFICIAL"]').parent().hide();
	jQuery('#FilterLink[title*="LEGALLY"]').parent().hide();
	jQuery('.ms-ref-unsel-toggle').click();
	
	var searchBoxAvailable = jQuery('.ms-srch-sbLarge').length;
	if (searchBoxAvailable > -1) {
		var thisPage = location.href;
		thisPage = thisPage.substring(0,thisPage.indexOf('#k'));
		jQuery('.ms-ref-refiner').append('<a class="connect-widget-button" href="' + thisPage + '?#k=">Reset</a>');
	}
	
});


ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
ms_outHtml.push(''
,'    <div id="connect-accordion-container-reset"></div>'
,'    <div id="connect-accordion-container">'
,'            ', ctx.RenderGroups(ctx) ,''
,'	</div>'
//,'</div>'
,''


);



ms_outHtml.push(''
,''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_Accordion() {ULS9sP:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_Accordion", DisplayTemplate_Accordion);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_Accordion.js", DisplayTemplate_Accordion);
}

        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_Accordion.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

}
RegisterTemplate_Accordion();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_Accordion.js"), RegisterTemplate_Accordion);
}
