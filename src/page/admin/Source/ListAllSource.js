import { Breadcrumb, PageHeader } from "antd";
import React from "react";
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

function ListAllSources(props) {

  return (
    <React.Fragment>
      <h1>List All Sources</h1>
      <PageHeader
        
        title="Title"
        className="site-page-header"
        subTitle="This is a subtitle"
        extra={[
          <Breadcrumb>
            <Breadcrumb.Item href="">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
              <UserOutlined />
              <span>Application List</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Application</Breadcrumb.Item>
          </Breadcrumb>
        ]}
      >
      </PageHeader>
    </React.Fragment>
  );
}

export default ListAllSources;
