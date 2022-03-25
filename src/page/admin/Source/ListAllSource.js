import { Menu, Dropdown, Space, Tooltip, Breadcrumb, Button, PageHeader, Popconfirm, Table, Tag } from "antd";
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



function ListAllSources(props) {
  const SourceList = useSelector(state => state.source.Sources);
  const dispatch = useDispatch();
  const [isLoadingdata, setIsLoadingdata] = useState(false);
  const { ShowErrorMessage } = useMessage();
  const RouteMatch = useRouteMatch();
  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => {
        history.push({
          pathname: `${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}`,
        });
      }} >{CONFLUENCE}</Menu.Item>
      <Menu.Item key="2" onClick={() => {
        history.push({
          pathname: `${RouteMatch.path}/${RouteUrl.SHAREPOINT}/${RouteUrl.CREATESOURCE}`,
        });
      }}>
        Sourcepoint Online
      </Menu.Item>
      <Menu.Item key="3" >
        3rd menu item
      </Menu.Item>
    </Menu>
  );

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
      getData();
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  }, [dispatch])

  const columns = [
    {
      title: 'Source Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Source Name',
      dataIndex: 'source_name',
      key: 'source_name',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
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

          <Tooltip title="Add Configuration Template">
            <Button type="default" shape="circle" icon={<FiSettings fontSize="20" />} onClick={() => {
              history.push({
                pathname: `${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`,
                search: `source=${text.full_source_name}`
              })
            }} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (<>
    <CustomRow justify="center">
      <CustomCol xl={16} >
        <PageHeader
          title="List All Sources"
          className="FormPageHeader"
          extra={[
            <Breadcrumb>
              <Breadcrumb.Item >
                <Link to={`${RouteUrl.MONITORJOBS}`}  > <HomeOutlined /></Link>

              </Breadcrumb.Item>
              <Breadcrumb.Item >
                Sources
              </Breadcrumb.Item>
            </Breadcrumb>
          ]}
        >
        </PageHeader>

        <StyledCard className="formContainer">
          <Table className="m-b-20" loading={isLoadingdata} columns={columns} dataSource={SourceList} bordered pagination={false} />
          <CustomRow >
            <CustomCol xxl={24} xl={24} className="text-right">
              <Dropdown overlay={menu}>
                <Button type="primary" >
                  Create Source <DownOutlined />
                </Button>
              </Dropdown>
            </CustomCol>
          </CustomRow>
        </StyledCard>
      </CustomCol>
    </CustomRow>
  </>
  );
}

export default ListAllSources;
