import React from "react";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import * as ActionCreator from "../store/action/actions";
const { Link } = Typography;

function TechnologyTag(props) {
  const dispatch = useDispatch();

  const onTagClickHandler = (techName) => {
    dispatch(ActionCreator.getCaseStudyDetails(techName));
  };

  return (
    <Link
      className={`tag-text ${props.item.active && "active"} ${props.item.disable && "disable"} `}
      onClick={() => onTagClickHandler(props.item.title)}
      disabled={props.item.disable}
    >
      {props.item.title}
    </Link>
  );
}

export default TechnologyTag;
