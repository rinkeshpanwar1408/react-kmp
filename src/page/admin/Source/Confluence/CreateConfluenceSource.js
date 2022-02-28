import React, { useState } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form, Typography } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch } from "react-redux";
import { CreateSource } from "../../../../store/action/sourceActions";
import useMessage from "../../../../hooks/useMessge";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
const { Title } = Typography;

function CreateConfluenceSource(props) {
  const [validate, setValidate] = useState(false);
  const [CreateSourceForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const history = useHistory();
  const match = useRouteMatch();
  console.log(match.url);

  const submitHandler = async () => {

    try {
      const values = await CreateSourceForm.validateFields();
      const result = await dispatch(
        CreateSource({
          id: 0,
          source_name: values.sourcename + "-" + "Confluence",
          base_url: values.base_url,
          user_id: values.useriD,
          password: values.password,
          userName: "",
          validated: validate
        })
      );

      if (!result.data) {
        ShowWarningMessage("data is not correct");
      } else {
        ShowSuccessMessage("Source created successfully");
      }
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }

  };
  const validateForm = () => {
    setValidate(!validate);
  }
  return (
    <CustomRow justify="center">
      <CustomCol xl={16} >
        <PageHeader
          title="Create Source"
          className="FormPageHeader"
          extra={[
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Source</Breadcrumb.Item>
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
            form={CreateSourceForm}
          >
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

              <CustomCol key="rw1.1" xl={2} className="source_type_divider" >
                <Title level={1}>-</Title>
              </CustomCol>

              <CustomCol key="rw1.2" xl={11}  >
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
                    defaultValue={"Confluence"}
                  />
                </Form.Item>
              </CustomCol>
            </CustomRow>

            <CustomRow key="rw2">
              <CustomCol key="rw1.2" >
                <Form.Item
                  name="base_url"
                  label='Confluence Url'
                  rules={[
                    {
                      required: true,
                      message: "Please input your Confluence Url!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Confluence Url"
                  />
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw1.3" >
                <Form.Item
                  name="useriD"
                  label="User ID"
                  rules={[
                    {
                      required: true,
                      message: "Please input your User ID!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter User ID"
                  />
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw1.4" >
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Password"
                  />
                </Form.Item>
              </CustomCol>
            </CustomRow>


            <CustomRow key="rw3">
              <CustomCol key="rw1.3" xxl={24} xl={24} className="text-right">
                <Space direction="horizontal">
                  <Button type="primary" onClick={validateForm} >
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
  );
}

export default CreateConfluenceSource;
