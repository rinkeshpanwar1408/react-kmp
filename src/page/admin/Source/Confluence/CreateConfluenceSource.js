import React from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";

function CreateConfluenceSource(props) {

  return (
    <div>
      <CustomRow>
        <CustomCol xl={16} >
          <PageHeader
            title="Create Source"
            className="FormPageHeader"
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
          <StyledCard className="formContainer">

            <Form
              name="basic"
              layout="vertical"
              size="large"
              autocomplete="off"
            >
              <CustomRow key="rw1">
                <CustomCol key="rw1.1" >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >

                    <Input
                      placeholder="Source Name"
                      addonAfter="Confluence"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.2" >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Confluence Url"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.3" >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="User ID"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.4" >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Password"
                    />
                  </Form.Item>
                </CustomCol>
              </CustomRow>


              <CustomRow key="rw2">
                <CustomCol key="rw1.3" xxl={24} xl={24} className="text-right">
                  <Space direction="horizontal">
                    <Button type="primary" >
                      Validate
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Add
                    </Button>
                  </Space>
                </CustomCol>
              </CustomRow>
            </Form>

          </StyledCard>
        </CustomCol>
      </CustomRow>
    </div>
  );
}

export default CreateConfluenceSource;
