<template lang="pug">
    section.commentFabu
        .fabuBox(@click="toCommit")
            .mark
            p.fl.head
                img(:src="userInfo.headimgurl")
            input.fl.inpText(ref="inp" placeholder="说点什么")
            p.fr.fabuBtn.tac(:class="{inputed: inputed}") 发表
        .iosX
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    data (){
        return {
            inputed: false,
        }
    },
    mounted(){
        
    },
    methods: {
        toCommit(){
            this.$router.push({name: 'commentText'})
        }
    },
    computed: {
        ...mapState('moduleHome',['userInfo'])
    }
   
    
}
</script>
<style lang="scss" >

</style>

