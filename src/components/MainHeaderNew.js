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
  Empty, Avatar
} from "antd";
import background_dark from "../assests/image/header_bg_dark.jpg";
// import background_light from "../assests/image/header_bg_light.png";
import infy from "../assests/image/InfosysLogo.png";
import { DownOutlined } from "@ant-design/icons";
import {
  FiFolder,
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
  FiCheck,
  FiBell
} from "react-icons/fi";
import {
  AiOutlineFolder,
  AiOutlineEdit,
  AiOutlineFolderAdd,
  AiOutlineFolderView,
  AiOutlineFolderOpen,
} from "react-icons/ai";

import {BsToggle2On, BsToggle2Off, BsFillSunFill, BsMoonStarsFill} from "react-icons/bs";

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
import { DarkBlueTheme, large_font, LightBlueTheme } from "../model/Theme";
import { StyledCard } from "../styled-components/CommonControls";
import * as RouteUrl from "../model/route";
import { AutoLogin } from "../store/action/AuthActions";
import * as WorkspaceActionCreator from "../store/action/workspaceActions";
import useMessage from "../hooks/useMessage";
import CustomMenuDropdown from "./CustomMenuDropdown";

import SearchHome from "./SearchHome";
//importing spinner loading
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Content } = Layout;
const { Title, Text } = Typography;
const background_light = "linear-gradient(to right, #120338, #3B185F)";

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

function MainHeaderNew(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const Dispatch = useDispatch();
  const { ShowErrorMessage } = useMessage();

  const currentTheme = useSelector((state) => state.theme.Theme);
  const { userName } = useSelector((state) => state.auth.UserDetail);

  const [isFullScreen, setIsFullscreen] = useState(false);

  const [visibleSuggestion, setvisibleSuggestion] = useState(false);
  const [suggessionsList, setSuggessionsList] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  let headerClass = "";
  if (location.pathname === `${match.url}/${RouteUrl.MAINSEARCH}`) {
    headerClass = "expanded-header";
  }

  const onSearchClickHandler = () => {
    setvisibleSuggestion(false);
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
        console.log(localStorage.getItem("userDetail"),"-------------");
        Dispatch(
          AuthActionCreator.AutoLogin(localStorage.getItem("userDetail"))
        );
      } else {
        history.push(RouteUrl.LOGIN);
        return;
      }
    }

    const getData = async () => {
      await Dispatch(WorkspaceActionCreator.GetWorkspaces());
    };
    if (userName) {
      getData();
    }
  }, [userName, history]);

  const onSearchTextChangeHandler = (event) => {
    setSearchWord(event.target.value);
  };

  const onSuggestionItemClickHandler = (text) => {
    setSearchWord(text);
    setvisibleSuggestion(false);
    {
      history.replace(`${match.url}/${RouteUrl.SEARCH}`);
    }
    Dispatch(ActionCreator.getSearchedData(searchWord));
  };

  const onFullScreenHandler = useCallback(async () => {
    if (isFullScreen) {
      await document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    // subscribe event
    document.addEventListener("fullscreenchange", (e) => {
      if (document.fullscreenElement && !isFullScreen) {
        onFullScreenHandler(isFullScreen);
      }
    });
    return () => {
      // unsubscribe event
      document.removeEventListener("fullscreenchange", onFullScreenHandler);
    };
  }, [isFullScreen, onFullScreenHandler]);

  return (
    <Content
      className={`mainheader ${headerClass}`}
      style={{
        backgroundImage: background_light,
            
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
        
      }}
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
                margin: "0 1rem",
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
                Platform | Search Wizard
              </Title>
            </div>
          </div>

          {/* This is the search home top*/}

          <div className="mainheader_container_navbar_userContainer">
            
            <FiHome
              size={22}
              className="mainheader_container_navbar_userContainer-homeIcon"
              onClick={() => history.replace(`${match.url}`)}
            />

            {isFullScreen ? (
              <FiMinimize
                size={22}
                className="mainheader_container_navbar_userContainer-fullscreen"
                onClick={() => onFullScreenHandler()}
              />
            ) : (
              <FiMaximize
                size={22}
                className="mainheader_container_navbar_userContainer-fullscreen"
                onClick={() => onFullScreenHandler()}
              />
            )}

            <FiBell
                size={22}
                className="mainheader_container_navbar_userContainer-bellIcon"
                onClick={() => {}}
            />
          
            <CustomMenuDropdown
              trigger="click"
              overlay={<UserMenu />}
              placement="bottomRight"
              arrow
            >
              <div className="mainheader_container_navbar_userContainer_userProfile">
                <Avatar
                  size={50}
                  className="mainheader_container_navbar_userContainer_userProfile-userIcon"
                  style={{color: "gold", backgroundColor: "#495C83", cursor: "pointer"}}
                >SV</Avatar>
                {/* <Text className="mainheader_container_navbar_userContainer_userProfile-text">
                  {userName}
                </Text> */}
              </div>
            </CustomMenuDropdown>
          </div>
        </div>
      </div>
    </Content>
  );
}

