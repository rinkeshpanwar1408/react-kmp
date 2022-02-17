import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Typography, Button } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { FiChevronLeft,FiChevronRight } from "react-icons/fi";

import * as ActionCreators from "../store/action/actions";
import parse from "html-react-parser";

const { Text } = Typography;

function SearchResult(props) {
  const [test, setTest] = useState(false);
  const searchedData = useSelector((state) => state.searchresults.searchedData);
  const previewData = useSelector((state) => state.searchresults.previewData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const Dispatch = useDispatch();
  const [showFilter, setshowFilter] = useState(true);

  useEffect(() => {
    Dispatch(ActionCreators.getSearchedData());
  }, [Dispatch]);

  const searchItemInfoClickHandler = (id) => {
    Dispatch(ActionCreators.getSearchItemPreviewData(id));
    setIsModalVisible(!isModalVisible);
  };

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
            return (
              <SearchResultItem
                item={item}
                key={i}
                onSearchItemInfoClick={searchItemInfoClickHandler}
              />
            );
          })}

          <Modal
            title="Document details"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            width={"50%"}
            className="search-result-preview"
            footer={
              <Button onClick={() => setIsModalVisible(false)}>Close</Button>
            }
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text strong>Title</Text>
              </Col>
              <Col span={24}>{previewData?.fileName}</Col>

              <Col span={24}>
                <Text strong>Snippet</Text>
              </Col>
              <Col span={24}>
                {previewData?.content && parse(previewData?.content)}
              </Col>

              <Col span={24}>
                <Text strong>Author</Text>
              </Col>
              <Col span={24}>{previewData?.author}</Col>
              
              <Col span={24}>
                <Text strong>Source</Text>
              </Col>
              <Col span={24}>
                {previewData?.content && parse(previewData?.source)}
              </Col>

              <Col span={24}>
                <Text strong>Created Date</Text>
              </Col>
              <Col span={24}>
                {previewData?.createdDate && new Date(previewData?.createdDate).toUTCString()}
              </Col>

              <Col span={24}>
                <Text strong>Last Modified Date</Text>
              </Col>
              <Col span={24}>
                {previewData?.lastModifiedDate}
              </Col>
            </Row>
          </Modal>
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
