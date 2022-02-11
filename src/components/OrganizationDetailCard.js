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

  const Tags = useSelector((state) => state.searchresults.tags);

  return (
    <React.Fragment>
      <CaseStudyCard title={OrganizationDetail.clients[0]} isQuickLinks>
        <div className="caseStudyResult_body_contentcontainer">
          <Paragraph className="caseStudyResult_body_contentcontainer-text">
            {parse(OrganizationDetail.clientDetails)}
          </Paragraph>
        </div>
        {Tags && (
          <div className="caseStudyResult_body_tagcontainer">
            {Tags.map((technology) => {
              return <TechnologyTag item={technology} />;
            })}
          </div>
        )}
      </CaseStudyCard>
      <CaseStudyCardSection />
    </React.Fragment>
  );
}

export default OrganizationDetailCard;
