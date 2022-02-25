import React from "react";
import { Col, Layout, Row } from "antd";
import PopularTopics from "../components/PopularTopics";
import RecentArticals from "../components/RecentArticals";
import CustomCol from "../components/CustomCol";

function MainSearch(props) {
  return (
    <React.Fragment>
       <Row>
        <CustomCol lg={24}>{<RecentArticals /> }</CustomCol>
      </Row> 
      <Row>
        <CustomCol lg={24}>
          <PopularTopics />
        </CustomCol>
      </Row>
    </React.Fragment>
  );
}

export default MainSearch;
