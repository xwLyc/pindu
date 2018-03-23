
import Vue from 'vue'
import Vuex from 'vuex'
import Route from '../router'
import Detail from '../Api/detail'
Vue.use(Vuex)


const state = {
    currentTime: 0,                //视频播放当前时间    
    maxTime: 0,                     //当前视频最大时间

    lessonId: '',                   //课程Id           
    videoInfo: '',                  //视频信息
    videoPreview: '',               //视频预览图
    lessonName: '',                 //课节名称
    lessonImage: '',                //课节图片
    question: '',                   //问题
    answer: '',                     //答案
    comments: '',                   //评论集合
    topComments: '',                //最高评论集合
    totalCount: '',                //总条数
    hasNext: false,                 //是否有下一页评论



}
const mutations = {
    currentTime: (state, currentTime) => state.currentTime = currentTime,
    maxTime: (state, maxTime) => state.maxTime = maxTime,
    lessonId: (state, lessonId) => state.lessonId = lessonId,
    videoInfo: (state, videoInfo) => state.videoInfo = videoInfo,
    videoPreview: (state, videoPreview) => state.videoPreview = videoPreview,
    lessonName: (state, lessonName) => state.lessonName = lessonName,
    lessonImage: (state, lessonImage) => state.lessonImage = lessonImage,
    question: (state, question) => state.question = question,
    answer: (state, answer) => state.answer = answer,
    comments: (state, comments) => state.comments = comments,
    topComments: (state, topComments) => state.topComments = topComments,
    totalCount: (state, totalCount) => state.totalCount = totalCount,
    hasNext: (state, hasNext) => state.hasNext = hasNext,



}
const actions = {
    // 清空状态
    clearState(context){
        context.commit('currentTime', 0);
        context.commit('maxTime', 0);
        context.commit('videoInfo', '');
        context.commit('videoPreview', '');
        // context.commit('lessonName', '');
        context.commit('lessonImage', '');
        context.commit('question', '');
        context.commit('answer', '');
        context.commit('comments', '');
        context.commit('topComments', '');
        context.commit('totalCount', '');
    },
    //查询课程
    queryLesson(context){
        if(!context.state.lessonId){           //如果没有LessonId 返回首页
            Route.push('/home');
        }else{
            Detail.queryLesson({lesson_id: state.lessonId}).then(res =>{
                console.log(res)
                let LessonInfo = res.data.data;
                // console.log(LessonInfo)
                context.commit('videoInfo',LessonInfo.video);
                // context.commit('videoPreview',LessonInfo.preview);
                context.commit('lessonName',LessonInfo.name);
                context.commit('lessonImage',LessonInfo.image.url);
                context.commit('question',LessonInfo.question);
                context.commit('answer',LessonInfo.answer);

                
            })
        }
    },
    // 学习时间
    studyTime(context, payload) {
        let datas = {
            lesson_id: context.state.lessonId,
            studyTime: payload.curTime
        }
        if(payload.finished){
            datas.finished = payload.finished;
        }
        Detail.studyTime(datas).then(res => {
            if(res.code == 0){

            }
        })
    },
    // 查询评论列表 
    commentList(context, page = 0, pageCount = 15) {
        let datas = {
            lesson_id: context.state.lessonId,
            page: page,
            pageCount: pageCount
        }
        Detail.commentList(datas).then(res => {
            // console.log(res)
            if(res.data.code==0){
                let curComments = context.state.comments || [];
                let comments = res.data.data.comments;
                //将新评论数据 合并到 评论集合里
                curComments = curComments.concat(comments);
                
                let topComments = res.data.data.topComments;
                let totalCount = res.data.data.totalCount;
                let hasNext = res.data.data.hasNext;
                context.commit('comments', curComments);
                context.commit('topComments', topComments);
                context.commit('totalCount', totalCount);
                context.commit('hasNext', hasNext);
            }else{

            }
        })
    },
    // 添加评论
    addComment(context, content) {
        let datas = {
            lesson_id: context.state.lessonId,
            content: content
        }
        Detail.addComment(datas).then(res => {
            if(res.data.code == 0){
                Route.replace({path: '/detail'});
            }
        })
    },
    // 点赞
    commentZan(context, comment_id) {
        Detail.commentZan({comment_id: comment_id}).then(res => {
            if(res.data.code == 0){
                
            }
        })
    },

}
const getters = {

}
const moduleDetal = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleDetal