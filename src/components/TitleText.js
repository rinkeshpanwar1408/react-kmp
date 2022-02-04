import React from "react";
import { Typography } from "antd";
const { Text, Link, Title } = Typography;

function TitleText(props) {
  return (
    <Title level={4} className="title-text">
      {props.title}
    </Title>
  );
}

export default  TitleText
;
