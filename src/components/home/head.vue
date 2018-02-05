<template lang="pug">
    section.top
        .headImg.ofh
            img(:src="userInfo.headimgurl")
        .nickName.tac {{userInfo.nickname}}
        .topRule.tac
            .ruleImg(@click="ruleOpen(ruleType)")
                img(src="../../assets/img/img01.png")
            template(v-if="!ruleType")
                p.ruleText 有效期剩余
                p.ruleTime 
                    span {{userInfo.vipDay}} 
                    |天
            template(v-else)
                p.ruleText 点击兑换
        .topRule.tac.topRuleLeft
            .ruleImg()
            p.ruleText 已学习
            p.ruleTime 
                span {{userInfo.learn_day}} 
                |天
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {

    };
  },
  methods: {
      ruleOpen(ruleType){
          if(ruleType){
              this.$store.commit('moduleHome/exchange',true);
          }else{
              this.$store.commit('moduleHome/ruleBox',true);
          }
      }
  },
  computed: {
      ...mapState(['ruleType']),
      ...mapState('moduleHome',['userInfo'])
  }
};
</script>
<style lang="scss">
</style>

