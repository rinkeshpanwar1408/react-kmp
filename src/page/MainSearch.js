import React from "react";
import { Col, Layout, Row } from "antd";
import PopularTopics from "../components/PopularTopics";
import RecentArticals from "../components/RecentArticals";
import CustomCol from "../components/CustomCol";
import SearchHome from "../components/SearchHome";
import * as RouteUrl from "../model/route";

function MainSearch(props) {
  return (
    <React.Fragment>
      <div className="mainheader_container_body_section">
        <SearchHome searchPath={RouteUrl.SEARCH}/>
      </div>
    </React.Fragment>
  );
}

export default MainSearch;
