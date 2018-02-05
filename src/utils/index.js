/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:09:20 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-16 21:59:48
 */
import axios from 'axios'
import wx from 'weixin-js-sdk'
const utils = {
    /**
	 * [封装get和post请求函数]
	 * @url 请求地址
	 * @params 请求的参数
	 * @success 请求回调
	 * @error 请求失败回调
	 */
    httpGet: (url, params) => {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: params }).then(res => resolve(res)).catch(err => reject(err))
        })
    },
    httpPost: (url, params) => {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => resolve(res)).catch(err => reject(err))
        })
    },
    // 接口路径
    API: process.env.API_URL,
    // 资源根路径
    URL_WEBSITE: process.env.URL_WEBSITE,
    // 截取url参数
    getUrlString: (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    // 微信SDK
    wx: wx,
    SDKRegister: (that, callback) => {
        if(process.env.NODE_ENV == 'production'){   //只能是生产环境调用接口
            axios.get(process.env.API_URL + '/library/init?url=' + encodeURIComponent(location.href.split('#')[0])).then((res) => {
                // console.log(res);
                if (res.status == '200' && res.data.code == 0) {
                    let data = res.data.data;
                    console.log(data)
                    let jsApiList = ['hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice']
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名，见附录1
                        jsApiList: jsApiList// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }
                wx.ready(() => {
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    wx.hideAllNonBaseMenuItem();
                });
                wx.error((res) => {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    alert("错误：" + JSON.stringify(res))
                });
                if (callback) {
                    callback.call(that);
                }
            });
        }
    }


}
export default utils