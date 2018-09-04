'use strict';
var enhanceResponsiveSite = enhanceResponsiveSite || {};
enhanceResponsiveSite.functions = (function () {
	function registerInMDS() {
		RegisterModuleInit( _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/enhanceSiteResponsiveBranding.js', enhanceResponsiveSite.functions.mdsWait);
		applyResponsiveCSS();
	}
	function mdsWait() {
		SP.SOD.executeOrDelayUntilEventNotified(applyResponsiveCSS, 'sp.bodyloaded');
	}
	function applyResponsiveCSS() {
		var cssLink = "<link rel='stylesheet' type='text/css' href='" + _spPageContextInfo.siteServerRelativeUrl + "/_catalogs/masterpage/Enhancements/SP-Responsive-UI.css'>";
		if (!~jQuery('head').html().indexOf(cssLink)) {
			jQuery(cssLink).appendTo('head');
        }
        //var jsLink = document.createElement('<script>');
        //jsLink.attr('src',_spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/SP-Responsive-UI.js');
        var jsLink = "<script src='" + spPageContextInfo.siteServerRelativeUrl + "/_catalogs/masterpage/Enhancements/SP-Responsive-UI.js'></script>";
		if (!~jQuery('head').html().indexOf(jsLink)) {
			jQuery(jsLink).appendTo('head');
		}

	}
	
	return {
		registerInMDS: registerInMDS,
		mdsWait: mdsWait,
		applyResponsiveCSS: applyResponsiveCSS
	}
})();
if ('undefined' !== typeof g_MinimalDownload && g_MinimalDownload && (window.location.pathname.toLowerCase()).endsWith('/_layouts/15/start.aspx') && 'undefined' !== typeof asyncDeltaManager) {
    _spBodyOnLoadFunctionNames.push('enhanceResponsiveSite.functions.registerInMDS');
} else {
    _spBodyOnLoadFunctionNames.push('enhanceResponsiveSite.functions.applyResponsiveCSS');
}

function removeAllStatus(b) { 
 } 
