function ULSx0T(){var o=new Object;o.ULSTeamName="Search Server";o.ULSFileName="Item_ConnectPerson_HoverPanel.js";return o;}
function DisplayTemplate_ConnectPersonHover(ctx) {ULSx0T:;
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_ConnectPersonHover.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ConnectPerson_HoverPanel.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchHoverPanel'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'AboutMe':['AboutMe'], 'AccountName':['AccountName'], 'BaseOfficeLocation':['BaseOfficeLocation'], 'Department':['Department'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'Interests':['Interests'], 'JobTitle':['JobTitle'], 'LastModifiedTime':['LastModifiedTime'], 'Memberships':['Memberships'], 'PastProjects':['PastProjects'], 'Path':['Path'], 'PictureURL':['PictureURL'], 'PreferredName':['PreferredName'], 'Responsibilities':['Responsibilities'], 'Schools':['Schools'], 'ServiceApplicationID':['ServiceApplicationID'], 'SipAddress':['SipAddress'], 'Skills':['Skills'], 'UserProfile_GUID':['UserProfile_GUID'], 'WorkEmail':['WorkEmail'], 'WorkId':['WorkId'], 'YomiDisplayName':['YomiDisplayName'],'PicassoSector':['PicassoSector'],'PicassoBusinessUnit':['PicassoBusinessUnit'], 'WorkPhone':['WorkPhone']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {ULSx0T:;
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);
        if(!$isNull(ctx.CurrentItem)){
            var id = ctx.CurrentItem.id;
            var encodedId = $htmlEncode(ctx.CurrentItem.csr_id);
            var followId = encodedId + "_hoverFollow";
            var dynTagId = encodedId + "_hoverDynTag";
            var dynTagIdRel = encodedId + "_hoverDynTagRel";
            var visitId = encodedId + "_hoverVisit";
            var hhProps = Srch.U.createXMLDocument("<root>" + ctx.CurrentItem.HitHighlightedProperties + "</root>");
            var has_acc = !$isEmptyString(ctx.CurrentItem.AccountName); 
            var has_abme = !$isEmptyString(ctx.CurrentItem.AboutMe);
            var has_resp = !$isEmptyString(ctx.CurrentItem.Responsibilities);
            var has_ski = !$isEmptyString(ctx.CurrentItem.Skills);
            var has_pp = !$isEmptyString(ctx.CurrentItem.PastProjects);
            var has_sch = !$isEmptyString(ctx.CurrentItem.Schools);
            var has_memb = !$isEmptyString(ctx.CurrentItem.Memberships);
            var has_int = !$isEmptyString(ctx.CurrentItem.Interests);
            var has_vlm = !$isEmptyString(ctx.CurrentItem.ProfileViewsLastMonth);
            var has_vlw = !$isEmptyString(ctx.CurrentItem.ProfileViewsLastWeek);
            var has_query = !$isEmptyString(ctx.CurrentItem.ProfileQueriesFoundYou); 
            var isSelfSrch = (has_vlm == true || has_vlw == true || has_query == true);
            var infoAvailable = false;
            var delimiter = "";
            var uname = ctx.CurrentItem.PreferredName;
            var aname = ctx.CurrentItem.AccountName;
            
            var has_jt = !$isEmptyString(ctx.CurrentItem.JobTitle);
            var has_sector = !$isEmptyString(ctx.CurrentItem.PicassoSector);
            var has_bu = !$isEmptyString(ctx.CurrentItem.PicassoBusinessUnit);
            var has_wp = !$isEmptyString(ctx.CurrentItem.WorkPhone);
            
            var isExpResult = false;
            if (!$isNull(ctx.CurrentItem.ParentTableReference) && !$isNull(ctx.CurrentItem.ParentTableReference.QueryRuleId))
            {
              var orQRId  = new SP.Guid(ctx.CurrentItem.ParentTableReference.QueryRuleId);
              var exQRId = new SP.Guid("915bafaa-12da-492c-89b3-516f811dbf8c");
              if (!$isNull(orQRId) && !$isNull(exQRId) && orQRId.equals(exQRId))
              {
                isExpResult =  true;
              }
            }
            if ($isEmptyString(uname)) { uname = ctx.CurrentItem.YomiDisplayName }
ms_outHtml.push(''
,'            <div class="ms-srch-hover-innerContainer ms-srch-hover-standardSize" id="', $htmlEncode(id + HP.ids.inner) ,'">'
,'                <div class="ms-srch-hover-arrowBorder" id="', $htmlEncode(id + HP.ids.arrowBorder) ,'"></div>'
,'                <div class="ms-srch-hover-arrow" id="', $htmlEncode(id + HP.ids.arrow) ,'"></div>'
,'                <div class="ms-srch-hover-content" id="', $htmlEncode(id + HP.ids.content) ,'" data-displaytemplate="PeopleHoverPanel">'
,'                    <div id="', $htmlEncode(id + HP.ids.header) ,'" class="ms-srch-hover-header">'
,'                        <div class="ms-srch-hover-close">'
,'                            <a href="javascript:HP.Close()" id="', $htmlEncode(id + HP.ids.close) ,'" title="', $htmlEncode(Srch.Res.hp_Tooltip_Close) ,'">'
,'                                <img src="', $urlHtmlEncode(SP.Utilities.VersionUtility.getImageUrl(Srch.SU.closeImage)) ,'" alt="', $htmlEncode(Srch.Res.hp_Tooltip_Close) ,'" />'
,'                            </a>'
,'                        </div>'
,'                        <div class="ms-srch-hover-title">'
);                        
                            if (!Srch.U.e(uname) && !Srch.U.e(ctx.CurrentItem.Path)) {
                                var encodedName = $htmlEncode(uname);
                                var displayName = Srch.U.getSingleHHXMLNodeValue(hhProps, "preferredname");
                                if ($isEmptyString(displayName)) { displayName = encodedName }
ms_outHtml.push('                        '
,'                                <h2 class="ms-dlg-heading ms-srch-ellipsis">', displayName ,'</h2>'
);                        
                            }
ms_outHtml.push(' '
,'                        </div>'
,'                    </div>'
,'                    <div id="', $htmlEncode(id + HP.ids.body) ,'" class="ms-srch-hover-body ms-srch-people-hover-categories">'
,'                        <ul id="Categories">'
);                    
                            if(isExpResult == true) {
ms_outHtml.push('                        '
,'                              <div id="', dynTagId ,'"></div>'
);                                                                            
                            }                
ms_outHtml.push('   '
);                    
														
														if(has_jt == true) {
ms_outHtml.push(''
,'                                            <div id="JobTitleField">'
); 
                                                var encodedJtitle = $htmlEncode(ctx.CurrentItem.JobTitle);
                                                var displayJtitle = Srch.U.getSingleHHXMLNodeValue(hhProps, "jobtitle");
                                                if ($isEmptyString(displayJtitle)) { displayJtitle = encodedJtitle }
ms_outHtml.push(' '
,'                                                <div id="JobTitleValue" class="ms-srch-ellipsis" title="', encodedJtitle ,'"> ', displayJtitle ,' </div>'
,'                                            </div>'
); 
                                        }
                                        
                            var encodedworkemail = $htmlEncode(ctx.CurrentItem.WorkEmail);
																						var displayworkemail = Srch.U.getSingleHHXMLNodeValue(hhProps, "workemail");
																						if ($isEmptyString(displayworkemail)) { displayworkemail = encodedworkemail }
ms_outHtml.push(''
,'                                            <div id="EmailValue" class="ms-srch-ellipsis">'
,'                                                <a clicktype="Result" id="NameFieldLink" href="mailto:', displayworkemail ,'">', displayworkemail ,'</a>'
,'                                            </div>'

);


																					if(has_wp == true) {
ms_outHtml.push(''
,'                                            <div id="PhoneField">'
); 
                                                var encodedPhone = $htmlEncode(ctx.CurrentItem.WorkPhone);
                                                var displayPhone = Srch.U.getSingleHHXMLNodeValue(hhProps, "workphone");
                                                if ($isEmptyString(displayPhone)) { displayPhone = encodedPhone }
ms_outHtml.push(' '
,'                                                <div id="PhoneValue" class="ms-srch-ellipsis" title="', encodedPhone ,'">Tel: ', displayPhone ,' </div>'
,'                                            </div>'
); 
                                        }
                                        	else{
                                        		ms_outHtml.push('<div id="PhoneField"><div id="PhoneValue" class="ms-srch-ellipsis">Tel: </div></div>');
                                        	}


                                        if(has_sector == true) {
ms_outHtml.push(''
,'                                            <div id="SectorField">'
); 
                                                var encodedSector = $htmlEncode(ctx.CurrentItem.PicassoSector);
                                                var displaySector = Srch.U.getSingleHHXMLNodeValue(hhProps, "picassosector");
                                                if ($isEmptyString(displaySector)) { displaySector = encodedSector }
ms_outHtml.push(' '
,'                                                <div id="SectorValue" class="ms-srch-ellipsis" title="', encodedSector ,'">Sector: ', displaySector ,' </div>'
,'                                            </div>'
); 
                                        }
                                        	else{
                                        		ms_outHtml.push('<div id="SectorField"><div id="SectorValue" class="ms-srch-ellipsis">Sector: </div></div>');
                                        	}

                                        if(has_bu == true) {
ms_outHtml.push(''
,'                                            <div id="BusinessUnitField">'
); 
                                                var encodedBU = $htmlEncode(ctx.CurrentItem.PicassoBusinessUnit);
                                                var displayBU = Srch.U.getSingleHHXMLNodeValue(hhProps, "picassobusinessunit");
                                                if ($isEmptyString(displayBU)) { displayBU = encodedBU }
ms_outHtml.push(' '
,'                                                <div id="BusinessUnitValue" class="ms-srch-ellipsis" title="', encodedBU ,'">Business Unit: ', displayBU ,' </div>'
,'                                            </div>'
); 
                                        }
                                        else{
                                        		ms_outHtml.push('<div id="BusinessUnitField"><div id="BusinessUnitValue" class="ms-srch-ellipsis">Business Unit: </div></div>');
                                        	}
														
														
                            if(has_ski == true && has_resp == true && has_abme == true) {
                                var encodedVal = Srch.U.getTrimmedProcessedHHXMLString(Srch.U.getMultipleHHXMLNodeValues(hhProps, "skills", 5, delimiter), 145);
                                if (Srch.U.e(encodedVal)) { encodedVal = $htmlEncode(Srch.U.getTrimmedString(Srch.U.getUnEncodedMultiValuedResults(ctx.CurrentItem.Skills, 5, delimiter), 145)) }
                                if (!Srch.U.e(encodedVal)) {
                                    infoAvailable = true;
ms_outHtml.push('                        '
,'                                    <li id="SkillsField">'
,'                                        <div class="ms-srch-hover-subTitle"><h3 class="ms-soften">', $htmlEncode(Srch.Res.hp_PeopleItem_Skills) ,'</h3></div>'
,'                                        <div class="ms-srch-hover-text" id="', $htmlEncode(id + HP.ids.peopleSkills) ,'">'
,'                                            ', encodedVal ,''
,'                                        </div>'
,'                                    </li>'
); 
                                } 
ms_outHtml.push(''
);                                                                            
                            }                
ms_outHtml.push('                                '
);                    
                            if(has_pp == true && (has_resp == true  || has_ski == true) && (has_abme == true || (has_resp == true && has_ski == true))) {
                                var encodedVal = Srch.U.getTrimmedProcessedHHXMLString(Srch.U.getMultipleHHXMLNodeValues(hhProps, "pastprojects", 5, delimiter), 145);
                                if (Srch.U.e(encodedVal)) { encodedVal = $htmlEncode(Srch.U.getTrimmedString(Srch.U.getUnEncodedMultiValuedResults(ctx.CurrentItem.PastProjects, 5, delimiter), 145)) }
                                if (!Srch.U.e(encodedVal)) {
                                    infoAvailable = true;
ms_outHtml.push('                        '
,'                                    <li id="PastProjectsField">'
,'                                        <div class="ms-srch-hover-subTitle"><h3 class="ms-soften">', $htmlEncode(Srch.Res.hp_PeopleItem_PastProjects) ,'</h3></div>'
,'                                        <div class="ms-srch-hover-text" id="', $htmlEncode(id + HP.ids.peoplePastProjects) ,'">'
,'                                            ', encodedVal ,''
,'                                        </div>'
,'                                    </li>'
); 
                                } 
ms_outHtml.push(''
);                                                                            
                            }                
ms_outHtml.push('                                                        '
);                    
                            if(has_int == true && (has_resp == true  || has_ski == true || has_pp == true) && (has_abme == true || (has_resp == true && (has_ski == true || has_pp == true)) || (has_ski == true && has_pp == true))) {
                                var encodedVal = Srch.U.getTrimmedProcessedHHXMLString(Srch.U.getMultipleHHXMLNodeValues(hhProps, "interests", 5, delimiter), 145);
                                if (Srch.U.e(encodedVal)) { encodedVal = $htmlEncode(Srch.U.getTrimmedString(Srch.U.getUnEncodedMultiValuedResults(ctx.CurrentItem.Interests, 5, delimiter), 145)) }
                                if (!Srch.U.e(encodedVal)) {
                                    infoAvailable = true;
ms_outHtml.push('                        '
,'                                    <li id="InterestsField">'
,''
,'                                        <div class="ms-srch-hover-subTitle"><h3 class="ms-soften">', $htmlEncode(Srch.Res.hp_PeopleItem_Interests) ,'</h3></div>'
,'                                        <div class="ms-srch-hover-text" id="', $htmlEncode(id + HP.ids.peopleInterests) ,'">'
,'                                            ', encodedVal ,''
,'                                        </div>'
,'                                    </li>'
); 
                                } 
ms_outHtml.push(''
);                                                                            
                            }                


                   
                                            
ms_outHtml.push('   '
);                    
                            if(isExpResult == false) {
ms_outHtml.push('                        '
,'                              <div id="', dynTagId ,'"></div>'
);                                                                            
                            }                
ms_outHtml.push('   '
,'                            <div id="', dynTagIdRel ,'"></div>'
,'                        </ul>'
,'                    </div>'
,'                    <div id="', $htmlEncode(id + HP.ids.actions) ,'" class="ms-srch-hover-actions">'
,'                        <div class="ms-srch-hover-action">'
,'                            <a id="', visitId ,'" class="ms-calloutLink ms-uppercase" href="', $urlHtmlEncode(ctx.CurrentItem.Path) ,'" title="', $htmlEncode(Srch.Res.hp_PeopleItem_ViewProfile) ,'">'
,'                                ', $htmlEncode(Srch.Res.hp_PeopleItem_ViewProfile) ,' '
,'                            </a>'
,'                        </div>'
);                    
                        if(has_acc == true && isSelfSrch == false) {
ms_outHtml.push('                    '
,'                        <div class="ms-srch-hover-action">'
,'                            <div class="ms-calloutLink ms-uppercase" id="', followId ,'"></div>'
);
                            AddPostRenderCallback(ctx, function(){ULSx0T:;
                                HP.GetPeopleFollowingControl(aname, uname, followId, null);
                            });
ms_outHtml.push(''
,'                        </div>'
);                        
                        }
ms_outHtml.push('                        '
,'                    </div>'
);
                    AddPostRenderCallback(ctx, function(){ULSx0T:;
                        var docCtrlElem = document.getElementById(dynTagId);
                        Srch.PSU.documentsByQuery(ctx.ClientControl, uname, docCtrlElem, infoAvailable, isExpResult);
                    });
ms_outHtml.push(''
);
                    var queryUserId = null;  
                    if(ctx.ScriptApplicationManager && ctx.ScriptApplicationManager.states){
                         queryUserId = ctx.ScriptApplicationManager.states.currentUserProfileId;
					}
                    var userId = ctx.CurrentItem.UserProfile_GUID;

                    //AddPostRenderCallback(ctx, function(){ULSx0T:;
                    //    Srch.PSU.relatedThroughByQuery(ctx.ClientControl, userId, queryUserId, dynTagIdRel, infoAvailable);
                    //});
ms_outHtml.push(''
,''
,'                </div>'
,'            </div>'
);                        
        }
ms_outHtml.push('            '
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_ConnectPersonHover() {ULSx0T:;

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_ConnectPerson_HoverPanel", DisplayTemplate_ConnectPersonHover);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ConnectPerson_HoverPanel.js", DisplayTemplate_ConnectPersonHover);
}

}
RegisterTemplate_ConnectPersonHover();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContentManagement\u002fItem_ConnectPerson_HoverPanel.js"), RegisterTemplate_ConnectPersonHover);
}
