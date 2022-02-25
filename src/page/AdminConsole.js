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

function AdminConsole(props) {
  const match = useRouteMatch();
  console.log(match.url);
  return (
    <React.Fragment>
      
      <Switch>
        <Route path={`${match.url}/${RouteUrl.MONITORJOBS}`} exact>
          <MonitorJobs />
        </Route>
        <Route path={`${match.url}/${RouteUrl.CREATEJOBS}`} exact>
          <CreateJob />
        </Route>
        <Route path={`${match.url}/${RouteUrl.SOURCES}`} exact>
          <ListAllSources />
        </Route>
        <Route
          path={`${match.url}/${RouteUrl.LISTALLSOURCECONFIGTEMPLATES}`}
          exact
        >
          <ListAllConfigTemplates />
        </Route>
        <Route path={`${match.url}/${RouteUrl.CONFLUENCECREATESOURCE}`} exact>
          <CreateConfluenceSource />
        </Route>
        <Route path={`${match.url}/${RouteUrl.CONFLUENCECONFIGTEMPLATE}`} exact>
          <ConfigConfluenceTemplate />
        </Route>

        <Route path={`${match.url}/${RouteUrl.SHAREPOINTCREATESOURCE}`} exact>
          <CreateSharepointSource />
        </Route>
        <Route path={`${match.url}/${RouteUrl.SHAREPOINTCONFIGTEMPLATE}`} exact>
          <ConfigSharepointTemplate />
        </Route>

        <Route
          path={`${match.url}/${RouteUrl.SHAREPOINTONPREMISECREATESOURCE}`}
          exact
        >
          <CreateSharepointOnPremiseSource />
        </Route>
        <Route
          path={`${match.url}/${RouteUrl.SHAREPOINTONPREMISECONFIGTEMPLATE}`}
          exact
        >
          <ConfigSharepointOnPremiseTemplate />
        </Route>

        <Route path={`${match.url}/${RouteUrl.JIRACREATESOURCE}`} exact>
          <CreateJiraSource />
        </Route>
        <Route path={`${match.url}/${RouteUrl.JIRACONFIGTEMPLATE}`} exact>
          <ConfigJiraTemplate />
        </Route>

        <Route path={`${match.url}/${RouteUrl.WEBSITECREATESOURCE}`} exact>
          <CreateWebsiteSource />
        </Route>
        <Route path={`${match.url}/${RouteUrl.WEBSITECONFIGTEMPLATE}`} exact>
          <ConfigWebsiteTemplate />
        </Route>

        <Route path={`${match.url}/${RouteUrl.FILESYSTEMCREATESOURCE}`} exact>
          <CreateFileSystemSource />
        </Route>
        <Route path={`${match.url}/${RouteUrl.FILESYSTEMCONFIGTEMPLATE}`} exact>
          <ConfigFileSystemTemplate />
        </Route>

        <Route path={`${match.url}/${RouteUrl.LISTOFUSERGROUP}`} exact>
          <ListOfUserGroups />
        </Route>
        <Route path={`${match.url}/${RouteUrl.CREATEUSERGROUP}`} exact>
          <CreateUserGroup />
        </Route>

        <Redirect
          from={`${match.url}`}
          exact
          to={`${match.url}/${RouteUrl.MONITORJOBS}`}
        />
      </Switch>
    </React.Fragment>
  );
}

export default AdminConsole;
