import { React, useState,useEffect } from 'react'
import "./TabBars.css"
import logo from "../../imgs/fireFlow.png"
import { UnorderedListOutlined } from "@ant-design/icons"
// 导入路由
import { Link, Outlet ,useLocation} from "react-router-dom"
import imagesLogo from "../../imgs/fireFlow.png"
import { reqUserIsAdmin } from '../../js/service'

export default function TabBar(props) {

    const [color, setColor] = useState("orange");
    const [isNum, setNum] = useState(0);
    let [isAm,setIsAm] = useState(false);

    const {pathname}  = useLocation();
    let user = JSON.parse(localStorage.getItem("userData"))
    // 查询是否为管理员
    const isAdmin = ()=>{
      if(user!=undefined ||user != null){
        let params = {
          uid:user.uId
        }
        reqUserIsAdmin(params,res =>{
          if(res.code == 1){
            if(res.data == null || res.data.role == "普通用户"){
              setIsAm(false)
            }else if(res.data != null && res.data.role == "管理员"){
              setIsAm(true)
            }
            
          }
        })
      }
   
  }
    // 普通用户
    const linkList = [
        { to: "/newplaces", className: 'link', id: 0, none:{isAm:true}, conents: "留言广场" },
        { to: "/sendnews", className: 'link', id: 1, none:{isAm:true},conents: "发布信息" },
        { to: "/mypage", className: 'link', id: 2, none:{isAm:true},conents: "我的主页" },
        { to: "/numedit", className: 'link', id: 3, none:{isAm:true},conents: "账号信息" },
        { to: "/messagemanage", className: 'link', id: 4, none:{isAm},conents: "数据管理" },
    ]
    const checkTabD = (isNum) => {
        return () => {
            setNum(isNum)
        }
    }

    useEffect(() => {
        //查询出当前的用户是否为管理员
        isAdmin();
        // console.log(pathname)
    }, [pathname])
    //按照具体元素进行更新判断当前是那个tab
    useEffect(() => {
      // console.log(pathname)
        //查询出当前的用户是否为管理员
        switch(pathname){
          case  "/newplaces":
            setNum(0);
            break;
          case  "/sendnews":
            setNum(1);
            break;
          case  "/mypage":
            setNum(2);
            break;
          case  "/numedit":
            setNum(3);
            break;
          default :
            setNum(4);
            break;
      }
      },[])


    return (
        <div className='Bars'>
            <div className='tabbarOnew'>
                <div className='tab_left_tis'>
                    <div className='webLogos'>
                        <img src={imagesLogo} alt="" />
                    </div>
                    <div className='webNAME'>Fireworks</div>
                     </div>
                <div className='atb_left_ul'>
                     <ul className='tab_ul' >
                       {
                            linkList.map((item) => {
                                return <li key={item.id} style={{display:item.none.isAm ?"inline":"none"}}>
                                    <Link {...item} onClick={checkTabD(item.id)}>
                                        <span className={isNum == item.id ? "isThisTab" : ""}>
                                            {item.conents}
                                        </span>
                                    </Link>
                                </li>
                            })
                        }
                    </ul> 
                    </div>
            </div>
            {/* <hr /> */}
        </div>
    )
}
