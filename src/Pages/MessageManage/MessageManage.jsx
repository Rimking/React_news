import React,{useState,useEffect} from 'react'
import "./MessageManage.css"
import {Link,Outlet,useLocation} from "react-router-dom"
import {CopyOutlined,UsergroupDeleteOutlined,CloudUploadOutlined} from "@ant-design/icons"

export default function MessageManage() {

    const [isMessageNum,setisMessageNum] = useState(1);
    const {pathname}  = useLocation();
    const checkThisIsMess = (num)=>{
      return ()=>{
        setisMessageNum(num)
      }
    }
    const norClass = "messgae_Link";
    const selClass = "messgae_Link isthisMessage";

    // useEffect(() => {
    // }, [])
    useEffect(() => {
      //查询出当前的用户是否为管理员
      switch(pathname){
        case  "/messagemanage/datamanage":
          setisMessageNum(1);
          break;
        case  "/messagemanage/accountmanage":
          setisMessageNum(2);
          break;
        case  "/messagemanage/sendnotice":
          setisMessageNum(3);
          break;
        case  "/messagemanage/ggmessage":
          setisMessageNum(4);
          break;
    }
    },[])
  return (
    <div className='messageMaeModel'>

      <div className='messsageCenter'>
      {/* 左边导航 */}
      <div className='Messagetabe'>
        <ul className='Message_ul_tab'>
          <li>
            <Link className={isMessageNum == 1? selClass : norClass}  onClick={checkThisIsMess(1)} to="datamanage">
              <span className='mes_link_sp'><CopyOutlined /></span> 
               留言管理
            </Link>
          </li>
          <li>
            <Link className={isMessageNum == 2? selClass : norClass} onClick={checkThisIsMess(2)} to="accountmanage">
              <span className='mes_link_sp'><UsergroupDeleteOutlined /></span> 
               用户管理
            </Link>
          </li>
          <li>
            <Link className={isMessageNum == 3? selClass : norClass} onClick={checkThisIsMess(3)} to="sendnotice">
              <span className='mes_link_sp'><CloudUploadOutlined /></span> 
               发布公告
            </Link>
          </li>
          <li>
            <Link className={isMessageNum == 4? selClass : norClass} onClick={checkThisIsMess(4)} to="ggmessage">
              <span className='mes_link_sp'><CloudUploadOutlined /></span> 
               公告管理
            </Link>
          </li>
        </ul>
      </div>
      {/* 右边路由展示 */}
      <div className='messageRight'>
        <Outlet/>
      </div>
      </div>
    </div>
  )
}
