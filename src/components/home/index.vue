<template lang="pug">
    .home.pos_r.ofh
        v-head
        v-main
        v-rule(v-show="ruleBox")
        v-share(v-show="share")
        v-exchange(v-show="exchange && ruleType")
</template>
<script>
import vHead from './head'
import vMain from './main'
import vRule from './rule'
import vShare from './share'
import vExchange from './exchange'
import Utils from '../../utils'
import Home from '../../Api/home';
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            // share: false,
            
        };
    },
    created(){

        Utils.SDKRegister(this);
    },
    mounted(){
        // homeInit
        // Home.userInit();
    },
    methods: {
        
    },
    components: {
        vHead,vMain,vRule,vShare,vExchange
    },
    computed: {
        ...mapState(['ruleType']),
        ...mapState('moduleHome',['ruleBox','share','exchange','userInfo']),
 
    }
};
</script>
<style lang="scss">
@import "../../assets/scss/home.scss";

</style>

