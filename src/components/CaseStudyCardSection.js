import {React, useEffect} from "react";
import { Typography } from "antd";
import CaseStudyCard from "./CaseStudyCard";
import { useSelector } from "react-redux";


const { Link } = Typography;

function CaseStudyCardSection(props) {
  const caseStudydata = useSelector(
    (state) => state.searchresults.caseStudyDetail
  );

  //for hinding the sap second div box when is not available
  const OrganizationDetail = useSelector(
    (state) => state.searchresults.quickLinkDetail
  );
  const Tags = useSelector((state) => state.searchresults.tags);
  const TagsArray = Tags.length;
  let displayHide = '';
  if(TagsArray === 0){
    displayHide = 'none'
  }else{
    displayHide = 'block';
  }

  if (caseStudydata) {
    return (
      //If you want change the right side bottom box style is sticky
      <CaseStudyCard style={{position:"sticky",top:"11rem", display: `${displayHide}`}} title={caseStudydata.title} subtitle={"Other Case Studies"}>
        {caseStudydata.data.map((item, k) => {
          return <Link key={k} href={item.url} target="_blank" className="caseStudyResult-link">
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
