import React, { useEffect, useState } from "react";
import {
  Typography,
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Input,
  Dropdown,
  Space,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./scss/main.css";

import Axios from "./utility/axios";
import RecentActivityCard from "./components/RecentActivityCard";
import TitleText from "./components/TitleText";
import RecentArticals from "./components/RecentArticals";
import PopularTopics from "./components/PopularTopics";
import { FaSlackHash } from "react-icons/fa";
import { FiHome, FiClock, FiTrash } from "react-icons/fi";
import { MdOutlineKeyboardVoice, MdSearch } from "react-icons/md";

import background from "./assests/image/Image2.png";
import SearchListItem from "./components/SearchListItem";
import RoundCornerCard from "./components/RoundCornerCard";

const { Sider, Footer, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  const [collapsed, setcollapsed] = useState(false);
  const [name, setname] = useState("GM");
  const [albums, setAlbums] = useState([]);
  const [visibleRecentSearch, setvisibleRecentSearch] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      const response = await Axios.get("/albums");
      const albumsData = response.data.slice(0, 10);
      setAlbums(albumsData);
    };
    getdata();
  }, []);

  const menu = (
    <Menu
      className="mainheader_container_navbar_menuContainer_items-item"
      key="menu-1"
    >
      <Space direction="horizontal" align="start">
        <div key="sub-1">
          <Menu.Item key="0">
            <Text className="mainheader_container_navbar_menuContainer_items-title">
              Financial Relief Programs
            </Text>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">
              <Text className="mainheader_container_navbar_menuContainer_items-link">
                CARE
              </Text>
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="#">
              <Text className="mainheader_container_navbar_menuContainer_items-link">
                International IRFP
              </Text>
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="#">
              <Text className="mainheader_container_navbar_menuContainer_items-link">
                US Hardship
              </Text>
            </a>
          </Menu.Item>
          <Menu.Item key="4">
            <a
              href="#"
              className="mainheader_container_navbar_menuContainer_items-viewall"
            >
              View All
            </a>
          </Menu.Item>
        </div>
        <div key="sub-2">
          <Menu.Item
            key="5"
            className="mainheader_container_navbar_menuContainer_items-title"
          >
            <Text>Payment Options</Text>
          </Menu.Item>

          <Menu.Item key="6">
            <a href="#">
              <Text className="mainheader_container_navbar_menuContainer_items-link">
                Pay Over Time
              </Text>
            </a>
          </Menu.Item>
          <Menu.Item key="7">
            <a href="#">
              <Text className="mainheader_container_navbar_menuContainer_items-link">
                Pay In Installments
              </Text>
            </a>
          </Menu.Item>
          <Menu.Item key="8">
            <a
              href="#"
              className="mainheader_container_navbar_menuContainer_items-viewall"
            >
              View All
            </a>
          </Menu.Item>
        </div>
        <div key="sub-3">
          <Menu.Item key="9">
            <Text className="mainheader_container_navbar_menuContainer_items-title">
              Personal Loans
            </Text>
          </Menu.Item>
        </div>
      </Space>
    </Menu>
  );

  const menu2 = (
    <Menu
      className="mainheader_container_navbar_menuContainer_items-item"
      key="menu-2"
    >
      <Menu.Item key="10">
        <a href="#">
          <Text>Triumph Transaction Codes</Text>
        </a>
      </Menu.Item>
      <Menu.Item key="11">
        <a href="#">
          <Text>Triumph Transaction Categories</Text>
        </a>
      </Menu.Item>
      <Menu.Item key="12">
        <a
          href="#"
          className="mainheader_container_navbar_menuContainer_items-viewall"
        >
          View All
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="main-container">
      <Content
        className="mainheader"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="mainheader_container">
          <div className="mainheader_container_navbar">
            <div className="mainheader_container_navbar_brandContainer">
              <FaSlackHash size={40} color="#f15a24" />
              <div className="mainheader_container_navbar_brandContainer-divider"></div>
              <Title
                level={5}
                className="mainheader_container_navbar_brandContainer-title"
              >
                {String("SYNAPSE").toUpperCase()}
              </Title>
            </div>
            <div className="mainheader_container_navbar_menuContainer">
              <Dropdown
                overlayClassName="mainheader_container_navbar_menuContainer_items"
                overlay={menu}
                placement="bottomLeft"
              >
                <div className="mainheader_container_navbar_menuContainer_menu">
                  <Text className="mainheader_container_navbar_menuContainer_menu-title">
                    Prouduct Journeys
                  </Text>
                  <DownOutlined />
                </div>
              </Dropdown>

              <Dropdown
                overlayClassName="mainheader_container_navbar_menuContainer_items"
                overlay={menu2}
                placement="bottomLeft"
              >
                <div className="mainheader_container_navbar_menuContainer_menu">
                  <Text className="mainheader_container_navbar_menuContainer_menu-title">
                    Transactionary
                  </Text>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div>
            <div className="mainheader_container_navbar_userContainer">
              <FiHome size={20} color="#fff" />
              <div className="mainheader_container_navbar_userContainer-user">
                {name}
              </div>
            </div>
          </div>
          <div className="mainheader_container-icon">
            <FaSlackHash size={80} color="#f15a24" />
          </div>
          <div className="mainheader_container_title">
            <Title className="mainheader_container_title-text">
              Hi, how can we help you?
            </Title>
          </div>
          <div className="mainheader_container_searchcontainer">
            <div className="mainheader_container_searchcontainer_inputBox">
              <Input
                placeholder="Search here..."
                className="mainheader_container_searchcontainer_inputBox-input"
                onFocus={() => setvisibleRecentSearch(true)}
                onBlur={() => setvisibleRecentSearch(false)}
              />

              <div className="mainheader_container_searchcontainer_actionBox">
                <MdOutlineKeyboardVoice size={18} />
                <div className="mainheader_container_searchcontainer_actionBox-search">
                  <MdSearch size={20} />
                </div>
              </div>

              {visibleRecentSearch && (
                <RoundCornerCard className="mainheader_searchlist_container">
                  {albums.map((item, i) => {
                    return <SearchListItem item={item} key={i} />;
                  })}
                </RoundCornerCard>
              )}
            </div>
          </div>
        </div>
      </Content>
      <Content className="site-layout-background">
        <RecentArticals />
        <PopularTopics />
      </Content>
      <Footer className="footer">©2022 Created by Infosys</Footer>
    </div>
  );
}

export default App;
