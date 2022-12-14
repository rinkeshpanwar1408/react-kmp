import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export const DropDownMenuItem = (props) => {
  return (
    <li key={props.key} className={`DropDownMenuItem ${props.DropDownMenuItem}`} onClick={props.onClick}>
      {props.icon}
      <Text className="DropDownMenuItem-title">{props.title}</Text>
    </li>
  );
};
