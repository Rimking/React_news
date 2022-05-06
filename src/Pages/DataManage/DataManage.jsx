import React,{useState,useEffect} from 'react'
import "./DataManage.css"
import { Table,Space,Button,message,Spin,Popconfirm  } from 'antd';
import {reqUserMessaage,reAdmindelmessage,reAdmincheckcons} from "../../js/service"

export default function DataManage() {
// sorter: (a, b) => a.accout.length - b.accout.length,
useEffect(() => {
  //查询出当前的用户是否为管理员
  queryNewsMessage();
}, [])

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width:150,
      sorter: (a, b) => a.accout.length - b.accout.length,
    },
    {
      title: '留言标题',
      dataIndex: 'title',
    },
    {
      title: '留言内容',
      dataIndex: 'content',
    },
    {
      title: '发布时间',
      dataIndex: 'msgDate',
      width:150,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.times - b.times,
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (cons) =>  (
          <Space size="small">
            {/* <Button className='alltns'  key='3'>编辑</Button> */}
            <Popconfirm
              title="确定删除这条留言?"
              onConfirm={adminDelmess(cons)}
              okText="Yes"
              cancelText="No"
              >
              <Button className='alltns' danger key='2'>删除</Button>
              </Popconfirm>
         </Space>

        )
      
    },
  
  ];
 
  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
    queryNewsMessage();
  }

  // 
  let [dlsit, setitemList] = useState([]);//留言数据
  let [total, setTotal] = useState(0);//total数据
  const [loading, setloading] = useState(false);
  // 表格的分页
  const paginationProps = {
    total: total, // 数据总数
    defaultPageSize:3,
  };
  //查询出所有的留言数据
  let queryNewsMessage = () => {
      let params = {
      }
      setloading(true)
      reAdmincheckcons(params, res => {
          if (res.code == 1) {
              //提示成功
              // message.info("留言数据查询成功")
              //保存数据
              let data = res.data;
              data.map(im => {
                  im.message.isDisplay = false;
                  im.message.key = im.message.mId;
                  im.message.nickName = im.user.nickName;
              })
              let dlsit = [];
              data.map(item =>{
                dlsit.push(item.message)
              })
              setitemList([...dlsit]);
              setTotal(dlsit.length)
              setloading(false)
          } else {
              message.info(res.msg)
          }
      })
  }

  //删除留言
  let adminDelmess =(cons) =>{
    return ()=>{
             let params = {
               list:cons.mId
             }
        reAdmindelmessage(params,res =>{
          if(res.code == 1){
            message.info(res.msg)        
            queryNewsMessage();
            }
        })
    }
  }

  
  return (
    <div className='dataManagModel'>
      <Spin spinning={loading}>
        <Table pagination={paginationProps}  bordered={true} columns={columns} dataSource={dlsit} onChange={onChange} ></Table>
        </Spin>
    </div>
  )
}
