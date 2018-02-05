<template lang="pug">
    section.commentModule
        p.fl.head
            img(:src="comment.author.headimgurl")
        .commentInfo.fr.pos_r
            p.nickName {{comment.author.nickname}}
            p.commentTime {{comment.createdAt.split(' ')[0]}}
            p.commentDetail {{comment.content}}
            .commentLike(:class="{liked: isZan}")
                img.fr.likeImg(src="../../assets/img/like.png" v-show="!isZan" @click="clickLike(comment._id)")
                img.fr.likeImg(src="../../assets/img/liked.png" v-show="isZan" )
                span.fr.likeNum {{zanNume}}
</template>
<script>
export default {
    props: ['comment'],
    data (){
        return {
            isZan: false,
            zanNume: 0,
        }
    },
    created(){
        this.isZan = this.comment.isZan;
        this.zanNume = this.comment.zan;
    },
    methods: {
        clickLike(_id){
            this.isZan = true;
            this.zanNume = this.comment.zan + 1;
            this.$store.dispatch('moduleDetail/commentZan', _id);
        }
    }
}
</script>
<style lang="scss" >

</style>

