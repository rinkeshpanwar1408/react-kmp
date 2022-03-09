


import { Breadcrumb, Button, PageHeader, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../styled-components/CommonControls";
import CustomCol from "../../../components/CustomCol";
import CustomRow from "../../../components/CustomRow";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { sourceApi } from "../../../utility/axios";
import { useDispatch, useSelector } from "react-redux";
import CustomPopconfirm from "../../../components/CustomPopconfirm";
import useMessage from "../../../hooks/useMessage";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../model/route";
import { GetSourceConfigList } from "../../../store/action/sourceConfigActions";

function ListAllConfigTemplates(props) {
  const SourceConfigList = useSelector(state => state.sourceConfig.SourceConfigs);
  const dispatch = useDispatch();
  const [isLoadingdata, setIsLoadingdata] = useState(false);
  const { ShowErrorMessage } = useMessage();
  const RouteMatch = useRouteMatch();
  const history = useHistory();

  const onEditSourceHandler = (source) => {
  }

  useEffect(() => {
    try {
      const getData = async () => {
        setIsLoadingdata(true);
        const response = await dispatch(GetSourceConfigList());
        setIsLoadingdata(false);
      }
      getData();
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  }, [dispatch])

  const columns = [
    {
      title: 'Config Name',
      dataIndex: 'configName',
      key: 'configName',
    },
    {
      title: 'Source Type',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    {
      title: 'Space Key',
      dataIndex: 'spaceKey',
      key: 'spaceKey',
    },

    {
      title: 'Recursive Fetch',
      key: 'recursiveFetch',
      render: (text, record) => (
        <Tag color={text.recursiveFetch === "Yes" ? "success" : "error"} key={text}>
          {text.recursiveFetch === "Yes" ? "Yes" : "No"}
        </Tag>
      ),
    },

    {
      title: 'fetchAttachments',
      key: 'fetchAttachments',
      render: (text, record) => (
        <Tag color={text.fetchAttachments ? "success" : "error"}>
          {text.fetchAttachments ? "Yes" : "No"}
        </Tag>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="primary" shape="circle" icon={<FiEdit fontSize="20" />} onClick={() => onEditSourceHandler()} />
          </Tooltip>

          <Tooltip title="Delete">
            <CustomPopconfirm
              title="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary" shape="circle" icon={<FiTrash2 fontSize="20" />} />
            </CustomPopconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <CustomRow justify="center">
      <CustomCol xl={16} >
        <PageHeader
          title="Source Configurations List"
          className="FormPageHeader"
          extra={[
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          ]}
        >
        </PageHeader>

        <StyledCard className="formContainer">
          <Table className="m-b-20" loading={isLoadingdata} columns={columns} dataSource={SourceConfigList} bordered pagination={false} />
          <CustomRow >
            <CustomCol xxl={24} xl={24} className="text-right" >
              <Button type="primary" htmlType="submit" onClick={() => {
                history.push({
                  pathname: `${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`,
                });
              }}>
                Create Source
              </Button>
            </CustomCol>
          </CustomRow>
        </StyledCard>
      </CustomCol>

    </CustomRow>
  );
}

export default ListAllConfigTemplates;
