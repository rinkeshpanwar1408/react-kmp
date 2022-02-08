import React from "react";
import data from "../data.json";
import { Row, Col } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import RoundCornerCard from "../components/RoundCornerCard";

function SearchResult(props) {
  console.log(data);

  return (
    <React.Fragment>
      <Row gutter={[8,8]}>
        <Col span={6}>
          <RoundCornerCard></RoundCornerCard>
        </Col>
        <Col span={12}>
          {data.map((item) => {
            return <SearchResultItem item={item} />;
          })}
        </Col>
        <Col span={6}>Right-Side</Col>
      </Row>
    </React.Fragment>
  );
}

export default SearchResult;
