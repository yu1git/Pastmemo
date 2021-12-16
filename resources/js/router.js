import { createRouter, createWebHistory } from 'vue-router'

// ページコンポーネントをインポートする
import MemoList from './pages/MemoList.vue'
import Login from './pages/Login.vue'

const routes = [
    {
        path: '/',
        component: MemoList
    },
    {
        path: '/login',
        component: Login
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router