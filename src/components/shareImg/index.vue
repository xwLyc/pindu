<template lang="pug">
    .shareImg
        img(:src="imgUrl")
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            
        }
    },
    computed: {
        ...mapState(['imgUrl'])
    }

}
</script>

