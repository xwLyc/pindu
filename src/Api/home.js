import utils from '../utils'

export default {
    // 图书以及自然拼读首页接口 初始化
    // http://localhost:8080/?course_id=5aab80d9e8871c0cb7969d95#/home
    homeInit: (obj) => {
        return utils.httpPost(utils.API+'/spell/wx_book_course_home', obj)
    },
    userInit: (obj) => {
        return utils.httpGet(utils.API+'/login_test?userId=59c245197fa40a28a9789e3b&courseId=5a5ef41c471dd33aa5854fec', obj)
    },
    // 兑换码激活
    exchangeActive: (obj) => {
        return utils.httpPost(utils.API+'/spell/wx_duihuan_book', obj)
    },

}