import Vue from 'vue'
import Router from 'vue-router'
import socList from '@/components/socList'
import qrCodeDetail from '@/components/qrCodeDetail'
import earlierMatchesDetail from '@/components/earlierMatchesDetail'
import faq from '@/components/faq'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/home',
            name: 'socList',
            component: socList,
            alias: '/index'
        },
        {
            path: '/qrCodeDetail',
            name: 'qrCodeDetail',
            component: qrCodeDetail
        },
        {
            path: '/earlierMatchesDetail',
            name: 'earlierMatchesDetail',
            component: earlierMatchesDetail
        },
        {
            path: '/faq',
            name: 'faq',
            component: faq
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
