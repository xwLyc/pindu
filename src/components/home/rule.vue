<template lang="pug">
    section.ruleBox
        img(:src="userInfo.poster" v-show="unlockImg")
        .rule.pos_r(v-show="!unlockImg")
            //- img(src="../../assets/img/img07.png")
            img(src="../../assets/img/img07.1.png")
            .tDate.top1
                p.fl
                    span.red +7
                    span  天
                p.fr.end(v-if="userInfo.vipAllDay>0") 已完成
                a.fr(href="javascript:;" v-else @click="unlockImg = true" ) 去解锁
                //- a.fr(href="javascript:;" @click="goShare" v-if="userInfo.vipAllDay<=0" :class="{unlock: userInfo.vipAllDay==0}") 去解锁
            .tDate.top2
                p.fl
                    span.red +7
                    span  天
                //- p.fr.end 已完成
                a.fr(href="javascript:;" @click="goShare" :class="{unlock: userInfo.vipAllDay==0}") 去分享
            .tDate.top3
                p.fl
                    span.red +7
                    span  天
                a.fr(:href="userInfo.vipAllDay > 0 ? hrefUrl :'javascript:;'" :class="{unlock: userInfo.vipAllDay==0}" v-if="!userInfo.waijiao") 去上课
                p.fr.end(v-else) 已完成
            .closeRule(@click="closeRule")

</template>
<script>
import { mapState, mapActions } from 'vuex'
import Utils from '../../utils'
import iconShare from '../../assets/img/icon.jpg'
const ROOT_URL = 'https://a.donut.cn'
export default {
    data (){
        return {
            unlockImg: false,

        }
    },
    mounted(){

    },
    methods: {
        closeRule(){
            this.$store.commit('moduleHome/ruleBox',false);
        },
        goShare(){        
            if(this.userInfo.vipAllDay>0){
                Utils.wx.ready(()=>{
                    Utils.wx.showMenuItems({
                        menuList: ['menuItem:share:timeline','menuItem:share:appMessage'] // 要显示的菜单项
                    });
                    let shareUrl = location.href.split('#')[0] + "#/shareImg";
                    let imgUrl = ROOT_URL+this.userInfo.poster_self;
                    this.$store.commit('imgUrl', imgUrl);
                    // alert(imgUrl)
                    Utils.wx.onMenuShareAppMessage({
                        title: '邀请你来和我一起上外教自然拼读课！', // 分享标题
                        desc: '26课时免费学，全程外教上课，学习+练习！很棒哦！', // 分享描述
                        link: imgUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                        link: imgUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: ROOT_URL+iconShare, // 分享图标
                        success: () => { 
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: () => { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                })
                this.$store.commit('moduleHome/share',true);
            }
        }
    },
    computed: {
        ...mapState('moduleHome',['userInfo','courseId']),
        // vipDay(){
        //     return this.userInfo.vipDay
        // },
        userId(){
            return this.userInfo.userId;
        },
        hrefUrl(){
            let hrefUrl = 'http://un.koolearn.com/alliance/click?userid=ff8080815b891434015b891434790000&utm_item=%E5%B0%8F%E7%8B%AE%E5%AD%90%E8%AF%B4%E8%8B%B1%E8%AF%AD-%E6%B4%BB%E5%8A%A8-%E8%87%AA%E7%84%B6%E6%8B%BC%E8%AF%BB%E5%B9%BF%E5%91%8A%E4%BD%8D-0&kid=80fd803f8ae64371a5a5233fbaf7fb54&url=https%3A%2F%2Fdonut.koolearn.com%2Fmarket%2FWeixin_Acquisition.html%3Futm_source%3Dwx1-campaign-phonics-0';
            return hrefUrl + '&courseIdXq=' + this.courseId + '&userIdXq=' + this.userId;
        }
    }
}
</script>

