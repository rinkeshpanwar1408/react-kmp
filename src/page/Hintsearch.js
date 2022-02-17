import React, { useState } from "react";
import { Row, Col, Slider, Layout, Menu } from "antd";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import { Route, Switch } from "react-router-dom";
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
const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

function HintSearch(props) {
  const match = useRouteMatch();
  const [collapsed, setcollapsed] = useState(true);
  const onCollapseHandler = () => {
    setcollapsed(!collapsed);
  };
  return (
    <React.Fragment>
      <MainHeader onCollapse={onCollapseHandler} />
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="main_sidebar"
        >
          <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
            <SubMenu key="sub1" icon={<FileOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<PieChartOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>

            <Menu.Item key="9" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="10" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="11" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="12" icon={<BarChartOutlined />}>
              nav 4
            </Menu.Item>
            <Menu.Item key="13" icon={<CloudOutlined />}>
              nav 5
            </Menu.Item>
            <Menu.Item key="14" icon={<AppstoreOutlined />}>
              nav 6
            </Menu.Item>
            <Menu.Item key="15" icon={<ShopOutlined />}>
              nav 7
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className="site-layout-background">
          <Switch>
            <Route path={`${match.url}/mainsearch`} exact>
              <MainSearch />
            </Route>
            <Route path={`${match.url}/search`} exact>
              <SearchResult />
            </Route>
            <Redirect
              from={`${match.url}`}
              to={`${match.url}/mainsearch`}
              exact
            />
          </Switch>
        </Content>
      </Layout>
      <MainFooter />
    </React.Fragment>
  );
}

export default HintSearch;
