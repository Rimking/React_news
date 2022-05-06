import React,{useState,useEffect} from 'react'
import "./NewsPlace.css"
import {useNavigate} from "react-router-dom"
import Search from '../../Components/Search/SearchModol'
import Items from '../../Components/Items/Items'
import { Carousel } from 'antd';
import ImageBox from '../../Components/imageBox/imageBox';
import axios from "axios"
import {NotificationOutlined} from "@ant-design/icons"
import {reqDetailComment,reqFindAllGG} from "../../js/service"
import {dateToFormatFull} from "../../js/common"
import imagesO from "../../imgs/1.png"
import imagesT from "../../imgs/2.png"
import imagesH from "../../imgs/3.png"
import imagesF from "../../imgs/4.png"

export default function NewsPlace() {
  let navgaite = useNavigate();

  const [ggCons,setggCons] = useState({});

  useEffect(() => {
    //获取本地账户，如果不存在就跳转登录界面
    let data = localStorage.getItem("userData");
    if(data == null || data == undefined){
      navgaite("/login")
    }else{
      searchGG();
    }
}, [])

//查询公告
  const searchGG = ()=>{

    let params = {}
    reqFindAllGG(params,res =>{
      if(res.code ==1){
        let obj = {}
        let data = res.data;
        data.map(item =>{
          item.date = dateToFormatFull(item.date)
        })
        setggCons(data[0])

      }
    })
  }

  // 轮播图内容
  const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const [bannerList, setBannerList] = useState([imagesO,imagesT,imagesH,imagesF]);

  return (
    <div>
      {/* <div className='BoxModol'> <ImageBox/></div> */}
      <div className='banner_newplace'>
        <Carousel autoplay > 
        {bannerList.map(val => (
        <img
        className="bannerIMA"
          key={val}
          src={val}
          />
      ))}
        </Carousel>
      </div>
      
      {/* <div className='search'>
         <Search/>
      </div> */}
      <div className='ggModelCones'>
        <div className='notsifisca'> <NotificationOutlined /></div>
        <p className='notsicons'>{ggCons.title}：{ggCons.content}</p>
        <p className='notsitioms'>{ggCons.date}</p>

      </div>
      {/* 单个item */}
      <div className='item_news'>
        <div className='itms'>
          <Items demo={"123"} />
        </div>
      </div>
    </div>
  )
}
