import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./MyPage.css"
import Search from '../../Components/Search/SearchModol'
import Items from '../../Components/Items/Items'
import {
  Pagination, Comment, Avatar, Form, Button, List, Input, message,Spin
} from 'antd';
import { EditOutlined, CloseOutlined } from "@ant-design/icons"
import moment from 'moment';
import { reqUserDetailCoems,reqdelDetailmess } from '../../js/service'

export default function MyPage() {

  // 存放所有组件创建的内容，否则不能接收到传递的参数
  // 评论发送部分
  const { TextArea } = Input;
  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  // 创建一个发送消息的模块
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          发布评论
        </Button>
      </Form.Item>
    </>
  );
  // 创建一个查看评论的模块
  // const ExampleComment = ({ children }) => (
  //   <Comment
  //     actions={[<span key="comment-nested-reply-to">回复</span>]}
  //     author={<a></a>}
  //     avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
  //     content={
  //       <p>
  //         We supply a series of design principles, practical patterns and high quality design
  //         resources (Sketch and Axure).
  //       </p>
  //     }
  //   >
  //     {children}
  //   </Comment>
  // );


  // 所有的state数据
  const [comments, setcomments] = useState([]);
  const [submitting, setsubmitting] = useState(false);
  const [value, setvalue] = useState("");
  const [isNone, setisNone] = useState("none");

  const [loading, setloading] = useState(false);

  let data = JSON.parse(localStorage.getItem("userData"));
  //个人留言部分
  let [pageX,setpageX] = useState(1);
  let [itemList, setitemList] = useState([]);//留言数据
  let [total, setTotal] = useState(0);//total数据

  // 调用路由
  const Navigate = useNavigate();

  // 所有的方法
  const handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  const editisNone = e => {
    // 此处是直接展开的，当点击了增加或者查看评论后，先请求数据，返回结果在展示
    if (isNone == 'none') return setisNone("block")
    if (isNone == 'block') return setisNone("none")
  }
  // 点击退出登录按钮
  let outLoginBtn =()=>{

    //删除本地缓存，跳转至登录页面
     localStorage.removeItem("userData");
     Navigate("/login")

  }

  //查询留言广场数据
  let queryNewsMessage = () => {
    let data = JSON.parse(localStorage.getItem("userData"));
    let params = {
      currentPage: pageX,
      pageSize: 5,
      uid:data.uId
    }
    setloading(true)
    reqUserDetailCoems(params, res => {
      // console.log(res)
      if (res.code == 1) {
        //提示成功
        // message.info("留言数据查询成功")
        //保存数据
        let data = res.data;
        let dlsit = data.list;
        dlsit.map(im => {
          im.isDisplay = false;
        })
        setitemList([...dlsit]);
        setTotal(data.total)
        setloading(false)
      } else {
        message.info(res.msg)
      }
    })
  }

  //页数发生变化时
  const newsPageChange = (page, pageSize) => {
    //修改当前页
    setpageX(page)
    //调用查询方法
    queryNewsMessage();
  }
  //删除
  let delThisMessage = (item) => {
    return () => {
      // console.log(item)
      let params = {
        mid:item.mId,
        uid:item.uId
      }
      reqdelDetailmess(params,res=>{
        if(res.code == 1){
          message.info(res.msg);
          queryNewsMessage();
        }

      })
    }
  }


  // 在页面渲染的时候获取到首页数据
  useEffect(() => {
    //查询出所有的留言数据
    queryNewsMessage();
  }, [pageX])

  return (
    <div>
      {/* 个人描述部分 */}
      <div className="userConents">
        <p className='user_tilePage'>{data.nickName}的主页
       </p> <Button type="primary" danger size='small' className='outBtn' onClick={outLoginBtn}>退出登录</Button>
      </div>
     
      {/* <div className='search'>
      <Search />
    </div> */}
      {/* 单个item */}
      <div className='items'>
        <p  className='self_total'>个人动态   <span className='self_total'>已发布：{total}条留言</span></p>

        <Spin spinning={loading}>
        {
          itemList.map((item, index) => {
            return <div className='item_doms' key={index}>
              {/* 标题 */}
              <div className="Newstis">{item.title}
                <span className='delThismess'>
                  <Button danger shape="circle" onClick={delThisMessage(item)} icon={<CloseOutlined />} size="small" />
                </span>
              </div>
              {/* 内容 */}
              <div className="Newscon">{item.content}</div>
              <div className='otherNews'>
                {/* 没有评论就是添加评论，有评论就展示  *条评论   */}
                {/* <span className='oth_span jumps' onClick={editisNone}> <EditOutlined style={{ marginRight: "8px" }} />添加评论</span> */}
                <span className='oth_span'>{item.msgDate}</span>
              </div>
              {/* 点击了添加评论或者查看评论后将此处的内容展示出来 */}
              <div className='comments' style={{ display: isNone }}>
                <hr />
                {/* 有评论内容时，展示，没有的时候就只展示输入的框 */}
                {/* <div className='isComments'> */}
                {/* {
                    pllist.map(i => {
                      return <div key={i.id}>
                        <ExampleComment>
                          {
                            i.children.map((p) => {
                              return <div key={p.id}>
                                <ExampleComment>  </ExampleComment>
                              </div>
                            })
                          }
                        </ExampleComment>
                      </div>
                    })
                  } */}
                {/* </div> */}
                {/* 输入部分 */}
                {/* <div className='sendInput'>
                  {comments.length > 0 && <CommentList comments={comments} />}
                  <Comment
                    content={
                      <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                      />
                    }
                  />
                </div> */}
              </div>
            </div>
          })
        }
       
        {/* 分页 */}
        <div className='pageInds'>
          <Pagination current={pageX} onChange={newsPageChange} defaultPageSize={5} total={total} />
        </div>
        </Spin>

      </div>
    </div>
  )
}
