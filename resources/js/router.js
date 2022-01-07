import { createRouter, createWebHistory } from 'vue-router'
import { store } from './store.js'

// ページコンポーネントをインポートする
import MemoList from './pages/MemoList.vue'
import Login from './pages/Login.vue'
import MemoForm from './pages/MemoForm.vue'
import SearchedList from './pages/SearchedList.vue'
import MemoEdit from './pages/MemoEdit.vue'

// 本番環境にデプロイするときこっちに変える？
// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
//   })
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            //最初の画面。メモをすべて表示
            path: '/',
            name: 'MemoList',
            component: MemoList,
            meta: {
                isAuthenticated: true,
            },
        },
        {
            //ログイン画面
            path: '/login',
            name: 'Login',
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
            path: '/Searched',
            component: SearchedList
        },
        {
            //メモ編集画面
            path: '/memoEdit/:id',
            name: 'MemoEdit',
            component: MemoEdit
        },
    ]

});

//認証されていなければLoginページへリダイレクト
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isAuthenticated)) {
      if (!store.state.isAuth) {
        next({ name: 'Login' });
      } else {
        next();
      }
    }
    next();
  });

export default router