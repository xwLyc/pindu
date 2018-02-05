<template lang="pug">
    section.share(@click="closeShare")
            img(src="../../assets/img/share.png")

</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data (){
        return {

        }
    },
    methods: {
        closeShare(){
            this.$store.commit('moduleHome/share',false);
        }
    }
}
</script>

