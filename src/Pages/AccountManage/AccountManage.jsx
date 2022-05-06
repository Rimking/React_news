import React,{useEffect,useState} from 'react'
import "./AccoutManage.css"
import { Table,Space,Button,Spin,message,Popconfirm,Modal,Checkbox,Form,Input,
  Select
} from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import {reAdminFindUser,redelAllUser,reqUserResget,requpdateDetailmess,reqmhSearch} from "../../js/service"
import { useForm } from 'antd/lib/form/Form';

export default function AccountManage() {
  useEffect(() => {
    //查询出s所有的用户
    findAllUser();
  }, [])

  const { Search } = Input;

  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      width:80,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      width:80,
    },
    {
      title: "性别",
      dataIndex: 'gender',
      width:80,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width:120,
    },
    {
      title: '个人描述',
      dataIndex: 'description',
      width:190,
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 120,
        render: (cons) =>  (
          <Space size="small">
            <Button className='alltns' onClick={showModal(cons)}  key='3'>修改</Button>
            <Button className='alltns' onClick={showAddModal}  key='3'>增加</Button>
            <Popconfirm
              title="确定删除这个用户?"
              onConfirm={adminDeluser(cons)}
              okText="Yes"
              cancelText="No"
              >
              <Button className='alltns' danger key='2'>删除</Button>
              </Popconfirm>
         </Space>

        )
      
    },
  ];
  //
  let [userlist, setuserlist] = useState([]);//留言数据
  let [total, setTotal] = useState(0);//total数据
  const [loading, setloading] = useState(false);

  // 表格的分页
  const paginationProps = {
    total: total, // 数据总数
    defaultPageSize:6,
  };
  
  //删除用户
  let adminDeluser = (cons)=>{
    return ()=>{
      let params = {
        list:cons.uId
      }
      redelAllUser(params,res =>{
            if(res.code == 1){
              message.info(res.msg);
              findAllUser();
            }
      })
    }
  }

  //查询出所有的用户
  let findAllUser = ()=>{
    let params = {}
    setloading(true)
    reAdminFindUser(params,res=>{
      if(res.code == 1){
        message.info(res.msg);
        let data = res.data;
        data.total = data.length;
        data.map(item=>{
          item.key = item.uId;
        })
        setuserlist([...data]);
        setTotal(total)
        setloading(false)
      }
    })

  }
 

  //模糊查询
  function onSearch(value){
    if(value.length == 0 || value.replace(/(^s*)|(s*$)/g, "").length ==0){
      findAllUser();
    }else{
      seacrfuns(value);
    }
  }
   //模糊查询
   const seacrfuns =value =>{
    console.log(123)
    let params = {
      str:value
    }
    reqmhSearch(params,res =>{
      if(res.code == 1){
        let data = res.data;
        data.total = data.length;
        data.map(item=>{
          item.key = item.uId;
        })
        setuserlist([...data]);
        setTotal(total)
        setloading(false);
      }
    })
  }
  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
    findAllUser();
  }

  //编辑框
  const [isModalVisible, setIsModalVisible] = useState(false);//增加
  const [iseditUser, setiseditUser] = useState(false);//修改
 
  //增加
  const showAddModal = () => {
      setIsModalVisible(true);
  };
  //增加
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //修改
  const handleEditCancel = () => {
    setiseditUser(false);
  };


  //注册部分
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
  const [form] = Form.useForm();
  const { Option } = Select;
  let [isThisUser,setisThisUser] = useState({});//保存修改的用户信息
  //修改信息，打开模态框
  const showModal = (cons) => {
    return ()=>{
      setiseditUser(true);
      setisThisUser(cons);
    }
  };
  //注册方法
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
          message.info("注册成功");
          setIsModalVisible(false);
          findAllUser();
          form.resetFields();

       }else{
        message.error(res.msg)
       }
      })
  };

  //修改方法
  const ResOnEdit =(values: any) => {
    // console.log(values)
    let params = {
      uId:isThisUser.uId,
      nickName:values.nickName,
      gender:values.gender,
      userName:values.userName,
      passWord:values.passWord,
      email:values.email,
      description:values.description
    }
    requpdateDetailmess(params,res =>{
      if(res.code == 1){
         message.info(res.msg);
         findAllUser();
         setiseditUser(false);
        }
    })
  }
  return (
    <div className='accountManageModel'>
         <Spin spinning={loading}>
        <div className="searchs"> 
        <Search placeholder="请输入用户的昵称" onSearch={onSearch} enterButton />
        </div>

       <Table pagination={paginationProps}  bordered={true} columns={columns} dataSource={userlist} onChange={onChange} ></Table>
       </Spin>
       <Modal footer={null} title="增加" visible={isModalVisible} onCancel={handleCancel}>
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
              <Input />
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
              <Input />
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
              <Input.Password />
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
              <Input.Password />
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
              <Input />
            </Form.Item>

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
              <Input.TextArea showCount maxLength={100} />
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

      </Modal>
      <Modal footer={null} title="修改" visible={iseditUser} onCancel={handleEditCancel}>
      <Form
            {...formItemLayout}
            name="register"
            onFinish={ResOnEdit}
            scrollToFirstError
            initialValues={isThisUser}
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
              <Input />
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
              <Input/>
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
              <Input.Password />
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
              <Input  />
            </Form.Item>

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
              <Input.TextArea showCount maxLength={400}  />
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
            {/* <Button style={{marginRight:"30px"}} onClick={checkDisable} type="primary">
                修改
              </Button> */}
              <Button type="primary"  htmlType="submit">
                完成
              </Button>
             
            </Form.Item>
          </Form>


      </Modal>



    </div>
  )
}
