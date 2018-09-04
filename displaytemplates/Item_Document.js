function ULS16h(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_Document.js";return o;}
function DisplayTemplate_Document(ctx) {ULS16h:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_Document.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_Document.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Link URL':['Path'], 'Line 1':['Title'], 'Line 2':['EditorOWSUSER'], 'Line 3':['Title'], 'FileExtension':null, 'SecondaryFileExtension':null};
  
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULS16h:;
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);
var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_document_");

var linkURL = $getItemValue(ctx, "Link URL");
var linkURLFromPath = ctx.CurrentItem.Path;

if (linkURL.isEmpty){
	linkURL = linkURLFromPath;
}
var iconURL = Srch.ContentBySearch.getIconSourceFromItem(ctx.CurrentItem);

var line1 = $getItemValue(ctx, "Line 1");
var line2 = $getItemValue(ctx, "Line 2");
var line3 = $getItemValue(ctx, "Line 3");

line1.overrideValueRenderer($contentLineText);
line2.overrideValueRenderer($contentLineText);

var containerId = encodedId + "container";
var pictureLinkId = encodedId + "pictureLink";
var pictureId = encodedId + "picture";
var dataContainerId = encodedId + "dataContainer";
var line1LinkId = encodedId + "line1Link";
var line1Id = encodedId + "line1";
var line2Id = encodedId + "line2";
var line3Id = encodedId + "line3";

var line3Value = line3.inputValue;

try {
  }
  catch(err) {
  	line3Date = new Date(line3.inputValue);
  	line3Value = line3Date.format('dd-MM-yyyy');
  	
  }
ms_outHtml.push(''

,'<tr class="ms-itmHoverEnabled ms-itmhover connect-document-row">'
,'	<td class="ms-cellstyle ms-vb-icon">'
,'		<a href="', linkURL ,'" title="' , line1 , '">'
,'			<img width="16" height="16" title="', line1 ,'" class=" ms-draggable" alt="', line1 ,'" src="', iconURL,'" border="0" DragId="0"/>'
,'			</a>'
,'	</td>'
,'	<td height="100%" class="ms-cellstyle ms-vb-title" iscallout="TRUE" isecb="TRUE">'
,'		<div class="ms-vb">'
,'			<a class="ms-listlink ms-draggable"  href="' ,linkURL, '">', line1 ,'</a>'
,'		</div>'
,'	</td>	'
,'	<td class="ms-cellstyle ms-vb2">'
,'		<span class="ms-noWrap">', line3 ,'</span>'
,'	</td>'
,'	<td class="ms-vb-lastCell ms-cellstyle ms-vb2">'
,'		<span class="ms-noWrap">', line2 ,'</span>'
,'	</td>'
,'</tr>'
)
  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_Document() {ULS16h:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_Document", DisplayTemplate_Document);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_Document.js", DisplayTemplate_Document);
}

        $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_Document.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");

}
RegisterTemplate_Document();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_Document.js"), RegisterTemplate_Document);
}
