'use strict';
var pdmsCondFormat = pdmsCondFormat || {};
pdmsCondFormat.functions = (function() {
 function registerInMDS() {
  RegisterModuleInit(getSiteUrl() + '/_catalogs/masterpage/Enhancements/enhancejslinkpdms.js', pdmsCondFormat.functions.applyFormatting);
  applyFormatting();
 }
 function applyFormatting() {
  SP.SOD.executeFunc('clienttemplates.js', 'SPClientTemplates', function() {
   var fieldContext = {};
   fieldContext.Templates = {};
   fieldContext.Templates.Fields = {
    'DocRAGStatus': { 'View': getDocmentRagStatus },
    'ProjectRAGStatus' : {'View' : projectRAGStatus},
    'ProjectPath' : {'View': projPathTemplate }
   };
   SPClientTemplates.TemplateManager.RegisterTemplateOverrides(fieldContext);
  }); 
 }


 function getDocmentRagStatus(ctx) {
     try{
    var doctype =  ctx.CurrentItem['DocTypeRef'];
    var id = 'rag_' + ctx.CurrentItem.ID;
    var itemId = ctx.CurrentItem.ID;
    var currentItem = ctx.CurrentItem;
    var lookupId =  doctype[0].lookupId;
    var refUrl = getSiteUrl() + "/_api/web/lists/getbytitle('Document Types')/items(" + lookupId + ")";
    jQuery.ajax({
        url:refUrl,
        method: 'GET',
        headers: { 'accept': 'application/json;odata=verbose' },
        success:function(data){documentTypeSuccess(data, id, currentItem);},
        error:function(err){alert(err.responseText);}
    });
    return '<div id="' + id + '" class="' + id + '" style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%">&nbsp</div>';
    }
    catch (err){
        return '<div>&nbsp;</div>'
    }
 }

 function documentTypeSuccess(data, id, currentItem){
    var ragStatus = "Unknown";
    var rule =  JSON.parse(data.d.RAGRule);
    //check review date
    var amberRule = rule.Amber;
    var amberDate = amberRule.Document_x0020_Review_x0020_Date;
    var amberState = amberRule.DocState;

    var redRule = rule.Red;
    var redDate = redRule.Document_x0020_Review_x0020_Date;
    var redState = redRule.DocState;

    var reviewDateFieldVal = currentItem['Document_x0020_Review_x0020_Date'];
    var docStateField = currentItem['DocState'];
    //date is UK format for change to create 
    var dateParts = reviewDateFieldVal.split('/');
    if (reviewDateFieldVal != null || reviewDateFieldVal != "") {
        var usReviewDate = dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];
        var reviewDate = new Date(usReviewDate);
        var compareDateAmber = new Date();
        var compareDateRed = new Date();
        var today = new Date();

        compareDateAmber.setDate(compareDateAmber.getDate() + amberDate);
        if(reviewDate >= today ){
            if (reviewDate > compareDateAmber) {
                ragStatus = 'Green';
            }
            else {
                ragStatus = 'Amber';
            }
        }

        compareDateRed.setDate(compareDateRed.getDate() + redDate);
        if(compareDateRed <= today ){
            ragStatus = 'Red';
        } 
    }
    switch (ragStatus) {
        case 'Green':
            ragStatus =  '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-0.gif" alt="Green" title="Green"/></div>';
        break;
        case 'Amber':
            ragStatus =   '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-1.gif" alt="Amber" title="Amber"/></div>';
        break;
        case 'Red':
            ragStatus =   '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-2.gif" alt="Red" title="Red"/></div>';
        break;     
        default:
            ragStatus =   '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/ITTHGBRG.png" alt="Unknown" title="Unknown"/></div>';
        break;
    }

    jQuery("#" + id).html(ragStatus);
 }

 function projPathTemplate(ctx){
     var curVal = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
     if (curVal != null && curVal != "" && curVal.length > 5){
        var href= curVal.match(/"(.*?)"/g);
        
        //return curVal;
        return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block;"><a href=' + href + ' target="_blank">Project Documents</a></div>';
     }
     else {
         return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block;">Project Initialising...</div>';
     }
 }

 function projectRAGStatus(ctx) {
    var ragStatus = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    var projectPath = ctx.CurrentItem['ProjectPath'];
    if (projectPath == ""){
        ragStatus = "New";
    }
    switch (ragStatus) {
        case 'Green':
            return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-0.gif" alt="Green" title="Green"/></div>';
        break;
        case 'Amber':
            return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-1.gif" alt="Amber" title="Amber"/></div>';
        break;
        case 'Red':
            return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-2.gif" alt="Red" title="Red"/></div>';
        break;  
        case 'New':
        return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/loading16.gif" alt="Red" title="Initialising"/></div>';
    break;  
        default:
            return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/ITTHGBRG.png" alt="Unknown" title="Unknown"/></div>';
        break;
    }

 }


 function docRagStatusTemplate(ctx) {
  var ragStatus = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
  if(ragStatus == null || ragStatus == ""){
      var reviewDateFieldVal = ctx.CurrentItem['Document_x0020_Review_x0020_Date'];
      //date is UK format for change to create 
      var dateParts = reviewDateFieldVal.split('/');
      if (reviewDateFieldVal != null || reviewDateFieldVal != "") {
          var usReviewDate = dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];
          var reviewDate = new Date(usReviewDate);
          var compareDate = new Date();
          var today = new Date();
          //reviewDate.setDate(reviewDate.getDate() + 7);
          compareDate.setDate(compareDate.getDate() + 7);
          if(reviewDate >= today ){
              if (reviewDate > compareDate) {
                  ragStatus = 'Green';
              }
              else {
                  ragStatus = 'Amber';
              }
          }
          else{
              ragStatus = 'Red';
          }
      }
  }
  switch (ragStatus) {
    case 'Green':
    return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-0.gif" alt="Green" title="Green"/></div>';
    break;
    case 'Amber':
    return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-1.gif" alt="Amber" title="Amber"/></div>';
    break;
    case 'Red':
    return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/kpinormal-2.gif" alt="Red" title="Red"/></div>';
    break;
    return '<div style="padding: 4px 8px 4px 4px; margin: -4px -8px -4px -4px; display: block; width:100%"><img src="_layouts/15/images/SVCON.gif" alt="Unknown" title="Unknown"/></div>';
    default:
    break;
  }
 }
 
 function getSiteUrl() {
  if (_spPageContextInfo.siteServerRelativeUrl === '/') { return ''; } else { return _spPageContextInfo.siteServerRelativeUrl; }
 }
 return {
  registerInMDS: registerInMDS,
  applyFormatting: applyFormatting
 };
})();
if ('undefined' !== typeof g_MinimalDownload && g_MinimalDownload && (window.location.pathname.toLowerCase()).endsWith('/_layouts/15/start.aspx') && 'undefined' !== typeof asyncDeltaManager) {
 pdmsCondFormat.functions.registerInMDS();
} else {
 pdmsCondFormat.functions.applyFormatting();
}