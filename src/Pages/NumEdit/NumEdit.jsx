import React, { useState } from 'react'
import "./NumEdit.css"
import {
  Form, Input, InputNumber, Cascader, Select,
  Row, Col, Checkbox, Button, AutoComplete, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd"
import {requpdateDetailmess} from '../../js/service'

export default function NumEdit() {


  // 内容展示
  const [disAble,setDisable] = useState(true)
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
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
  let data = JSON.parse(localStorage.getItem("userData")) ;
  const [form] = Form.useForm();
  // 获取所有信息。请求也在这里发
  const ResOnFinish = (values: any) => {
    let params = {
      uId:data.uId,
      nickName:values.nickName,
      gender:values.gender,
      userName:values.userName,
      passWord:values.passWord,
      email:values.email,
      description:values.description
    }
    requpdateDetailmess(params,res =>{
      if(res.code == 1){
         message.info(res.msg)
         let data = res.data;
         //将本地的信息替换
        localStorage.setItem("userData",JSON.stringify(data))
        setDisable(true)
        }
    })
  };

  // 打开disable
  const checkDisable = () =>{
    setDisable(false)
  }

  return (
    <div className='Num_model'>
      <div className='centerMode'>
           <Form
            {...formItemLayout}
            name="register"
            onFinish={ResOnFinish}
            scrollToFirstError
            initialValues={data}
          >
            <Form.Item
              name="nickName"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickName!',
                },
              ]}
              hasFeedback
            >
              <Input  disabled={disAble}/>
            </Form.Item>
            <Form.Item
              name="userName"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: 'Please input your userName!',
                },
              ]}
              hasFeedback
            >
              <Input  disabled={disAble}/>
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
              <Input.Password  disabled={disAble}/>
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
              <Input disabled={disAble} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Select disabled={disAble} placeholder="select your gender">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="个人描述"
              rules={[{ required: true, message: 'Please input Intro' }]}
            >
              <Input.TextArea showCount maxLength={400} disabled={disAble} />
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
            <Button style={{marginRight:"30px"}} onClick={checkDisable} type="primary">
                修改
              </Button>
              <Button type="primary" disabled={disAble} htmlType="submit">
                完成
              </Button>
             
            </Form.Item>
          </Form>

          </div> 

    </div>
  )
}
