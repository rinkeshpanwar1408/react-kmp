import React from "react";
import parse from "html-react-parser";
import { Typography } from "antd";
import TechnologyTag from "./TechnologyTag";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyCardSection from "./CaseStudyCardSection";

const { Paragraph } = Typography;
function OrganizationDetailCard(props) {
  return (
    <React.Fragment>
      <CaseStudyCard title={props.item.clients[0]} isQuickLinks>
        <div className="search_result_body_contentcontainer">
          <Paragraph className="search_result_body_contentcontainer-text">
            {parse(props.item.clientDetails)}
          </Paragraph>
        </div>

        <div className="search_result_body_tagcontainer">
          {props.item.technology.map((technology) => {
            return (
              <TechnologyTag
                title={technology}
                id={props.item.id}
                onTechClick={props.onTechClick}
              />
            );
          })}
        </div>
      </CaseStudyCard>
      <CaseStudyCardSection />
    </React.Fragment>
  );
}

export default OrganizationDetailCard;
