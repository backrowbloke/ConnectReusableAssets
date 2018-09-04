function ULS9sP(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Control_ManagedDocuments.js";return o;}
function DisplayTemplate_Documents(ctx) {ULS9sP:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_Documents.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_ManagedDocuments.js';
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
		
});


ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
ms_outHtml.push(''
,'<div>'
,'<table class="ms-listviewtable connect-documents-filtered-table">'
,'	<tr class="ms-viewheadertr ms-vhltr">'
,'		<th class="ms-vh-icon ms-minWidthHeader" id="msomenuid2" scope="col">'
,'			<div class="ms-vh-div" name="DocIcon" >'
,'				<a class="ms-headerSortTitleLink" id="diidSort169DocIcon"  href="#" column"="" sort="" >'
,'				<img width="16" height="16" src="/_layouts/15/images/icgen.gif" border="0"/>'
,'				</a>'
,'			</div>'
,'		</th>'
,'		<th class="ms-vh2">'
,'			<div class="ms-vh-div">Name</div>'
,'		</th>'
,'		<th class="ms-vh2">'
,'			<div class="ms-vh-div">Type</div>'
,'		</th>'
,'		<th class="ms-vh2">'
,'			<div class="ms-vh-div">Location</div>'
,'		</th>'
,'    <th title="" class="ms-vh-icon" scope="col"><span class="ms-addcolumn-span"> </span></th>'
,'	</tr>'
,'            ', ctx.RenderGroups(ctx) ,''
,'	</table>'
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
function RegisterTemplate_Documents() {ULS9sP:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_ManagedDocuments", DisplayTemplate_Documents);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_ManagedDocuments.js", DisplayTemplate_Documents);
}

        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_ManagedDocuments.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

}
RegisterTemplate_Documents();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fControl_ManagedDocuments.js"), RegisterTemplate_Documents);
}
