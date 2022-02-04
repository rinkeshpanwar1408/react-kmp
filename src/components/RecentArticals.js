import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import TitleText from "./TitleText";
import { Layout, Menu, Row, Col, Card } from "antd";
import  Axios  from "../utility/axios";
import RecentActivityCard from "./RecentActivityCard";
const { Text, Link, Title } = Typography;

function RecentArticals(props) {
    const [recentArticals, setrecentArticals] = useState([]);
    
    useEffect(() => {
    const getdata = async () => {
      const response = await Axios.get("/posts");
      const data = response.data.slice(0, 3);
      setrecentArticals(data);
    };
    getdata();

     
  }, []);

  return (
   <React.Fragment>
      <TitleText title="Recent Articles"></TitleText>
      <Row gutter={[16, 16]}>
        {recentArticals.map((item, i) => {
          return (
            <Col lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }} key={i}>
              <RecentActivityCard item={item} />
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
}

export default RecentArticals;
