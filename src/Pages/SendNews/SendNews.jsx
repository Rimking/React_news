import React,{useState} from 'react'
import "./SendNews.css"
import { Input,Button, message } from 'antd';
import {UploadOutlined} from "@ant-design/icons"
import {reqUserSendMessaage} from "../../js/service"
import {dateToFormatFull} from '../../js/common'

export default function SendNews() {
  const { TextArea } = Input;

  let [inVlue,setInvalue] = useState("");
  let [textArea,settextArea] = useState("");
  const onTilChange = e => {
    setInvalue(e.target.value)
  };
  const onConChange = e => {
    settextArea(e.target.value)
  };


  //发布留言
  const sendMessageNews = ()=>{
    let data = JSON.parse( localStorage.getItem("userData"));
    // console.log(data)
    let params ={
      uId:data.uId,
      title:inVlue,
      content:textArea,
      msgDate:dateToFormatFull(new Date())
    }
    // console.log(params)
    reqUserSendMessaage(params,res =>{
      if(res.code == 1){
        message.info(res.msg)
        setInvalue("");
        settextArea("")
      }
    })

  }


  return (
    <div className='SendNews'>

      {/*  */}
      <div className='send_center'>
        {/* 输入部分 */}
        <div className='sen_tils'>
          <div className='sen_cons'>留言标题</div>
          {/* <span></span>
          <div> </div> */}
          <div className='sen_inps'>
            <Input showCount maxLength={40} placeholder='请输入标题' value={inVlue} onChange={onTilChange} />
            </div>
          </div>
             {/* 内容部分 */}
        <div className='sen_conents'>
          <div className='sen_tex'>留言内容</div>
          <div className='sen_textaus'>
          <TextArea showCount maxLength={600} placeholder='请输入内容' value={textArea} onChange={onConChange} />
            </div>
        </div>
        {/* 发送按钮 */}
        <div className='sen_btns'>
        <Button type="primary" onClick={sendMessageNews} icon={<UploadOutlined />} >
          发布
        </Button>
        </div>
        </div>

      </div>
      )
}
