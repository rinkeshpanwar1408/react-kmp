import React, { useState } from "react";
import { Typography, Button } from "antd";
import img from "../assests/image/image1.png";
import { MdShare, MdOutlineBookmarkAdd } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";

const { Text } = Typography;

function PopularTopicItem(props) {
  const [isVisible, setisVisible] = useState(false);
  return (
    <div
      className="popular_topics_container"
      onMouseOver={() => setisVisible(true)}
      onMouseOut={() => setisVisible(false)}
    >
      <div className="popular_topics_imagecontainer">
        <img src={img} className="popular_topics_imagecontainer-image" alt="not-found" />
      </div>
      <div className="popular_topics_textcontainer">
        <Text className="popular_topics_textcontainer-title">
          {props.item.title}
        </Text>
        <Text className="popular_topics_textcontainer-description">
          {props.item.body}
        </Text>
        <div className="popular_topics_textcontainer-views">
          <MdRemoveRedEye size={18} />
          <Text className="popular_topics_textcontainer-views-text">{`125 Views`}</Text>
        </div>
      </div>
      <div
        className={`popular_topics_actioncontainer ${
          isVisible ? "active" : ""
        }`}
      >
        <div className="popular_topics_actioncontainer-icons">
          <MdShare
            size={20}
            className="recent_activity_article_item_footer_iconContainer-icon"
          />
          <MdOutlineBookmarkAdd
            size={20}
            className="recent_activity_article_item_footer_iconContainer-icon"
          />
        </div>
        <Button type="primary" shape="round">
          Read
        </Button>
      </div>
    </div>
  );
}

export default PopularTopicItem;
