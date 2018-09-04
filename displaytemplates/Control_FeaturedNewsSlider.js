function ULS9sP(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Control_FeaturedNewsSlider.js";return o;}
function DisplayTemplate_FeaturedNewsSlider(ctx) {ULS9sP:;
	var widgetsCssLoaded =  jQuery('link[href*="jquery.bxslider.css"]').length;
	if (widgetsCssLoaded < 1) {
		var corecss = document.createElement('link');
		corecss.href = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/jquery.bxslider.css';
		corecss.type = 'text/css';
		corecss.rel = 'stylesheet';
		jQuery('head').append(corecss);
	}
	
	widgetsCssLoaded =  jQuery('link[href*="css_babcockwidgets.css"]').length;
	if (widgetsCssLoaded < 1) {
		corecss = document.createElement('link');
		corecss.href = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/css_babcockwidgets.css';
		corecss.type = 'text/css';
		corecss.rel = 'stylesheet';
		jQuery('head').append(corecss);
	}
	
		
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_FeaturedNewsSlider.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_FeaturedNewsSlider.js';
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
ctx.OnPostRender.push(function(){ULSLYq:;
	var script = document.createElement('script');
	script.src = _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/bxsliderdotmin.js';
	script.type = 'text/javascript';
	jQuery('head').append(script);
    jQuery('#connect-featurednews-container').bxSlider({
	                responsive:false,
	                auto:true,
	                autoDelay: 20000,
	                mode: 'fade',
	                speed: 500,
	                pause: 10000,
	                controls: false,
	                autoHover: true
	   });
});


ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
ms_outHtml.push(''

,'    <div id="connect-featurednews-container">'
,'            ', ctx.RenderGroups(ctx) ,''
,'	</div>'
,'</div>'
,''


);



ms_outHtml.push(''
,''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_FeaturedNewsSlider() {ULS9sP:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_FeaturedNewsSlider", DisplayTemplate_FeaturedNewsSlider);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_FeaturedNewsSlider.js", DisplayTemplate_FeaturedNewsSlider);
}

        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_FeaturedNewsSlider.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

}
RegisterTemplate_FeaturedNewsSlider();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_FeaturedNewsSlider.js"), RegisterTemplate_FeaturedNewsSlider);
}
