//import { reactive } from "vue";
import { createStore } from 'vuex'
import axios from 'axios'
//import { get } from 'lodash';

export const store = createStore({
    // 保管する値を用意
    state: () => {
        return {
            /**
             * memo
             */
            memos: [],
            // 過去メモをランダム表示するためのメモの最大数
            maxMemo: 0,
            // 過去メモをランダム表示するためのランダムな数値
            randomMemo: 0,
            // 検索パラメータ
            filterQuery: "",
            //検索結果を表示するフラグ
            serchFlag: false,
            //過去メモ表示・非表示を管理するフラグ
            show: true,
            // 初めてのメモ作成時の表示をするためのフラグ
            firstFlag: false,

            /**
             * auth
             */
            isAuth: false,
            user: null,
        }
    },
    getters: {
        /**
         * memo
         */
        filteredMemos: (state) => {
            let data = state.memos;
            if (state.filterQuery != "") {
                data = data.filter(function (memo) {
                    return (
                        memo.title.indexOf(state.filterQuery) !== -1 ||
                        memo.content.indexOf(state.filterQuery) !== -1
                    );
                });
            }
            console.log(data);
            return data;
        },

        /**
         * auth
         */
        isAuth(state) {
            return state.isAuth;
        },
        user(state) {
            return state.user;
        },
    },
    // stateの更新
    mutations: {
        /**
         * memo
         */
        setMemos: (state, memos) => {
            state.memos = memos
        },
        setMaxMemo: (state, maxMemo) => {
            state.maxMemo = maxMemo
        },
        //過去メモをランダムに表示する
        setRandomMemo: (state) => {
            let r = Math.floor(Math.random() * state.maxMemo);
            state.randomMemo = r
        },

        //検索キーワードをstateにセットする
        setFilterQuery: (state, filterQuery) => {
            state.filterQuery = filterQuery;
            console.log("store実行した");
            console.log(state.filterQuery);
        },

        //過去メモの表示・非表示を切り替える
        changeShow: (state) => {
            state.show = !state.show;
        },
        // 初めてのメモ作成時の表示をするためのフラグをセットする
        setFirstFlag: (state, bool) => {
            state.firstFlag = bool;
            console.log("memoの数：" + state.maxMemo + state.firstFlag)
        },

        /**
         * auth
         */
        setIsAuth(state, value) {
            state.isAuth = value;
        },
        setUser(state, value) {
            state.user = value;
        },
    },
    // 非同期の処理を入れる
    actions: {
        /**
         * memo
         */
        async getMemos({ commit }) {
            try {
                // axiosはデフォルトでbaseURLに自サーバーのURLを持つのでlocalhost~~は不要らしい（すみません）
                const response = await axios.get("/api/memos")
                // レスポンスを確認
                console.log(response.data)
                // メモをセット
                commit('setMemos', response.data)
                commit('setMaxMemo', response.data.length)
                commit('setRandomMemo')
                // メモが0の時、初回の説明画面を表示するためのフラグを設定する
                response.data.length === 0
                    ? commit('setFirstFlag', true)
                    : commit('setFirstFlag', false);
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * auth
         */
        //会員登録
        async register({ dispatch }, credentials) {
            // await axios.get('/sanctum/csrf-cookie');
            // 新規ユーザーの作成
            await axios.post('/api/register', credentials);
            // 新規ユーザーでログイン
            await axios.post('/api/login', credentials);
            await dispatch('me');
        },

        //ログイン
        async login({ dispatch }, credentials) {
            // 用途不明のため一度コメントアウト
            // await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/login', credentials);
            await dispatch('me');
        },
        async me({ commit }) {
            try {
                const response = await axios.get('/api/user');
                console.log('認証情報の表示');
                console.log(response.data);

                // 認証情報を設定
                commit('setIsAuth', true);
                commit('setUser', response.data);
            } catch (error) {
                console.log('エラー情報の表示');
                console.log(error);

                // 認証情報を初期化
                commit('setIsAuth', false);
                commit('setUser', null);
            }
        },

        //ログアウト
        async logout({ dispatch }) {
            // 用途不明のため一度コメントアウト
            // await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/logout');
            await dispatch('out');
        },
        async out({ commit }) {
            try {
                //const response = axios.get('/api/user');
                //console.log(response.data);

                // 認証情報を初期化
                commit('setIsAuth', false);
                // setUserを動かす？？
                //commit('setUser', response.data);
                commit('setUser', null);
            } catch (error) {
                console.log(error)

                // 認証情報を初期化？
                commit('setIsAuth', false);
                commit('setUser', null);
            }
        },
    }
})

