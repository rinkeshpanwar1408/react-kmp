import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Modal, Space, Button, Collapse, Typography } from "antd";
import FilterPanel from "./FilterPanel";
import { useSelector, useDispatch } from "react-redux";
import * as ActionCreator from "../store/action/actions";

const { Text } = Typography;
const { Panel } = Collapse;

function CollapsibleFilter() {
  const filters = useSelector((state) => state.searchresults.filters);
  const Dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState({
    authorFilter: [],
    sourceFilter: [],
    departmentFilter: [],
  });


  const onChangeFilterHandler = (header, item, e) => {
    const result = { ...selectedFilters };
    switch (header) {
      case "Author":
        let newAuthorFilter = [];
        if (e.target.checked === true) {
          newAuthorFilter = result.authorFilter.concat(item);
        } else {
          newAuthorFilter = result.authorFilter.filter((val) => val !== item);
        }
        result.authorFilter = newAuthorFilter;
        break;
      case "Role":
        let newRoleFilter = [];
        if (e.target.checked === true) {
          newRoleFilter = result.departmentFilter.concat(item);
        } else {
          newRoleFilter = result.departmentFilter.filter((val) => val !== item);
        }
        result.departmentFilter = newRoleFilter;
        break;
      case "Source":
        let newSourceFilter = [];
        if (e.target.checked === true) {
          newSourceFilter = result.sourceFilter.concat(item);
        } else {
          newSourceFilter = result.sourceFilter.filter((val) => val !== item);
        }
        result.sourceFilter = newSourceFilter;
        break;
      default:
        break;
    }
    setSelectedFilters(result);
    // console.log(result);
  };
  const allClearFilterHandler = () => {
    console.log('all clear');
    setSelectedFilters({authorFilter: [], sourceFilter: [], departmentFilter: []});
  }
  const filterDataClick = () => {
    if((selectedFilters.authorFilter.length || selectedFilters.sourceFilter.length || selectedFilters.departmentFilter.length) === 0){
      warning();
    }else{
      const filterSearchValue = localStorage.getItem("filter_search");
      Dispatch(ActionCreator.getSearchedData(filterSearchValue,1,selectedFilters));
      setTimeout(() => {
        console.log("ok filter is apply----- " + filterSearchValue);
      }, 2000);
    }
  };
  function warning() {
    Modal.warning({
      title: "This is a warning message",
      content: "You not select any check box, at one select for filter...!",
    });
  }

  return (
    <div className="filters" >
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
            <Button
              type="primary"
              block
              className="m-b-5"
              onClick={filterDataClick}
            >
              Apply Filter
            </Button>
            <Button type="default" block className="m-b-5" onClick={allClearFilterHandler}>
              Reset Filter
            </Button>
          </div>

          {filters.length > 0
            ? filters.map((filter, keyID) => {
                return (
                  <FilterPanel
                    onChange={onChangeFilterHandler}
                    header={filter.title}
                    array={filter.data}
                    key={keyID}
                  />
                );
              })
            : null}
        </Panel>

        <div className="filters_collapse_container">
          <div className="filters_collapse_container_iconContainer">
            <FiFilter
              className="filters_collapse_container_iconContainer-icon"
              size={16}
            />
          </div>
          <div className="filters_collapse_container_textContainer">
            <Text className="filters_collapse_container_textContainer-text">
              Filter
            </Text>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default CollapsibleFilter;
