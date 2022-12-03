import React, { useState } from "react";
import { Typography, Checkbox, Tag } from "antd";
import FilterChip from "./FilterChip";
const { Text } = Typography;

function FilterPanel({ header, array, onChange }) {
  return (
    <div className="filter">
      <Text className="filter-headertext">{header}</Text>
      <div className="filter_lists">
        {array.map((item, keyUni) => {
          let id = Math.random().toString();
         
          return (
           <FilterChip id={id} item={item} onChange={onChange} header={header} />
          
          );
        })}
      </div>
    </div>
  );
}

export default FilterPanel;
