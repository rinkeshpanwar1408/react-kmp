import React from "react";
import { Layout } from "antd";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import { Route } from "react-router-dom";
import { useRouteMatch,Redirect } from "react-router-dom";
import RecentArticals from "../components/RecentArticals";
import PopularTopics from "../components/PopularTopics";
import MainSearch from "./MainSearch";

const { Content } = Layout;

function HintSearch(props) {
  const match = useRouteMatch();
  
  return (
    <React.Fragment>
      <MainHeader />
      <Content className="site-layout-background">
        <Route path={`${match.url}/mainsearch`} exact>
          <MainSearch />
        </Route>
        <Route path={`${match.url}/search`} exact>
            <h1>Search</h1>
        </Route>
        <Redirect from={`${match.url}`} exact to={`${match.url}/mainsearch`} />
      </Content>
      <MainFooter />
    </React.Fragment>
  );
}

export default HintSearch;
