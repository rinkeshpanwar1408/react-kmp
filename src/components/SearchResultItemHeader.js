import React from "react";
import { Typography } from "antd";
import { FiCommand, FiGrid } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";

const { Title, Text, Link } = Typography;

function SearchResultItemHeader(props) {
  return (
    <div className={`search_result_header ${props.isFromQuickLinks && 'quickLinks'}`}>
      {!props.isFromQuickLinks && <div className="search_result_header_icons">
        <FiGrid
          fontSize={25}
          className="search_result_container_header_icons-confluence"
        />
        {/* <FiCommand /> */}
      </div>}
      <Text className="search_result_header-title">{props.title}</Text>

      {!props.isFromQuickLinks && <Link className="search_result_header-pdf">
        <AiOutlineFilePdf /> PDF
      </Link>}
    </div>
  );
}

export default SearchResultItemHeader;
