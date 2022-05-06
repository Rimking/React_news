// 重定向
import {Navigate} from "react-router-dom"
// 引入所有的路由
import NewsPlace from "../Pages/NewsPlace/NewsPlace";//留言广场
import Login from "../Pages/Login/Login";//登录
import MyPage from "../Pages/MyPage/MyPage";//我的主页
import SendNews from "../Pages/SendNews/SendNews";//发布信息
import NumEdit from "../Pages/NumEdit/NumEdit";//账号信息
import MessageManage from "../Pages/MessageManage/MessageManage.jsx";//留言管理
import SendNotice from "../Pages/SendNotice/SendNotice.jsx";//发布公告
import AccountManage from "../Pages/AccountManage/AccountManage";//用户管理
import DataManage from "../Pages/DataManage/DataManage.jsx";//留言管理
import GgMessage from "../Pages/GgMessage/GgMessage";//公告管理


export default [
    {
        path:"/",
        element:<Navigate to="newplaces"/>
    },
    {//留言广场
        path:"/newplaces",
        element:<NewsPlace/>,
        children:[]
    },
    {//登录
        path:"/login",
        element:<Login/>,
    },
    {//账号信息
        path:"/numedit",
        element:<NumEdit/>,
    },
    {//发布信息
        path:"/sendnews",
        element:<SendNews/>,
    },
    {//我的主页
        path:"/mypage",
        element:<MyPage/>,
    },
    {//留言管理
        path:"/messagemanage",
        element:<MessageManage/>,
        children:[
            {path:"datamanage",element:<DataManage/>,},//留言管理
            {path:"accountmanage",element:<AccountManage/>,},//用户管理
            {path:"sendnotice",element:<SendNotice/>,},//发布公告
            {path:"ggmessage",element:<GgMessage/>,},//发布公告
            {path:"",element:<Navigate to="datamanage"/>,},//留言管理

        ]
    },
    // {//发布公告
    //     path:"/sendnotice",
    //     element:<SendNotice/>,
    // },
    // {//用户管理
    //     path:"/accountmanage",
    //     element:<AccountManage/>,
    // },

    
]