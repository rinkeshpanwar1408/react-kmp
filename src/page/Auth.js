import React, { useRef, useEffect, useState } from 'react'
import FileSearch from "../assests/svg/file_search.svg";
import infosysLogo from "../assests/svg/logo.svg";
import {Button, Form, Input, InputNumber} from "antd";
import * as ActionCreator from "../store/action/AuthActions";
import useMessage from "../hooks/useMessage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as RouteUrl from "../model/route";
function Auth() {
  const [ToggleForm, setToggleForm] = useState(false);
  const SignupRef = useRef(null);
  const LoginRef = useRef(null);
  const [loginForm] = Form.useForm();
  const [signUpForm] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false)
  const [isSignupLoading, setIsSignupLoading] = useState(false)


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

  const onSignUpHandler = async () =>{
    try {
      setIsSignupLoading(true);
      const values = await signUpForm.validateFields();
      const result = await dispatch(
        ActionCreator.signUpUser({
          userName: values.username,
          userDepartment: values.password,
          managementLevelId: values.managementLevelId,
          jobTitle: values.jobTitle,
          userEmail: values.userEmail,
          password: values.password,
          isAdmin: true
        })
      );

      if (result.data?.message) {
        ShowWarningMessage(result.data.message);
      } else {
        ShowSuccessMessage(`Welcome ${values.username}`);
        history.push(`${RouteUrl.HINTSEARCH}`)
      }
    } catch (error) {
      ShowErrorMessage("Something went wrong");
    } finally {
      setIsSignupLoading(false);
    }
  }
  useEffect(() => {
    if (ToggleForm) {
      SignupRef.current.style.display = "flex";
      SignupRef.current.style.opacity = "1";

      LoginRef.current.style.display = "none";
      LoginRef.current.style.opacity = "0";
    } else {
      SignupRef.current.style.display = "none";
      SignupRef.current.style.opacity = "0";

      LoginRef.current.style.display = "flex";
      LoginRef.current.style.opacity = "1";
    }
  }, [ToggleForm]);
  return (
    <div className='auth_page'>
      <div className='auth_left_section'>
        <img src={FileSearch} alt="file_search" height={"50%"}/>
        <div style={{height: "30%"}}>
            <img src={infosysLogo} alt="infosys" height={"75%"} className="infosys_logo"/>
            <p className='headline_name'>Text Analytics Platform | Enterprise Search</p>
        </div>
      </div>
      <div className='auth_right_section'>
        <div className='loginContainer' ref={LoginRef}>
          <h2 className='auth_title'>Login</h2>
          <Form  name="loginForm" form={loginForm} autoComplete="off" onFinish={onLoginHandler}>
            <p className='form_text'>Username</p>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}>
              <Input placeholder='Enter username'
              className='inputButton'/>
            </Form.Item>

            <p className='form_text'>Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
              className='inputButton'
                placeholder="Enter Password"
              />
            </Form.Item>
            <Button type="primary" loading={isLoading} htmlType="submit" className='submitButton'>
              Login
            </Button>
          </Form>
          <div className='auth_or_option'>
            <hr className='hr_divider'/>
            or 
            <hr className='hr_divider'/>
          </div>
        <div>
          Don't have an account? <span onClick={() => setToggleForm(true)} className='other_text'>Sign Up</span>
        </div>
        </div>
        <div className='signupContainer' ref={SignupRef}>
          <h2 className='auth_title'>Sign Up</h2>
          <Form form={signUpForm} autoComplete="off" onFinish={onSignUpHandler}>
            <div style={{display: "flex", gap: "10px"}}>
              <div>
                <label className='form_text'>Username</label>
                <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}>
                <Input placeholder='Provide a unique username'
                className='inputButton'/>
              </Form.Item>
              </div>
              <div>
              <label className='form_text'>Job Title</label>
              <Form.Item
                name="jobTitle"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}>
                  <Input placeholder='Enter username'
                  className='inputButton'/>
                </Form.Item>
              </div>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <div>
                <label className='form_text'>User Department</label>
                <Form.Item
                  name="userDepartment"
                  rules={[
                    {
                      required: true,
                      message: "Please input your department!",
                    },
                  ]}>
                  <Input placeholder='Enter your department'
                  className='inputButton'/>
                </Form.Item>
              </div>
              <div>
                <label>Management Level Id</label>
                <Form.Item
                  name="managementLevelId"
                  rules={[
                    {
                      required: true,
                      message: "Management Level ID Required",
                    },
                  ]}>
                  <InputNumber
                    min={1}
                    max={10}
                    className='inputButton'
                    style={{ width: 100, height: "100%"}}
                  />
                </Form.Item>
              </div>
            </div>
            <label className='form_text'>User Email</label>
            <Form.Item
              name="userEmail"
              rules={[
                {
                  message:"Please enter valid email",
                  type: "email",
                },
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}>
              <Input placeholder='Enter your email address'
              className='inputButton'/>
            </Form.Item>
            <label className='form_text'>Password</label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
              className='inputButton'
                placeholder="Enter Password"
              />
            </Form.Item>
            <Button type="primary" loading={isSignupLoading} htmlType="submit" className='submitButton'>
              Signup
            </Button>
          </Form>
          <div className='auth_or_option'>
            <hr className='hr_divider'/>
            or 
            <hr className='hr_divider'/>
          </div>
          <div>
          Already have an account? <span onClick={() => setToggleForm(false)} className='other_text'>Login</span>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;