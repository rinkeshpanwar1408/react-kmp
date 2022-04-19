import React from "react";
import { Typography, Checkbox } from "antd";
const { Text } = Typography;

function FilterPanel({ header, array, onChange }) {
  
  return (
    <div className="filter">
      <Text className="filter-headertext">{header}</Text>
      <div className="filter_lists">
        {array.map((item, keyUni) => {
          return (
            <div key={keyUni} className="filter_lists_item"> 
              <Checkbox 
              onChange={(e)=>onChange(header, item, e)}
              >{item}</Checkbox>
              {/* <Checkbox onChange={checkedNot} onClick={(e)=>chageData(header, item, e)}>{item}</Checkbox> */}
              {/* <Text className="filter_lists_item-count">{1}</Text> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterPanel;
