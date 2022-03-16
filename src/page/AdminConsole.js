import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../model/route";
import ConfigConfluenceTemplate from "./admin/Source/Confluence/ConfigConfluenceTemplate";
import CreateConfluenceSource from "./admin/Source/Confluence/CreateConfluenceSource";
import CreateJob from "./admin/Execution/CreateJob";
import ListAllConfigTemplates from "./admin/Source/ListAllConfigTemplate";
import ListAllSources from "./admin/Source/ListAllSource";
import MonitorJobs from "./admin/Execution/MonitorJobs";
import CreateSharepointSource from "./admin/Source/Sharepoint/CreateSharepointSource";
import ConfigSharepointTemplate from "./admin/Source/Sharepoint/ConfigSharepointTemplate";

import ConfigSharepointOnPremiseTemplate from "./admin/Source/SharepointOnPremise/ConfigSharepointOnPremiseTemplate";
import CreateSharepointOnPremiseSource from "./admin/Source/SharepointOnPremise/CreateSharepointOnPremiseSource";

import ConfigJiraTemplate from "./admin/Source/Jira/ConfigJiraTemplate";
import CreateJiraSource from "./admin/Source/Jira/CreateJiraSource";

import ConfigWebsiteTemplate from "./admin/Source/Website/ConfigWebsiteTemplate";
import CreateWebsiteSource from "./admin/Source/Website/CreateWebsiteSource";

import ConfigFileSystemTemplate from "./admin/Source/FileSystem/ConfigFileSystemTemplate";
import CreateFileSystemSource from "./admin/Source/FileSystem/CreateFileSystemSource";

import CreateUserGroup from "./admin/Users/CreateUserGroup";
import ListOfUserGroups from "./admin/Users/ListOfUserGroups";
import { PageHeader } from "antd";
import { MultiTableDrag } from "./MultiTableDrag";
import CreateWorkSpace from "./admin/WorkSpace/CreateWorkSpace";
import CategorizeSearch from "./admin/WorkSpace/CategorizeSearch";
import PersonalizeSearch from "./admin/WorkSpace/PersonalizeSearch";
import OptimizeSearch from "./admin/WorkSpace/OptimizeSearch";
import Dashboard from "./admin/Dashboard";

function AdminConsole(props) {
  const match = useRouteMatch();
  console.log(match.path);
  return (
    <React.Fragment>

      <Switch>
        <Route path={`${match.path}/${RouteUrl.DASHBOARD}`} exact>
          <Dashboard />
        </Route>
        <Route path={`${match.path}/${RouteUrl.MONITORJOBS}`} exact>
          <MonitorJobs />
        </Route>
        <Route path={`${match.path}/${RouteUrl.CREATEJOBS}`} exact>
          <CreateJob />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}`} exact>
          <ListAllSources />
        </Route>
        <Route
          path={`${match.path}/${RouteUrl.LISTALLSOURCECONFIGTEMPLATES}`}
          exact
        >
          <ListAllConfigTemplates />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}`} exact>
          <CreateConfluenceSource />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}/:full_source_name`} exact>
          <CreateConfluenceSource />
        </Route>

        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`} exact>
          <ConfigConfluenceTemplate />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}/:full_config_name`} exact>
          <ConfigConfluenceTemplate />
        </Route>

        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINT}/${RouteUrl.CREATESOURCE}`} exact>
          <CreateSharepointSource />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINT}/${RouteUrl.CONFIGTEMPLATE}`} exact>
          <ConfigSharepointTemplate />
        </Route>

        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINTONPREMISE}/${RouteUrl.CREATESOURCE}`} exact>
          <CreateSharepointOnPremiseSource />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINT}/${RouteUrl.CONFIGTEMPLATE}`} exact>
          <ConfigSharepointOnPremiseTemplate />
        </Route>

        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.JIRA}/${RouteUrl.CREATESOURCE}`} exact>
          <CreateJiraSource />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.JIRA}/${RouteUrl.CONFIGTEMPLATE}`} exact>
          <ConfigJiraTemplate />
        </Route>

        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.WEBSITE}/${RouteUrl.CREATESOURCE}`} exact>
          <CreateWebsiteSource />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.JIRA}/${RouteUrl.CONFIGTEMPLATE}`} exact>
          <ConfigWebsiteTemplate />
        </Route>

        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.FILESYSTEM}/${RouteUrl.CREATESOURCE}`} exact>
          <CreateFileSystemSource />
        </Route>
        <Route path={`${match.path}/${RouteUrl.SOURCES}/${RouteUrl.FILESYSTEM}/${RouteUrl.CONFIGTEMPLATE}`} exact>
          <ConfigFileSystemTemplate />
        </Route>

        <Route path={`${match.path}/${RouteUrl.WORKSPACE}`} exact>
          <CreateWorkSpace />
        </Route>

        <Route path={`${match.path}/${RouteUrl.LISTOFUSERGROUP}`} exact>
          <ListOfUserGroups />
        </Route>
        <Route path={`${match.path}/${RouteUrl.CREATEUSERGROUP}`} exact>
          <CreateUserGroup />
        </Route>

        <Route path={`${match.path}/${RouteUrl.PERSONALIZESEARCHCONFIG}`} exact>
          <PersonalizeSearch />
        </Route>

        <Route path={`${match.path}/${RouteUrl.CATEGORIZESEARCHCONFIG}`} exact>
          <CategorizeSearch />
        </Route>

        <Route path={`${match.path}/${RouteUrl.OPTIMIZESEARCHCONFIG}`} exact>
          <OptimizeSearch />
        </Route>


        <Redirect
          from={`${match.path}`}
          exact
          to={`${match.path}/${RouteUrl.DASHBOARD}`}
        />
      </Switch>
    </React.Fragment>
  );
}

export default AdminConsole;
