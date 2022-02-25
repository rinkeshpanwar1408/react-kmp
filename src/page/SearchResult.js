import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Typography, Button } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import * as ActionCreators from "../store/action/actions";
import parse from "html-react-parser";
import CustomCol from "../components/CustomCol";

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
          className={`search_result_container-filterContainer ${!showFilter ? "hideFilter" : ""
            }`}
        >
          <CollapsibleFilter />
          <Button
            className="search_result_container-HideShowFilter"
            shape="circle"
            icon={showFilter ? <FiChevronLeft /> : <FiChevronRight />}
            onClick={() => {
              setshowFilter(!showFilter);
            }}
          />
        </div>
        <div className="search_result_container-resultContainer">
          <Row gutter={[8, 8]}>
            <CustomCol lg={17}>
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
                  <CustomCol lg={24}>
                    <Text strong>Title</Text>
                  </CustomCol>
                  <CustomCol lg={24}>{previewData?.fileName}</CustomCol>

                  <CustomCol lg={24}>
                    <Text strong>Snippet</Text>
                  </CustomCol>
                  <CustomCol lg={24}>
                    {previewData?.content && parse(previewData?.content)}
                  </CustomCol>

                  <CustomCol lg={24}>
                    <Text strong>Author</Text>
                  </CustomCol>
                  <CustomCol lg={24}>{previewData?.author}</CustomCol>

                  <CustomCol lg={24}>
                    <Text strong>Source</Text>
                  </CustomCol>
                  <CustomCol lg={24}>
                    {previewData?.content && parse(previewData?.source)}
                  </CustomCol>

                  <CustomCol lg={24}>
                    <Text strong>Created Date</Text>
                  </CustomCol>
                  <CustomCol lg={24}>
                    {previewData?.createdDate && new Date(previewData?.createdDate).toUTCString()}
                  </CustomCol>

                  <CustomCol lg={24}>
                    <Text strong>Last Modified Date</Text>
                  </CustomCol>
                  <CustomCol lg={24}>
                    {previewData?.lastModifiedDate}
                  </CustomCol>
                </Row>
              </Modal>
            </CustomCol>
            <CustomCol lg={7}>
              <OrganizationDetailCard />
            </CustomCol>
          </Row>
        </div>
      </div>

    </React.Fragment>
  );
}

export default SearchResult;
