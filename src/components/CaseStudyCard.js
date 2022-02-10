import React, { useState } from "react";
import RoundCornerCard from "./RoundCornerCard";
import { Typography } from "antd";
import { FiGrid } from "react-icons/fi";

const { Text } = Typography;
function CaseStudyCard(props) {
  return (
    <RoundCornerCard className="search_result">
      <div className="search_result_header quickLinks">
        {!props.isQuickLinks && <div className="search_result_header_icons">
          <FiGrid
            fontSize={25}
            className="search_result_container_header_icons-confluence"
          />
        </div>}
        <Text className="search_result_header-title">{props.title}</Text>
      </div>
      <div className="search_result_body">{props.children}</div>
    </RoundCornerCard>
  );
}

export default CaseStudyCard;
