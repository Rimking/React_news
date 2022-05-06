/**专门暴露一个store，整个文件只有一个store */
import createStroe, { createStore } from "redux";

// 导入所有需要管理的组件
import Login from "../Components/Login/Login.jsx"
import NewsPlace from "../Components/NewsPlace/NewsPlace.jsx"
import Resgites from "../Components/Resgites/Resgites.jsx"

// 汇总
const allReducers = combineReducers({
    Login,
    NewsPlace,
    Resgites
})

//传入对应的组件信息
export default createStore(allReducers);