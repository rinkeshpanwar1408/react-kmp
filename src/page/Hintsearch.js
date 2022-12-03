import React, { useState } from "react";
import { Row, Col, Slider, Layout, Menu } from "antd";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeaderNew";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useRouteMatch, Redirect } from "react-router-dom";
import MainSearch from "./MainSearch";
import SearchResult from "./SearchResult";

import {
  VideoCameraOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import SimpleBar from "simplebar-react";
import AdminConsole from "./AdminConsole";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { StyledMainContentContainer } from "../styled-components/Master";
import { useDispatch } from "react-redux";
import * as RouteUrl from "../model/route";
import { BsBox, BsUiChecksGrid } from "react-icons/bs";
import { BiBriefcaseAlt, BiGitMerge, BiListOl, BiListUl, BiUser } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { FiList } from "react-icons/fi";

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

function HintSearch(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [collapsed, setcollapsed] = useState(true);
  const onCollapseHandler = () => {
    setcollapsed(!collapsed);
  };

  let headerClass = "";
  if (location.pathname === `${match.path}/${RouteUrl.MAINSEARCH}`) {
    headerClass = "expanded-header"
  }

  return (
    <React.Fragment>
      <MainHeader />
      <Route path={`${match.path}/${RouteUrl.ADMIN}`}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="main_sidebar"
          style={{ height: "calc(100% - 9rem)" }}
        >
          <SimpleBar
            style={{ height: "100%", overflowX: "hidden" }}
            className="main_sidebar_container"
            forceVisible="y"
            autoHide
          >
            <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>

              
              <Menu.Item key="Menu5" icon={<MdDashboard className="text-color-3" />}>
                <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.DASHBOARD}`}>
                  Dashboard
                </Link>
              </Menu.Item>
              <SubMenu key="Menu1" icon={<BiGitMerge className="text-color-5" />} title="Workspace">
                <Menu.Item key="Menu1.1">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.WORKSPACE}`}>
                    List Of Workspaces
                  </Link>
                </Menu.Item>
                <Menu.Item key="Menu1.2">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.WORKSPACE}`}>
                    Create Work Space
                  </Link>
                </Menu.Item>
                <SubMenu key="Menu1_sub1" title="Execution">
                  <Menu.Item key="Menu1_sub1.1" onClick={() => history.push()}>
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                      Monitor Jobs
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu1_sub1.2">
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.CREATEJOBS}`}>
                      Create/Run a Job
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="Menu1_sub2" title="Search View Settings">
                  <Menu.Item key="Menu1_sub2.1" onClick={() => history.push()}>
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.PERSONALIZESEARCHCONFIG}`}>
                      Personalize Your Search
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu1_sub2.2">
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.CATEGORIZESEARCHCONFIG}`}>
                      Categorize Your Search
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu1_sub1.3">
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.OPTIMIZESEARCHCONFIG}`}>
                      Optimize Your Search
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="Menu1.3">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.WORKSPACE}`}>
                    Dashboard
                  </Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="Menu2" icon={<BsBox className="text-color-4" />} title="Source">
                <Menu.Item key="Menu2.1">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                    List All Sources
                  </Link>
                </Menu.Item>
                <Menu.Item key="Menu2.2">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.LISTALLSOURCECONFIGTEMPLATES}`}>
                    List All Config Templates
                  </Link>
                </Menu.Item>

                <SubMenu key="Menu2sub1" title="Confluence">
                  <Menu.Item key="Menu2sub1.1">
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}`}>
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu2sub1.2">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="Menu2sub2" title="Sharepoint Online">
                  <Menu.Item key="Menu2sub2.1">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINT}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu2sub2.2">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINT}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="Menu2sub3" title="Sharepoint on Premise">
                  <Menu.Item key="Menu2sub3.1">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINTONPREMISE}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu2sub3.2">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINTONPREMISE}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="Menu2sub4" title="Jira">
                  <Menu.Item key="Menu2sub4.1">
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.JIRA}/${RouteUrl.CREATESOURCE}`}>
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu2sub4.2">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.JIRA}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="Menu2sub5" title="Website">
                  <Menu.Item key="Menu2sub5.1">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.WEBSITE}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu2sub5.2">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.WEBSITE}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="Menu2sub6" title="File System">
                  <Menu.Item key="Menu2sub6.1">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.FILESYSTEM}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Menu2sub6.2">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.FILESYSTEM}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu key="Menu3" title="User Management" icon={<BiUser className="text-color-6" />}>
                <Menu.Item key="Menu3.1">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.LISTOFUSERGROUP}`}>
                    List of User Groups
                  </Link>
                </Menu.Item>
                <Menu.Item key="Menu3.2">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.CREATEUSERGROUP}`}>
                    Create a User Group
                  </Link>
                </Menu.Item>
              </SubMenu>

              {/* <Menu.Item key="Menu4" icon={<FiList className="text-color-7" />}>
                <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.QUICKSETUP}`}>
                  Quick Setup
                </Link>
              </Menu.Item> */}
            </Menu>
          </SimpleBar>


          <div className="main_sidebar-btnCollapsed" onClick={onCollapseHandler}>
            {collapsed ? (
              <AiOutlineMenuUnfold
                size={20}
              />
            ) : (
              <AiOutlineMenuFold
                size={20}
              />
            )}
          </div>
        </Sider>
      </Route>

      <StyledMainContentContainer>
        <Switch>
          <Route path={`${match.path}/${RouteUrl.MAINSEARCH}`} exact>
            <MainSearch />
          </Route>
          <Route path={`${match.path}/${RouteUrl.SEARCH}`} exact>
            <SearchResult />
          </Route>
          <Route path={`${match.path}/${RouteUrl.ADMIN}`}>
            <AdminConsole />
          </Route>
          <Redirect
            from={`${match.path}`}
            to={`${match.path}/${RouteUrl.MAINSEARCH}`}
            exact
          />
        </Switch>
        {/* <MainFooter /> */}
      </StyledMainContentContainer>

      {/* <Layout>
        

        <Content className="site-layout-background">
          <Switch>
            <Route path={`${match.path}/mainsearch`} exact>
              <MainSearch />
            </Route>
            {/* <Route path={`${match.path}/search`} exact>
              <SearchResult />
            </Route>
            <Route path={`${match.path}/admin`} exact>
              <AdminConsole />
            </Route> 
            <Redirect
              from={`${match.path}`}
              to={`${match.path}/mainsearch`}
              exact
            />
          </Switch>

        </Content>
      </Layout> */}
    </React.Fragment>
  );
}

export default HintSearch;
