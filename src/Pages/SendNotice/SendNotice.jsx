import React, { useState } from 'react'
import "./SendNotice.css"
import { Input,Button, message } from 'antd';
import {UploadOutlined} from "@ant-design/icons"
import {reqSendMessagegg} from "../../js/service"

export default function SendNotice() {
  const { TextArea } = Input;

  let [titles, settitles] =useState("")
  let [newConent, setnewConent] =useState("")
  //修改标题
  const ontitles = e => {
    settitles(e.target.value)
  };
  //修改公告内容
  const onnewConent = e => {
    setnewConent(e.target.value)
  };

  //发布公告
  const sendConents = ()=>{
    //
    let data = JSON.parse(localStorage.getItem("userData"));
    let params = {
        rid:1,//data.uId
        content:newConent,
        title:titles
    }
    reqSendMessagegg(params,res =>{
      if(res.code == 1){
        // console.log(res)
        message.info(res.msg)
        settitles("");
        setnewConent("");
      }
    })

  }



  return (
    <div className='sendNoticeModel'>
     <div className='send_center'>
        {/* 输入部分 */}
        <div className='sen_tils'>
          <div className='sen_cons'>公告标题</div>
          {/* <span></span>
          <div> </div> */}
          <div className='sen_inps'>
            <Input showCount maxLength={40} value={titles} placeholder='请输入标题' onChange={ontitles} />
            </div>
          </div>
             {/* 内容部分 */}
        <div className='sen_conents'>
          <div className='sen_tex'>公告内容</div>
          <div className='sen_textaus'>
          <TextArea showCount maxLength={600} value={newConent}  placeholder='请输入内容' onChange={onnewConent} />
            </div>
        </div>
        {/* 发送按钮 */}
        <div className='sen_btns'>
        <Button type="primary" onClick={sendConents} icon={<UploadOutlined />} >
          发布
        </Button>
        </div>
        </div>
    </div>
  )
}
