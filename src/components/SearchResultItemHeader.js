import React, { useState } from "react";
import { Typography, Modal, Button } from "antd";
import { FiGrid } from "react-icons/fi";
import { FaConfluence } from "react-icons/fa";
import { AiOutlineFilePdf } from "react-icons/ai";
import PdfViewerModal from "./PdfViewerModal";
const { Title, Text, Link } = Typography;

function SearchResultItemHeader(props) {
  const ext = props.title.split(".").pop();

  const [enablePdfModal, setEnablePdfModal] = useState(false);
  const togglePdfModal = () => {
    setEnablePdfModal(!enablePdfModal);
  };
  return (
    <div className={`search_result_header`}>
      {!props.isFromQuickLinks && (
        <div className="search_result_header_icons">
          {props.iconFA === "Confluence" ? (
            <FaConfluence
              fontSize={16}
              className="search_result_header_icons-confluence"
            />
          ) : (
            <FiGrid
              fontSize={25}
              className="search_result_header_icons-confluence"
            />
          )}
          {/* <FiCommand /> */}
        </div>
      )}
      <Link
        style={{
          fontSize: "18px",
          lineHeight: "28px",
          lineClamp: "none",
          fontWeight: "600",
          marginLeft: "3px",
        }}
        className="search_result_header-title"
        href={props.linkReDirect}
        target="_blank"
      >
        {props.title}
      </Link>
      {/* <Text className="search_result_header-title">
        {props.title}
      </Text> */}

      {ext === "pdf" && (
        <Link className="search_result_header-pdf" onClick={togglePdfModal}>
          <AiOutlineFilePdf /> PDF
        </Link>
      )}
      {enablePdfModal ? (
        <Modal
          footer={<Button onClick={togglePdfModal}>Close</Button>}
          width={"70%"}
          className="search_result_header_pdfModal"
          centered
          title={props.title}
          visible={enablePdfModal}
          onCancel={togglePdfModal}
        >
          <PdfViewerModal
            url={"http://isvhintp01:8001/pdf/FTS_CaseStudy_2.pdf/1"}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default SearchResultItemHeader;
