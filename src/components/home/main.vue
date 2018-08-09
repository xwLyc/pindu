<template lang="pug">
    section.main.pos_r
        transition(name="fade")
            p.aniFade(v-show="aniFade" v-if="userInfo.vipDay>0") 请先读完第{{willRead-1}}个课节哦~
            p.aniFade(v-show="aniFade" v-else) {{peopleUnlock}}
        .galleryTopBox
            img.topImg(src="../../assets/img/img02.png")
            .galleryTop
                swiper.swiper1(:options="swiperOption1" ref="mySwiper1" :not-next-tick="notNextTick")
                    swiper-slide.pos_r(v-for="(item, index) in lesson" :key="item._id")
                        .complete(v-show="item.finished && index>0")
                            img(src="../../assets/img/icon_complete.png")
                        .fmImg.pos_r(@click="enterVideo(index, item._id, URL_WEBSITE+item.video)")
                            img(:src="item.image?URL_WEBSITE+item.image:''")
                            .lock(v-show="!ruleType && index>=willRead")
                                img(src="../../assets/img/lock.png")
                            .play1(v-show="index>0")
                                img(src="../../assets/img/play1.png")
                        p.galleryText.tac {{item.name}}
        .galleryThumbs.pos_r
            p.thumbs.thumbsL
                img(src="../../assets/img/img05.png")
            p.thumbs.thumbsR
                img(src="../../assets/img/img04.png")
            swiper.swiper2(:options="swiperOption2" ref="mySwiper2" :not-next-tick="notNextTick")
                swiper-slide.pos_r(v-for="(item, index) in lesson" :key="item._id")
                    .complete(v-show="item.finished && index>0")
                        img(src="../../assets/img/icon_complete.png")
                    .fmImg.pos_r(@click="slideToClick(index)")
                        img(:src="item.image?URL_WEBSITE+item.image:''")
                        .lock(v-show="!ruleType && index>=willRead")
                            img(src="../../assets/img/lock.png")

        .galleryPage
            swiper.swiper3(:options="swiperOption3" ref="mySwiper3" :not-next-tick="notNextTick")
                swiper-slide(v-for="(item, index)  in lesson" :key="item._id")
                    p.tac(v-if="index==0" @click="slideToClick(index)")
                        img.fmIcon(src="../../assets/img/img06.png")
                    p.tac(:class="{yellow:item.finished}" v-else @click="slideToClick(index)") {{index}}

        .galleryPageCir
        .galleryIOSX
</template>
<script>
import Utils from '../../utils'
import { mapState, mapActions } from 'vuex'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import iconShare from '../../assets/img/icon.jpg'
const ROOT_URL = 'https://a.donut.cn'
export default {
    data() {
        return {
            aniFade:false,
            willRead: 1,
            
            // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
            // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
            notNextTick: true,
            swiperOption1: {
                setWrapperSize: true,
                spaceBetween: 10,
            },
            swiperOption2: {
                setWrapperSize: true,
                spaceBetween: 10,
                slidesPerView: 2,
                centeredSlides: true,
            },
            swiperOption3: {
                setWrapperSize: true,
                spaceBetween: 0,
                slidesPerView: 10,
                centeredSlides: true,
            }
        };
    },
    created(){
        },
    mounted(){
            this.$store.dispatch('moduleHome/homeInit').then(ruletype => {
                if(ruletype){   //设置标题
                    document.title = '多纳学英语';
                }else{
                    document.title = '多纳自然拼读';
                }
                // console.log(ruletype)
                if(this.userInfo.learn_day!=undefined){
                    if(this.userInfo.learn_day>0){
                        this.sildeToStudy();
                    }
                }
    
                if(this.userInfo.vipDay<1){
                    this.$store.commit('moduleHome/ruleBox',true);
                }
                if(!ruletype){ //自然拼读，自动调到将要读的那一本书
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
                    this.sildeToStudy();
                }
            })
            // console.log(this.$refs.mySwiper1.swiper)
            this.$refs.mySwiper1.swiper.params.control = this.$refs.mySwiper2.swiper;
            this.$refs.mySwiper2.swiper.params.control = this.$refs.mySwiper3.swiper;
            this.$refs.mySwiper3.swiper.params.control = this.$refs.mySwiper2.swiper;

    },
    methods: {
        slideToClick(index){
            this.$refs.mySwiper1.swiper.slideTo(index, 500, false);
        },
        sildeToStudy(){ //index = 0,跳到第一个未读完课节
            if(this.ruleType){    // --------图书---------
                let lessonArr = this.lesson;
                for(let i=1; i < lessonArr.length; i++){
                    if(!lessonArr[i].finished){
                        this.slideToClick(i);
                        break;
                    }
                }
            }else{       //自然拼读，自动调到将要读的那一本书
                if(this.userInfo.vipDay>0){ //已解锁
                    this.lesson.map((e, i)=>{
                        if(e.unlocked){
                            this.willRead = i+1;
                            this.slideToClick(this.willRead-1);
                        }
                    })
                }else{
                    this.slideToClick(0);
                }
            }
        },
        enterVideo(index, _id, videoUrl){
            if(this.ruleType){      // --------图书---------
                if(index>0){
                    this.$store.commit('moduleDetail/lessonId', _id);
                    // this.$store.commit('moduleDetail/videoUrl', videoUrl);
                    this.$router.push({name:'detail'})
                }else{              
                    this.sildeToStudy();
                }
            }else{                  // ----------自然拼读--------
            // console.log(index, _id, videoUrl)
                if(index >= this.willRead){//未解锁状态
                    this.aniFade = true;
                    setTimeout(() => {
                        this.aniFade = false;
                    }, 2500);
                }else if(index>0){
                    this.$store.commit('moduleDetail/lessonId', _id);
                    // this.$store.commit('moduleDetail/videoUrl', videoUrl);
                    this.$router.push({name:'detail'})
                }
                if(index==0){              
                    if(this.userInfo.vipDay>0){
                        this.sildeToStudy();
                    }else{
                        this.slideToClick(1);
                    }
                }
            }
            
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    computed: {
        ...mapState(['ruleType']),
        ...mapState('moduleHome',['lesson','userInfo']),
        peopleUnlock(){
            console.log(this.userInfo)
            if(this.userInfo){
                let n = this.userInfo.minPeopleUnlock - this.userInfo.child_count;
                return n <= 0 ? '点击右上方的问号，查看续期规则哦' : '邀请'+n+'位好友扫码即可解锁~';
            }
        },
        swiper(){
            console.log(this.$refs.mySwiper.swiper)
        }
    },
};
</script>
<style lang="scss">

</style>

