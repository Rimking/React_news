import {React,useEffect,useState} from 'react'
import "./Conents.css"
import TabBar from '../TabBar/TabBar'
import route from "../../routes/index"
// 导入路由
import {Link,Outlet,useRoutes,useLocation} from "react-router-dom"
import { reqUserIsAdmin } from '../../js/service'
export default function Conents() {
    // 在页面渲染的时候获取到首页数据
  //   useEffect(() => {
  //     //查询出当前的用户是否为管理员
  //     isAdmin();
  // }, [])
  const ele = useRoutes(route)
  const loca = useLocation()
  const isLogin = loca.pathname;
  return (
    <div className='Conents'>
      <div className='TabBar' style={{display:isLogin=="/login"?"none":"block"}} >
        <TabBar />
        </div>
        <div className="con_route" style={{minHeight:isLogin=="/login"?"100%":"75%"}}>
        {ele}
        </div>
         
    </div>
  )
}
