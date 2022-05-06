import { requestData, requestPostData } from "./request";


// 用户登录
export function reqUserLogin(param, callback) {
    requestPostData("/user/uLogin", param, res => {
        callback(res);
    });
}
// 用户注册
export function reqUserResget(param, callback) {
    requestPostData("/user/uRegister", param, res => {
        callback(res);
    });
}


//post
export function reqUploadPicture(param, callback) {
    requestPostData("/search/users", param, res => {
        callback(res);
    });
}

//留言广场的留言数据
export function reqUserMessaage(param, callback) {
    requestData("/msg/allMsg", param, res => {
        callback(res);
    });
}

//发布留言
export function reqUserSendMessaage(param, callback) {
    requestPostData("/msg/addOneMsg", param, res => {
        callback(res);
    });
}

//查询单个留言下的评论
export function reqMessageComment(param, callback) {
    requestData("/comment/queryCommentMsg", param, res => {
        callback(res);
    });
}

//发布评论
export function reqSendNewsComment(param, callback) {
    requestPostData("/comment/addCommentMsg", param, res => {
        callback(res);
    });
}

//删除评论
export function reqDelNewsComment(param, callback) {
    requestData("/comment/delCommentMsg", param, res => {
        callback(res);
    });
}

//查询个人数据
export function reqUserDetailCoems(param, callback) {
    requestData("/msg/allUserMsg", param, res => {
        callback(res);
    });
}
//删除个人留言
export function reqdelDetailmess(param, callback) {
    requestData("/msg/delOneMsg", param, res => {
        callback(res);
    });
}

//修改个人信息
export function requpdateDetailmess(param, callback) {
    requestPostData("/user/updateUserMsg", param, res => {
        callback(res);
    });
}


//查询个人是否为管理员
export function reqUserIsAdmin(param, callback) {
    requestData("/root/getRole", param, res => {
        callback(res);
    });
}

// 管理员删除留言 
export function reAdmindelmessage(param, callback) {
    requestData("/root/delMessage", param, res => {
        callback(res);
    });
}

//管理员查询所有留言
export function reAdmincheckcons(param, callback) {
    requestData("/root/getMessage", param, res => {
        callback(res);
    });
}

//查询所有的用户
export function reAdminFindUser(param, callback) {
    requestData("/root/getAllUser", param, res => {
        callback(res);
    });
}
//删除所有的用户
export function redelAllUser(param, callback) {
    requestData("/root/delUser", param, res => {
        callback(res);
    });
}

//发布公告
export function reqSendMessagegg(param, callback) {
    requestPostData("/root/insertNotice", param, res => {
        callback(res);
    });
}

//查询所有公告 
export function reqFindAllGG(param, callback) {
    requestData("/root/getNotice", param, res => {
        callback(res);
    });
}

//删除公告 
export function reqDelAllGG(param, callback) {
    requestData("/root/delNotice", param, res => {
        callback(res);
    });
}


//模糊c查询
export function reqmhSearch(param, callback) {
    requestData("/root/getUserByName", param, res => {
        callback(res);
    });
}








