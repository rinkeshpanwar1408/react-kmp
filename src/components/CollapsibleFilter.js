import React, { useState, useEffect } from "react";
import { MdFilterListAlt } from "react-icons/md";
import { Collapse, Typography, Checkbox, Modal, Button } from "antd";
import { searchData } from "../utility/sampleData";
import FilterPanel from "./FilterPanel";
// import PDFViewer from "pdf-viewer-reactjs";

import PdfViewerModal from "./PdfViewerModal";
const { Title, Text, Link } = Typography;
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const url = "http://isvhintp01:8001/pdf/FTS_CaseStudy_2.pdf/1";

function CollapsibleFilter() {
  const [source, setSource] = useState([]);
  const [role, setRole] = useState([]);
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    let sourceArray = [];
    let roleArray = [];
    let authorArray = [];
    searchData.map((item) => {
      if (item.source) sourceArray.push(item.source);
      if (item.departments.length > 0) {
        roleArray.push(...item.departments);
      }

      if (item.author.length > 0) {
        authorArray.push(...item.author);
      }
    });
    const flatRoleArray = [].concat(...roleArray);
    const flatAuthorArray = [].concat(...authorArray);

    setSource(
      sourceArray.filter((f, index) => {
        return sourceArray.indexOf(f) === index;
      })
    );
    setRole(
      flatRoleArray.filter((f, index) => {
        return flatRoleArray.indexOf(f) === index;
      })
    );
    setAuthor(
      flatAuthorArray.filter((f, index) => {
        return flatAuthorArray.indexOf(f) === index;
      })
    );
  }, []);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  // let uniqueChars = chars.filter((c, index) => {
  //   return chars.indexOf(c) === index;
  // });
  return (
    <div className="collapsibleFilter">
      <div className="collapsibleFilter_container ">
        <Collapse onChange={callback} expandIconPosition={"right"}>
          <Panel
            header={
              <div className="collapsibleFilter_container_panel">
                <MdFilterListAlt size={16} />
                <Text className="collapsibleFilter_container_panel-text">
                  Filters
                </Text>
              </div>
            }
            key="1"
          >
            <div className="collapsibleFilter_container_filters">
              {source.length > 0 ? (
                <FilterPanel header={"Source"} array={source} key="1" />
              ) : null}
              {role.length > 0 ? (
                <FilterPanel header={"Role"} array={role} key="2" />
              ) : null}
              {author.length > 0 ? (
                <FilterPanel header={"Author"} array={author} key="3" />
              ) : null}
            </div>
          </Panel>
        </Collapse>
      </div>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Open Pdf
      </Button>
      {open ? (
        <Modal
          width={1200}
          className="collapsibleFilter_modal"
          centered
          title="Basic Modal"
          visible={open}
          onOk={() => setOpen(!open)}
          onCancel={() => setOpen(!open)}
        >
          <PdfViewerModal />
        </Modal>
      ) : null}
    </div>
  );
}

export default CollapsibleFilter;
