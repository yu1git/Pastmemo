import { createRouter, createWebHistory } from 'vue-router'

// ページコンポーネントをインポートする
import MemoList from './pages/MemoList.vue'
import Login from './pages/Login.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes : [
    {
        path: '/',
        //nameはかかない
        component: MemoList
    },
    {
        path: '/login',
        component: Login
    }
    ]

})
export default router