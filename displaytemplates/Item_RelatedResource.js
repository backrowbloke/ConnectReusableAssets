var debug = false;
function ULSKKT(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_RelatedResource.js";return o;}

function getSiteCollectionTitle(path, itemId, siteTitle) {
	var searchurl = _spPageContextInfo.webServerRelativeUrl + '/_api/search/query?querytext=\'path=' + path + '\'&selectproperties=\'sitetitle\'';
	jQuery.ajax({
		url:searchurl,
        type:"GET",
        headers:{
            "Accept": "application/json; odata=verbose"
        },
        success:function(data){
        	var target = '#related_' + itemId;
        	jQuery(target).html(data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[0].Cells.results[2].Value + " - " + siteTitle);
        },
        error:function(data, message,s){
          if (debug) {
              alert(s);
          }
        }
  });
}



function DisplayTemplate_RelatedResource(ctx) {ULSKKT:;
	
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_RelatedResource.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_RelatedResource.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Title':['Title'], 'Path':['Path'], 'Description':['Description'], 'EditorOWSUSER':['EditorOWSUSER'], 'LastModifiedTime':['LastModifiedTime'], 'CollapsingStatus':['CollapsingStatus'], 'DocId':['DocId'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'FileExtension':['FileExtension'], 'ViewsLifeTime':['ViewsLifeTime'], 'ParentLink':['ParentLink'], 'FileType':['FileType'], 'IsContainer':['IsContainer'], 'SecondaryFileExtension':['SecondaryFileExtension'], 'DisplayAuthor':['DisplayAuthor'], 'SiteTitle':['SiteTitle'], 'SPSiteUrl':['SPSiteUrl']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULSKKT:;
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
	};

	ms_outHtml.push('',''
	); 
        if(!$isNull(ctx.CurrentItem) && !$isNull(ctx.ClientControl)){
            var id = ctx.ClientControl.get_nextUniqueId();
            var itemId = id + Srch.U.Ids.item;
			var hoverId = id + Srch.U.Ids.hover;
			var hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Default_HoverPanel.js";
			var fileExtension = "";
			var siteTitle = "";
			var siteUrl = "";
			try{
				fileExtension = ctx.CurrentItem.FileExtension.substring(0,3);
			}
			catch(err) {}
			try{
				siteTitle = ctx.CurrentItem.SiteTitle;
			}
			catch(err) {}
			try{
				siteUrl = ctx.CurrentItem.SPSiteUrl;
			}
			catch(err) {}
			
			AddPostRenderCallback(ctx, function(){
				if (siteUrl != ''){
					getSiteCollectionTitle(siteUrl, itemId, siteTitle);
				}
			});
			var isDocument = false;
			switch(fileExtension) {
				case 'ppt':
					hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_PowerPoint_HoverPanel.js";
					isDocument = true;
				break;
				case 'xls':
					hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Excel_HoverPanel.js";
					isDocument = true;
				break;
				case 'doc':
					hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Word_HoverPanel.js";
					isDocument = true;
				break;
				case 'pdf':
					hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_PDF_HoverPanel.js";
					isDocument = true;
				break;
				
				default:
					hoverUrl = "~sitecollection/_catalogs/masterpage/Display Templates/Search/Item_Default_HoverPanel.js";
				break;
			}
      $setResultItem(itemId, ctx.CurrentItem);
			if(ctx.CurrentItem.IsContainer){
				ctx.CurrentItem.csr_Icon = Srch.U.getFolderIconUrl();
			}
			else{
				ctx.CurrentItem.csr_Icon = Srch.U.getIconUrlByFileExtension();
			}
			if (ctx.CurrentItem.csr_Icon.indexOf('html16.png') > -1 && isDocument) {
				ctx.CurrentItem.csr_Icon = ctx.CurrentItem.csr_Icon.replace('html16.png', 'ic' + ctx.CurrentItem.FileExtension + '.png');
			}
			
			ctx.currentItem_ShowHoverPanelCallback = Srch.U.getShowHoverPanelCallback(itemId, hoverId, hoverUrl);
            ctx.currentItem_HideHoverPanelCallback = Srch.U.getHideHoverPanelCallback();
ms_outHtml.push(''
,'            <div id="', $htmlEncode(itemId) ,'" name="Item" data-displaytemplate="DefaultItem" class="ms-srch-item connect-related-search-result" onmouseover="', ctx.currentItem_ShowHoverPanelCallback ,'" onmouseout="', ctx.currentItem_HideHoverPanelCallback ,'">'
,'        ','<div class="relatedresource" id="related_', $htmlEncode(itemId) ,'">', siteTitle, '</div>'
,'				',ctx.RenderBody(ctx),''
,'                <div id="', $htmlEncode(hoverId) ,'" class="ms-srch-hover-outerContainer"></div>'
,'            </div>'
); 
        } 
ms_outHtml.push(''
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_RelatedResource() {ULSKKT:;
$includeCSS(location.href, '~sitecollection/_catalogs/masterpage/Enhancements/css_babcocksearch.css');


if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_RelatedResource", DisplayTemplate_RelatedResource);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_RelatedResource.js", DisplayTemplate_RelatedResource);
}

}
RegisterTemplate_RelatedResource();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_RelatedResource.js"), RegisterTemplate_RelatedResource);
}
