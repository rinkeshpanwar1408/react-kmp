import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Modal, Form, Typography, Select, Switch, Tree, Checkbox } from "antd";
import { HomeOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch } from "react-redux";
import * as SourceActionCreator from "../../../../store/action/sourceActions";
import * as SourceConfigActionCreator from "../../../../store/action/sourceConfigActions";
import useMessage from "../../../../hooks/useMessage";
import { Link, useLocation } from "react-router-dom";
import * as RouteUrl from "../../../../model/route";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { sourceApi } from "../../../../utility/axios";
import { ConfluenceSourceConfig } from "../../../../model/Source";
import { CONFLUENCE, TEMPLATE } from "../../../../model/constant";
import * as ActionCreator from "../../../../store/action/sourceConfigActions";

const { Title, Text } = Typography;
const { Option } = Select;
const { TreeNode } = Tree;



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
  const [showOtherFields, setshowOtherFields] = useState(true)
  const [showPageSelectionModal, setshowPageSelectionModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsEditMode, setIsEditMode] = useState(false);
  const [ConfigId, setConfigId] = useState(0);

  const [SelectedTreeData, setSelectedTreeData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [CheckedTreeKeys, setCheckedTreeKeys] = useState([]);
  const [TempCheckedTreeKeys, setTempCheckedTreeKeys] = useState([]);
  const [AllCheckedTreeKeys, setAllCheckedTreeKeys] = useState([]);
  const [ExpandKeys, setExpandKeys] = useState([]);
  const [autoExpand, setautoExpand] = useState(false);

  const [CreateSourceConfigForm] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const { full_config_name } = useParams();
  useEffect(() => {
    try {
      const getDetail = async () => {
        const response = await dispatch(ActionCreator.GetSourceConfigDetail(full_config_name));
        CreateSourceConfigForm.setFieldsValue({
          recursiveflag: response.data[0].recursive_fetch,
          configname: response.data[0].config_name,
          source: response.data[0].full_source_name,
          retriveattachments: response.data[0].fetch_attachments,
          spacekey: response.data[0].space_key,
        });
        setshowOtherFields(response.data[0].recursive_fetch)
        setConfigId(response.data[0].id)
        setSelectedTreeData(response.data[0].full_item_tree);
        setnewData(response.data[0].selected_item_tree);
        setExpandKeys(response.data[0].parent_items)
        setCheckedTreeKeys(response.data[0].checked_items);

        const combineArr = new Set([...response.data[0].checked_items, ...response.data[0].parent_items]);
        setAllCheckedTreeKeys([...combineArr]);
      }

      if (full_config_name) {
        setIsEditMode(true);
        getDetail();
      }
      else {
        CreateSourceConfigForm.setFieldsValue({
          sourcetype: CONFLUENCE,
        });
      }
    } catch (error) {
      ShowWarningMessage("Something Went Wrong");
    }
  }, [full_config_name, IsEditMode])

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    CreateSourceConfigForm.setFieldsValue({
      source: params.get("source"),
      template: "Template"
    })
  }, [CreateSourceConfigForm, location.search])

  useEffect(() => {
    const fillDropDown = () => {
      dispatch(SourceActionCreator.GetSources())
    }
    fillDropDown();

  }, [dispatch])


  const OnFormSubmitHandler = async () => {
    try {
      const values = await CreateSourceConfigForm.validateFields();
      const sourceDetail = await dispatch(SourceActionCreator.GetSourceDetail(values.source));

      const SorceConfig = new ConfluenceSourceConfig(
        values.configname,
        sourceDetail.data.source_name,
        values.configname + "-" + sourceDetail.data.full_source_name + "-" + TEMPLATE,
        sourceDetail.data.full_source_name, CONFLUENCE, values.spacekey,
        showOtherFields, values.retriveattachments ? values.retriveattachments : false,
        CheckedTreeKeys, ExpandKeys, newData, SelectedTreeData);

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
          resetData();
        }
      }
    }
    catch (error) {
      ShowErrorMessage("Something Went Wrong");
      resetData();
    }
  };

  const resetData = () => {
    setnewData([])
    setCheckedTreeKeys([]);
    setTempCheckedTreeKeys([]);
    setAllCheckedTreeKeys([]);
    setExpandKeys([]);

    CreateSourceConfigForm.resetFields();
  }

  const onCheckHandler = (checkedKeys, e) => {
    const allCheckedKeys = [...checkedKeys, ...e.halfCheckedKeys];
    setCheckedTreeKeys(checkedKeys);
    setTempCheckedTreeKeys(e.checkedNodes.map(item => {
      return {
        id: item.id,
        parent_page_id: item.parent_page_id
      }
    }));


    setAllCheckedTreeKeys(allCheckedKeys);
  };

  const onLoadData = ({ key, children }) => {
    const getChildData = async () => {
      if (children) {
        return;
      }
      const result = await sourceApi.get(`/getchildpages/Infy-Confluence/${key}`);
      setSelectedTreeData((origin) =>
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
      testArr.push(result.data);
      setSelectedTreeData(testArr);
      // if (localStorage.getItem("parentArr")) {
      //   const ExpandKeysData = JSON.parse(localStorage.getItem("parentArr"));
      //   setExpandKeys(ExpandKeysData)
      // }
      // if (localStorage.getItem("testTreeData")) {
      //   settreeCheckedKeys(JSON.parse(localStorage.getItem("testTreeData")))
      // }
    }
    if (SelectedTreeData.length <= 0) {
      getTestTreeData();
    }
    setshowPageSelectionModal(true);
  }

  const onPageSaveSelectionHandler = () => {
    const parentArr = [];
    let childArr = [...TempCheckedTreeKeys];

    const createNewTreeData = (treeData, allCheckedNodes) => {
      return treeData.reduce((acc, treeDataItem) => {
        if (allCheckedNodes.includes(treeDataItem.id)) {
          if (treeDataItem.children) {
            if (childArr.find(x => x.id === treeDataItem.id)) {
              childArr = childArr.filter(i => i.parent_page_id !== treeDataItem.id);
            }
            parentArr.push(treeDataItem.id)
            acc.push({
              ...treeDataItem,
              children: createNewTreeData(treeDataItem.children, allCheckedNodes)
            });
          } else {
            acc.push(treeDataItem);
          }
        }
        return acc;
      }, []);
    };

    const newData = createNewTreeData(SelectedTreeData, AllCheckedTreeKeys);
    const newCheckedKeys = childArr.map(i => i.id);
    setCheckedTreeKeys(newCheckedKeys);
    setshowPageSelectionModal(false);
    setnewData(newData);
  }

  return (
    <React.Fragment>
      <CustomRow justify="center">
        <CustomCol xl={18} >
          <PageHeader
            title={IsEditMode ? "Update Config Template" : "Create Config Template"}

            className="FormPageHeader"
            extra={[
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.MONITORJOBS}`}>
                    <HomeOutlined />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.LISTALLSOURCECONFIGTEMPLATES}`}>
                    Config Templates
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Confluence</Breadcrumb.Item>
                {!full_config_name && <Breadcrumb.Item>Create Config Template</Breadcrumb.Item>}
                {full_config_name && <Breadcrumb.Item>{full_config_name}</Breadcrumb.Item>}
                {full_config_name && <Breadcrumb.Item>Edit</Breadcrumb.Item>}
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
              onFinish={() => {
                OnFormSubmitHandler();
              }}
              form={CreateSourceConfigForm}
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

                <CustomCol key="rw1.2" xl={8}  >
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

                <CustomCol key="rw1.3" xl={6} className="source_type_divider">
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
                <CustomCol key="rw2.2" xl={8}>
                  <Form.Item label={<div className="form_title_with_sub">
                    <Text className="form_title_with_sub-title">Recursive Flag</Text>
                    <Text type="secondary" className="form_title_with_sub-subtitle">Turn this off to select specific child pages</Text>
                  </div>} valuePropName="checked" name="recursiveflag" >
                    <Switch checkedChildren="On" defaultChecked={showOtherFields} unCheckedChildren="Off" onChange={() => setshowOtherFields(!showOtherFields)} />
                    {showOtherFields === false &&
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
                  </Form.Item>

                </CustomCol>
                <CustomCol key="rw2.3" xl={6}>
                  <Form.Item label="Retrive Attachments?" name="retriveattachments" valuePropName="checked" >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                  </Form.Item>
                </CustomCol>
              </CustomRow>


              <CustomRow key="rw4">
                <CustomCol key="rw4.1" xxl={24} xl={24} className="text-right">
                  <Space direction="horizontal">
                    <Button type="primary" htmlType="submit" loading={IsLoading}>
                      {IsEditMode ? "Update Config" : "Create Config"}
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
          treeData={SelectedTreeData}
          onCheck={onCheckHandler}
          checkedKeys={CheckedTreeKeys}
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





