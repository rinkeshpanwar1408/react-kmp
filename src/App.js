import React, { Suspense } from "react";
import { Button, Result, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ThemeProvider } from "styled-components";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "simplebar/dist/simplebar.min.css";
import "./scss/main.css";

import { Redirect, Route, Switch } from "react-router-dom";
import HintSearch from "./page/Hintsearch";
import { StyledMainLayout } from "./styled-components/Master";
import { useSelector } from "react-redux";
import * as RouteUrl from "./model/route";

import Login from "./page/Login";
import ErrorPage from "./page/Error";
import PageNotFound from "./page/PageNotFound";
import Auth from "./page/Auth";

function App() {
  const currentTheme = useSelector((state) => state.theme.Theme);
  const Error = useSelector((state) => state.error.Error);


  return (
    <ThemeProvider theme={currentTheme}>
      <StyledMainLayout
        className={`${currentTheme.themestyle} ${currentTheme.themecolor} `}
      >
        <Suspense
          fallback={
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          }
        >
          {!Error &&
            <Switch>
              <Route path={RouteUrl.LOGIN} exact><Auth /></Route>
              {/* <Route path={RouteUrl.LOGIN} exact><Login /></Route> */}
              <Route path={RouteUrl.HINTSEARCH} >
                <HintSearch />
              </Route>
              <Redirect from="/" exact to={RouteUrl.HINTSEARCH} />

              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          }
          
          {Error &&
            <Route path={`${RouteUrl.ERROR}`} exact>
              <ErrorPage />
            </Route>
          }
          {Error &&
            <Redirect to={RouteUrl.ERROR} />
          }
        </Suspense>
      </StyledMainLayout>
    </ThemeProvider >
  );
}

export default App;
