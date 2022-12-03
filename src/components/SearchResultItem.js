import React, { useState } from "react";
import SearchResultItemHeader from "./SearchResultItemHeader";
import parse from "html-react-parser";
import { Badge, Typography, Menu, Dropdown, Skeleton } from "antd";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import {CaretRightOutlined} from '@ant-design/icons'


import { LikeOutlined, MoreOutlined, LikeFilled,EyeFilled } from "@ant-design/icons";

import {
  BiDotsHorizontalRounded,
  BiInfoCircle,
  BiShare,
  BiUserPlus,
} from "react-icons/bi";
import * as ActionCreator from "../store/action/actions";
import { useDispatch } from "react-redux";
import { DropDownMenuItem } from "./DropDownMenuItem";
import { StyledCard } from "../styled-components/CommonControls";

const { Paragraph, Link, Text } = Typography;

function SearchResultItem(props) {
  const [islike, setIsLike] = useState(false);
  const dispatch = useDispatch();

  const onSearchResultItemClickHandler = (id) => {
    dispatch(ActionCreator.getQuickLinkDetails(id));
  };

  const onSearchResultItemLikeClickHandler = (id, feedback) => {
    dispatch(ActionCreator.addremoveLikeFromSearchResult(id, feedback));
  };

  const ActionMenu = (
    <div className="DropDownMenu">
      <DropDownMenuItem title="Share" icon={<BiShare size={20} />} />
      <DropDownMenuItem
        title="Invite to Edit"
        icon={<BiUserPlus size={20} />}
      />
      <DropDownMenuItem
        title="Info"
        icon={<BiInfoCircle size={20} />}
        onClick={() => props.onSearchItemInfoClick(props.item.id)}
      />
    </div>
  );

  const [ellipsis, setEllipsis] = useState(true);
  const likeCount = props.item.elasticDocumentRating
    ? props.item.elasticDocumentRating.thumbsUpCount
    : 0;
  // const dislikeCount = props.item.elasticDocumentRating
  //   ? props.item.elasticDocumentRating.thumbsDownCount
  //   : 0;

  const toggleEllipsis = () => {
    setEllipsis(!ellipsis);
  };

  return (
   
    props.item ? (
      <>
        {/* {console.log(props.item)} */}
        <div  className={`search_item ${props.active && "active"}`}
       onClick={() => onSearchResultItemClickHandler(props.item.id)}>
         
          <SearchResultItemHeader className="title" title={props.item.fileName} iconFA={props.item.source} linkReDirect={props.item.weburl} />

          <div className="container_1">
            <div className="created_at">
              <span style={{ fontSize: "12px" }}>
                Created at : {props.item.createdDate.substring(0, 10)}
              </span>
            </div>
            <div
              className="view"
              onClick={() => props.onSearchItemInfoClick(props.item.id)}
            >
              <EyeFilled  /> 
            </div>
            <div
              className="like"
              onClick={() => {
                setIsLike(!islike);
              }}
            >
              {islike ? (
                <LikeFilled style={{ color: "blue" }} />
              ) : (
                <LikeOutlined />
              )}
            </div>
            <div className="more_menu">
              <MoreOutlined />
            </div>
          </div>
          <div className="content">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </div>

          {/* <SubContent className="sub_content" limit="350" >
            {props.item.content}
          </SubContent> */}
          
           <Paragraph
             className="text"
            ellipsis={
              ellipsis
                ? {
                  rows: 3,
                  expandable: false,
                  symbol: () => { },
                }
                : false
            }
          >
            {parse(props.item.content)}
          </Paragraph>
          {ellipsis ? (
            <Link
              onClick={toggleEllipsis}
              className="link"
            >
              <CaretRightOutlined />see more
            </Link>
          ) : (
            <Link
              onClick={toggleEllipsis}
              className="link"
            >
              <CaretRightOutlined />see less
            </Link>
          )}
           

          <div style={{ fontSize: "small", marginTop: "1em" }}>
            More document from same result
          </div>

          <br></br>
          <hr
            style={{
              width: "100%",
              height: "1px",
              borderWidth: "0",
              color: "gray",
              backgroundColor: "gray",
            }}
          ></hr>
          <br></br>
        </div>
      </>
    ) : (
      <Skeleton active></Skeleton>
    )
  );
}

export default SearchResultItem;
