
import Vue from 'vue'
import Vuex from 'vuex'
import Utils from '../utils'
import Home from '../Api/home'
Vue.use(Vuex)


const state = {
    //通用类
    userInfo: {},                   //用户信息
    lesson: {},                     //课程
    courseId: '',                   //课程id
    //自然拼读类
    ruleBox: false,                 //规则
    share: false,                   //分享
    //图书类
    exchange: false,                //兑换框
    unlock: false,                  //（图书解锁状态）
    exchangeText: '',
    course: {},                     //图书兑换封面以及连接


}
const mutations = {
    userInfo: (state, userInfo) => state.userInfo = userInfo,
    lesson: (state, lesson) => state.lesson = lesson,
    courseId: (state, courseId) => state.courseId = courseId,
    ruleBox: (state, ruleBox) => state.ruleBox = ruleBox,
    share: (state, share) => state.share = share,

    exchange: (state, exchange) => state.exchange = exchange,
    unlock: (state, unlock) => state.unlock = unlock,
    exchangeText: (state, exchangeText) => state.exchangeText = exchangeText,
    course: (state, course) => state.course = course,


}
const actions = {
    // 首页初始化获取个人信息
    homeInit(context) {
        // console.log(context)
        let course_id = Utils.getUrlString("course_id"); //获取url course_id
        context.commit('courseId', course_id);
        return Home.homeInit({ course_id: course_id }).then(res => {
            // console.log(res.data)
            let homeInfo = res.data;
            context.commit('ruleType', homeInfo.type, { root: true });    //设置图书 或者 拼读类型
            context.commit('userInfo', homeInfo.data.userInfo);         //获取用户信息
            context.commit('course', homeInfo.data.course);             //图书兑换封面以及连接
            context.commit('unlock', homeInfo.unlock);                  //图书解锁状态
            context.commit('exchange', !homeInfo.unlock);               //未解锁弹屏显示，解锁关闭

            homeInfo.data.lesson.unshift(homeInfo.data.course);         //lessonArr 插入课程信息
            context.commit('lesson', homeInfo.data.lesson);             //课程列表
            return homeInfo.type;
        })
    },
    // 兑换码激活 
    exchangeActive(context, code) {
        let course_id = Utils.getUrlString("course_id"); //获取url course_id
        let datas = {
            code: code,
            course_id: course_id
        }
        Home.exchangeActive(datas).then(res => {
            // console.log(res)
            let data = res.data;
            if(data.code == 0){
                context.commit('exchangeText', '兑换成功！');
                context.commit('unlock', true);
            }else{
                context.commit('exchangeText', data.msg + '!');
            }
        })
    }

}
const getters = {

}
const moduleHome = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleHome