import React,{useState,useEffect} from 'react'
import "./GgMessage.css"
import { Table,Space,Button,message,Spin,Popconfirm  } from 'antd';
import {reqUserMessaage,reqFindAllGG,reqDelAllGG} from "../../js/service"
import {dateToFormatFull} from "../../js/common"

export default function GgMessage() {
    // sorter: (a, b) => a.accout.length - b.accout.length,
useEffect(() => {
    //查询出所有的公告
    queryNewsMessage();
  }, [])
  
    const columns = [
      {
        title: '公告标题',
        dataIndex: 'title',
        width:150,
      },
      {
        title: '公告内容',
        dataIndex: 'content',
      },
      {
        title: '发布时间',
        dataIndex: 'date',
        width:180,
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
        reqFindAllGG(params, res => {
            if (res.code == 1) {
                //提示成功
                message.info("公告数据查询成功")
                // console.log(res);
                let data = res.data;
                data.map(item =>{
                    item.key = item.nid
                    item.date = dateToFormatFull(item.date)
                })
                setitemList([...data]);
                setloading(false)
            } else {
                message.info(res.msg)
            }
        })
    }
  
    //删除留言
    let adminDelmess =(cons) =>{
      return ()=>{
          // console.log(cons)
               let params = {
                mid:cons.nid
               }
         reqDelAllGG(params,res =>{
            if(res.code == 1){
              message.info(res.msg)        
              queryNewsMessage();
              }
          })
      }
    }


  return (
    <div className='ggModel'> 
     <Spin spinning={loading}>
        <Table pagination={paginationProps}  bordered={true} columns={columns} dataSource={dlsit} onChange={onChange} ></Table>
        </Spin>
    </div>
  )
}
