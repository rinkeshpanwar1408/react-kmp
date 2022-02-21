import React, { useEffect, useState } from "react";
import { Row, Col, Slider, Typography, Space, Card, Image } from "antd";
import img from "../assests/image/image1.png";
import { Avatar, Divider, Tooltip } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { MdShare, MdOutlineBookmarkAdd } from "react-icons/md";
import { BiSmile } from "react-icons/bi";
import { StyledCard } from "../styled-components/CommonControls";

const { Text, Title } = Typography;

function RecentActivityCard(props) {
  return (
    <StyledCard className="recent_activity_article_item"  >
      <div className="recent_activity_article_item_detail">
        <div className="recent_activity_article_item_detail-container">
          <Title
            level={5}
            ellipsis={{ rows: 1 }}
            className="recent_activity_article_item_detail-title"
          >
            {props.item.title}
          </Title>
          <Title
            level={5}
            ellipsis={{ rows: 2 }}
            className="recent_activity_article_item_detail-description"
          >
            {props.item.body}
          </Title>
        </div>
        <div className="recent_activity_article_item_detail-icon">
          <div className="recent_activity_article_item_detail-iconbox">
            <img src={img} width={"70%"} />
          </div>
        </div>
      </div>

      <div className="recent_activity_article_item-members">
        <Avatar.Group>
          <Avatar style={{ backgroundColor: "#f56a00" }}>I</Avatar>
          <Avatar style={{ backgroundColor: "#87d068" }}>N</Avatar>
          <Avatar style={{ backgroundColor: "#1890ff" }}>F</Avatar>
          <Avatar style={{ backgroundColor: "#f56a00" }}>Y</Avatar>
        </Avatar.Group>
      </div>

      <div className="recent_activity_article_item_footer">
        <div className="recent_activity_article_item_footer_readerContainer">
          <div className="recent_activity_article_item_footer_readerContainer_customer">
            <BiSmile size={20} />
            <Text
              strong
              className="recent_activity_article_item_footer_readerContainer_customer-text"
            >
              20 Happy readers
            </Text>
          </div>
        </div>
        <div className="recent_activity_article_item_footer_iconContainer">
          <MdShare
            size={20}
            className="recent_activity_article_item_footer_iconContainer-icon"
          />
          <MdOutlineBookmarkAdd
            size={20}
            className="recent_activity_article_item_footer_iconContainer-icon"
          />
        </div>
      </div>
    </StyledCard>
  );
}

export default RecentActivityCard;
