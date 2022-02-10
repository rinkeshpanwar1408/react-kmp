import React, { useState } from "react";
import RoundCornerCard from "./RoundCornerCard";
import SearchResultItemHeader from "./SearchResultItemHeader";
import parse from "html-react-parser";
import { Badge, Typography } from "antd";
import { FiThumbsUp, FiThumbsDown, FiEye } from "react-icons/fi";
import { BsEyeFill } from "react-icons/bs";

const { Paragraph, Link, Text } = Typography;
function SearchResultItem(props) {
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

  return (
    <RoundCornerCard
      className="search_result"
      onClick={() => props.onSearchResultItemClick(props.item.id)}
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
    </RoundCornerCard>
  );
}

export default SearchResultItem;
