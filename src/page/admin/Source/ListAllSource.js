import { Breadcrumb, Button, PageHeader, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../styled-components/CommonControls";
import CustomCol from "../../../components/CustomCol";
import CustomRow from "../../../components/CustomRow";
import { FiEdit, FiSettings, FiTrash2 } from "react-icons/fi";
import { sourceApi } from "../../../utility/axios";
import { useDispatch, useSelector } from "react-redux";
import { GetSources } from "../../../store/action/sourceActions";
import CustomPopconfirm from "../../../components/CustomPopconfirm";
import useMessage from "../../../hooks/useMessage";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import * as RouteUrl from "../../../model/route";

function ListAllSources(props) {
  const SourceList = useSelector(state => state.source.Sources);
  const dispatch = useDispatch();
  const [isLoadingdata, setIsLoadingdata] = useState(false);
  const { ShowErrorMessage } = useMessage();
  const RouteMatch = useRouteMatch();
  const history = useHistory();

  const onEditSourceHandler = (source) => {
    history.push({
      pathname: `${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}/${source}`,
    });
  }

  useEffect(() => {
    try {
      const getData = async () => {
        debugger;
        setIsLoadingdata(true);
        const response = await dispatch(GetSources());
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
            <Button type="primary" shape="circle" icon={<FiEdit fontSize="20" />} onClick={() => onEditSourceHandler(text.full_source_name)} />
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

          <Tooltip title="Add Configuration Template">
            <Button type="default" shape="circle" icon={<FiSettings fontSize="20" />} onClick={() => {
              debugger;
              history.push({
                pathname:`${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`,
                search:`source=${text.full_source_name}`
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
            <CustomCol xxl={24} xl={24} className="text-right" >
              <Button type="primary" htmlType="submit" onClick={() => {
                history.push({
                  pathname: `${RouteMatch.path}/${RouteUrl.CONFLUENCE}/${RouteUrl.CREATESOURCE}`,
                });
              }}>
                Create Source
              </Button>
            </CustomCol>
          </CustomRow>
        </StyledCard>
      </CustomCol>

    </CustomRow>
  </>
  );
}

export default ListAllSources;
