import React, { useState } from "react";
import data from "../data.json";
import { Row, Col } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";
import TechnologyTag from "../components/TechnologyTag";

function SearchResult(props) {
  const [OrganizationDetail, setOrganizationDetail] = useState(data[0]);

  const onSearchResultItemClickHandler = (id) => {
    const orgData = data.find((item) => item.id === id);
    setOrganizationDetail(orgData);
  };

  const onTagClickHandler = (id, techName) => {
    const techData = data.find((item) => item.id === id);
    const sameTechData = JSON.parse(techData.graphDetails.sameTech);
    const sameIndustryData = JSON.parse(techData.graphDetails.sameIndustry);

    if (sameTechData[techName]) {
      console.log(sameTechData[techName]);
    } else {
      console.log(sameIndustryData[techName]);
    }
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
          <OrganizationDetailCard
            item={OrganizationDetail}
            onTechClick={onTagClickHandler}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default SearchResult;
