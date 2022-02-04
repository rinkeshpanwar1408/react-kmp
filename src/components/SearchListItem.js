import React from "react";
import { Typography } from "antd";
import { FiClock, FiTrash } from "react-icons/fi";

const { Text } = Typography;

function SearchListItem(props) {
  return (
    <div className="mainheader_searchlist_container_item">
      <FiClock className="mainheader_searchlist_container_item-clock" />
      <Text className="mainheader_searchlist_container_item-title">
        {props.item.title}
      </Text>
      <FiTrash className="mainheader_searchlist_container_item-trash" />
    </div>
  );
}

export default SearchListItem;
