import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Menu, Select, Input, PageHeader, Space, Table, Tag, Form, Typography, Modal } from "antd";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { StyledCard } from "../../../../styled-components/CommonControls";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
import { HomeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import * as ActionCreator from "../../../../store/action/sourceActions";

const { Title } = Typography;
const { Option } = Select;
function ConfigSharepointTemplate(props) {
  const SourceList = useSelector(state => state.source.Sources);
  const [SharePointConfigForm] = Form.useForm();


 const  onBlurHandler=async ()=>{
  const base = await SharePointConfigForm.getFieldValue("base_url");
  const site = await SharePointConfigForm.getFieldValue("site_url");
  console.log(SharePointConfigForm.getFieldsValue())
  console.log(base,site)
  base && site && SharePointConfigForm.setFieldsValue({
    siteName: base +":"+ site,
  });
 }
  return (
    <React.Fragment>

      <CustomRow justify="center">
        <CustomCol xl={16} >
          <PageHeader
            title="Create Sharepoint Config Template"
            className="FormPageHeader"
            extra={[
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="{}">
                    <HomeOutlined />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="{}">
                    Sources
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Create Sharepoint Template</Breadcrumb.Item>

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
              form={SharePointConfigForm}>

              <CustomRow key="rw1">
                {/* <CustomCol key="rw1.1" >
                  <Form.Item
                    name="configurationType"
                    label="Configuration Type"
                    rules={[
                      {
                        required: true,
                        message: "Please select Configuration Type!",
                      },
                    ]}
                  >
                    <Select placeholder="Select Configuration Type" >
                      <Option value="Delegated">Delegated</Option>
                      <Option value="Application">Application</Option>
                    </Select>
                  </Form.Item>

                </CustomCol> */}

                <CustomCol key="rw1.2" xl={9}>
                  <Form.Item
                    name="sourceConfigurationName"
                    label="Source Configuration Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Source Configuration Name!",
                      },
                    ]}
                  >

                    <Input
                      placeholder="Enter Source Configuration Name"
                    />
                  </Form.Item>
                </CustomCol>
                <CustomCol key="rw1.3" xl={9} >
                  <Form.Item
                    name="sourceName"
                    label="Source Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Source Name!",
                      },
                    ]}
                  >

                   
                  <Select
                    showSearch
                    placeholder="Select a Source"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      SourceList.map((item, i) => {
                        return < Option value={item.full_source_name}>{item.full_source_name}</Option>
                      })
                    }
                  </Select>
                  </Form.Item>
                </CustomCol>
                <CustomCol key="rw1.4" xl={6} >
                <Form.Item
                  name="template"
                  label="Template"
                >
                  <Input placeholder="Enter Source Name" addonBefore="-" />
                </Form.Item>
              </CustomCol>
            </CustomRow>
           

              <CustomRow key="rw2">
                       <CustomCol key="rw2.1" xl={11} >
                  <Form.Item
                    name="base_url"
                    label='Base Url'
                    rules={[
                      {
                        required: true,
                        message: "Please input your Base Url!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Base URL"
                    />
                  </Form.Item>
                </CustomCol>
                <CustomCol key="rw1.2" xl={2} className="source_type_divider" >
                  <Title level={1.5}>:</Title>
                </CustomCol>
                <CustomCol key="rw2.3" xl={11} >
                  <Form.Item
                    name="site_url"
                    label='Site Url'
                    rules={[
                      {
                        required: true,
                        message: "Please input your Site Url!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Site URL"
                      onBlur={onBlurHandler}
                    />
                  </Form.Item>
                </CustomCol>
                <CustomCol key="rw2.4" >
                  <Form.Item
                    name="siteName"
                    label='Site Name'
                    rules={[
                      {
                        required: true,
                        message: "Please input your Site Name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Site Name"
                    />
                  </Form.Item>
                </CustomCol>
                <CustomCol key="rw2.5" >
                  <Form.Item
                    name="artifactType"
                    label="Artifact Type"
                    rules={[
                      {
                        required: true,
                        message: "Please select Artifact Type!",
                      },
                    ]}
                  >
                    <Select placeholder="Select Artifact Type" >
                      <Option value="Case Studies">Case Studies</Option>
                      <Option value="Proposals">Proposals</Option>
                    </Select>
                  </Form.Item>

                </CustomCol>
              </CustomRow>

             
            

              <CustomRow key="rw5">
                <CustomCol key="rw5.1" xxl={24} xl={24} className="text-right">
                  <Space direction="center">
                    <Button type="primary"  >
                      Save
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Add New Configuration
                    </Button>
                  </Space>
                </CustomCol>
              </CustomRow>
            </Form>
          </StyledCard>
        </CustomCol >
      </CustomRow >
    </React.Fragment>
  );
}

export default ConfigSharepointTemplate;
