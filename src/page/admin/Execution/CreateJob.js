import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form, Typography, Modal, Alert, Select } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../model/route";
import { useParams } from "react-router-dom";
import useMessage from "../../../hooks/useMessage";
import useConfirm from "../../../hooks/useConfirm";
import CustomRow from "../../../components/CustomRow";
import CustomCol from "../../../components/CustomCol";
import { StyledCard } from "../../../styled-components/CommonControls";
import { Components } from "antd/lib/date-picker/generatePicker";
const { Option } = Select;
const { Title, Text } = Typography;
const { confirm } = Modal;


const CreateJob = (props) => {
  const SourceDetail = useSelector(state => state.source.SourceDetail);
  const UserDetail = useSelector(state => state.auth.UserDetail);

  const [validate, setValidate] = useState(false);
  const [CreateSourceForm] = Form.useForm();
  const [isEditMode, setisEditMode] = useState(false);
  const [sourceId, setsourceId] = useState(0);
  const [IsSubmitLoading, setIsSubmitLoading] = useState(false);


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

  return (
    <CustomRow justify="center">
      <CustomCol xl={12}>
        <PageHeader
          title={"Create/Run Job"}
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
          {
            isEditMode &&
            <Alert
              description={
                <Text>For this source configuration template is missing please click <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}?source=${full_source_name}`}>here</Link></Text>
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
            form={CreateSourceForm}
          >
            <CustomRow key="rw2">
              <CustomCol key="rw2.1" >
                <Form.Item
                  name="workspace"
                  label="Workspace"
                  rules={[{
                    required: true, message: "Please input your Source Type!",
                  }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a Workspace"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="Op-1" value="Option-1">{"Workspace-1"}</Option>
                    <Option key="Op-2" value="Option-2">{"Workspace-2"}</Option>
                    <Option key="Op-3" value="Option-3">{"Workspace-3"}</Option>
                    <Option key="Op-4" value="Option-4">{"Workspace-4"}</Option>
                  </Select>
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw2.1" >
                <Form.Item
                  name="workspace"
                  label="Configuration"
                  rules={[{
                    required: true, message: "Please select configuration!",
                  }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a Configuration"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="wOp-1" value="wOption-1">{"Configuration-1"}</Option>
                    <Option key="wOp-2" value="wOption-2">{"Configuration-2"}</Option>
                    <Option key="wOp-3" value="wOption-3">{"Configuration-3"}</Option>
                    <Option key="wOp-4" value="wOption-4">{"Configuration-4"}</Option>
                  </Select>
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw2.3" >
                <Form.Item
                  name="runtype"
                  label="Run Type"
                  rules={[{
                    required: true, message: "Please select run type!",
                  }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a Run Type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="Adhoc" value="Adhoc">Adhoc</Option>
                    <Option key="Scheduled" value="Scheduled">Scheduled</Option>
                  </Select>
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw2.4" >
                <Form.Item
                  name="runtype"
                  label="Job Type"
                  rules={[{
                    required: true, message: "Please select job type!",
                  }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a Job Type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="fullingestion" value="fullingestion">Full Ingestion</Option>
                    <Option key="incrementalingestion" value="incrementalingestion">Incremental Ingestion</Option>
                  </Select>
                </Form.Item>
              </CustomCol>
            </CustomRow>

            <CustomRow key="rw3">
              <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                <Space direction="horizontal">
                  <Button type="primary">
                    Create And Run
                  </Button>
                  <Button type="primary" htmlType="submit" loading={IsSubmitLoading}>
                    Create
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

export default CreateJob;
