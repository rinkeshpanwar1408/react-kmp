import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form, Typography, Modal } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch, useSelector } from "react-redux";
import * as ActionCreator from "../../../../store/action/sourceActions";
import useNotification from "../../../../hooks/useNotification";
import useMessage from "../../../../hooks/useMessage";
import useConfirm from "../../../../hooks/useConfirm";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
import { useParams } from "react-router-dom";
import { sourceApi } from "../../../../utility/axios";
import { CONFLUENCE } from "../../../../model/constant";

const { Title } = Typography;
const { confirm } = Modal;

function CreateConfluenceSource(props) {
  const SourceDetail = useSelector(state => state.source.SourceDetail);
  const UserDetail = useSelector(state => state.auth.UserDetail);

  const [validate, setValidate] = useState(false);
  const [CreateSourceForm] = Form.useForm();
  const [isEditMode, setisEditMode] = useState(false);
  const [sourceId, setsourceId] = useState(0);
  const history = useHistory();
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const { ShowConfirmDailog } = useConfirm();
  const { full_source_name } = useParams();

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

        setsourceId(response.data.id)
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
      const values = await CreateSourceForm.validateFields();

      if (isEditMode) {
        debugger;
        const result = await dispatch(
          ActionCreator.UpdateSource({
            id: sourceId,
            source_name: values.sourcename,
            source_type: CONFLUENCE,
            base_url: values.base_url,
            user_id: values.userId,
            password: values.password,
            userName: UserDetail.userName,
            validated: validate
          })
        );

        if (result.data) {
          ShowSuccessMessage("Source updated successfully");
        }


      } else {
        const result = await dispatch(
          ActionCreator.CreateSource({
            id: 0,
            source_name: values.sourcename,
            source_type: "Confluence",
            base_url: values.base_url,
            user_id: values.userId,
            password: values.password,
            userName: UserDetail.userName,
            validated: validate
          })
        );
        if (result.data) {
          ShowSuccessMessage("Source created successfully");
          ShowConfirmDailog("Configure Source",
            "Do you want to create source config?",
            () => {
              history.push(`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`)
            },
            () => { },
            "Yes",
            "No")
        }

        // if (true) {
        //   ShowSuccessMessage("Source created successfully");
        //   ShowConfirmDailog("Configure Source",
        //     "Do you want to create source config?",
        //     () => {
        //       history.push(`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`)
        //     },
        //     () => { },
        //     "Yes",
        //     "No")
        // }
      }

      // if (!result.data) {
      //   ShowWarningMessage("data is not correct");
      // } else {
      //   ShowSuccessMessage("Source created successfully");
      // }
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  };

  const validateForm = () => {
    setValidate(!validate);
  }

  const onBlurSourceHandler = async (e) => {
    if (!full_source_name) {
      const res = await sourceApi.get(`validate/${e.target.value}-confluence`);
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
          title="Create Source"
          className="FormPageHeader"
          extra={[
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
                    placeholder="Enter Source Name" onBlur={(e) =>
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
                  <Button type="primary"  >
                    Validate Connection
                  </Button>
                  <Button type="primary" htmlType="submit">
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
