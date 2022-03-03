import React, { useState } from "react";
import { Row, Col, Slider, Layout, Menu } from "antd";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
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
import { BiUser } from "react-icons/bi";

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
              <SubMenu key="sub1" icon={<BsUiChecksGrid />} title="Execution">
                <Menu.Item key="1" onClick={() => history.push()}>
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                    Monitor Jobs
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.CREATEJOBS}`}>
                    Create/Run a Job
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<BsBox />} title="Source">
                <Menu.Item key="5">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                    List All Sources
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link
                    to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.LISTALLSOURCECONFIGTEMPLATES}`}
                  >
                    List All Config Templates
                  </Link>
                </Menu.Item>

                <SubMenu key="sub2.1" title="Confluence">
                  <Menu.Item key="7">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.2" title="Sharepoint Online">
                  <Menu.Item key="9">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINT}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINT}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.3" title="Sharepoint on Premise">
                  <Menu.Item key="11">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINTONPREMISE}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.SHAREPOINTONPREMISE}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.4" title="Jira">
                  <Menu.Item key="13">
                    <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.JIRA}/${RouteUrl.CREATESOURCE}`}>
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="14">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.JIRA}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.5" title="Website">
                  <Menu.Item key="15">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.WEBSITE}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="16">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.WEBSITE}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.6" title="File System">
                  <Menu.Item key="17">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.FILESYSTEM}/${RouteUrl.CREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="18">
                    <Link
                      to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.FILESYSTEM}/${RouteUrl.CONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu
                key="sub3"
                title="User Management"
                icon={<BiUser />}
              >
                <Menu.Item key="19">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.LISTOFUSERGROUP}`}>
                    List of User Groups
                  </Link>
                </Menu.Item>
                <Menu.Item key="20">
                  <Link to={`${match.path}/${RouteUrl.ADMIN}/${RouteUrl.CREATEUSERGROUP}`}>
                    Create a User Group
                  </Link>
                </Menu.Item>
              </SubMenu>
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

      <StyledMainContentContainer className={`main-container ${headerClass}`}>
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
