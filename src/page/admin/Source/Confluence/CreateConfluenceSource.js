import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form, Typography, Modal, Alert } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch, useSelector } from "react-redux";
import * as ActionCreator from "../../../../store/action/sourceActions";
import useNotification from "../../../../hooks/useNotification";
import useMessage from "../../../../hooks/useMessage";
import useConfirm from "../../../../hooks/useConfirm";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
import { useParams } from "react-router-dom";
import { sourceApi } from "../../../../utility/axios";
import { CONFLUENCE } from "../../../../model/constant";

const { Title, Text } = Typography;

function CreateConfluenceSource(props) {
  const UserDetail = useSelector(state => state.auth.UserDetail);

  const [validate, setValidate] = useState(false);
  const [CreateSourceForm] = Form.useForm();
  const [isEditMode, setisEditMode] = useState(false);
  const [isFromQuickSetup, setIsFromQuickSetup] = useState(false);
  const [sourceId, setsourceId] = useState(0);
  const [IsSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isAddConfigWarningVisible, setIsAddConfigWarningVisible] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const { ShowConfirmDailog } = useConfirm();
  const { full_source_name } = useParams();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("isFromQuickLinks")) {
      setIsFromQuickSetup(true);
    }
  }, [location.search])

  useEffect(() => {
    try {
      const getDetail = async () => {
        const response = await dispatch(ActionCreator.GetSourceDetail(full_source_name));
        CreateSourceForm.setFieldsValue({
          sourcename: response.data.source_name,
          userId: response.data.user_id,
          base_url: response.data.base_url,
          password: response.data.password,
          sourcetype: response.data.source_type,
        });
        setsourceId(response.data.id);
        setIsAddConfigWarningVisible(false)
      }

      if (full_source_name) {
        setisEditMode(true);
        getDetail();
      }
      else {
        CreateSourceForm.setFieldsValue({
          sourcetype: CONFLUENCE,
        });
      }
    } catch (error) {
      ShowWarningMessage("Something Went Wrong");
    }
  }, [full_source_name, isEditMode])

  const submitHandler = async () => {
    try {
      setIsSubmitLoading(true);
      const values = await CreateSourceForm.validateFields();

      if (isEditMode) {
        // const result = await dispatch(
        //   ActionCreator.UpdateSource({
        //     id: sourceId,
        //     source_name: values.sourcename,
        //     source_type: CONFLUENCE,
        //     base_url: values.base_url,
        //     user_id: values.userId,
        //     password: values.password,
        //     userName: UserDetail.userName,
        //     validated: validate
        //   })
        // );

        // if (result.data) {
        //   ShowSuccessMessage("Source updated successfully");
        // }
      }
      else {
        // const result = await dispatch(
        //   ActionCreator.CreateSource({
        //     id: 0,
        //     source_name: values.sourcename,
        //     source_type: "Confluence",
        //     base_url: values.base_url,
        //     user_id: values.userId,
        //     password: values.password,
        //     userName: UserDetail.userName,
        //     validated: validate
        //   })
        // );


        // if (result.data) {
          ShowSuccessMessage("Source created successfully");
          ShowConfirmDailog("Configure Source",
            "Do you want to create source config?",
            () => {
              history.push(`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}?source=${values.sourcename}-Confluence`)
            },
            () => {

              ShowConfirmDailog("Back",
                "Do you want to create another source?",
                () => {
                },
                () => {
                  history.push(`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}?source=${values.sourcename}-Confluence`)
                },
                "Yes",
                "Go, Back to quick setup")
            },
            "Yes",
            "No")
        }
      // }
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
    finally {
      setIsSubmitLoading(false);
    }
  };

  const validateForm = () => {
    setValidate(!validate);
  }

  const onBlurSourceHandler = async (e) => {
    if (!full_source_name) {
      const res = await sourceApi.get(`source/validate/${e.target.value}-${CONFLUENCE}`);
      if (!res.data) {
        CreateSourceForm.setFieldsValue({
          sourcename: ""
        })
        ShowWarningMessage(`This source was already in used used please try with other source name`)
      }
    }
  }


  return (
    <CustomRow justify="center">
      <CustomCol xl={16} >
        <PageHeader
          title={isEditMode ? "Edit Source" : "Create Source"}
          className="FormPageHeader"
          extra={
            isFromQuickSetup ?
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                    <HomeOutlined />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                    QuickSetup
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Confluence</Breadcrumb.Item>
                <Breadcrumb.Item>Create Source</Breadcrumb.Item>
              </Breadcrumb> :
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                    <HomeOutlined />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}`}>
                    Sources
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Confluence</Breadcrumb.Item>
                {!full_source_name && <Breadcrumb.Item>Create Source</Breadcrumb.Item>}
                {full_source_name && <Breadcrumb.Item>{full_source_name}</Breadcrumb.Item>}
                {full_source_name && <Breadcrumb.Item>Edit</Breadcrumb.Item>}
              </Breadcrumb>

          }
        >
        </PageHeader>
        <StyledCard className="formContainer">
          {
            isAddConfigWarningVisible &&
            <Alert
              description={
                <Text>For this source configuration template is missing please click <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}?source=${full_source_name}`}>here</Link> to create.</Text>
              }
              type="error"
              className="m-b-20"
              closable
            />
          }
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
                    disabled={isEditMode}
                    onBlur={(e) =>
                      onBlurSourceHandler(e)
                    }
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
                    disabled
                  />
                </Form.Item>
              </CustomCol>
            </CustomRow>

            <CustomRow key="rw2">
              <CustomCol key="rw2.1" >
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

              <CustomCol key="rw2.2" >
                <Form.Item
                  name="userId"
                  label="User Id"
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

              <CustomCol key="rw1.3" >
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
                  <Input.Password placeholder="Enter Password" />
                </Form.Item>
              </CustomCol>

            </CustomRow>


            <CustomRow key="rw3">
              <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                <Space direction="horizontal">
                  <Button type="primary">
                    Validate Connection
                  </Button>
                  <Button type="primary" htmlType="submit" loading={IsSubmitLoading}>
                    {isEditMode ? "Update Source" : "Create Source"}
                  </Button>
                </Space>
              </CustomCol>
            </CustomRow>
          </Form>

        </StyledCard>
      </CustomCol >
    </CustomRow >
  );
}

export default CreateConfluenceSource;
