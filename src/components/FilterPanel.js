import React, { useState } from "react";
import { Collapse, Typography, Checkbox } from "antd";
const { Panel } = Collapse;
function FilterPanel({ header, array, key }) {
  //   const [active, setActive] = useState();
  return (
    <Collapse
      accordion
      className="collapsibleFilter_container_filters_source"
      expandIconPosition={"right"}
    >
      <Panel
        className="collapsibleFilter_container_filters_source_panel"
        header={header}
        key={key}
      >
        <Checkbox.Group
          className="collapsibleFilter_container_filters_source_checkbox"
          options={array}
          onChange={() => {
            // console.log(item);
          }}
        />
      </Panel>
    </Collapse>
  );
}

export default FilterPanel;
