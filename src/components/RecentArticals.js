import React, { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import TitleText from "./TitleText";
import { Layout, Menu, Row, Col, Card } from "antd";
import { instance as Axios } from "../utility/axios";
import RecentActivityCard from "./RecentActivityCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { FiChevronLeft } from "react-icons/fi";
const { Text, Link, Title } = Typography;

function RecentArticals(props) {
  const [recentArticals, setrecentArticals] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const response = await Axios.get("/posts");
      const data = response.data.slice(0, 7);
      setrecentArticals(data);
    };
    getdata();
  }, []);

  

  return (
    <React.Fragment>
      <TitleText title="Recent Articles"></TitleText>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        // pagination={{
        //   dynamicBullets: true,
        // }}
      >
        {recentArticals.map((item, i) => {
          return (
            <SwiperSlide>
              <RecentActivityCard item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* <Row gutter={[16, 16]}>
        {recentArticals.map((item, i) => {
          return (
            <Col lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }} key={i}>
              <RecentActivityCard item={item} />
            </Col>
          );
        })}
      </Row> */}
    </React.Fragment>
  );
}

export default RecentArticals;
