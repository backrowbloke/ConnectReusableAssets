<%@ Register TagPrefix="WpNs0" Namespace="Microsoft.SharePoint.Portal.WebControls" Assembly="Microsoft.Office.Server.FilterControls, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePointPortalControls" Namespace="Microsoft.SharePoint.Portal.WebControls" Assembly="Microsoft.SharePoint.Portal, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register tagprefix="Aggregation" namespace="LightningTools.WebParts.Aggregation" assembly="LightningTools.WebParts.LCWP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=3c1c941f3875b35a" %>
<%@ Register Tagprefix="Taxonomy" Namespace="Microsoft.SharePoint.Taxonomy" Assembly="Microsoft.SharePoint.Taxonomy, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	<link id="CSS1" href="<% $SPUrl:~SiteCollection/_catalogs/masterpage/enhancements/css_babcockintranets.css?v=5%>" runat="server" type="text/css" rel="stylesheet" />
	<style type="text/css">
	/*Styles specific to page template*/
	
	#contentBox {
	  margin-right:0; /*Removed due to web part zone*/
	}
		
	/*Styles specific to pages where title is shown as a banner */
	#pageTitle {
      display:none;
	}
	#s4-titlerow {
	  margin-bottom:0 !important;
	}
	div.article {
	  padding-top: 0;
	}
	/*End Specific Styles for page layout*/
	
	</style>
	
	<script language="javascript">
		jQuery(document).ready(function() {
			
			
			jQuery('.connect-page-title').css('background-image','url(\'' + jQuery('.connect-hidden-pageimage img').attr('src') + '\')');
			var isEdit = jQuery('#MSOLayout_InDesignMode').val();
			if (isEdit == '1') {
				jQuery('.connect-hidden-pageimage').show();
			}
			else {
				jQuery('.connect-hidden-pageimage').hide();
			}
			if (jQuery(".connect-page-tag-accent2 span").html() == ""){
				jQuery(".connect-page-tag-accent2").hide(); 
			}
			jQuery("[id*='promotedlinksheader']").each(function(){
				if (jQuery(this).parent().html().indexOf("The list is empty") > -1){
					jQuery(this).parent().find("td").empty();
				}
			});
			
		});

	</script>
	
		<PublishingWebControls:EditModePanel runat="server">
		<!-- Styles for edit mode only-->
		<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %>"
			After="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	</PublishingWebControls:EditModePanel>
	<SharePointWebControls:FieldValue id="PageStylesField" FieldName="HeaderStyleDefinitions" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitleInTitleArea" runat="server">
	<SharePointWebControls:FieldValue FieldName="Title" runat="server"/>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderTitleBreadcrumb" runat="server"> 
	<SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigationSwitchableProvider" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb" NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode" RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=289 NodeImageWidth=16 NodeImageHeight=16 NodeImageUrl="/_layouts/15/images/fgimg.png?rev=23" HideInteriorRootNodes="true" SkipLinkText=""/> </asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">
	<div class="connect-col-r">
	<div class="s4-wpcell-plain ms-webpartzone-cell ms-webpart-cell-vertical ms-fullWidth">
			<h2 class="ms-webpart-titleText">Key Links</h2>
			<PublishingWebControls:SummaryLinkFieldControl FieldName="SummaryLinks" runat="server"/>
		</div>
		<div class="s4-wpcell-plain ms-webpartzone-cell ms-webpart-cell-vertical ms-fullWidth">
			<h2 class="ms-webpart-titleText">Key Contacts</h2>
			<PublishingWebControls:SummaryLinkFieldControl FieldName="SummaryLinks2" runat="server"/>
		</div>
		<WebPartPages:WebPartZone id="Right" runat="server" title="Column Right"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
	
	</div>
	
	<div class="article article-body connect-article-body">
			<div class="connect-hidden-pageimage" >
				<PublishingWebControls:RichImageField FieldName="PublishingRollupImage" AllowHyperLinks="false" runat="server" InputFieldLabel="Top Bar Background"/>
			</div>	
			<PublishingWebControls:EditModePanel runat="server" CssClass="edit-mode-panel title-edit" >
				<SharePointWebControls:TextField runat="server" FieldName="Title"/>
					<Taxonomy:TaxonomyFieldControl FieldName="Organisation" runat="server"/>
					<Taxonomy:TaxonomyFieldControl FieldName="Document_x0020_Function" runat="server"/>
			</PublishingWebControls:EditModePanel>
			<div class="connect-page-title">
				<div class="connect-page-title-text">
					<h1>
						<SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server"/>
							
					</h1>
					<div class="connect-page-tag">

						<span class="connect-page-tag-accent1"><Taxonomy:TaxonomyFieldControl FieldName="Organisation" runat="server" ControlMode="Display"/></span>
						<span class="connect-page-tag-accent2"><Taxonomy:TaxonomyFieldControl FieldName="Document_x0020_Function" runat="server" ControlMode="Display"/></span>
				</div>
				</div>
				
			</div>
			
		
		<div class="article-content">
			<PublishingWebControls:RichHtmlField FieldName="PublishingPageContent" HasInitialFocus="True" MinimumEditHeight="400px" runat="server"/>
		</div>

		<div>
			<WebPartPages:WebPartZone id="CentreTop" runat="server" title="Top "><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		</div>
		<div>
			<div class="connect-col-wp-left">
				<WebPartPages:WebPartZone id="CentreLeft" runat="server" title="Left "><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
			</div>
			<div class="connect-col-wp-right">
				<WebPartPages:WebPartZone id="CentreRight" runat="server" title="Right "><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
			</div>
		</div>
		<div class="connect-page-info">
	
			<span>Rating:
		    <SharePointPortalControls:AverageRatingFieldControl ID="PageRatingControl" FieldName="AverageRating" runat="server"></SharePointPortalControls:AverageRatingFieldControl> 
			</span>
			<span>Owner: 
			<SharePointWebControls:UserField FieldName="PublishingContact" runat="server"></SharePointWebControls:UserField></span>
			<span>Last modified:
			<PublishingWebControls:LastModifiedIndicator runat="server"/></span>
		</div>
	</div>
</asp:Content>
