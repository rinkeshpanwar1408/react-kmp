import { Menu, Dropdown, Space, Tooltip, Breadcrumb, Button, PageHeader, Popconfirm, Table, Tag, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { HomeOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../styled-components/CommonControls";
import CustomCol from "../../../components/CustomCol";
import CustomRow from "../../../components/CustomRow";
import { FiEdit, FiSettings, FiTrash2 } from "react-icons/fi";
import { sourceApi } from "../../../utility/axios";
import { useDispatch, useSelector } from "react-redux";
import * as SourceActionCreator from "../../../store/action/sourceActions";
import CustomPopconfirm from "../../../components/CustomPopconfirm";
import useMessage from "../../../hooks/useMessage";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import * as RouteUrl from "../../../model/route";
import { CONFLUENCE } from "../../../model/constant";
import CustomModal from "../../../components/CustomModal";
import InfoBox from "../../../components/InfoBox";


const { Option } = Select;



function MonitorJobs(props) {
  const SourceList = useSelector(state => state.source.Sources);
  const dispatch = useDispatch();
  const [isLoadingdata, setIsLoadingdata] = useState(false);
  const { ShowErrorMessage } = useMessage();
  const RouteMatch = useRouteMatch();
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [CreateSourceForm] = Form.useForm();

  const onEditSourceHandler = (fullSource) => {
    history.push({
      pathname: `${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}/${fullSource}`,
    });
  }

  const onDeleteSourceHandler = async (fullSource) => {
    try {
      const response = await dispatch(SourceActionCreator.DeleteSource(fullSource));
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  }

  useEffect(() => {
    try {
      const getData = async () => {
        setIsLoadingdata(true);
        const response = await dispatch(SourceActionCreator.GetSources());
        setIsLoadingdata(false);
      }
      // getData();
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  }, [dispatch])

  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'jobname',
      key: 'jobname',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Document Count',
      dataIndex: 'documentcount',
      key: 'documentcount',
    },

    {
      title: 'Run By',
      dataIndex: 'runby',
      key: 'runby',
    },

    {
      title: 'Start Date Time',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
    },

    {
      title: 'Job Run Type',
      dataIndex: 'jobruntype',
      key: 'jobruntype',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="primary" shape="circle" icon={<FiEdit fontSize="20" />}
              onClick={() => onEditSourceHandler(text.full_source_name)} />
          </Tooltip>

          <Tooltip title="Delete">
            <CustomPopconfirm
              title="Are you sure to delete this source?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDeleteSourceHandler(text.full_source_name)}
            >
              <Button danger type="primary" shape="circle" icon={<FiTrash2 fontSize="20" />} />
            </CustomPopconfirm>
          </Tooltip>

        </Space>
      ),
    },
  ];

  return (<>
    <CustomRow justify="center">
      <CustomCol xl={16} >
        <PageHeader
          title="List All Jobs"
          className="FormPageHeader"
        // extra={[
        //   <Breadcrumb>
        //     <Breadcrumb.Item >
        //       <Link to={`${RouteUrl.MONITORJOBS}`}  > <HomeOutlined /></Link>

        //     </Breadcrumb.Item>
        //     <Breadcrumb.Item >
        //       Sources
        //     </Breadcrumb.Item>
        //   </Breadcrumb>
        // ]}
        >
        </PageHeader>
        <StyledCard className="formContainer">
          <Table className="m-b-20" loading={isLoadingdata} columns={columns} dataSource={SourceList} bordered pagination={false} />
          <CustomRow >
            <CustomCol xxl={24} xl={24} className="text-right">
              <Button type="primary" onClick={() => { setIsModalVisible(true) }}>Create New Job</Button>
            </CustomCol>
          </CustomRow>
        </StyledCard>
      </CustomCol>

    </CustomRow>

    <CustomModal
      title="Workspace details"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      width={"40%"}
      footer={
        <Space direction="horizontal">
          <Button type="primary">
            Create And Run
          </Button>
          <Button type="primary" >
            Create
          </Button>
          <Button >
            Close
          </Button>
        </Space>
      }
    >
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


      </Form>
    </CustomModal>

  </>
  );
}

export default MonitorJobs;
