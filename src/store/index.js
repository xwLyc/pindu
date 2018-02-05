/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:09:07 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-29 16:34:03
 */
import Vue from 'vue'
import Vuex from 'vuex'
import moduleHome from './home'
import moduleDetail from './detail'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        moduleHome: moduleHome,
        moduleDetail: moduleDetail,
    },
    state: {
        ruleType: 1,    //1 为兑换规则(图书)， 0 为续期规则(自然拼读)
        imgUrl: '',     //分享的海报地址
    },
    mutations: {
        ruleType: (state, ruleType)=> state.ruleType = ruleType,
        imgUrl: (state, imgUrl)=> state.imgUrl = imgUrl,
        
    }
})