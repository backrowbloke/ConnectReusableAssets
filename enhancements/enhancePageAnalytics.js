var enhancePageAnalytics = enhancePageAnalytics || {};
enhancePageAnalytics.functions = (function () {

	var currentUserId;
	var siteUrl = 'https://connect.babcockinternational.com/sites/group/en-GB/security/kz';
	var result;
 

	function registerInMDS() {
		RegisterModuleInit( _spPageContextInfo.siteServerRelativeUrl + '/_catalogs/masterpage/Enhancements/enhancePageAnalytics.js', enhancePageAnalytics.functions.mdsWait);
		logPageVisit();
	}
	function mdsWait() {
		SP.SOD.executeOrDelayUntilEventNotified(logPageVisit, 'sp.bodyloaded');
	}
	function logPageVisit() {
		if (location.href.toLowerCase().indexOf(siteUrl.toLowerCase()) > -1) {
			var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/currentuser";
 			jQuery.ajax({
  				url: url,
  				type: 'GET',
  				headers: { 
					'X-RequestDigest': jQuery('#__REQUESTDIGEST').val() ,
   					'accept': 'application/json;odata=verbose',
   					'content-type': 'application/json;odata=verbose'
  				},
  				success: function(data, message, status){
   					userDetailsLoaded(data);
   				},
  				error: function(obj, message, status){
   				analyticsError(obj, message, status);
  				}
 			});
		}


	}

	function userDetailsLoaded(data) {
		currentUserId = data.d.Id;
		var url = siteUrl + "/_api/web/lists/getbytitle('Page Analytics Config')/items?$top=1";
 		jQuery.ajax({
  			url: url,
  			type: 'GET',
  			headers: { 
				'X-RequestDigest': jQuery('#__REQUESTDIGEST').val() ,
   				'accept': 'application/json;odata=verbose',
   				'content-type': 'application/json;odata=verbose'
  			},
  			success: function(data, message, status){
   				configLoaded(data);
   			},
  			error: function(obj, message, status){
   				analyticsError(obj, message, status);
  			}
 		});
	}

	function configLoaded(data) {
		var pageUrls = data.d.results[0].Pages;
		if (pageUrls.toLowerCase().indexOf(location.href.toLowerCase()) > -1) {	
			SP.SOD.executeFunc('sp.js', 'SP.ClientContext', contextLoaded);	
		}
	}
	function contextLoaded(){
		var clientContext = new  SP.ClientContext(siteUrl);
		var list = clientContext.get_web().get_lists().getByTitle('Analytics');
		var itemCreateInfo = new SP.ListItemCreationInformation();
		var item = list.addItem(itemCreateInfo);
		var visitorInfo = new SP.FieldUserValue();
		var visitDate = new Date();
		visitorInfo.set_lookupId(currentUserId);
		item.set_item('Title', document.title);
		item.set_item('PageUrl', location.href.toLowerCase());
		item.set_item('Visitor', visitorInfo);
		item.set_item('Date', visitDate);
		item.update();
		clientContext.executeQueryAsync(function(obj, message, status){result=message;}, function(obj, message, status){result=message;});
	}

	function analyticsLoaded(obj, message, status) {
	}

	function analyticsError(obj, message, status) {
	}
	

	
	return {
		registerInMDS: registerInMDS,
		mdsWait: mdsWait,
		logPageVisit: logPageVisit
	}
})();
if ('undefined' !== typeof g_MinimalDownload && g_MinimalDownload && (window.location.pathname.toLowerCase()).endsWith('/_layouts/15/start.aspx') && 'undefined' !== typeof asyncDeltaManager) {
    _spBodyOnLoadFunctionNames.push('enhancePageAnalytics.functions.registerInMDS');
} else {
    _spBodyOnLoadFunctionNames.push('enhancePageAnalytics.functions.logPageVisit');
}


