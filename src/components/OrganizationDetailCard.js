import React from "react";
import RoundCornerCard from "./RoundCornerCard";
import SearchResultItemHeader from "./SearchResultItemHeader";
import parse from "html-react-parser";
import { Typography } from "antd";

const { Paragraph } = Typography;
function OrganizationDetailCard(props) {
  return (
    <RoundCornerCard className="search_result">
      <SearchResultItemHeader title={props.item.clients[0]} isFromQuickLinks />

      <div className="search_result_body">
        <div className="search_result_body_contentcontainer">
          <Paragraph className="search_result_body_contentcontainer-text">
            {parse(props.item.clientDetails)}
          </Paragraph>
        </div>
      </div>
    </RoundCornerCard>
  );
}

export default OrganizationDetailCard;
