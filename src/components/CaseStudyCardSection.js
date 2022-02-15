import React from "react";
import { Typography } from "antd";
import CaseStudyCard from "./CaseStudyCard";
import { useSelector } from "react-redux";

const { Link } = Typography;

function CaseStudyCardSection(props) {
  const caseStudydata = useSelector(
    (state) => state.searchresults.caseStudyDetail
  );

  if (caseStudydata) {
    return (
      <CaseStudyCard title={caseStudydata.title} subtitle={"Other Case Studies"}>
        {caseStudydata.data.map((item) => {
          return <Link href={item.url} target="_blank" className="caseStudyResult-link">
            {item.name}
          </Link>;
        })}
      </CaseStudyCard>
    );
  } else {
    return null;
  }
}

export default CaseStudyCardSection;
