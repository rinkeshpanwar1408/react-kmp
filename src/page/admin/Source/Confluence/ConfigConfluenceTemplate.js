import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form, Typography, Select } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch } from "react-redux";
import { CreateSource, GetSources } from "../../../../store/action/sourceActions";
import useMessage from "../../../../hooks/useMessge";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
import { useParams } from "react-router-dom";
const { Title } = Typography;
const { Option } = Select;

function ConfigConfluenceTemplate(props) {
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
  const params = useParams();

  console.log(params);
  console.log(CreateSourceForm);

  useEffect(() => {
    const fillDropDown = () => {
      dispatch(GetSources())
    }
    fillDropDown();
  }, [dispatch])


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
          title="Create Config Template"
          className="FormPageHeader"
          extra={[
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Config Template</Breadcrumb.Item>
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
              <CustomCol key="rw1.1" xl={12} >
                <Form.Item
                  name="configname"
                  label="Config Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Config Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Source Name"
                  />
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw1.3" xl={12}  >
                <Form.Item
                  name="sources"
                  label="Source"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Source Type!",
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
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>

                </Form.Item>
              </CustomCol>
            </CustomRow>



            <CustomRow key="rw3">
              <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                <Space direction="horizontal">
                  <Button type="primary" htmlType="submit">
                    Create Config
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

export default ConfigConfluenceTemplate;

