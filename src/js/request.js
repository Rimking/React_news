import axios from 'axios';

let baseUrl = "";
//请求数据
function requestData(url, queryParams, successCallback) {
    // let orExport = false;
    // 特殊地址单独处理
    // switch(url) {
    // 	case '/dataList/export':
    // 	case '/site/export':
    // 		orExport = true;
    // 		break;
    // }
    let that = this;
    // let authorization = getAuthorization();//获取token
    let header = {};
    // if (authorization) {
    //     header.token = authorization;
    // }
    let method = {
            params: queryParams,
            headers: header
        }
        // if (orExport) {
        //     method.responseType = 'blob';
        // }
    axios.get(baseUrl + url, method).then(function(res) {
        successCallback(res.data);
    }).catch(function(error) {
        console.log("error", error);
    });
}


//请求数据
function requestPostData(url, queryParams, successCallback) {
    // let orExport = false;

    let that = this;
    let header = {};
    // let authorization = getAuthorization();
    // if (authorization) {
    //     header.token = authorization;
    // }
    // if (url == "/Comment/insertComment") {
    //     header = { "Content-Type": "multipart/form-data" }
    // }
    axios.post(baseUrl + url, queryParams, { headers: header }).then(function(res) {
        successCallback(res.data);
    }).catch(function(error) {
        console.log("error", error);
    });
}



//导出
export function uploadData(url, ss) {
    let token = localStorage.getItem("wisdomAuthorization");
    axios(baseUrl + url, {
        headers: { 'token': token },
        responseType: 'blob'
    }).then((response) => {
        let filename = "";
        let fileHeaders = response.headers;
        for (let i in fileHeaders) {
            if (i == "content-disposition") {
                filename = fileHeaders[i];
            }
        }
        if (filename) {
            filename = filename.substring(filename.indexOf("=") + 1, filename.length);
            filename = decodeURI(filename);
            if (filename.indexOf('"') != "-1") {
                filename = filename.substring(1, filename.length - 1);
            }
            let downloadElement = document.createElement('a');
            let blob = response.data;
            let href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = filename;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
        }
    }).catch((error) => {
        console.log(error);
    });
}

export {
    requestData,
    requestPostData,
    // uploadData,
}