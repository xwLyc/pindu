import Vue from 'vue'
import Router from 'vue-router'
import utils from '../utils';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['@/components/home'], resolve)
        },
        {
            path: '/detail',
            name: 'detail',
            component: resolve => require(['@/components/detail'], resolve)
        },
        {
            path: '/commentText',
            name: 'commentText',
            component: resolve => require(['@/components/detail/commentText'], resolve)
        },
        {
            path: '/shareImg',
            name: 'shareImg',
            component: resolve => require(['@/components/shareImg'], resolve)
        },
        {
            path: '/entrance',
            name: 'entrance',
            component: resolve => require(['@/components/entrance'], resolve)
        },
        {
            path: '/',
            beforeEnter: (to, from, next) => {
                const pramsUrl = utils.getUrlString('entrance');
                if (pramsUrl) {
                    next({ path: '/entrance' })
                } else {
                    next({ path: '/home' })
                }
            },
        }

    ]
});

export default router;
