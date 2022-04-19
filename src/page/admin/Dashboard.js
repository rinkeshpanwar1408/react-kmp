import React from "react";
import { Button, Menu, PageHeader, Popover, Progress, Steps, Table, Tag, Typography } from "antd";
import InfoBox from "../../components/InfoBox";
import CustomRow from "../../components/CustomRow";
import CustomCol from "../../components/CustomCol";
import { FiCodesandbox, FiGitMerge, FiGrid, FiInfo, FiMail, FiSettings, FiUser } from "react-icons/fi";
import {
    CheckCircleOutlined,
} from '@ant-design/icons';
import { StyledCard } from "../../styled-components/CommonControls";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../model/route";

const { Step } = Steps;
const { Text } = Typography

function Dashboard(props) {
    const history = useHistory();
    const match = useRouteMatch();
    const dataSource = [
        {
            key: '1',
            WorkSpace: "Infosys Internal",
            Sources: 1,
            ConfigTemplate: 1,
            IngestionSetting: 0,
            Job: 0,
            ViewSetting: 0,
            Progress: 10
        },
        // {
        //     key: '2',
        //     WorkSpace: "Workspace-2",
        //     Sources: 2,
        //     ConfigTemplate: 1,
        //     IngestionSetting: 0,
        //     Job: 0,
        //     ViewSetting: 0,
        //     Progress: 10
        // },
        // {
        //     key: '3',
        //     WorkSpace: "Workspace-3",
        //     Sources: 0,
        //     ConfigTemplate: 0,
        //     IngestionSetting: 0,
        //     Job: 0,
        //     ViewSetting: 0,
        //     Progress: 10
        // },
        // {
        //     key: '4',
        //     WorkSpace: "Workspace-4",
        //     Sources: 0,
        //     ConfigTemplate: 0,
        //     IngestionSetting: 0,
        //     Job: 0,
        //     ViewSetting: 0,
        //     Progress: 10
        // },
    ];


    const columns = [
        {
            title: 'Workspace',
            dataIndex: 'WorkSpace',
            key: 'WorkSpace',

        },
        {
            title: 'Sources',
            dataIndex: 'Sources',
            key: 'Sources',
            render: (text, record) => {
                if (text === 0) {
                    return <Tag color="error" >Pending</Tag>
                }
                return <Tag color="success" onClick={() => {
                    history.push({
                        pathname: `${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.QUICKSETUP}`,
                        search: '?step=2',
                    });
                }}>Done</Tag>
            }
        },
        {


            title: 'Config Template',
            dataIndex: 'ConfigTemplate',
            key: 'ConfigTemplate',
            render: (text, record) => {
                if (text === 0) {
                    return <Tag color="error">Pending</Tag>
                }
                return <Tag color="success">Done</Tag>;
            }
        },

        {
            title: 'Ingestion Setting',
            dataIndex: 'IngestionSetting',
            key: 'IngestionSetting',
            render: (text, record) => {
                if (text === 0) {
                    return <Tag color="error">Pending</Tag>
                }
                return <Tag color="success">Done</Tag>;
            }
        },

        {
            title: 'Job',
            dataIndex: 'Job',
            key: 'Job',
            render: (text, record) => {
                if (text === 0) {
                    return <Tag color="error">Pending</Tag>
                }
                return <Tag color="success">Done</Tag>;
            }
        },

        {
            title: 'View Setting',
            dataIndex: 'ViewSetting',
            key: 'ViewSetting',
            render: (text, record) => {
                if (text === 0) {
                    return <Tag color="error">Pending</Tag>
                }
                return <Tag color="success">Done</Tag>;
            }
        },

        {
            title: 'Progress',
            key: 'Progress',
            dataIndex: 'Progress',
            render: (text, record) => {
                return <Progress percent={text} size="small" />
            }
        },

    ];

    return (
        <React.Fragment>
            <CustomRow>
                <CustomCol xl={6}>
                    <InfoBox icon={<FiCodesandbox />} title="Total Sources" count={25} />
                </CustomCol>

                <CustomCol xl={6}>
                    <InfoBox icon={<FiSettings />} title="Total Config Template" count={50} />
                </CustomCol>

                <CustomCol xl={6}>
                    <InfoBox icon={<FiGrid />} title="Total Workspace" count={35} />
                </CustomCol>

                <CustomCol xl={6}>
                    <InfoBox icon={<FiUser />} title="Total User" count={100} />
                </CustomCol>
            </CustomRow>

            <CustomRow>
                <CustomCol xl={24}>
                    <StyledCard className="m-t-10">
                        <Table bordered pagination={false} dataSource={dataSource} columns={columns} />
                    </StyledCard>
                </CustomCol>
            </CustomRow>

        </React.Fragment>
    );
}

export default Dashboard;
