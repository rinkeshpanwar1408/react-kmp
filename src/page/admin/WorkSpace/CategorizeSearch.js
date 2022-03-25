
import React, { useState } from "react";
import { Button, Form, InputNumber, PageHeader, Select, Space } from "antd";
import CustomRow from "../../../components/CustomRow";
import CustomCol from "../../../components/CustomCol";
import ConfigurationSwitch from "../../../components/ConfigurationSwitch";
import { StyledCard } from "../../../styled-components/CommonControls";
const { Option } = Select;

function CategorizeSearch(props) {
    const [CreateSourceForm] = Form.useForm();
    const [isfacet, setisfacet] = useState(false);
    const [isAdvanceSearch, setisAdvanceSearch] = useState(false);
    return (
        <React.Fragment>
            <CustomRow justify="center">
                <CustomCol xl={10}>
                    <PageHeader title="Categorize Your Search" className="FormPageHeader">
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
                                <CustomCol xl={24}>
                                    <Form.Item name="test" initialValue={false}>
                                        <ConfigurationSwitch title="Facets" onValueChange={(val) => { setisfacet(val) }} />
                                    </Form.Item>
                                    {isfacet &&
                                        <Form.Item name="facetsfields">
                                            <Select mode="tags" placeholder="Tags Select your facets">
                                                <Option key={"source"} value={"Source"}>Source</Option>
                                                <Option key={"department"} value={"Department"}>Department</Option>
                                                <Option key={"author"} value={"Author"}>Author</Option>
                                            </Select>
                                        </Form.Item>
                                    }

                                    <Form.Item
                                        name="test"
                                        initialValue={false}
                                    >
                                        <ConfigurationSwitch title="Advance Search" />
                                    </Form.Item>

                                    <Form.Item label="Entries Per Page" initialValue={0}>
                                        <InputNumber defaultValue={10} max={100} min={1}/>
                                    </Form.Item>
                                </CustomCol>
                            </CustomRow>
                            <CustomRow key="rw3">
                                <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                                    <Space direction="horizontal">
                                        <Button type="primary" onClick={async () => {
                                            const values = await CreateSourceForm.validateFields();
                                            console.log(values);

                                        }}>
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

export default CategorizeSearch;
