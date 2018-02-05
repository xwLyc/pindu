<template lang="pug">
    section.exchangeBox
        .exchange.pos_r.tac
            img.top(src="../../assets/img/exchangeTop.png")
            .duihuan
                template(v-if="!unlock")
                    p.t1 请输入兑换码
                    input.t2(type="tel" v-model="dhCode" placeholder="请输入8位数字" maxlength="8" size="8")
                    p.t3 {{exchangeText}}
                template(v-else)
                    p.t4 您已兑换成功！
                    p.t4 快来一起学习吧~~~
            .dhBtn(v-if="!unlock" @click="okDuihuan(dhCode)") 确认兑换
            .dhBtn(v-else @click="closeDuihuan") 去看视频
            .lessonPic
                img(:src="course.book_image")
            a.more.tac(:href="course.book_more_info") 了解更多
            img.closeChange(src="../../assets/img/close1.png" @click="closeDuihuan" v-show="unlock")
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            // duihuan: true,
            dhCode: ''
        };
    },
    methods: {
        closeDuihuan(){
            this.$store.commit('moduleHome/exchange',false);
        },
        okDuihuan(code){
            if(code){
                this.exchangeActive(code);
            }
        },
        ...mapActions('moduleHome',['exchangeActive'])
    },
    computed: {
        ...mapState('moduleHome',['course','exchange','exchangeText','unlock']),
    }
};
</script>

