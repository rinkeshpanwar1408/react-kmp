import React, { useState } from "react";
import data from "../data.json";
import { Row, Col } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";

function SearchResult(props) {
  const [OrganizationDetail, setOrganizationDetail] = useState(data[0]);

  const onSearchResultItemClickHandler = (id) => {
    const orgData = data.find((item) => item.id === id);

    setOrganizationDetail(orgData);
  };

  return (
    <React.Fragment>
      <Row gutter={[8, 8]}>
        <Col span={5}>
          <CollapsibleFilter />
        </Col>
        <Col span={13}>
          {data.map((item) => {
            return (
              <SearchResultItem
                item={item}
                onSearchResultItemClick={onSearchResultItemClickHandler}
              />
            );
          })}
        </Col>
        <Col span={6}>
          <OrganizationDetailCard item={OrganizationDetail} />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default SearchResult;
