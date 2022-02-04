import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import TitleText from "./TitleText";
import { Layout, Menu, Row, Col, Card } from "antd";
import Axios from "../utility/axios";
import RecentActivityCard from "./RecentActivityCard";
import PopularTopicItem from "./PopularTopicItem";
import AnnouncementsItem from "./AnnouncementsItem";
import RoundCornerCard from "./RoundCornerCard";

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
        <Col lg={{ span: 14 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <TitleText title="Popular Topics"></TitleText>
          <RoundCornerCard className="popular_topics-card">
            {popularTopics.map((item, i) => {
              return <PopularTopicItem item={item} key={i}/>;
            })}
          </RoundCornerCard>
        </Col>

        <Col lg={{ span: 10 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <TitleText title="Announcements" />
          <RoundCornerCard className="popular_topics-card">
            {announcements.map((item, i) => {
              return <AnnouncementsItem item={item} index={i}  key={i}/>;
            })}
          </RoundCornerCard>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default PopularTopics;
