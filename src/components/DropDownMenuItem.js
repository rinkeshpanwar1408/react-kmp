import React from "react";

export const DropDownMenuItem = (props) => {
  return (
    <li key={props.key} className={!(props.title === "Logout") ?`DropDownMenuItem`: "DropDownMenuItem DropDownMenuItem-logout"} onClick={props.onClick}>
      {props.icon}
      <span className={!(props.title === "Logout") ?`DropDownMenuItem-title`: "DropDownMenuItem-title DropDownMenuItem-logout"}>{props.title}</span>
      
    </li>
  );
};
