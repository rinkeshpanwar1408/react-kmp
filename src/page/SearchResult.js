import React, { useEffect, useState } from "react";
import { Row, Col, Switch, Button } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { FiChevronLeft,FiChevronRight } from "react-icons/fi";

import * as ActionCreators from "../store/action/actions";

function SearchResult(props) {
  const [test, setTest] = useState(false);
  const searchedData = useSelector((state) => state.searchresults.searchedData);
  const Dispatch = useDispatch();
  const [showFilter, setshowFilter] = useState(true);

  useEffect(() => {
    Dispatch(ActionCreators.getSearchedData());
    Dispatch(ActionCreators.getFilters());
  }, [Dispatch]);

  return (
    <React.Fragment>
      <div className="search_result_container">
        <div
          className={`search_result_container-filterContainer ${
            !showFilter ? "hideFilter" : ""
          }`}
        >
          <CollapsibleFilter />
          <Button
            className="search_result_container-HideShowFilter"
            shape="circle"
            icon={ showFilter ? <FiChevronLeft /> :<FiChevronRight /> }  
            onClick={() => {
              setshowFilter(!showFilter);
            }}
          />
        </div>
        <div className="search_result_container-resultContainer">
          <Row gutter={[8, 8]}>
            <Col span={17}>
              {searchedData.map((item, i) => {
                return <SearchResultItem item={item} key={i} />;
              })}
            </Col>
            <Col span={7}>
              <OrganizationDetailCard />
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchResult;
