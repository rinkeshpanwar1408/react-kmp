import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form, Typography, Select, Switch, Checkbox, Tree } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch } from "react-redux";
import { CreateSource, GetSources } from "../../../../store/action/sourceActions";
import useMessage from "../../../../hooks/useMessage";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const { Title } = Typography;
const { Option } = Select;

const initTreeData = [
  {
    title: 'Expand to load',
    key: '0',
  },
  {
    title: 'Expand to load',
    key: '1',
  },
  {
    title: 'Tree Node',
    key: '2',
    isLeaf: true,
  },
];

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }

    if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) };
    }

    return node;
  });
}

function ConfigConfluenceTemplate(props) {
  const SourceList = useSelector(state => state.source.Sources);

  const [validate, setValidate] = useState(false);
  const [CreateSourceForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const history = useHistory();
  const match = useRouteMatch();
  const params = useParams();



  useEffect(() => {
    const fillDropDown = () => {
      dispatch(GetSources())
    }
    debugger;
    if (SourceList.length <= 0) {
      fillDropDown();
    }
  }, [dispatch, SourceList])


  const submitHandler = async () => {
    try {
      const values = await CreateSourceForm.validateFields();
      const result = await dispatch(
        CreateSource({
          id: 0,
          source_name: values.sourcename + "-" + "Confluence",
          base_url: values.base_url,
          user_id: values.useriD,
          password: values.password,
          userName: "",
          validated: validate
        })
      );

      if (!result.data) {
        ShowWarningMessage("data is not correct");
      } else {
        ShowSuccessMessage("Source created successfully");
      }
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }

  };
  const validateForm = () => {
    setValidate(!validate);
  }

  const [treeData, setTreeData] = useState(initTreeData);
  const onLoadData = ({ key, children }) =>
    new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }

      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            {
              title: 'Child Node',
              key: `${key}-0`,
            },
            {
              title: 'Child Node',
              key: `${key}-1`,
            },
          ]),
        );
        resolve();
      }, 1000);
    });


  return (
    <CustomRow justify="center">
      <CustomCol xl={18} >
        <PageHeader
          title="Create Config Template"
          className="FormPageHeader"
          extra={[
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`/${RouteUrl.MONITORJOBS}`}>
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Config Template</Breadcrumb.Item>
            </Breadcrumb>
          ]}
        >
        </PageHeader>
        <StyledCard className="formContainer">
          <Form
            name="basic"
            layout="vertical"
            size="large"
            autocomplete="off"
            onFinish={submitHandler}
            form={CreateSourceForm}
          >
            <CustomRow key="rw1">
              <CustomCol key="rw1.1" xl={9} >
                <Form.Item
                  name="configname"
                  label="Config Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Config Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Source Name"
                  />
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw1.2" xl={9}  >
                <Form.Item
                  name="sources"
                  label="Source"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Source Type!",
                    },
                  ]}
                >

                  <Select
                    showSearch
                    placeholder="Select a Source"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      SourceList.map((item, i) => {
                        return < Option value={item.source_name}>{item.source_name}</Option>
                      })
                    }
                  </Select>

                </Form.Item>
              </CustomCol>
            </CustomRow>

            <CustomRow key="rw2">
             
              <CustomCol key="rw2.2" xl={9}>
                <Form.Item
                  name="RecursiveFlag"
                  label="Recursive Flag"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Source Type!",
                    },
                  ]}
                >
                  <Switch defaultChecked checkedChildren={"On"} unCheckedChildren="Off" />
                </Form.Item>
                <Tree checkable loadData={onLoadData} treeData={treeData} />

              </CustomCol>
              <CustomCol key="rw2.3" xl={9}>
                <Form.Item
                  name="sources"
                  label="Retrive Attachments?"
                >
                  <Switch defaultChecked checkedChildren={"On"} unCheckedChildren="Off" />
                </Form.Item>

              </CustomCol>

              <CustomCol key="rw2.1" xl={6} >
                <Form.Item
                  name="spaceKey"
                  label="Space Key"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Space Key!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Space Key"
                  />
                </Form.Item>
              </CustomCol>
            </CustomRow>



            <CustomRow key="rw3">
              <CustomCol key="rw3.1" xxl={24} xl={24} className="text-right">
                <Space direction="horizontal">
                  <Button type="primary" htmlType="submit">
                    Create Config
                  </Button>
                </Space>
              </CustomCol>
            </CustomRow>
          </Form>

        </StyledCard>
      </CustomCol>
    </CustomRow >
  );
}

export default ConfigConfluenceTemplate;

