import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { Collapse, Typography } from "antd";
import { searchData } from "../utility/sampleData";
import FilterPanel from "./FilterPanel";

const { Text } = Typography;
const { Panel } = Collapse;

function CollapsibleFilter() {
  const [source, setSource] = useState([]);
  const [role, setRole] = useState([]);
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState([]);

  const checkDuplicateArrValue = (compareVal, destinationArr) => {
    if (destinationArr.indexOf(compareVal) === -1) {
      destinationArr.push(compareVal);
    }
  };

  useEffect(() => {
    let sourceArray = [];
    let roleArray = [];
    let authorArray = [];

    searchData.forEach((element) => {
      if (element.source) {
        checkDuplicateArrValue(element.source, sourceArray);
      }

      if (element.departments) {
        element.departments.forEach((item) => {
          checkDuplicateArrValue(item, roleArray);
        });
      }

      if (element.author) {
        element.author.forEach((item) => {
          checkDuplicateArrValue(item, authorArray);
        });
      }
    });

    setSource(sourceArray);
    setRole(roleArray);
    setAuthor(authorArray);
  }, []);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
          <React.Fragment>
            {source.length > 0 ? (
              <FilterPanel header={"Source"} array={source} key="1" />
            ) : null}
            {role.length > 0 ? (
              <FilterPanel header={"Role"} array={role} key="2" />
            ) : null}
            {author.length > 0 ? (
              <FilterPanel header={"Author"} array={author} key="3" />
            ) : null}
          </React.Fragment>
        </Panel>
      </Collapse>
    </div>
  );
}

export default CollapsibleFilter;
