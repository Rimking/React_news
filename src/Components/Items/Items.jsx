import React, { useState, useEffect } from 'react'
import "./Items.css"
import {
    Pagination, Comment, Avatar, Form, Button, List, Input, message,
    Spin, Switch, Alert
} from 'antd';
import { EditOutlined } from "@ant-design/icons"
import moment from 'moment';
import { reqUserMessaage } from "../../js/service"
import { reqMessageComment, reqSendNewsComment, reqDelNewsComment } from "../../js/service"


export default function Items(props) {

    // 存放所有组件创建的内容，否则不能接收到传递的参数
    // 评论发送部分
    let { TextArea } = Input;
    let CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    );

    // 创建一个查看评论的模块
    let ExampleComment = ({ children, content, pName, hName, uId, isParent, mId, hfuid, commentId, childCommentId, isDels }) => (
        <Comment
            actions={[<span key="comment-nested-reply-to" onClick={answerPerson(uId, pName, mId, hfuid, isParent, commentId, childCommentId)}>回复</span>]}
            author={<a></a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p>
                    <span className="domsNaes" style={{ display: isParent ? "none" : "inline" }}>{pName}</span>
                    <span className="consends" style={{ display: isParent ? "none" : "inline" }}>回复</span>
                    <span className="domsNaes" style={{ display: isParent ? "none" : "inline" }}>{hName}</span>
                    {content}
                    <span onClick={delMessageNews(mId, uId, commentId)} className="isDelete" style={{ display: isDels ? "inline" : "none" }}>删除</span>
                </p>
            }
        >
            {children}
        </Comment>
    );


    // 所有的state数据
    let [comments, setcomments] = useState([]);
    let [submitting, setsubmitting] = useState(false);
    let [value, setvalue] = useState("");
    let [isNone, setisNone] = useState("none");

    // 所有的数据
    let [itemList, setitemList] = useState([]);//留言数据
    let [total, setTotal] = useState(0);//total数据
    let [pageX,setpageX] = useState(1);
    // let pageX = 1;
    //保存的所有评论信息
    let [comFinList, setcomFinList] = useState([]);
    let uid = 0;
    // 评论填写框内容
    let [commenrValue, setcommenrValue] = useState("");//文本域内容
    let [commenrPlhoder, setcommenrPlhoder] = useState("");//提示信息
    let [commentSendUid, setcommentSendUid] = useState(0);//发送的uid
    let [commentSendMid, setcommentSendMid] = useState(0);//留言id
    let [commentSendhfuid, setcommentSendhfuid] = useState(0);//回复id
    let [commentcommentId, setcommentId] = useState(0);//父id
    let [showcommentId, setshowcommentId] = useState(0);//刷新评论的id
    let [MessageMid, setMessageMid] = useState(0);//保存当前是在那条留言下
    let isAnswer = true;//是否点击了回复

    const [messageloading, setmessageloading] = useState(false);//加载框
    // 所有的方法

    // 修改评论框数据
    let handleCommentChange = e => {
        setcommenrValue(e.target.value);
    };

    // 点击发布评论按钮
    let handleSubmit = () => {
        let data = JSON.parse(localStorage.getItem("userData"));
        let params = {}
        if (isAnswer) {
            // showcommentId
            params = {
                commentContent: commenrValue,//内容
                uId: data.uId,//当前评论人id
                mId: MessageMid,//评论id
                hfuid: commentSendUid,//回复人id
                childCommentId: commentcommentId,//存储的是评论id
            }
        } else {
            params = {
                commentContent: commenrValue,//内容
                uId: data.uId,//当前评论人id
                mId: commentSendMid,//评论id
                hfuid: commentSendUid,//回复人id
                childCommentId: commentcommentId,//存储的是评论id
            }
        }

        reqSendNewsComment(params, res => {
            if (res.code == 1) {
                message.info("评论成功");
                // editisNone(showcommentId)
                //调用查询评论的请求
                showFunc();
                // 清空输入框
                setcommenrValue("")
            }
        })

    };
    //查询评论的请求
    const showFunc = () => {
        let params = { mid: showcommentId }
        setloading(true)
        reqMessageComment(params, res => {
            if (res.code == 1) {
                // console.log(res)
                let thisUid = JSON.parse(localStorage.getItem("userData")).uId;
                let list = res.data;
                let finalList = [];
                let dList = itemList;
                if(list.length != 0){
                    list.map(item => {
                        item.child = []
                        item.isDels = false;
                        if(item.uId == thisUid){
                            item.isDels = true;
                        }
                        if (item.childCommentId == 0) {
                            finalList.push(item)
                        }
                    })
                    finalList.map(ip => {
                        list.map(im => {
                            if (im.childCommentId == ip.commentId) {
                                ip.child.push(im)
                            }
                        })
                    })
                    // console.log(finalList);
                    // 将查询的评论添加到对应的留言下
                    dList.map(dl => {
                        dl.isDisplay = false;
                        if (dl.mId == showcommentId) {
                            dl.isDisplay = true;
                        }
                        if (finalList[0].mId == dl.mId) {
                            dl.comment = finalList;
                        }
                    })
                }else{
                    dList.map(dl => {
                        dl.isDisplay = false;
                        if (dl.mId == showcommentId) {
                            dl.isDisplay = true;
                        }
                            dl.comment = [];
                    })
                }
                //修改列表数据
                setitemList([...dList]);
                //修改评论数据
                setcomFinList([...finalList]);
                //修改loding框
                setloading(false)
            }
        })
    }

    // 点击添加评论评论信息
    let editisNone = (mid,item) => {
        return () => {
            // console.log(mid,itemList)
            // let bol = true; //true就是请求评论，false就是关闭显示框
            // itemList.map(im =>{
            //     if(im.mId === mid && im.isDisplay == true){
            //         im.isDisplay = false;
            //         bol = false;
            //     }
            // })
            if(item.isDisplay == false || item.isDisplay == null){
            setMessageMid(mid);//保存当前的留言id
            setshowcommentId(mid)
            let params = { mid: mid }
            setloading(true)
            reqMessageComment(params, res => {
                if (res.code == 1) {
                    //本人id
                    // console.log(res)
                    let thisUid = JSON.parse(localStorage.getItem("userData")).uId;
                    let list = res.data;
                    let finalList = [];
                    let dList = itemList;
                    if(list.length != 0){
                        list.map(item => {
                            item.child = [];
                            item.isDels = false;
                            if (item.uId == thisUid) {
                                item.isDels = true;
                            }
                            if (item.childCommentId == 0) {
                                finalList.push(item)
                            }
                        })
                        finalList.map(ip => {
                            list.map(im => {
                                if (im.childCommentId == ip.commentId) {
                                    ip.child.push(im)
                                }
                            })
                        })
                        // console.log("finalList", finalList);
                        // 将查询的评论添加到对应的留言下
                        dList.map(dl => {
                            dl.isDisplay = false;
                            if (dl.mId == mid) {
                                dl.isDisplay = true;
                            }
                            dl.isDels = false;
                            if (dl.uId == thisUid) return dl.isDels = true;
                            if (finalList[0].mId == dl.mId) {
                                dl.comment = finalList;
                            }
                        })
                    }else{
                        dList.map(dl => {
                            dl.isDisplay = false;
                            if (dl.mId == mid) {
                                dl.isDisplay = true;
                            }
                                dl.comment = [];
                        })
                    }
                      //修改列表数据
                      setitemList([...dList]);
                      //修改评论数据
                      setcomFinList([...finalList]);
                      //修改loding框
                      setloading(false)
                }else{
               
                }

            })
            }else if(item.isDisplay == true){
                itemList.map(im=>{
                    if(im.mId == item.mId){
                        im.isDisplay = false;
                    }
                })
                let dlist = itemList
                setitemList([...dlist]);

         }
            
        }
    }

    //点击回复按钮
    const answerPerson = (uId, pName, mId, hfuid, isParent, commentId, childCommentId) => {
        return () => {

            isAnswer = false;//false表明当前是回复状态
            setcommenrPlhoder("回复:" + pName);
            setcommentSendUid(uId);//评论人id
            setcommentSendMid(mId);//留言id
            if (isParent) {
                setcommentId(commentId);//存储的是父评论id
            } else {
                setcommentId(childCommentId);//存储的是父评论id
            }
            if (isParent) {
                setcommentSendhfuid(0)
            } else {
                setcommentSendhfuid(hfuid)
            }

            // console.log(commenrValue, commentSendUid)
        }
    }

    //点击删除留言
    let delMessageNews = (mid, uid, commentId) => {
        return () => {
            let params = {
                mid, uid,
                cid: commentId,
            }
            // console.log(params)
            reqDelNewsComment(params, res => {
                if (res.code == 1) {
                    // console.log(res);
                    showFunc();
                }
            })
        }
    }
    //点击清空回复
    let delThisbutton = function(){
        setcommenrPlhoder("") //清空内容
        // 还原id
        setcommentId(0)
        setcommenrValue("")
    }


    let user = JSON.parse(localStorage.getItem("userData"))
    //查询留言广场数据
    let queryNewsMessage = () => {
         //获取本地用户数据，如果没有用户数据不获取数据
        if(user!=undefined ||user != null){
            let params = {
                currentPage: pageX,
                pageSize: 3,
            }
            setmessageloading(true)
            reqUserMessaage(params, res => {
                if (res.code == 1) {
                    //提示成功
                    // message.info("留言数据查询成功")
                    //保存数据
                    let data = res.data.messageDto;
                    let dlsit = [];
                    data.map(im => {
                        im.message.isDisplay = false;
                        im.message.key = im.message.mId
                        im.message.nickName = im.user.nickName
                    })
                    data.map(item =>{
                        dlsit.push(item.message)
                    })
                    setitemList([...dlsit]);
                    setTotal(res.data.pageInfo.total)
                    setmessageloading(false)
                } else {
                    message.info(res.msg)
                }
            })
        } 
    }
    //页数发生变化时
    const newsPageChange = (page, pageSize) => {
        //修改当前页     
        setpageX(page)
        //调用查询方法
        queryNewsMessage();
    }
    // 在页面渲染的时候获取到首页数据
    useEffect(() => {
        //查询出所有的留言数据
        queryNewsMessage();
    }, [pageX])


    //蒙版的部分
    const [loading, setloading] = useState(false);

    return (
        <div className='items'>
            <Spin spinning={messageloading}>
            {
                itemList.map((item, index) => {
                    return <div className='item_doms' key={index}>
                        {/* 标题 */}
                        <div className="Newstis">{item.nickName+":   "}{item.title}</div>
                        {/* 内容 */}
                        <div className="Newscon">{item.content}</div>
                        <div className='otherNews'>
                            {/* 没有评论就是添加评论，有评论就展示  *条评论   */}
                            <span className='oth_span jumps' onClick={editisNone(item.mId,item)}> <EditOutlined style={{ marginRight: "8px" }} />添加评论</span>
                            <span className='oth_span'>{item.msgDate}</span>
                        </div>
                        {/* 点击了添加评论或者查看评论后将此处的内容展示出来 */}
                        <div className='comments' style={{ display: item.isDisplay ? "block" : "none" }}>
                            <hr />
                            {/* 有评论内容时，展示，没有的时候就只展示输入的框 */}
                            <Spin spinning={loading}>
                                <div className='isComments'>
                                    {
                                        comFinList.map((i, inedx) => {
                                            return <div key={inedx}>
                                                <ExampleComment isParent={true} content={i.commentContent} pName={i.pName}
                                                    uId={i.uId} mId={i.mId} hfuid={i.hfuid} commentId={i.commentId} isDels={i.isDels}
                                                >
                                                    {
                                                        i.child.map((p, inum) => {
                                                            return <div key={inum}>
                                                                <ExampleComment isParent={false} content={p.commentContent}
                                                                    pName={p.pName} hName={p.hName} childCommentId={p.childCommentId}
                                                                    uId={p.uId} mId={p.mId} hfuid={p.hfuid} commentId={p.commentId}
                                                                    isDels={p.isDels}
                                                                >  </ExampleComment>
                                                            </div>
                                                        })
                                                    }
                                                </ExampleComment>
                                            </div>
                                        })
                                    }
                                </div>
                            </Spin>
                            {/* 输入部分 */}
                            <div className='sendInput'>
                                {comments.length > 0 && <CommentList comments={comments} />}
                                <TextArea value={commenrValue} onChange={handleCommentChange} placeholder={commenrPlhoder} rows={4} />
                                <br />
                                <Button htmlType="submit" onClick={handleSubmit} style={{ marginTop: "20px", marginBottom: "20px" }} type="primary">
                                    发布评论
                                </Button>
                                <Button  onClick={delThisbutton} size='small' style={{ marginLeft:"20px",marginTop: "20px", marginBottom: "20px" }} type="primary">
                                    清空回复
                                </Button>
                                
                            </div>
                        </div>
                    </div>
                })
            }
            {/* 分页 */}
            <div className='pageInds'>
                <Pagination current={pageX} onChange={newsPageChange} defaultPageSize={3} total={total} />
            </div>
            </Spin>
        </div>
    )
}
