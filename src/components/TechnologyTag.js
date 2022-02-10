import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

function TechnologyTag(props) {
  return (
    <Title
      level={4}
      className="tag-text"
      onClick={() => props.onTechClick(props.id, props.title)}
    >
      {props.title}
    </Title>
  );
}

export default TechnologyTag;
