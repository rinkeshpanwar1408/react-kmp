import React, { useState } from "react";
import { Collapse, Typography, Checkbox } from "antd";
const { Panel } = Collapse;
const { Text, Link } = Typography;

function FilterPanel({ header, array, key }) {
  return (
    <div className="filter">
      <Text className="filter-headertext">{header}</Text>
      <div className="filter_lists">
        {array.map((item) => {
          return (
            <div className="filter_lists_item">
              <Checkbox>{item}</Checkbox>
              {/* <Text className="filter_lists_item-count">{1}</Text> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterPanel;
