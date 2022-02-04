import React, { useState } from "react";
import { Row, Col, Slider, Typography } from "antd";
import img from "../assests/image/image1.png";
import { MdShare, MdOutlineBookmarkAdd } from "react-icons/md";
import { BiSmile } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";

const { Text, Link, Title } = Typography;

function AnnouncementsItem(props) {
  const [popularTopics, setpopularTopics] = useState([]);
  const [isVisible, setisVisible] = useState(false);
  return (
    <div
      className="announcement_container"
      onMouseOver={() => setisVisible(true)}
      onMouseOut={() => setisVisible(false)}
    >
      <div
        className={`announcement_imagecontainer ${
          props.index % 2 == 0 ? "even" : "odd"
        }`}
      >
        <HiSpeakerphone size={50} />
      </div>
      <div className="announcement_textcontainer">
        <Text className="announcement_textcontainer-title">
          {props.item.title}
        </Text>
        <Text className="announcement_textcontainer-description">
          {props.item.body}
        </Text>
      </div>
      <div
        className={`announcement_actioncontainer ${isVisible ? "active" : ""}`}
      >
        <Link href="https://ant.design" target="_blank" className="announcement_actioncontainer-actionbtn">
          Volunteer
        </Link>
      </div>
    </div>
  );
}

export default AnnouncementsItem;
