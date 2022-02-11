import React, { useEffect } from "react";
import { Row, Col } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";
import { useDispatch, useSelector } from "react-redux";
import * as ActionCreators from "../store/action/actions";

function SearchResult(props) {
  const searchedData = useSelector((state) => state.searchresults.searchedData);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(ActionCreators.getSearchedData());
    Dispatch(ActionCreators.getFilters());
  }, [Dispatch]);

  return (
    <React.Fragment>
      <Row gutter={[8, 8]}>
        <Col span={5}>
          <CollapsibleFilter />
        </Col>
        <Col span={13}>
          {searchedData.map((item) => {
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
