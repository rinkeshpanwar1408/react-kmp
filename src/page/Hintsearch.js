import React from "react";
import { Layout } from "antd";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch, Redirect } from "react-router-dom";
import MainSearch from "./MainSearch";
import SearchResult from "./SearchResult";

const { Content } = Layout;

function HintSearch(props) {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <MainHeader />
      <Content className="site-layout-background">
        <Switch>
          <Route path={`${match.url}/mainsearch`} exact>
            <MainSearch />
          </Route>
          <Route path={`${match.url}/search`} exact>
            <SearchResult />
          </Route>
          <Redirect
            from={`${match.url}`}
            to={`${match.url}/mainsearch`}
            exact
          />
        </Switch>
      </Content>
      <MainFooter />
    </React.Fragment>
  );
}

export default HintSearch;
