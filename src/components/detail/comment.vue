<template lang="pug">
    section.commentBox
        p.toComment(@click="toComment") 我要评论
        p.commentTotal 评论（{{totalCount}}）
        v-comment-list( v-for="(topCommentInfo, index) in topComments" :key="topCommentInfo._id" :comment="topCommentInfo")
        .newComment
            .newLine.pos_r(v-if="comments.length>0")
                p.line
                p.newText.tac 最新评论
            v-comment-list( v-for="(commentInfo, index) in comments" :key="commentInfo._id" :comment="commentInfo")
        p.lookMore(@click="lookMore(page++)" v-show="hasNext") 查看更多
        v-comment-input
</template>

<script>
    import vCommentList from './commentList'
    import vCommentInput from './commentInput'
    import { mapState, mapActions } from 'vuex'
    
    export default {
        data() {
            return {
                // commentTotal: '123'
                page: 1
            }
        },
        mounted() {
            this.commentList();
        },
        methods: {
            ...mapActions('moduleDetail',['commentList', 'clearState']),
            toComment() {
                this.$router.push({name: 'commentText'})
            },
            lookMore(page){
                this.commentList(page);
            }
        },
        components: {
            vCommentList, vCommentInput
        },
        computed: {
            ...mapState('moduleDetail',['comments','topComments','totalCount','hasNext'])
        },
        
    }
</script>

<style lang="scss">
    
</style>

