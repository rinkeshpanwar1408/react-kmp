import React from "react";
import { FiFilter } from "react-icons/fi";
import { Button, Collapse, Typography } from "antd";
import FilterPanel from "./FilterPanel";
import { useSelector } from "react-redux";

import { MenuUnfoldOutlined } from "@ant-design/icons";

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
      </Collapse>

      {/* <Button
        type="primary"
        style={{ marginBottom: 16 }}
      >
        {React.createElement(MenuUnfoldOutlined        )}
      </Button> */}
    </div>
  );
}

export default CollapsibleFilter;
