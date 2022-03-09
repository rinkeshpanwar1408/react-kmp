import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Layout,
  Menu,
  Input,
  Dropdown,
  Space,
  Image,
  Divider,
} from "antd";
import background_dark from "../assests/image/header_bg_dark.jpg";
import background_light from "../assests/image/header_bg_light.png";
import infy from "../assests/image/InfosysLogo.png";
import { DownOutlined } from "@ant-design/icons";
import {
  FiBox,
  FiCodesandbox,
  FiEdit,
  FiHome,
  FiLogOut,
  FiMaximize,
  FiMinimize,
  FiMoon,
  FiPlusCircle,
  FiSettings,
  FiSun,
} from "react-icons/fi";
import { MdOutlineKeyboardVoice, MdSearch } from "react-icons/md";
import SearchListItem from "../components/SearchListItem";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { instanceApi as Api } from "../utility/axios";
import SimpleBar from "simplebar-react";
import { FiMenu, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as ActionCreator from "../store/action/actions";
import * as AuthActionCreator from "../store/action/AuthActions";
import { DropDownMenuItem } from "./DropDownMenuItem";
import * as Actions from "../store/action/index";
import { DarkBlueTheme, LightBlueTheme } from "../model/Theme";
import { StyledCard } from "../styled-components/CommonControls";
import * as RouteUrl from "../model/route";
import { AutoLogin } from "../store/action/AuthActions";

const { Content } = Layout;
const { Title, Text } = Typography;

const menu = (
  <Menu
    className="mainheader_container_navbar_userContainer_menus_items-item"
    key="menu-1"
  >
    <Space direction="horizontal" align="start">
      <div key="sub-1">
        <Menu.Item key="0">
          <Text className="mainheader_container_navbar_userContainer_menus_items-title">
            Financial Relief Programs
          </Text>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="#">
            <Text className="mainheader_container_navbar_userContainer_menus_items-link">
              CARE
            </Text>
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="#">
            <Text className="mainheader_container_navbar_userContainer_menus_items-link">
              International IRFP
            </Text>
          </a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="#">
            <Text className="mainheader_container_navbar_userContainer_menus_items-link">
              US Hardship
            </Text>
          </a>
        </Menu.Item>
        <Menu.Item key="4">
          <a
            href="#"
            className="mainheader_container_navbar_userContainer_menus_items-viewall"
          >
            View All
          </a>
        </Menu.Item>
      </div>
      <div key="sub-2">
        <Menu.Item
          key="5"
          className="mainheader_container_navbar_userContainer_menus_items-title"
        >
          <Text>Payment Options</Text>
        </Menu.Item>

        <Menu.Item key="6">
          <a href="#">
            <Text className="mainheader_container_navbar_userContainer_menus_items-link">
              Pay Over Time
            </Text>
          </a>
        </Menu.Item>
        <Menu.Item key="7">
          <a href="#">
            <Text className="mainheader_container_navbar_userContainer_menus_items-link">
              Pay In Installments
            </Text>
          </a>
        </Menu.Item>
        <Menu.Item key="8">
          <a
            href="#"
            className="mainheader_container_navbar_userContainer_menus_items-viewall"
          >
            View All
          </a>
        </Menu.Item>
      </div>
      <div key="sub-3">
        <Menu.Item key="9">
          <Text className="mainheader_container_navbar_userContainer_menus_items-title">
            Personal Loans
          </Text>
        </Menu.Item>
      </div>
    </Space>
  </Menu>
);

const menu2 = (
  <Menu
    className="mainheader_container_navbar_userContainer_menus_items-item"
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
        className="mainheader_container_navbar_userContainer_menus_items-viewall"
      >
        View All
      </a>
    </Menu.Item>
  </Menu>
);

function MainHeader(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const Dispatch = useDispatch();


  const currentTheme = useSelector((state) => state.theme.Theme);
  const { userName } = useSelector((state) => state.auth.UserDetail);


  const [isFullScreen, setIsFullscreen] = useState(false);

  const [visibleSuggestion, setvisibleSuggestion] = useState(false);
  const [suggessionsList, setSuggessionsList] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  let headerClass = "";
  if (location.pathname === `${match.url}/${RouteUrl.MAINSEARCH}`) {
    headerClass = "expanded-header"
  }


  const onSearchClickHandler = () => {
    setvisibleSuggestion(false)
    Dispatch(ActionCreator.getSearchedData(searchWord));
  };

  useEffect(() => {
    let timer;
    try {
      timer = setTimeout(() => {
        getdata();
      }, 500);

      const getdata = async () => {
        if (searchWord) {
          const result = await Api.get(`/suggest/${searchWord}`);
          setSuggessionsList(result.data);
        }
      };

      return () => {
        clearTimeout(timer);
      };
    } catch (error) {
      console.log(error);
    }
  }, [searchWord]);

  useEffect(() => {
    if (!userName) {
      if (localStorage.getItem("userDetail")) {
        Dispatch(AuthActionCreator.AutoLogin(localStorage.getItem("userDetail")));
      }
      else {
        history.push(RouteUrl.LOGIN)
      }
    }
  }, [userName, history])


  const onSearchTextChangeHandler = (event) => {
    setSearchWord(event.target.value);
  };

  const onSuggestionItemClickHandler = (text) => {
    setSearchWord(text);
    setvisibleSuggestion(false);
  };

  const onFullScreenHandler = useCallback(async () => {
    if (isFullScreen) {
      await document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullScreen);
  }, [isFullScreen])


  useEffect(() => {
    // subscribe event
    document.addEventListener("fullscreenchange", (e) => {
      if (document.fullscreenElement && !isFullScreen) {
        onFullScreenHandler(isFullScreen)
      }
    })
    return () => {
      // unsubscribe event
      document.removeEventListener("fullscreenchange", onFullScreenHandler);
    };
  }, [isFullScreen, onFullScreenHandler]);



  return (
    <Content
      className={`mainheader ${headerClass}`}
      style={{ backgroundImage: `url(${currentTheme.themestyle === "dark" ? background_dark : background_light})` }}
    >
      <div className="mainheader_container">
        <div className="mainheader_container_navbar">


          <div className="mainheader_container_navbar_brandContainer">
            <Dropdown overlay={<WorkSpaceMenu />} placement="bottomRight" arrow>
              <div className="WorkSpaceContainer">WS</div>
            </Dropdown>

            <div
              style={{
                width: "8rem",
                display: "flex",
                alignItems: "center",
                margin: "0 1rem"
              }}
            >
              <Image src={infy} preview={false} />
            </div>

            <div className="mainheader_container_navbar_brandContainer-divider"></div>
            <div>
              <Title
                level={5}
                className="mainheader_container_navbar_brandContainer-title"
              >
                Text Analytics
              </Title>
              <Title
                level={5}
                className="mainheader_container_navbar_brandContainer-title"
              >
                Platform | Enterprise Search
              </Title>
            </div>
          </div>

          <div className="mainheader_container_navbar_searchcontainer">
            <Title className="mainheader_container_navbar_searchcontainer-title">Hi, how can we help you?</Title>
            <div className="mainheader_container_navbar_searchcontainer_inputBox">
              <Input
                placeholder="Hi, how can we help you?"
                className="mainheader_container_navbar_searchcontainer_inputBox-input"
                onFocus={() => searchWord ? setvisibleSuggestion(true) : setvisibleSuggestion(false)}
                value={searchWord}
                onChange={(e) => {
                  onSearchTextChangeHandler(e);
                  setvisibleSuggestion(true);
                }}
              />

              <div className="mainheader_container_navbar_searchcontainer_actionBox">
                <MdOutlineKeyboardVoice size={18} />
                <div
                  onClick={() => {
                    history.replace(`${match.url}/${RouteUrl.SEARCH}`);
                  }}
                  className="mainheader_container_navbar_searchcontainer_actionBox-search"
                >
                  <MdSearch size={20} onClick={onSearchClickHandler} />
                </div>
              </div>

              {(visibleSuggestion && searchWord) && (suggessionsList.length > 0 ?
                <StyledCard className="mainheader_searchlist_container">
                  <SimpleBar className="mainheader_searchlist_container-scrollContainer">
                    {suggessionsList.map((item, i) => {
                      return (
                        <SearchListItem
                          item={item}
                          key={i}
                          onClick={onSuggestionItemClickHandler}
                        />
                      );
                    })}
                  </SimpleBar>
                </StyledCard>
                : <StyledCard className="mainheader_searchlist_container">
                  <SimpleBar className="mainheader_searchlist_container-scrollContainer">
                    <Text className="mainheader_searchlist_container_item-title">
                      search not found
                    </Text>
                  </SimpleBar>
                </StyledCard>)

              }
            </div>
          </div>

          <div className="mainheader_container_navbar_userContainer">
            {/* <div className="mainheader_container_navbar_userContainer_menus">
              <Dropdown
                overlayClassName="mainheader_container_navbar_userContainer_menus_items"
                overlay={menu}
                placement="bottomCenter"
                arrow
              >
                <div className="mainheader_container_navbar_userContainer_menus_menu">
                  <Text className="mainheader_container_navbar_userContainer_menus_menu-title">
                    Prouduct Journeys
                  </Text>
                  <DownOutlined />
                </div>
              </Dropdown>

              <Dropdown
                overlayClassName="mainheader_container_navbar_userContainer_menus_items"
                overlay={menu2}
                placement="bottomCenter"
                arrow
              >
                <div className="mainheader_container_navbar_userContainer_menus_menu">
                  <Text className="mainheader_container_navbar_userContainer_menus_menu-title">
                    Transactionary
                  </Text>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div> */}

            {isFullScreen ?
              <FiMinimize
                size={22}
                className="mainheader_container_navbar_userContainer-fullscreen"
                onClick={() => onFullScreenHandler()}
              /> :
              <FiMaximize
                size={22}
                className="mainheader_container_navbar_userContainer-fullscreen"
                onClick={() => onFullScreenHandler()}
              />}
            <FiHome
              size={22}
              className="mainheader_container_navbar_userContainer-homeIcon"
              onClick={() => history.replace(`${match.url}`)}
            />
            <Dropdown
              overlay={<UserMenu />}
              placement="bottomRight"
              arrow
            >
              <div className="mainheader_container_navbar_userContainer_userProfile">
                <FiUser size={22} className="mainheader_container_navbar_userContainer_userProfile-userIcon" />
                <Text className="mainheader_container_navbar_userContainer_userProfile-text">
                  {userName}
                </Text>
              </div>
            </Dropdown>
          </div>
        </div>
        {/* <div
          className={`mainheader_container_title ${
            match.url + "/search" === Location.pathname ? "hidden" : ""
          }`}
        >
          <Title className={`mainheader_container_title-text`}>
            Hi, how can we help you?
          </Title>
        </div> */}
      </div>
    </Content>
  );
}

function UserMenu(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const Dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.Theme);

  const onThemeClickChange = (themetype, color) => {
    switch (color) {
      // case "brown":
      //   dispatch({
      //     type:Actions.UPDATETHEME,
      //     themeKey: themetype === "dark" ? DarkBrownTheme : LightBrownTheme,
      //   });
      //   break;

      default:
        Dispatch({
          type: Actions.UPDATETHEME,
          themeKey: themetype === "dark" ? DarkBlueTheme : LightBlueTheme,
        });
    }
  };

  const onLogoutClickHandler = () => {
    Dispatch(AuthActionCreator.LogoutUser())
    history.replace(`${RouteUrl.LOGIN}`);
  }

  return (
    <div className="DropDownMenu userMenu">
      <div className="userMenu-header">
        <Text>Admin</Text>
        <Text>demo@infosys.com</Text>
      </div>
      <Divider />
      <div>
        <DropDownMenuItem title="My Profile" icon={<FiUser size={20} />} />
        <DropDownMenuItem
          title="Admin Console"
          icon={<FiSettings size={20} />}
          onClick={() => history.replace(`${match.url}/${RouteUrl.ADMIN}`)}
        />
        <DropDownMenuItem
          title="Dark Mode"
          icon={<FiMoon size={20} />}
          onClick={() => onThemeClickChange("dark", currentTheme.themecolor)}
        />
        <DropDownMenuItem
          title="Light Mode"
          icon={<FiSun size={20} />}
          onClick={() => onThemeClickChange("light", currentTheme.themecolor)}
        />
      </div>
      <Divider />
      <div>
        <DropDownMenuItem
          title="Logout"
          icon={<FiLogOut size={20} />}
          onClick={onLogoutClickHandler}
        />
      </div>
    </div>
  );
}

function WorkSpaceMenu(props) {
  return (
    <div className="DropDownMenu WorkSpace">
      <div className="WorkSpace-header">
        <FiCodesandbox size={20} />
        <Text>Current Work Space</Text>
      </div>
      <Divider />
      <div>
        <DropDownMenuItem title="Work Space-1" icon={<FiBox size={20} />} />
        <DropDownMenuItem title="Work Space-2" icon={<FiBox size={20} />} />
        {/* <DropDownMenuItem title="Dark Mode" icon={<FiMoon size={20}/>} />
        <DropDownMenuItem title="Light Mode" icon={<FiSun size={20}/>} /> */}
      </div>
      <Divider />
      <div>
        <DropDownMenuItem
          title="Create New Work Space"
          icon={<FiPlusCircle size={20} />}
        />
        <DropDownMenuItem
          title="Edit Current Work Space"
          icon={<FiEdit size={20} />}
        />
      </div>
    </div>
  );
}

export default MainHeader;
