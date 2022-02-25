import React,{useState} from "react";
import { Breadcrumb, Button, Input, PageHeader, Space, Table, Tag, Form } from "antd";
import { HomeOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { StyledCard } from "../../../../styled-components/CommonControls";
import CustomRow from "../../../../components/CustomRow";
import CustomCol from "../../../../components/CustomCol";
import { useDispatch } from "react-redux";
import { CreateSource } from "../../../../store/action/sourceActions";
import useMessage from "../../../../hooks/useMessge";
import { createSource } from "../../../../store/action/actions";

function CreateConfluenceSource(props) {
const [validate, setValidate]=useState(false);
 const [CreateSourceForm] = Form.useForm();
  const dispatch=useDispatch();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const submitHandler = async () => {
    
    try {
       const values = await CreateSourceForm.validateFields();
     const result=await dispatch(
        CreateSource({
          id:0,
          source_name : values.sourcename+"-"+"Confluence",
          confluence_url : values.confluenceurl,
          user_id : values.useriD,
          password : values.password,
          userName : "",
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
const validateForm=()=>{
   setValidate(!validate);
}
  return (
    <div>
      <CustomRow>
        <CustomCol xl={16} >
          <PageHeader
            title="Create Source"
            className="FormPageHeader"
            subTitle="This is a subtitle"
            extra={[
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <UserOutlined />
                  <span>Application List</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Application</Breadcrumb.Item>
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
                <CustomCol key="rw1.1" >
                  <Form.Item
                    name="sourcename"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Source Name!",
                      },
                    ]}
                  >

                    <Input
                      placeholder="Source Name"
                      addonAfter="Confluence"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.2" >
                  <Form.Item
                    name="confluenceurl"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Confluence Url!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Confluence Url"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.3" >
                  <Form.Item
                    name="useriD"
                    rules={[
                      {
                        required: true,
                        message: "Please input your User ID!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="User ID"
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol key="rw1.4" >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Password"
                    />
                  </Form.Item>
                </CustomCol>
              </CustomRow>


              <CustomRow key="rw2">
                <CustomCol key="rw1.3" xxl={24} xl={24} className="text-right">
                  <Space direction="horizontal">
                    <Button type="primary" onClick={validateForm} >
                      Validate
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Add
                    </Button>
                  </Space>
                </CustomCol>
              </CustomRow>
            </Form>

          </StyledCard>
        </CustomCol>
      </CustomRow>
    </div>
  );
}

export default CreateConfluenceSource;
