<template lang="pug">
    .detail.pos_r
        .completeBox(v-show="complete")
            p.lion.tac
                img(src="../../assets/img/lion.png")
            .galleryTopBox.pos_r
                img.atop(src="../../assets/img/img02.png")
                .galleryTop
                    .fmImg.pos_r
                        img(:src="lessonImage")
                        .play1
                            img(src="../../assets/img/play1.png")       
                p.galleryText.tac {{lessonName}}
                .close1(@click="complete = false")
                    img(src="../../assets/img/close1.png")
        v-video(:videoUrl="videoInfo.url")
        v-comment
</template>

<script>
    import Utils from '../../utils'
    import vVideo from './video'
    import vComment from './comment'
    import { mapState, mapActions } from 'vuex'
    import iconShare from '../../assets/img/icon.jpg'
    const ROOT_URL = 'https://a.donut.cn'
    export default {
        data() {
            return {
                complete: false,
            }
        },
        created(){
            },
        mounted() {
                Utils.SDKRegister(this, ()=>{
                    if(!this.ruleType){ 
                        if(this.userInfo.vipDay>0){
                            Utils.wx.ready(()=>{
                                Utils.wx.showMenuItems({
                                    menuList: ['menuItem:share:timeline','menuItem:share:appMessage'] // 要显示的菜单项
                                });
                    
                                Utils.wx.onMenuShareAppMessage({
                                    title: '邀请你来和我一起上外教自然拼读课！', // 分享标题
                                    desc: '26课时免费学，全程外教上课，学习+练习！很棒哦！', // 分享描述
                                    link: ROOT_URL+this.userInfo.poster_self, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: ROOT_URL+iconShare, // 分享图标
                                    type: '', // 分享类型,music、video或link，不填默认为link
                                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                    success: () => { 
                                        // 用户确认分享后执行的回调函数
                                        // alert('分享成功：' +urlwx)
                                    },
                                    cancel: () => { 
                                        // 用户取消分享后执行的回调函数
                                    }
                                });
                                Utils.wx.onMenuShareTimeline({
                                    title: '邀请你来和我一起上外教自然拼读课！', // 分享标题
                                    link: ROOT_URL+this.userInfo.poster_self, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: ROOT_URL+iconShare, // 分享图标
                                    success: () => { 
                                        // 用户确认分享后执行的回调函数
                                    },
                                    cancel: () => { 
                                        // 用户取消分享后执行的回调函数
                                    }
                                });
                            })

                        }
                    }
    
                });
            this.$root.$on('close1', (status) => {
                this.complete = status;
            });
    
        },
        methods: {
            ...mapActions('moduleDetail',['clearState', 'studyTime'])
        },
        components: {
            vVideo, vComment
        },
        computed: {
            ...mapState(['ruleType']),
            ...mapState('moduleDetail', ['currentTime', 'maxTime', 'lessonName', 'lessonImage','videoInfo']),
            ...mapState('moduleHome',['userInfo']),
    
        },
    
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            console.log('---------to--------');
            console.log(to);
            console.log('---------from--------');
            console.log(from);
            if (from.fullPath == '/detail') {
                let time = this.$root.$emit('curTime');
                if (this.currentTime != this.maxTime) {
                    this.studyTime({curTime: this.currentTime});
                    this.clearState();
                    next();
                } else {
                    this.clearState();                    
                    next();
                }
            } else {
                this.clearState();                
                next();
            }
    
    
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/detail.scss";
</style>

