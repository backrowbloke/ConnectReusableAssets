function ULSKKT(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_Task.js";return o;}

function parseDateFromUTC(date){
	var returnDate = '';
	if (date != null) {
    var inputDate = new Date(date);
    var month = inputDate.getMonth()+1
    returnDate = String.format("{0}/{1}/{2}",("0" + inputDate.getDate()).slice(-2), ("0" + month).slice(-2), inputDate.getFullYear());
  }
    return returnDate;
}

function DisplayTemplate_BabcockTask(ctx) {ULSKKT:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_BabcockTask.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_Task.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Title':['Title'], 'Path':['Path'], 'Description':['Description'], 'EditorOWSUSER':['EditorOWSUSER'], 'LastModifiedTime':['LastModifiedTime'], 'CollapsingStatus':['CollapsingStatus'], 'DocId':['DocId'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'FileExtension':['FileExtension'], 'ViewsLifeTime':['ViewsLifeTime'], 'ParentLink':['ParentLink'], 'FileType':['FileType'], 'IsContainer':['IsContainer'], 'SecondaryFileExtension':['SecondaryFileExtension'], 'DisplayAuthor':['DisplayAuthor'], 'PercentCompleteOWSCHCS':['PercentCompleteOWSCHCS'],'DueDateOWSDATE':['DueDateOWSDATE'],'ListID':['ListID']};
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
            $setResultItem(itemId, ctx.CurrentItem);
      
			if(ctx.CurrentItem.IsContainer){
				ctx.CurrentItem.csr_Icon = Srch.U.getFolderIconUrl();
			}
			ctx.currentItem_ShowHoverPanelCallback = Srch.U.getShowHoverPanelCallback(itemId, hoverId, hoverUrl);
            ctx.currentItem_HideHoverPanelCallback = Srch.U.getHideHoverPanelCallback();
var itemChecked = '';
var completeClass = '';
var cbTitle = 'Mark complete';
if (localStorage.babcockTasks != undefined && localStorage.babcockTasks.indexOf('task' + ctx.CurrentItem.DocId)> 1) {
		itemChecked = 'checked';
		completeClass = 'completedtask';
		cbTitle = 'Mark incomplete';
		
	}
	
	var listid = ctx.CurrentItem.ListID;
	listid = listid.replace('{','');
	listid = listid.replace('}','');
ms_outHtml.push(''
//,'            <div id="', $htmlEncode(itemId) ,'" name="Item" data-displaytemplate="DefaultItem" class="ms-srch-item" onmouseover="', ctx.currentItem_ShowHoverPanelCallback ,'" onmouseout="', ctx.currentItem_HideHoverPanelCallback ,'">'


//,'                <div class="ms-srch-item-title" id="', $htmlEncode(itemId) ,'_itemTitle"><h3 class="ms-srch-ellipsis"><a href="', ctx.CurrentItem.Path ,'" target="_blank">', ctx.CurrentItem.Title ,'</a></h3></div>'
//,'            <button onclick="processTask(\'' ,$htmlEncode(itemId) ,'\',\'', ctx.CurrentItem.Path ,'\');return false;">Edit</button>'       
//,'                <div id="', $htmlEncode(hoverId) ,'" class="ms-srch-hover-outerContainer"></div>'
//,'            </div>'

,'<tr id="task', ctx.CurrentItem.DocId ,'" class="ms-itmHoverEnabled ms-itmhover babcocktask ', completeClass ,'" ><td class="ms-cellstyle ms-vb2"><div class="ms-chkmark-container" style="margin-top:-3px;"><input type="checkbox" id="chk',ctx.CurrentItem.DocId ,'"  title="', cbTitle ,'" class="babcocktaskcheck" ', itemChecked ,'/></div></td><td height="100%" class="ms-cellstyle ms-vb-title"><div class="ms-vb"><a href="', ctx.CurrentItem.Path ,'" target="_blank" id="', listid ,'">', ctx.CurrentItem.Title,'</a></div></td><td class="ms-cellstyle ms-vb2"><div class="ms-vb">', parseDateFromUTC(ctx.CurrentItem.DueDateOWSDATE) ,'</div></td></tr>'
); 

        } 
ms_outHtml.push(''
,'    '
);


  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  
  

  return ms_outHtml.join('');
}
function RegisterTemplate_edccb8b454484ced97866558e053b7c7() {ULSKKT:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_Task", DisplayTemplate_BabcockTask);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_Task.js", DisplayTemplate_BabcockTask);
}

}
RegisterTemplate_edccb8b454484ced97866558e053b7c7();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_Task.js"), RegisterTemplate_edccb8b454484ced97866558e053b7c7);
}
