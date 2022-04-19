import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Typography, Button } from "antd";
import SearchResultItem from "../components/SearchResultItem";
import CollapsibleFilter from "../components/CollapsibleFilter";
import OrganizationDetailCard from "../components/OrganizationDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { StyledCard } from "../styled-components/CommonControls";

import * as ActionCreators from "../store/action/actions";
import parse from "html-react-parser";
import CustomCol from "../components/CustomCol";

//if data not found after search again then show the empty icon
import { Empty } from "antd";
//importing spinner loading
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Text } = Typography;

function SearchResult(props) {
  const [test, setTest] = useState(false);

  const searchedData = useSelector((state) => state.searchresults.searchedData);
  const previewData = useSelector((state) => state.searchresults.previewData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const Dispatch = useDispatch();
  const [showFilter, setshowFilter] = useState(true);
  const [isLoading, setisLoading] = useState("loading");

  useEffect(() => {
    Dispatch(ActionCreators.getSearchedData());
  }, [Dispatch]);

  useEffect(() => {
    const localS = localStorage.getItem("loading_text");
    if(null === localS){
          setisLoading("empty");
    }else{
      setisLoading("loading");
      if (!searchedData.length > 0) {
        setTimeout(() => {
          setisLoading("empty");
          localStorage.removeItem("loading_text");
        }, 2000); 
      }
    }
  },[localStorage.getItem("loading_text")]);
  

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
            {/* for filter when data is not found after search again then hide the filter component */}
            {searchedData.length > 0 ? (
              <>
                <CollapsibleFilter />
                {/* this button between filter and data */}
                <Button
                  style={{ position: "fixed", top: "35rem", left: "25rem" }}
                  className="search_result_container-HideShowFilter"
                  shape="circle"
                  icon={showFilter ? <FiChevronLeft /> : <FiChevronRight />}
                  onClick={() => {
                    setshowFilter(!showFilter);
                  }}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="search_result_container-resultContainer">
            <Row gutter={[8, 8]}>
              <CustomCol xl={17}>
                {searchedData.length > 0 ? (
                  searchedData.map((item, i) => {
                    return (
                      <SearchResultItem
                        item={item}
                        key={i}
                        onSearchItemInfoClick={searchItemInfoClickHandler}
                      />
                    );
                  })
                ) : (
                  isLoading === "loading" ? 
                  <StyledCard>
                      <div className="text-center">
                        <Spin indicator={antIcon} />
                      </div>
                  </StyledCard>
                   :
                   <StyledCard >
                     <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                   </StyledCard>
                )}
                

                <Modal
                  title="Document details"
                  visible={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  width={"50%"}
                  className="search-result-preview"
                  footer={
                    <Button onClick={() => setIsModalVisible(false)}>
                      Close
                    </Button>
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
                      {previewData?.createdDate &&
                        new Date(previewData?.createdDate).toUTCString()}
                    </CustomCol>

                    <CustomCol lg={24}>
                      <Text strong>Last Modified Date</Text>
                    </CustomCol>
                    <CustomCol lg={24}>{previewData?.lastModifiedDate}</CustomCol>
                  </Row>
                </Modal>
              </CustomCol>
              <CustomCol xl={7}>
                {searchedData.length > 0 ? <OrganizationDetailCard /> : ""}
              </CustomCol>
            </Row>
          </div>
        {/* <StyledCard > */}
        {/* {searchedData.length<=0 &&  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> } */}
          {/* </StyledCard>            */}
      </div>
    </React.Fragment>
  );
}

export default SearchResult;
