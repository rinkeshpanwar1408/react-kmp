import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import TitleText from "./TitleText";
import { Layout, Menu, Row, Col, Card } from "antd";
import { instance as Axios } from "../utility/axios";
import RecentActivityCard from "./RecentActivityCard";
import PopularTopicItem from "./PopularTopicItem";
import AnnouncementsItem from "./AnnouncementsItem";
import SimpleBar from 'simplebar-react';
import { StyledCard } from "../styled-components/CommonControls";
import CustomCol from "./CustomCol";

const { Text, Link, Title } = Typography;

function PopularTopics(props) {
  const [popularTopics, setpopularTopics] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      const response = await Axios.get("/posts");
      const popularTopicsData = response.data.slice(0, 3);
      const announcementsData = response.data.slice(0, 5);
      setpopularTopics(popularTopicsData);
      setAnnouncements(announcementsData);
    };
    getdata();
  }, []);

  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        <CustomCol xl={14} lg={14}>
          <TitleText title="Popular Topics"></TitleText>
          <StyledCard className="popular_topics-card">
            {popularTopics.map((item, i) => {
              return <PopularTopicItem item={item} key={i} />;
            })}
          </StyledCard>
        </CustomCol>


        <CustomCol xl={10} lg={10}>
          <TitleText title="Announcements" />
          <StyledCard className="popular_topics-card">
            {announcements.map((item, i) => {
              return <AnnouncementsItem item={item} index={i} key={i} />;
            })}
          </StyledCard>
        </CustomCol>
      </Row>
    </React.Fragment>
  );
}

export default PopularTopics;
