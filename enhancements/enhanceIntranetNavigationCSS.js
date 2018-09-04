'use strict';
var enhanceIntranetNavigationCSS = enhanceIntranetNavigationCSS || {};
enhanceIntranetNavigationCSS.functions = (function () {
	function registerInMDS() {
		RegisterModuleInit( _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/enhanceIntranetNavigationCSS.js', enhanceIntranetNavigationCSS.functions.mdsWait);
		applyNavCSS();
	}
	function mdsWait() {
		SP.SOD.executeOrDelayUntilEventNotified(applyNavCSS, 'sp.bodyloaded');
	}
	function applyNavCSS() {
		var fileLink = "<link rel='stylesheet' type='text/css' href='" + _spPageContextInfo.siteServerRelativeUrl + "/_catalogs/masterpage/Enhancements/css_babcockfunctionnavigation.css'>";
		if (!~jQuery('head').html().indexOf(fileLink)) {
			jQuery(fileLink).appendTo('head');
		}

			//setTimeout(function(){
			//	SP.SOD.executeFunc('sp.js', 'SP.ClientContext',showMessage);
			//},250);

	}
	
	function showMessage(){
		var statusID = SP.UI.Status.addStatus("Attention - this site is undergoing maintenance until 11th October");
		SP.UI.Status.setStatusPriColor(statusID, 'red');
	}
	
	return {
		registerInMDS: registerInMDS,
		mdsWait: mdsWait,
		applyNavCSS: applyNavCSS,
		showMessage: showMessage
	}
})();
if ('undefined' !== typeof g_MinimalDownload && g_MinimalDownload && (window.location.pathname.toLowerCase()).endsWith('/_layouts/15/start.aspx') && 'undefined' !== typeof asyncDeltaManager) {
    _spBodyOnLoadFunctionNames.push('enhanceIntranetNavigationCSS.functions.registerInMDS');
} else {
    _spBodyOnLoadFunctionNames.push('enhanceIntranetNavigationCSS.functions.applyNavCSS');
}

function removeAllStatus(b) { 
 } 
