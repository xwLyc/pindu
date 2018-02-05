<template lang="pug">
    section.commentText
        p.videoName {{lessonName}}
        .textareaBox
            textarea.contentText(type="text" v-model="content" placeholder="说点什么。。。")
        p.commentButton(@click="commitComment") 提交
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Utils from '../../utils'

    export default {
        data() {
            return {
                content: ''
            }
        },
        created(){
            Utils.SDKRegister(this);
        },
        mounted() {
            if(!this.lessonId){
                this.$router.push({name:'home'})
            }
        },
        methods: {
            commitComment() {
                if(this.content.trim()!=''){
                    this.addComment(this.content);
                }
            },
            ...mapActions('moduleDetail', ['addComment'])
    
        },
        computed: {
            ...mapState('moduleDetail', ['lessonName','lessonId']),
        }
    
    }
</script>

<style lang="scss">
    @import "../../assets/scss/detail.scss";
</style>


