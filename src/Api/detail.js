import utils from '../utils'

export default {
    // 查询课节 根据id   post
    queryLesson: (obj) => {
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/query_lesson', obj)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 阅读时间
    studyTime: (obj) => {
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/wx_finish_book', obj)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 查询评论列表   post
    commentList: (obj) => {
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/wx_query_lesson_comment', obj)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 增加评论
    addComment: (obj) => {
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/wx_add_comment', obj)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 点赞/取消点赞  post
    commentZan: (obj) => {
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/wx_control_comment_zan', obj)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    
}