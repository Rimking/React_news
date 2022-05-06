import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Login.css"
import {
  Form, Input, InputNumber, Cascader, Select,
  Row, Col, Checkbox, Button, AutoComplete,message
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd"
import {reqUserResget,reqUserLogin} from "../../js/service"

export default function Login() {

  const [isLogin, setLogin] = useState(true);
  const navgaite = useNavigate();

  // 切换tab
  const checkTab = (bool) => {
    return () => {
      setLogin(bool)
    }
  }

  // 登录
  const LoginOnFinish = (values: any) => {
    // console.log('Received values of form: ', values);
    let params = {...values}
    reqUserLogin(params,res =>{
      // console.log(res)
      if(res.code == 1){
        //数据保存本地
        let data = res.data;
        localStorage.setItem("userData",JSON.stringify(data) )
        //提示成功  res.msg
        message.info(res.msg)
        //跳转页面至newplace
        navgaite("/mypage")
        }else{
          //提示账户密码错误 res.msg
          message.error(res.msg)
        }
    })
  };



  // 注册
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const ResOnFinish = (values: any) => {
    let params = {
        nickName:values.nickName,
        userName:values.userName,
        passWord:values.passWord,
        email:values.email,
        description:values.description,
        gender:values.gender,
    };
     reqUserResget(params,res =>{
       if(res.code == 1){
          //提示成功 res.msg
          // console.log(res);
          message.info("注册成功")
          //保存返回的用户数据,需要存本地
          let babckUserName = res.data;
          // navgaite("/login")
          setLogin(true);
          form.resetFields();
       }else{
        message.error(res.msg)
       }
      })
  };
  // 注册到此结束

  return (
    <div className='lgin_model'>
      <div className='login_Tits'>Fireworks message board</div>
      <hr />
      <div className='login_conents'>
        <div className='log_tab'>
          <div><span className={isLogin ? "isClick" : ""} onClick={checkTab(true)}>登录</span></div>
          <div><span className={isLogin ? "" : "isClick"} onClick={checkTab(false)}>注册</span></div>
        </div>

        {/* 登录 */}
        <div className='isLogin' style={{ display: isLogin == true ? "block" : "none" }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={LoginOnFinish}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="passWord"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="passWord"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>


          {/* <Input size="large" placeholder="Please enter the account number" prefix={<UserOutlined />} />
          <Input size="large" placeholder="Please input a password" prefix={<LockOutlined />} />
          <Button type="primary" block>
            登录
          </Button> */}
        </div>
        {/* 注册 */}
        <div className='isResgit' style={{ display: isLogin == true ? "none" : "block" }}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={ResOnFinish}
            scrollToFirstError
          >
            <Form.Item
              name="nickName"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                },
              ]}
              hasFeedback
            >
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item
              name="userName"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              hasFeedback
            >
              <Input  placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="passWord"
              label="密码"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password  placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="再次输入"
              dependencies={['passWord']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passWord') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password   placeholder="请再次输入"/>
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input  placeholder="请输入邮箱" />
            </Form.Item >

            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select placeholder="select your gender">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="个人描述"
              rules={[{ required: true, message: 'Please input Intro' }]}
            >
              <Input.TextArea showCount maxLength={100}  placeholder="请输入个人描述  " />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('你需要同意此选项')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="https://www.baidu.com/">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>

        </div>
      </div>



    </div>
  )
}
