import React, { useState } from "react";
import { StyledMainContentContainer } from "../styled-components/Master";
import background from "../assests/image/header_bg_light.png";
//import background from "../assests/image/header-bg-dark.png";
import { StyledCard } from "../styled-components/CommonControls";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import infy from "../assests/image/InfosysLogo.png";
import { useDispatch } from "react-redux";
import * as ActionCreator from "../store/action/AuthActions";
import useMessage from "../hooks/useMessage";
import CustomCol from "../components/CustomCol";
import { useHistory } from "react-router-dom";
import * as RouteUrl from "../model/route";

const { Title } = Typography;

const Login = (props) => {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false)

  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const onLoginHandler = async () => {
    try {
      setisLoading(true);
      const values = await loginForm.validateFields();
      const result = await dispatch(
        ActionCreator.LoginUser({
          username: values.username,
          password: values.password
        })
      );

      if (result.data?.message) {
        ShowWarningMessage(result.data.message);
      } else {
        ShowSuccessMessage(`Welcome ${result.data?.userName}`);
        history.push(`${RouteUrl.HINTSEARCH}`)
      }
    } catch (error) {
      ShowErrorMessage("Something Went Wrong");
    }
    finally {
      setisLoading(false)
    }
  };

  return (
    <StyledMainContentContainer
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="LoginContainer">
        <div className="LoginContainer-image">
          <Image src={infy} preview={false} />
        </div>
        <Title className="LoginContainer-title">
          Text Analytics Platform | Enterprise Search
        </Title>
        <StyledCard className="LoginContainer_LoginBox">
          <Form
            name="basic"
            layout="vertical"
            size="large"
            onFinish={onLoginHandler}
            className="login-form"
            form={loginForm}
            autoComplete="off"
          >
            <Row key="rw1">
              <CustomCol key="rw1.1" >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Username"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
              </CustomCol>

              <CustomCol key="rw1.2">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter Password"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>
              </CustomCol>
            </Row>

            {/* <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Row key="rw2">
              <CustomCol key="rw1.3" xxl={24} xl={24} className="text-right">
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Login
                </Button>
              </CustomCol>
            </Row>
          </Form>
        </StyledCard>
      </div>
    </StyledMainContentContainer>
  );
};

export default Login;
