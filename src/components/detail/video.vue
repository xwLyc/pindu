<template lang="pug">
    section.videoBox
        .video.pos_r
            .videoPlay( v-show="!videoPlaying" @click="videoPlay")
                img.btn(src="../../assets/img/playBtn.png")
            img.videoPreview(:src="lessonImage?lessonImage:''" v-show="!videoPlaying" )
            video(ref="video" :src="videoInfo?videoInfo.url:''" v-show="videoPlaying" controls preload="auto" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true")                                                                                                           
            
            
            audio(ref="msgr"  preload="auto" src="http://static.beetobees.com/music-wx/msg.mp3")
        .videoTitle.pos_r
            img(src="../../assets/img/titleBg.png")
            p.tac {{lessonName}}
        a.adver(href="http://un.koolearn.com/alliance/click?userid=ff8080815b891434015b891434790000&utm_item=%E5%BE%AE%E4%BF%A1%E6%B4%BB%E5%8A%A8-%E7%BB%98%E6%9C%AC%E6%89%93%E5%8D%A1%E7%AC%AC%E4%B8%80%E5%A4%A90%E5%85%83&kid=6e8ab0b0074f4f648f3893a244ff69f2&url=https%3A%2F%2Fdonut.koolearn.com%2Fapp%2FonlineClassSchool1.html%3Futm_source%3Dwx1-Reading0-1" v-if="ruleType")
            img(src="../../assets/img/banner.png")
        .questionBox(v-else)
            .question
                .qL.fl.tac
                    img(src="../../assets/img/donut1.png")
                .qR.fl
                    p.t1 多纳爱思考：
                    p.t2 {{question}}？
            .qaLine
            .answer
                .aL.fl.tac
                    p.lookAnswer(@click="answerText = !answerText") 查看答案
                .aR.fl
                    p.answerText(v-show="answerText") {{answer}}
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    // props: ['videoUrl'],
    data(){
        return{
            videoPlaying: false,
            answerText: false,
            curTime: 0,
            timer: 0,
        }
    },
    created(){
        this.queryLesson(); //查询课程
    },
    mounted(){
        console.log(this.videoUrl)
        this.$root.$on('curTime',()=>{
            this.$store.commit('moduleDetail/currentTime',this.curTime);
            return this.curTime;
        })
        this.$refs.video.addEventListener('ended',()=>{
            let u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
                this.videoPlaying = false;
                this.$refs.video.controls = false;
            }
            this.$store.commit('moduleDetail/currentTime',this.curTime);
            this.$store.commit('moduleDetail/maxTime',this.curTime);
            this.studyTime({    //每次读完都上传时间
                curTime: this.curTime,
                finished: 'finished'
            });

            this.$root.$emit('close1',true);
            this.$refs.msgr.play();            
            clearInterval(this.timer);

        }, false)
    },
    methods: {
        ...mapActions('moduleDetail',['studyTime','queryLesson']),
        videoPlay(){

            this.videoPlaying = true;
            this.$refs.video.controls = true;
            this.$refs.video.play();
            this.timer = setInterval(()=>{
                if(this.$refs.video.currentTime){
                    this.curTime =  Math.round(this.$refs.video.currentTime);
                }
            },100)
        },
    },
    computed: {
        ...mapState(['ruleType']),
        ...mapState('moduleDetail',['videoInfo','videoPreview','lessonName','question','answer','lessonImage']),
  
 
    },
    beforeDestroy(){
        clearInterval(this.timer)

    }
}
</script>
<style lang="scss" >
    
</style>

