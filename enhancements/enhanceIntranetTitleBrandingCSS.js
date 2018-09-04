'use strict';
var enhanceIntranetNavigationCSS = enhanceIntranetNavigationCSS || {};
enhanceIntranetNavigationCSS.functions = (function () {
	function registerInMDS() {
		RegisterModuleInit( _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/enhanceIntranetTitleBrandingCSS.js', enhanceIntranetNavigationCSS.functions.mdsWait);
		applyTitleCSS();
	}
	function mdsWait() {
		SP.SOD.executeOrDelayUntilEventNotified(applyTitleCSS, 'sp.bodyloaded');
	}
	function applyTitleCSS() {
		var fileLink = "<link rel='stylesheet' type='text/css' href='" + _spPageContextInfo.siteServerRelativeUrl + "/_catalogs/masterpage/Enhancements/css_babcockintranets_titlebranding.css'>";
		if (!~jQuery('head').html().indexOf(fileLink)) {
			jQuery(fileLink).appendTo('head');
		}

	}
	
	return {
		registerInMDS: registerInMDS,
		mdsWait: mdsWait,
		applyTitleCSS: applyTitleCSS
	}
})();
if ('undefined' !== typeof g_MinimalDownload && g_MinimalDownload && (window.location.pathname.toLowerCase()).endsWith('/_layouts/15/start.aspx') && 'undefined' !== typeof asyncDeltaManager) {
    _spBodyOnLoadFunctionNames.push('enhanceIntranetNavigationCSS.functions.registerInMDS');
} else {
    _spBodyOnLoadFunctionNames.push('enhanceIntranetNavigationCSS.functions.applyTitleCSS');
}

function removeAllStatus(b) { 
 } 
