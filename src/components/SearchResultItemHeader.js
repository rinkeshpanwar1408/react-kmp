import React, { useState } from "react";
import { Typography, Modal } from "antd";
import { FiGrid } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import PdfViewerModal from "./PdfViewerModal";
const { Title, Text, Link } = Typography;

function SearchResultItemHeader(props) {
  const [enablePdfModal, setEnablePdfModal] = useState(false);
  const openPdfModal = () => {
    setEnablePdfModal(!enablePdfModal);
  };
  return (
    <div className={`search_result_header`}>
      {!props.isFromQuickLinks && (
        <div className="search_result_header_icons">
          <FiGrid
            fontSize={25}
            className="search_result_container_header_icons-confluence"
          />
          {/* <FiCommand /> */}
        </div>
      )}
      <Text className="search_result_header-title">{props.title}</Text>

      <Link className="search_result_header-pdf">
        <AiOutlineFilePdf onClick={openPdfModal} /> PDF
      </Link>
      {enablePdfModal ? (
        <Modal
          width={1000}
          className="search_result_header-pdf_modal"
          centered
          title={props.title}
          visible={enablePdfModal}
          // onOk={}
          onCancel={openPdfModal}
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
