import React from "react";
import { Card } from "antd";

function RoundCornerCard(props) {
  return (
    <Card title={props.title} level={4} className={`roundcornerCard ${props.className}`}>
      {props.children}
    </Card>
  );
}

export default RoundCornerCard;
