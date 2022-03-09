import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Modal, Form, Typography, Select, Switch, Checkbox, Tree, Divider } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch } from "react-redux";
import * as SourceActionCreator from "../../../../store/action/sourceActions";
import * as SourceConfigActionCreator from "../../../../store/action/sourceConfigActions";
import useMessage from "../../../../hooks/useMessage";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { sourceApi } from "../../../../utility/axios";
import { SourceConfig } from "../../../../model/Source";
import { CONFLUENCE, TEMPLATE } from "../../../../model/constant";

const { Title, Text } = Typography;
const { Option } = Select;
const { TreeNode } = Tree;

const createNewTreeData = (treeData, checkedKeys, parentArr = []) => {

  return treeData.reduce((acc, treeDataItem) => {
    if (checkedKeys.includes(treeDataItem.id)) {
      if (treeDataItem.children) {
        parentArr.push(treeDataItem.id)
        acc.push({
          ...treeDataItem,
          children: createNewTreeData(treeDataItem.children, checkedKeys, parentArr)
        });
      } else {
        acc.push(treeDataItem);
      }
    }
    return acc;
  }, []);
};

function updateTreeData(list, key, children) {
  return list.map((node) => {

    if (node.id === key) {
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
  const [showOtherFields, setshowOtherFields] = useState(false)
  const [showPageSelectionModal, setshowPageSelectionModal] = useState(false);
  const [IsEditMode, setIsEditMode] = useState(false);

  const [testtreeData, settesttreeData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [treecheckedKeys, settreeCheckedKeys] = useState([]);
  const [treeallCheckedKeys, setalltreeCheckedKeys] = useState([]);
  const [ExpandKeys, setExpandKeys] = useState([]);
  const [autoExpand, setautoExpand] = useState(false);

  const [validate, setValidate] = useState(false);
  const [CreateSourceForm] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    CreateSourceForm.setFieldsValue({
      source: params.get("source"),
      template: "Template"
    })
  }, [CreateSourceForm, location.search])

  useEffect(() => {
    const fillDropDown = () => {
      dispatch(SourceActionCreator.GetSources())
    }
    fillDropDown();

    //Create Tree Structure from existing data
    let tempParentArr = [];
    let tempChildArr = [];

    // if (localStorage.getItem("parentArr")) {
    //   tempParentArr = [...JSON.parse(localStorage.getItem("parentArr"))];
    // }

    // if (localStorage.getItem("testTreeData")) {
    //   tempChildArr = [...JSON.parse(localStorage.getItem("testTreeData"))];
    // }

    const combineArr = new Set([...tempChildArr, ...tempParentArr]);
    setalltreeCheckedKeys([...combineArr]);

    const getTestTreeData = async () => {

      function createInitialTreeData(list, key, children) {
        return list.map((node) => {
          if (node.id === key) {
            return { ...node, children };
          }
          if (node.children) {
            return { ...node, children: createInitialTreeData(node.children, key, children) };
          }
          return node;
        });
      }

      const result = await sourceApi.get("/getpages/Infy-Confluence/FSSTARA");
      let testArr = [];

      if (result?.data) {
        const isExist = tempParentArr.findIndex(i => i == result.data.id)

        if (isExist >= 0) {
          tempParentArr = tempParentArr.filter(i => i !== result.data.id);
          testArr.push(result.data);
          const resultChild = await sourceApi.get(`/getchildpages/Infy-Confluence/${result.data.id}`);
          const childArr = []
          resultChild.data.forEach(x => {
            const index = tempParentArr.findIndex(i => i == x.id);
            if (index >= 0) {
              childArr.push(x);
            }
          })
          testArr = createInitialTreeData(testArr, result.data.id, childArr);
        }

        tempParentArr.forEach(async (item) => {
          const resultChild = await sourceApi.get(`/getchildpages/Infy-Confluence/${item}`);
          const childArr = []
          resultChild.data.forEach(x => {
            const index = tempChildArr.findIndex(i => i == x.id);
            if (index >= 0) {
              childArr.push(x);
            }
          })
          testArr = createInitialTreeData(testArr, item, childArr);
          setnewData(testArr)
        });
      }
    }
    getTestTreeData();
  }, [dispatch])


  const submitHandler = async () => {
    try {
      const values = await CreateSourceForm.validateFields();
      const sourceDetail = await dispatch(SourceActionCreator.GetSourceDetail(values.source));
      const SorceConfig = new SourceConfig(
        values.configname,
        sourceDetail.data.source_name,
        values.configname + "-" + sourceDetail.data.full_source_name + "-" + TEMPLATE,
        sourceDetail.data.full_source_name
        ,CONFLUENCE, values.spacekey, values.recursiveflag, values.retriveattachments,
        treecheckedKeys, ExpandKeys, treecheckedKeys, [], "", []);

      debugger;
      if (IsEditMode) {
        // const result = await dispatch(
        //   ActionCreator.UpdateSource({
        //     id: sourceId,
        //     source_name: values.sourcename,
        //     source_type: CONFLUENCE,
        //     base_url: values.base_url,
        //     user_id: values.userId,
        //     password: values.password,
        //     userName: UserDetail.userName,
        //     validated: validate
        //   })
        // );

        // if (result.data) {
        //   ShowSuccessMessage("Config Template updated successfully");
        // }

      }
      else {
        const result = await dispatch(SourceConfigActionCreator.CreateSourceConfig(SorceConfig));
        if (result.data) {
          ShowSuccessMessage("Config Template created successfully");
        }
      }
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
  };

  const validateForm = () => {
    setValidate(!validate);
  }

  const onCheckHandler = (checkedKeys, e) => {
    const allCheckedKeys = [...checkedKeys, ...e.halfCheckedKeys];
    // createNewTreeData(treeData, allCheckedKeys);
    settreeCheckedKeys(checkedKeys);
    setalltreeCheckedKeys(allCheckedKeys);
  };

  const onLoadData = ({ key, children }) => {
    const getChildData = async () => {
      if (children) {
        return;
      }
      const result = await sourceApi.get(`/getchildpages/Infy-Confluence/${key}`);
      settesttreeData((origin) =>
        updateTreeData(origin, key, result.data)
      );
    }
    return getChildData(key);
  };


  const renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  const onModalToggleHandler = () => {
    const getTestTreeData = async () => {
      setautoExpand(false);
      const result = await sourceApi.get("/getpages/Infy-Confluence/FSSTARA");
      const testArr = [];
      testArr.push(result.data)
      settesttreeData(testArr);
      // if (localStorage.getItem("parentArr")) {
      //   const ExpandKeysData = JSON.parse(localStorage.getItem("parentArr"));
      //   setExpandKeys(ExpandKeysData)
      // }
      // if (localStorage.getItem("testTreeData")) {
      //   settreeCheckedKeys(JSON.parse(localStorage.getItem("testTreeData")))
      // }
    }
    if (testtreeData.length <= 0) {
      getTestTreeData();
    }
    setshowPageSelectionModal(true);
  }

  const onPageSaveSelectionHandler = () => {
    // if (localStorage.getItem("testTreeData")) {
    //   localStorage.removeItem("testTreeData");
    // }
    // localStorage.setItem("testTreeData", JSON.stringify(treecheckedKeys));

    const parentArr = []
    const newData = createNewTreeData(testtreeData, treeallCheckedKeys, parentArr);
    // if (localStorage.getItem("parentArr")) {
    //   localStorage.removeItem("parentArr")
    // }
    // localStorage.setItem("parentArr", JSON.stringify(parentArr));

    setshowPageSelectionModal(false);
    setnewData(newData);
  }

  return (
    <React.Fragment>
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
              autoComplete="off"
              onFinish={submitHandler}
              form={CreateSourceForm}
            >
              <CustomRow key="rw1">
                <CustomCol key="rw1.1" xl={10} >
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
                    <Input placeholder="Enter Source Name" />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.2" xl={10}  >
                  <Form.Item
                    name="source"
                    label="Source"
                    rules={[{
                      required: true, message: "Please input your Source Type!",
                    }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a Source"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {SourceList.map((item, i) => {
                        return <Option key={i} value={item.full_source_name}>{item.full_source_name}</Option>
                      })}
                    </Select>
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.3" xl={4} className="source_type_divider">
                  <Title level={4} className=" m-b-0">-Template</Title>
                </CustomCol>
              </CustomRow>

              <CustomRow key="rw2">

                <CustomCol key="rw2.1" xl={10} >
                  <Form.Item
                    name="spacekey"
                    label="Space Name to Extract Data"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Space Name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Space Name"
                    />
                  </Form.Item>
                </CustomCol>
                <CustomCol key="rw2.2" xl={6}>
                  <Form.Item label="Retrive Attachments?" valuePropName="checked" name="retriveattachments" >
                    <Switch checkedChildren="On" checked unCheckedChildren="Off" />
                  </Form.Item>

                </CustomCol>
              </CustomRow>

              <CustomRow key="rw3">
                <CustomCol key="rw3.1" xl={9}>
                  <Form.Item label={<div className="form_title_with_sub">
                    <Text className="form_title_with_sub-title">Recursive Flag</Text>
                    <Text type="secondary" className="form_title_with_sub-subtitle">Turn this off to select specific child pages</Text>
                  </div>} valuePropName="checked" name="recursiveflag" >
                    <Switch checkedChildren="On" defaultChecked unCheckedChildren="Off" onChange={() => setshowOtherFields(!showOtherFields)} />
                  </Form.Item>

                  {showOtherFields &&
                    <React.Fragment>
                      <Button type="primary" size="small" className="m-b-10" onClick={() => {
                        onModalToggleHandler()
                      }}>
                        Fetch Confluence Page Tree
                      </Button>

                      <Tree
                        treeData={newData}
                        autoExpandParent={false}
                        // expandedKeys={JSON.parse(localStorage.getItem("parentArr"))}
                        fieldNames={{
                          title: "title", key: "id", children: "children"
                        }}
                      />
                    </React.Fragment>
                  }
                </CustomCol>
              </CustomRow>

              <CustomRow key="rw4">
                <CustomCol key="rw4.1" xxl={24} xl={24} className="text-right">
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

      <Modal
        title="Confluence Page Tree"
        visible={showPageSelectionModal}
        onCancel={() => {
          onPageSaveSelectionHandler()
        }}
        width={"30%"}
        footer={
          <Button onClick={() => {
            onPageSaveSelectionHandler()
          }}>Close</Button>
        }
      >
        <Tree
          checkable
          autoExpandParent={autoExpand}
          loadData={onLoadData}
          treeData={testtreeData}
          onCheck={onCheckHandler}
          checkedKeys={treecheckedKeys}
          expandedKeys={ExpandKeys}
          onExpand={(keys, info) => {
            if (info.expanded) {
              setautoExpand(true);
              if (!ExpandKeys.includes(info.node.key)) {
                setExpandKeys(ExpandKeys.concat(info.node.key))
              }
            }
            else {
              if (ExpandKeys.includes(info.node.key)) {
                const keys = [...ExpandKeys];
                const newKeys = keys.filter(i => i !== info.node.key);
                setExpandKeys(newKeys)
              }
            }
          }}
          fieldNames={{
            title: "title", key: "id", children: "children"
          }} />
      </Modal>
    </React.Fragment>
  );
}
export default ConfigConfluenceTemplate;





