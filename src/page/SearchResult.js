import React, { useState } from "react";
import data from "../data.json";
import { Row, Col } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";
import TechnologyTag from "../components/TechnologyTag";
import { useDispatch, useSelector } from "react-redux";
import * as ActionCreator from "../store/action/actions";

function SearchResult(props) {
  return (
    <React.Fragment>
      <Row gutter={[8, 8]}>
        <Col span={5}>
          <CollapsibleFilter />
        </Col>
        <Col span={13}>
          {data.map((item) => {
            return <SearchResultItem item={item} />;
          })}
        </Col>
        <Col span={6}>
          <OrganizationDetailCard />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default SearchResult;
