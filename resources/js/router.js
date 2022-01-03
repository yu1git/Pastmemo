import { createRouter, createWebHistory } from 'vue-router'

// ページコンポーネントをインポートする
import MemoList from './pages/MemoList.vue'
import Login from './pages/Login.vue'
import MemoForm from './pages/MemoForm.vue'
import MemoEdit from './pages/MemoEdit.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes : [
    {
        path: '/',
        name: 'MemoList',
        component: MemoList
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/memoForm',
        name: 'MemoForm',
        component: MemoForm
    },
    {
        path: '/memoEdit/:id',
        name: 'MemoEdit',
        component: MemoEdit
    },
    ]

})
export default router