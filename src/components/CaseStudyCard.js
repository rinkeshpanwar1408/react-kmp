import React from "react";
import RoundCornerCard from "./RoundCornerCard";
import { Typography } from "antd";
import { FiGrid } from "react-icons/fi";

const { Text } = Typography;
function CaseStudyCard(props) {
  return (
    <RoundCornerCard className="caseStudyResult">
      <div className="caseStudyResult_header">
        {!props.isQuickLinks && (
          <div className="caseStudyResult_header_icons">
            <FiGrid
              fontSize={25}
              className="caseStudyResult_header_icons-confluence"
            />
          </div>
        )}
        <div className="caseStudyResult_header_textContainer">
          <Text className="caseStudyResult_header_textContainer-title">
            {props.title}
          </Text>
          {props.subtitle && (
            <Text className="caseStudyResult_header_textContainer-subtitle">
              {props.subtitle}
            </Text>
          )}
        </div>
      </div>
      <div
        className={`caseStudyResult_body ${
          !props.isQuickLinks && "scrollable"
        }`}
      >
        {props.children}
      </div>
    </RoundCornerCard>
  );
}

export default CaseStudyCard;
