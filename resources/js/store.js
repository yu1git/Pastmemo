//import { reactive } from "vue";
import { createStore } from 'vuex'
import axios from 'axios'

export const store = createStore({
    // 保管する値を用意
    state: () => {
        return {
            /**
             * memo
             */
            memos: [],
            maxMemo: 0,
            randomMemo: 0,
            // 検索パラメータ
            filterQuery: "",
            //検索結果を表示するフラグ
            serchFlag: false,
            //過去メモ表示・非表示を管理するフラグ
            show: true,

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
        getUserId(state) {
            console.log(state.user.id)
            return state.user.id;
        }
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
            const response = await axios.get("http://127.0.0.1:8000/api/memos")
            commit('setMemos', response.data)
            commit('setMaxMemo', response.data.length)
            commit('setRandomMemo')
        },

        /**
         * auth
         */
        //会員登録
        async register({ dispatch }, credentials) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/register', credentials);
            return await dispatch('me');
        },

        //ログイン
        async login({ dispatch }, credentials) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/login', credentials);
            return await dispatch('me');
        },
        async me({ commit }) {
            return await axios
                .get('/api/user')
                .then(response => {
                    commit('setIsAuth', true);
                    commit('setUser', response.data);
                })
                .catch(() => {
                        commit('setIsAuth', false);
                        commit('setUser', null);
                    });
        },

        //ログアウト
        async logout({ dispatch }) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/logout');
            return await dispatch('out');
        },
        async out({ commit }) {
            return await axios
                .get('/api/user')
                .then(response => {
                    commit('setIsAuth', false);
                    commit('setUser', response.data);
                })
                .catch(() => {
                        commit('setIsAuth', false);
                        commit('setUser', null);
                    });
        },
    }
})

