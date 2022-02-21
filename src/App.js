import React, { Suspense } from "react";
import { Spin } from "antd";
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

function App() {
  const currentTheme = useSelector((state) => state.theme.Theme);
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
          <Switch>
            <Route path={RouteUrl.LOGIN} exact></Route>
            <Route path={RouteUrl.HINTSEARCH}>
              <HintSearch />
            </Route>
            <Redirect from="/" exact to={RouteUrl.HINTSEARCH} />
          </Switch>
        </Suspense>
      </StyledMainLayout>
    </ThemeProvider>
  );
}

export default App;
