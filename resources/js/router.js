import { createRouter, createWebHistory } from 'vue-router'

// ページコンポーネントをインポートする
import MemoList from './pages/MemoList.vue'
import Login from './pages/Login.vue'
import MemoForm from './pages/MemoForm.vue'

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
    },
    {
        path: '/memoForm',
        component: MemoForm
    }
    ]

})
export default router