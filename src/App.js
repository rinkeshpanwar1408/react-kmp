import React, { useEffect, useState } from "react";
import { Typography, Layout, Menu, Input, Dropdown, Space } from "antd";
import "antd/dist/antd.css";
import 'swiper/css';
import 'swiper/css/bundle';
import "./scss/main.css";
import 'simplebar/dist/simplebar.min.css';
import { Redirect, Route, Switch } from "react-router-dom";
import HintSearch from "./page/Hintsearch";


function App() {
  return (
    <div className="main-container">
      <Switch>
        <Route path={"/Login"} exact></Route>
        <Route path={"/hintsearch"}>
          <HintSearch />
        </Route>
        <Redirect from="/" exact to={"/hintsearch"} />
        {/* <Redirect from="*" exact to={"/hintsearch"} /> */}
      </Switch>     
    </div>
  );
}

export default App;
