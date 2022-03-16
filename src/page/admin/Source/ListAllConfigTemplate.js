import { Menu, Breadcrumb, Button, Empty, PageHeader, Space, Table, Tag, Tooltip, Tree, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { HomeOutlined, DownOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../styled-components/CommonControls";
import CustomCol from "../../../components/CustomCol";
import CustomRow from "../../../components/CustomRow";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiNetworkChart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomPopconfirm from "../../../components/CustomPopconfirm";
import useMessage from "../../../hooks/useMessage";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../model/route";
import * as ActionCreators from "../../../store/action/sourceConfigActions";
import CustomPopover from "../../../components/CustomPopover";
import { CONFLUENCE } from "../../../model/constant";

function ListAllConfigTemplates(props) {
  const [TreeData, setTreeData] = useState([]);
  const [ExpandedKeys, setExpandedKeys] = useState([]);

  const SourceConfigList = useSelector(state => state.sourceConfig.SourceConfigs);
  const dispatch = useDispatch();
  const [isLoadingdata, setIsLoadingdata] = useState(false);
  const { ShowErrorMessage } = useMessage();
  const RouteMatch = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    try {
      const getData = async () => {
        setIsLoadingdata(true);
        const response = await dispatch(ActionCreators.GetSourceConfigList());
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
      dataIndex: 'config_name',
      key: 'config_name',
    },
    {
      title: 'Source Type',
      dataIndex: 'source_type',
      key: 'source_type',
    },
    {
      title: 'Space Key',
      dataIndex: 'space_key',
      key: 'space_key',
    },

    {
      title: 'Recursive Fetch',
      key: 'recursiveFetch',
      render: (text, record) => (
        <Tag color={text.recursive_fetch ? "success" : "error"} key={text}>
          {text.recursive_fetch ? "Yes" : "No"}
        </Tag>
      ),
    },

    {
      title: 'fetchAttachments',
      key: 'fetchAttachments',
      render: (text, record) => (
        <Tag color={text.fetch_attachments ? "success" : "error"}>
          {text.fetch_attachments ? "Yes" : "No"}
        </Tag>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="primary" shape="circle" icon={<FiEdit fontSize="20" />} onClick={() => onEditSourceConfigHandler(text.full_config_name)} />
          </Tooltip>

          <Tooltip title="Delete">
            <CustomPopconfirm
              title="Are you sure to delete this config template?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDeleteSourceConfigHandler(text.full_config_name)}
            >
              <Button danger type="primary" shape="circle" icon={<FiTrash2 fontSize="20" />} />
            </CustomPopconfirm>
          </Tooltip>

          {
            !text.recursive_fetch &&
            <Tooltip title="View Selected">
              <Button shape="circle" icon={<BiNetworkChart fontSize="25" />} onClick={() => {
                setTreeData(text.selected_item_tree);
                setExpandedKeys(text.parent_items);
              }} />
            </Tooltip>}
        </Space>
      ),
    },
  ];

  const onEditSourceConfigHandler = (FullConfigName) => {
    history.push({
      pathname: `${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}/${FullConfigName}`,
    });
  }


  const onDeleteSourceConfigHandler = async (FullConfigName) => {
    try {
      const response = await dispatch(ActionCreators.DeleteSourceConfig(FullConfigName));
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => {
        history.push({
          pathname: `${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`,
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

  return (
    <CustomRow justify="center">
      <CustomCol xl={22}>
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

        <CustomRow>
          <CustomCol xl={18} >
            <StyledCard className="formContainer">
              <Table className="m-b-20" loading={isLoadingdata} columns={columns}
                dataSource={SourceConfigList} bordered pagination={false} />
              <CustomRow >
                <CustomCol className="text-right" >
                  <Dropdown overlay={menu}>
                    <Button type="primary" >
                      Create Config <DownOutlined />
                    </Button>
                  </Dropdown>
                </CustomCol>
              </CustomRow>
            </StyledCard>
          </CustomCol>

          <CustomCol xl={6} className="m-t-20">
            <StyledCard title="Selected Items">
              {TreeData.length > 0 ? <Tree
                treeData={TreeData}
                autoExpandParent={true}
                expandedKeys={ExpandedKeys}
                fieldNames={{
                  title: "title", key: "id", children: "children"
                }}
              /> :
                <Empty />
              }
            </StyledCard>
          </CustomCol>
        </CustomRow>

      </CustomCol>

    </CustomRow>
  );
}

export default ListAllConfigTemplates;
