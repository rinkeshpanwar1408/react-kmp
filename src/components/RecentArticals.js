import React, { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import TitleText from "./TitleText";
import { Layout, Menu, Row, Col, Card } from "antd";
import { instance as Axios } from "../utility/axios";
import RecentActivityCard from "./RecentActivityCard";
import { FiChevronLeft } from "react-icons/fi";
import Slider from "react-slick";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

const { Text, Link, Title } = Typography;

function RecentArticals(props) {
  const [recentArticals, setrecentArticals] = useState([]);
  const slider1 = useRef();
  const [nav1, setNav1] = useState();


  useEffect(() => {
    const getdata = async () => {
      const response = await Axios.get("/posts");
      const data = response.data.slice(0, 7);
      setrecentArticals(data);
    };
    getdata();
  }, []);

  const next = () => {
    nav1.slickNext();
  };
  const previous = () => {
    nav1.slickPrev();
  };

  return (
    <React.Fragment>
      <div className="slider_container">
        <TitleText title="Recent Articles"></TitleText>
        <div className="slider_container-actions"> 
          <AiOutlineLeftCircle size={25} onClick={previous} />
          <AiOutlineRightCircle size={25} onClick={next} />
        </div>
      </div>

      <Slider
        infinite={false}
        arrows={false}
        speed={500}
        slidesToShow={3}
        slidesToScroll={3}
        ref={(slider1) => setNav1(slider1)}
      >
        {recentArticals.map((item, i) => {
          return <RecentActivityCard item={item} key={i} />;
        })}
      </Slider>

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
