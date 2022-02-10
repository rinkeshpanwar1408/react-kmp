import React from "react";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import * as ActionCreator from "../store/action/actions";
const { Title } = Typography;

function TechnologyTag(props) {
  const dispatch = useDispatch();
  const onTagClickHandler = (techName) => {
    dispatch(ActionCreator.getCaseStudyDetails(techName))
  };

  return (
    <Title
      level={4}
      className="tag-text"
      onClick={() => onTagClickHandler(props.title)}
    >
      {props.title}
    </Title>
  );
}

export default TechnologyTag;
