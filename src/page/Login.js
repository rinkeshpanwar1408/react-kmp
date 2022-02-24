import React from "react";
import { StyledMainContentContainer } from "../styled-components/Master";
import background from "../assests/image/Image2.png";
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
import useMessage from "../hooks/useMessge";

const { Title } = Typography;

const Login = (props) => {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    ShowSuccessMessage,
    ShowErrorMessage,
    ShowWarningMessage,
  } = useMessage();

  const onLoginHandler = async () => {
    try {
      const values = await loginForm.validateFields();
      const result = await dispatch(
        ActionCreator.LoginUser({
          username: values.username,
          password: values.password
        })
      );
      if (!result.data) {
        ShowWarningMessage("Username or Password Was Wrong.");
      } else {
        ShowSuccessMessage(`Welcome ${result.data[0].userName}`);
      }
    } catch (error) {
      ShowErrorMessage("Something Went Wrong")
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
            autocomplete="off"
          >
            <Row key="rw1">
              <Col key="rw1.1" xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
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
              </Col>

              <Col key="rw1.2" xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
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
              </Col>
            </Row>

            {/* <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Row key="rw2">
              <Col key="rw1.3" xxl={24} xl={24} className="text-right">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </StyledCard>
      </div>
    </StyledMainContentContainer>
  );
};

export default Login;
