import utils from '../utils'

export default {
    // 图书以及自然拼读首页接口 初始化
    homeInit: (obj) => {
        return utils.httpPost(utils.API+'/spell/wx_book_course_home', obj)
    },
    userInit: (obj) => {
        return utils.httpGet(utils.API+'/login_test?userId=59bfa13f7fa40a28a9712ad8&courseId=5a5ef41c471dd33aa5854fec', obj)
    },
    // 兑换码激活
    exchangeActive: (obj) => {
        utils.httpPost(utils.API+'/spell/wx_duihuan_book', obj)
    },

}