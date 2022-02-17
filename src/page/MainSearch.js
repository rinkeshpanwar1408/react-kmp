import React from "react";
import { Layout } from "antd";
import PopularTopics from "../components/PopularTopics";
import RecentArticals from "../components/RecentArticals";

function MainSearch(props) {
  return (
    <React.Fragment>
      <RecentArticals  />
      <PopularTopics />
    </React.Fragment>
  );
}

export default MainSearch;
