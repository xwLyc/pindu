<template lang="pug">
    section.videoBox
        .video.pos_r(ref='mm')
            .videoPlay( v-show="!videoPlaying" @click="videoPlay")
                img.btn(src="../../assets/img/playBtn.png")
            img.videoPreview(:src="videoPreview.url?videoPreview.url:''" v-show="!videoPlaying" )
            //- video(ref="video" :src="videoUrl" v-show="videoPlaying" controls preload="auto" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true") 
            
            audio(ref="msgr"  preload="auto" src="http://static.beetobees.com/music-wx/msg.mp3")
        .videoTitle.pos_r
            img(src="../../assets/img/titleBg.png")
            p.tac {{lessonName}}
        a.adver(href="http://un.koolearn.com/alliance/clickword?userid=ff8080815b891434015b891434790000&kid=ff808081601e00f10160212538613268&url=https%3A%2F%2Fdonut.koolearn.com%2Fapp%2FonlineClassSchool1.html%3Futm_source%3Dwx1-course-banner" v-if="ruleType")
            img(src="../../assets/img/banner.jpg")
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
    props: ['videoUrl'],
    data(){
        return{
            videoPlaying: false,
            answerText: false,
            curTime: 0,
            timer: 0,
            videoElment:''
        }
    },
    created(){
        this.queryLesson(); //查询课程
    },
    mounted(){
        this.videoElment = document.createElement("video");
        this.videoElment.controls = true;
        this.$refs.mm.appendChild(this.videoElment);
        console.log(this.videoUrl)
        this.$root.$on('curTime',()=>{
            this.$store.commit('moduleDetail/currentTime',this.curTime);
            return this.curTime;
        })
        this.videoElment.addEventListener('ended',()=>{
            this.videoPlaying = false;
            this.videoElment.controls = false;
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

            this.videoElment.src = this.videoUrl;
            this.videoPlaying = true;
            // this.$refs.video.controls = true;
            this.videoElment.play();
            this.timer = setInterval(()=>{
                if(this.videoElment.currentTime){
                    this.curTime =  Math.round(this.videoElment.currentTime);
                }
            },100)
        },
    },
    computed: {
        ...mapState(['ruleType']),
        ...mapState('moduleDetail',['videoInfo','videoPreview','lessonName','question','answer']),
        // videoUrl(){
        //     return this.videoInfo.url
        // }
 
    },
    beforeDestroy(){
        clearInterval(this.timer)

    }
}
</script>
<style lang="scss" >
    
</style>

