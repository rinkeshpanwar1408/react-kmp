import React from "react";
import parse from "html-react-parser";
import { Typography } from "antd";
import TechnologyTag from "./TechnologyTag";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyCardSection from "./CaseStudyCardSection";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;
function OrganizationDetailCard(props) {

  const OrganizationDetail = useSelector(
    (state) => state.searchresults.quickLinkDetail
  );

  return (
    <React.Fragment>
      <CaseStudyCard title={OrganizationDetail.clients[0]} isQuickLinks>
        <div className="search_result_body_contentcontainer">
          <Paragraph className="search_result_body_contentcontainer-text">
            {parse(OrganizationDetail.clientDetails)}
          </Paragraph>
        </div>

        <div className="search_result_body_tagcontainer">
          {OrganizationDetail.technology.map((technology) => {
            return (
              <TechnologyTag
                title={technology}
                id={OrganizationDetail.id}
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
