import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Button, Collapse, Typography } from "antd";
import FilterPanel from "./FilterPanel";
import { useSelector } from "react-redux";

const { Text } = Typography;
const { Panel } = Collapse;

function CollapsibleFilter() {
  const filters = useSelector((state) => state.searchresults.filters);

  return (
    <div className="filters">
      <Collapse
        className="filters_container"
        defaultActiveKey={1}
        expandIconPosition={"right"}
      >
        <Panel
          header={
            <div className="filters_container_header">
              <FiFilter size={16} />
              <Text className="filters_container_header-text">Filters</Text>
            </div>
          }
          key="1"
        >
          <div>
            <Button type="primary" block>
              Apply Filter
            </Button>
            <Button type="default" block>
              Reset Filter
            </Button>
          </div>

          {filters.length > 0
            ? filters.map((filter) => {
                return (
                  <FilterPanel
                    header={filter.title}
                    array={filter.data}
                    key="1"
                  />
                );
              })
            : null}
        </Panel>

        <div className="filters_collapse_container">
          <div className="filters_collapse_container_iconContainer">
            <FiFilter className="filters_collapse_container_iconContainer-icon" size={16} />
          </div>
          <div className="filters_collapse_container_textContainer">
            <Text className="filters_collapse_container_textContainer-text">Filter</Text>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default CollapsibleFilter;
