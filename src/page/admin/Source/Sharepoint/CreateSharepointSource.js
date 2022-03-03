import React, { useEffect,useState } from "react";
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
function CreateSharepointSource(props) {
  const [SharePointSourceForm] = Form.useForm();
  const [validate, setValidate] = useState(false);
  const [sourceId, setsourceId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    SharePointSourceForm.setFieldsValue({
      sourcetype: "Sharepoint Online",
    });
  }, []);

  const submitHandler = async () => {
    const values = await SharePointSourceForm.validateFields();
    console.log(values);
    // const result = await dispatch(
    //   ActionCreator.CreateSource({
    //     id: sourceId,
    //     source_name: values.sourcename,
    //     source_type: "Sharepoint Online",
    //     base_url: values.base_url,
    //     site_url: values.site_url,
    //     client_url: values.clientId,
    //     tenant_id:values.tenantId,
    //     client_Secret:values.clientSecret,
    //     permission_type:values.permissionType,
    //     validated: validate
    //   })
    // );
  }

  return (
    <React.Fragment>
      <CustomRow justify="center">
        <CustomCol xl={16} >
          <PageHeader
            title="Create Source"
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
                <Breadcrumb.Item>Sharepoint Online</Breadcrumb.Item>

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
              onFinish={submitHandler}
              form={SharePointSourceForm}>
              <CustomRow key="rw1">
                <CustomCol key="rw1.1" xl={11} >
                  <Form.Item
                    name="sourcename"
                    label="Source Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Source Name!",
                      },
                    ]}
                  >

                    <Input
                      placeholder="Enter Source Name"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.2" xl={2} className="source_type_divider" >
                  <Title level={1}>-</Title>
                </CustomCol>

                <CustomCol key="rw1.3" xl={11}  >
                  <Form.Item
                    name="sourcetype"
                    label="Source Type"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Source Type!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Source Type"
                    />
                  </Form.Item>
                </CustomCol>
              </CustomRow>

              <CustomRow key="rw2">
                <CustomCol key="rw2.1" >
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
                <CustomCol key="rw2.2" >
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
                    />
                  </Form.Item>
                </CustomCol>
              </CustomRow>

              <CustomRow key="rw3">
                <CustomCol key="rw3.1" xl={11} >
                  <Form.Item
                    name="clientId"
                    label="Client Id"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Client Id!",
                      },
                    ]}
                  >

                    <Input
                      placeholder="Enter Client Id"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw3.2" xl={2} className="source_type_divider" >
                  <Title level={1}>/</Title>
                </CustomCol>

                <CustomCol key="rw1.3" xl={11}  >
                  <Form.Item
                    name="tenantId"
                    label="Tenant Id"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Tenant Id!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Tenant Id"
                    />
                  </Form.Item>
                </CustomCol>
              </CustomRow>
              <CustomRow key='rw4'>
                <CustomCol key="rw4.1" >
                  <Form.Item
                    name="clientSecret"
                    label="Client Secret"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Client Secret!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter Client Secret" />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw4.2" >
                  <Form.Item
                    name="permissionType"
                    label="Permission Type"
                    rules={[
                      {
                        required: true,
                        message: "Please select Permission Type!",
                      },
                    ]}
                  >
                    <Select placeholder="Select Permission Type" >
                      <Option value="Delegated">Delegated</Option>
                      <Option value="Application">Application</Option>
                    </Select>
                  </Form.Item>

                </CustomCol>
              </CustomRow>

              <CustomRow key="rw5">
                <CustomCol key="rw5.1" xxl={24} xl={24} className="text-right">
                  <Space direction="center">
                    <Button type="primary"  >
                      Validate Connection
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Create Source
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

export default CreateSharepointSource;
