import React from "react";
import { Button, Menu, PageHeader, Popover, Progress, Steps, Table, Tag, Typography } from "antd";
import InfoBox from "../../components/InfoBox";
import CustomRow from "../../components/CustomRow";
import CustomCol from "../../components/CustomCol";
import { FiCodesandbox, FiGitMerge, FiGrid, FiInfo, FiMail, FiSettings, FiUser } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { StyledCard } from "../../styled-components/CommonControls";
import { Link } from "react-router-dom";
const { Step } = Steps;
const { Text } = Typography

function Dashboard(props) {
    const dataSource = [
        {
            key: '1',
            name: 'Source-1',
            SourceTemplate: 0,
            WorkSpace: 0,
            Jobs: 0,
            Progress: 10
        },
        {
            key: '2',
            name: 'Source-2',
            SourceTemplate: 3,
            WorkSpace: 0,
            Jobs: 0,
            Progress: 50
        },
        {
            key: '3',
            name: 'Source-3',
            SourceTemplate: 4,
            WorkSpace: 3,
            Jobs: 0,
            Progress: 75
        },
        {
            key: '4',
            name: 'Source-4',
            SourceTemplate: 6,
            WorkSpace: 5,
            Jobs: 3,
            Progress: 100
        },
    ];

    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );

    const columns = [
        {
            title: 'Source',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Config Template',
            dataIndex: 'SourceTemplate',
            key: 'SourceTemplate',
            render: (text, record) => {
                if (text === 0) {
                    return <React.Fragment>
                        <div>
                            <Tag color="error">Pending</Tag>
                            <Popover title="Info" content={
                                <Text>For this source configuration template is missing please click <Link to={`#`}>here</Link> to create</Text>
                            } trigger="hover">
                                <Button type="link"><FiInfo size={20} /></Button>
                            </Popover>
                        </div>
                    </React.Fragment>
                }
                return text;
            }
        },
        {
            title: 'Workspaces',
            dataIndex: 'WorkSpace',
            key: 'WorkSpace',
            render: (text, record) => {
                if (text === 0) {
                    return <Tag color="error">Pending</Tag>
                }
                return text;
            }
        },
        {
            title: 'Jobs',
            dataIndex: 'Jobs',
            key: 'Jobs',
            render: (text, record) => {
                if (text === 0) {
                    return <Tag color="error">Pending</Tag>
                }
                return text;
            }
        },
        {
            title: 'Progress',
            key: 'Progress',
            dataIndex: 'Progress',
            render: (text, record) => {
                return <Progress  percent={text} size="small" />
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
