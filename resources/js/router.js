import { createRouter, createWebHistory } from 'vue-router'

// ページコンポーネントをインポートする
import MemoList from './pages/MemoList.vue'
import Login from './pages/Login.vue'
import MemoForm from './pages/MemoForm.vue'
import SearchedList from './pages/SearchedList.vue'
import MemoEdit from './pages/MemoEdit.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes : [
    {
        //最初の画面。メモをすべて表示
        path: '/',
        name: 'MemoList',
        component: MemoList
    },
    {
        //ログイン画面
        path: '/login',
        component: Login
    },
    {
        //メモ新規作成画面
        path: '/memoForm',
        name: 'MemoForm',
        component: MemoForm
    },
    {
        //メモ検索結果画面
        path:'/Searched',
        component: SearchedList
    },
    {
        //メモ編集画面
        path: '/memoEdit/:id',
        name: 'MemoEdit',
        component: MemoEdit
    },
    ]

})
export default router