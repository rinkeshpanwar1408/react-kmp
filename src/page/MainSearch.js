import React from "react";
import { Col, Layout, Row } from "antd";
import PopularTopics from "../components/PopularTopics";
import RecentArticals from "../components/RecentArticals";

function MainSearch(props) {
  return (
    <React.Fragment>
       <Row>
        <Col span={24}>{<RecentArticals /> }</Col>
      </Row> 
      <Row>
        <Col span={24}>
          <PopularTopics />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default MainSearch;
