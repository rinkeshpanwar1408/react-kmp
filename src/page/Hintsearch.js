import React, { useState } from "react";
import { Row, Col, Slider, Layout, Menu } from "antd";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import { Link, Route, Switch, useHistory } from "react-router-dom";
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

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

function HintSearch(props) {
  const match = useRouteMatch();
  const history = useHistory();

  const [collapsed, setcollapsed] = useState(true);
  const onCollapseHandler = () => {
    setcollapsed(!collapsed);
  };

  return (
    <React.Fragment>
      <MainHeader />
      <Route path={`${match.url}/${RouteUrl.ADMIN}`}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="main_sidebar"
          style={{ height: "calc(100% - 7rem)" }}
        >
          <SimpleBar
            style={{ height: "100%", overflowX: "hidden" }}
            className="main_sidebar_container"
            forceVisible="y"
            autoHide
          >
            <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
              <SubMenu key="sub1" icon={<FileOutlined />} title="Execution">
                <Menu.Item key="1" onClick={()=> history.push()}>
                  <Link to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                    Monitor Jobs
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.CREATEJOBS}`}>
                    Create/Run a Job
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<PieChartOutlined />} title="Source">
                <Menu.Item key="5">
                  <Link to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                    List All Sources
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link
                    to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.LISTALLSOURCECONFIGTEMPLATES}`}
                  >
                    List All Config Templates
                  </Link>
                </Menu.Item>

                <SubMenu key="sub2.1" title="Confluence">
                  <Menu.Item key="7">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.CONFLUENCECREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.CONFLUENCECONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.2" title="Sharepoint Online">
                  <Menu.Item key="9">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.SHAREPOINTCREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.SHAREPOINTCONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.3" title="Sharepoint on Premise">
                  <Menu.Item key="11">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.SHAREPOINTONPREMISECREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.SHAREPOINTONPREMISECONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.4" title="Jira">
                  <Menu.Item key="13">
                    <Link to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.JIRACREATESOURCE}`}>
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="14">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.JIRACONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.5" title="Website">
                  <Menu.Item key="15">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.WEBSITECREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="16">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.WEBSITECONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2.6" title="File System">
                  <Menu.Item key="17">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.FILESYSTEMCREATESOURCE}`}
                    >
                      Create Source
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="18">
                    <Link
                      to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.FILESYSTEMCONFIGTEMPLATE}`}
                    >
                      Create Config Template
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu
                key="sub3"
                title="User Management"
                icon={<UserOutlined />}
              >
                <Menu.Item key="19">
                  <Link to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.LISTOFUSERGROUP}`}>
                    List of User Groups
                  </Link>
                </Menu.Item>
                <Menu.Item key="20">
                  <Link to={`${match.url}/${RouteUrl.ADMIN}/${RouteUrl.CREATEUSERGROUP}`}>
                    Create a User Group
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </SimpleBar>

          <div className="main_sidebar-btnCollapsed">
            {collapsed ? (
              <AiOutlineMenuUnfold
                color="#000"
                size={20}
                onClick={onCollapseHandler}
              />
            ) : (
              <AiOutlineMenuFold
                color="#000"
                size={20}
                onClick={onCollapseHandler}
              />
            )}
          </div>
        </Sider>
      </Route>

      <StyledMainContentContainer className="main-container">
        <Switch>
          <Route path={`${match.url}/${RouteUrl.MAINSEARCH}`} exact>
            <MainSearch />
          </Route>
          <Route path={`${match.url}/${RouteUrl.SEARCH}`} exact>
            <SearchResult />
          </Route>
          <Route path={`${match.url}/${RouteUrl.ADMIN}`}>
            <AdminConsole />
          </Route>
          <Redirect
            from={`${match.url}`}
            to={`${match.url}/${RouteUrl.MAINSEARCH}`}
            exact
          />
        </Switch>
        {/* <MainFooter /> */}
      </StyledMainContentContainer>

      {/* <Layout>
        

        <Content className="site-layout-background">
          <Switch>
            <Route path={`${match.url}/mainsearch`} exact>
              <MainSearch />
            </Route>
            {/* <Route path={`${match.url}/search`} exact>
              <SearchResult />
            </Route>
            <Route path={`${match.url}/admin`} exact>
              <AdminConsole />
            </Route> 
            <Redirect
              from={`${match.url}`}
              to={`${match.url}/mainsearch`}
              exact
            />
          </Switch>

        </Content>
      </Layout> */}
    </React.Fragment>
  );
}

export default HintSearch;
