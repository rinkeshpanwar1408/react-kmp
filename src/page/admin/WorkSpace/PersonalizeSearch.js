import React, { useState } from "react";
import { Button, Form, PageHeader, Select, Space } from "antd";
import CustomRow from "../../../components/CustomRow";
import CustomCol from "../../../components/CustomCol";
import ConfigurationSwitch from "../../../components/ConfigurationSwitch";
import { StyledCard } from "../../../styled-components/CommonControls";
const { Option } = Select;

function PersonalizeSearch(props) {
    const [CreateSourceForm] = Form.useForm();
    const [isSorting, setisSorting] = useState(false);
    return (
        <React.Fragment>
            <CustomRow justify="center">
                <CustomCol xl={18}>
                    <PageHeader title="Personlize Your Search" className="FormPageHeader">
                    </PageHeader>

                    <StyledCard className="formContainer">
                        <Form
                            name="basic"
                            layout="vertical"
                            size="large"
                            autoComplete="off"
                            form={CreateSourceForm}
                        >

                            <CustomRow>
                                <CustomCol xl={12}>
                                    <Form.Item
                                        name="test"
                                        initialValue={false}
                                    >
                                        <ConfigurationSwitch title="Toggle between Text/Semantic Search" />
                                    </Form.Item>

                                    <Form.Item
                                        name="test2"
                                        initialValue={false}
                                    >
                                        <ConfigurationSwitch title="Toggle between Department/Relevance based Search" />
                                    </Form.Item>

                                    <Form.Item
                                        name="test3"
                                        initialValue={false}
                                    >
                                        <ConfigurationSwitch title="Voice based Search" />
                                    </Form.Item>

                                    <Form.Item
                                        name="test4"
                                        initialValue={false}
                                    >
                                        <ConfigurationSwitch title="Preview for documents" />
                                    </Form.Item>
                                </CustomCol>
                                <CustomCol xl={12}>
                                    <Form.Item
                                        name="test5"
                                        initialValue={false}
                                    >
                                        <ConfigurationSwitch title="Sorting" onValueChange={(val) => { setisSorting(val) }} />
                                    </Form.Item>
                                    {isSorting &&
                                        <Form.Item name="sortingfields">
                                            <Select
                                                showSearch
                                                placeholder="Select a Sorting Fields"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option key={"op1"} value={"Modified Date"}>Modified Date</Option>
                                                <Option key={"op2"} value={"Size"}>Size</Option>
                                                <Option key={"op3"} value={"Name"}>Name</Option>
                                            </Select>
                                        </Form.Item>
                                    }
                                    <Form.Item
                                        name="test6"
                                        initialValue={false}
                                    >
                                        <ConfigurationSwitch title="User Rating" />
                                    </Form.Item>

                                </CustomCol>
                            </CustomRow>
                            <CustomRow key="rw3">
                                <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                                    <Space direction="horizontal">
                                        <Button type="primary">
                                            Apply
                                        </Button>
                                        <Button type="primary">
                                            Apply For All
                                        </Button>
                                        <Button type="primary">
                                            Preview
                                        </Button>
                                    </Space>
                                </CustomCol>
                            </CustomRow>
                        </Form>
                    </StyledCard>

                </CustomCol>
            </CustomRow >


        </React.Fragment >
    );
}

export default PersonalizeSearch;
