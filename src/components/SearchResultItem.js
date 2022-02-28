import React, { useState } from "react";
import SearchResultItemHeader from "./SearchResultItemHeader";
import parse from "html-react-parser";
import { Badge, Typography, Menu, Dropdown, Skeleton } from "antd";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import {
  BiDotsHorizontalRounded,
  BiInfoCircle,
  BiShare,
  BiUserPlus,
} from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import * as ActionCreator from "../store/action/actions";
import { useDispatch } from "react-redux";
import { DropDownMenuItem } from "./DropDownMenuItem";
import { StyledCard } from "../styled-components/CommonControls";

const { Paragraph, Link, Text } = Typography;
function SearchResultItem(props) {
  const dispatch = useDispatch();

  const onSearchResultItemClickHandler = (id) => {
    dispatch(ActionCreator.getQuickLinkDetails(id));
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
        icon={
          <BiInfoCircle
            size={20}
          />
        }
        onClick={() => props.onSearchItemInfoClick(props.item.id)}
      />
    </div>
  );

  const [ellipsis, setEllipsis] = useState(true);
  const likeCount = props.item.elasticDocumentRating
    ? props.item.elasticDocumentRating.thumbsUpCount
    : 0;
  const dislikeCount = props.item.elasticDocumentRating
    ? props.item.elasticDocumentRating.thumbsDownCount
    : 0;

  const toggleEllipsis = () => {
    setEllipsis(!ellipsis);
  };

  return ( props.item?
    <StyledCard
      className={`search_result ${props.active && "active"}`}
      onClick={() => onSearchResultItemClickHandler(props.item.id)}
    >
      <SearchResultItemHeader title={props.item.fileName} />

      <div className="search_result_body">
        <div
          className="search_result_body_othercontainer"
          style={{ marginBottom: "1rem" }}
        >
          <div className="search_result_body_othercontainer_department">
            <Text className="search_result_body_othercontainer_department-title">
              Department:
            </Text>
            <Text className="search_result_body_othercontainer_department-value">
              {props.item.departments.join(",")}
            </Text>
          </div>
          <div className="search_result_body_othercontainer_icons">
            <div className="search_result_body_othercontainer_icons_views">
              <BsEyeFill size={18} />
              <Text className="search_result_body_othercontainer_icons_views-count">
                12
              </Text>
            </div>

            <Badge
              showZero
              count={likeCount}
              className="search_result_body_othercontainer_icons-like"
            >
              <FiThumbsUp size={20} />
            </Badge>

            <Badge
              showZero
              count={dislikeCount}
              className="search_result_body_othercontainer_icons-dislike"
            >
              <FiThumbsDown size={20} />
            </Badge>


            <Dropdown
              overlay={ActionMenu}
              trigger={["click"]}
              placement="bottomCenter"
              overlayClassName="search_result_action_menu"
            >
              <BiDotsHorizontalRounded size={20} />
            </Dropdown>
          </div>
        </div>
        <div className="search_result_body_contentcontainer">
          <Paragraph
            className="search_result_body_contentcontainer-text"
            ellipsis={
              ellipsis
                ? {
                    rows: 3,
                    expandable: false,
                    symbol: () => {},
                  }
                : false
            }
          >
            {parse(props.item.content)}
          </Paragraph>
          {ellipsis ? (
            <Link
              onClick={toggleEllipsis}
              className="search_result_body_contentcontainer-link"
            >
              see more
            </Link>
          ) : (
            <Link
              onClick={toggleEllipsis}
              className="search_result_body_contentcontainer-link"
            >
              see less
            </Link>
          )}
        </div>
      </div>
    </StyledCard> : <Skeleton active></Skeleton>
  );
}

export default SearchResultItem;