function UserMenu(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.Theme);
  const { userName, userEmail } = useSelector((state) => state.auth.UserDetail);

  const onThemeClickChange = (themetype, color) => {
    switch (color) {
      // case "brown":
      //   dispatch({
      //     type:Actions.UPDATETHEME,
      //     themeKey: themetype === "dark" ? DarkBrownTheme : LightBrownTheme,
      //   });
      //   break;

      default:
        dispatch({
          type: Actions.UPDATETHEME,
          themeKey: themetype === "dark" ? DarkBlueTheme : LightBlueTheme,
        });
    }
  };

  const onLogoutClickHandler = () => {
    dispatch(AuthActionCreator.LogoutUser());
    history.replace(`${RouteUrl.LOGIN}`);
  };

  return (
    <div className="DropDownMenu userMenu ">
      <div className="userMenu-header">
        <span style={{textAlign: "center", fontSize: large_font}}><b>{userName}</b></span>
        <span style={{textAlign:"center"}}>Admin</span>
        <span>{userEmail}</span>
      </div>
      
      <Divider />
      <div>
        <DropDownMenuItem title="My Profile" icon={<FiUser size={20} style={{marginLeft: "1.5rem"}}/>} />
        <DropDownMenuItem
          title="Admin Console"
          icon={<FiSettings size={20} style={{marginLeft: "1.5rem"}}/>}
          onClick={() => history.replace(`${match.url}/${RouteUrl.ADMIN}`)}
        />
        <DropDownMenuItem
          icon={!(currentTheme.themestyle === "dark") 
          ? 
            <><BsFillSunFill size={20} style={{color: "darkgray", marginLeft: "1.5rem", marginRight: "1rem"}}/> <BsToggle2Off size={20}/> <BsMoonStarsFill size={20} style={{color: "#FFBF00", marginLeft: "1rem"}} /></>
          : 
            <><BsFillSunFill size={20} style={{color: "gold", marginLeft: "1.5rem", marginRight: "1rem"}}/> <BsToggle2On size={20}/> <BsMoonStarsFill size={20} style={{color: "darkgrey", marginLeft: "1rem"}}/></>}

          onClick={() => {currentTheme.themestyle === "dark" 
          ?
           onThemeClickChange("light", currentTheme.themecolor)
          : 
           onThemeClickChange("dark", currentTheme.themecolor)}}
        />
        {/* <DropDownMenuItem
          title="Light Mode"
          icon={<FiSun size={20} style={{marginLeft: "1.5rem"}}/>}
          onClick={() => onThemeClickChange("light", currentTheme.themecolor)}
        /> */}
      </div>
      <Divider />
      <div>
        <DropDownMenuItem
          title="Logout"
          icon={<FiLogOut size={20} style={{marginLeft: "1.5rem"}}/>}
          onClick={onLogoutClickHandler}
          style={{marginBotton: "0.2rem"}}
        />
      </div>
    </div>
  );
}

function WorkSpaceMenu(props) {
  const WorkspaceList = useSelector((state) => state.workspace.WorkSpaces);
  const SelectedWorkspace = useSelector(
    (state) => state.workspace.SelectedWorkspace
  );
  const Dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();

  const { ShowSuccessMessage, ShowErrorMessage, ShowWarningMessage } =
    useMessage();

  const onWorkspaceChangeHandler = async (workspace) => {
    try {
      const result = await Dispatch(
        WorkspaceActionCreator.ChangeWorkSpace(workspace)
      );
    } catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  };

  return (
    <div className="DropDownMenu WorkSpace">
      <div className="WorkSpace-header">
        <AiOutlineFolderOpen size={20} />
        <Text>Current Work Space</Text>
      </div>
      <Divider />
      {WorkspaceList.length === 0 && (
        <Empty
          description="No Workspace"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      {WorkspaceList.length > 0 &&
        WorkspaceList.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.2rem 1rem",
              }}
              onClick={() => {
                onWorkspaceChangeHandler(item.w_name);
              }}
            >
              <DropDownMenuItem
                title={item.w_name}
                icon={<AiOutlineFolder size={22} />}
              />
              {SelectedWorkspace === item.w_name && <FiCheck />}
            </div>
          );
        })}
      <Divider />
      <div className="WorkSpace-footer">
        <DropDownMenuItem
          title="Create New Work Space"
          icon={<AiOutlineFolderAdd size={22} />}
          onClick={() => {
            history.push({
              pathname: `${match.path}/${RouteUrl.ADMIN}/${RouteUrl.QUICKSETUP}`,
              hash: "new",
            });
          }}
        />
        <DropDownMenuItem
          title="Edit Current Work Space"
          icon={<AiOutlineEdit size={22} />}
          onClick={() => {
            if (!SelectedWorkspace) {
              ShowWarningMessage(
                "Please select at lease one workspace as default"
              );
              return;
            }
            history.push({
              pathname: `${match.path}/${RouteUrl.ADMIN}/${RouteUrl.QUICKSETUP}`,
              hash: "edit",
            });
          }}
        />
      </div>
    </div>
  );
}

export default MainHeaderNew;
