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
            // error情報を表示するためのフラグ
            errorFlag: false,
            // エラーメッセージ
            authErrorMessages: null,

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
                    if (memo.title != null) {
                        data = memo.title.indexOf(state.filterQuery) !== -1 ||
                            memo.content.indexOf(state.filterQuery) !== -1
                    } else {
                        // titleがnullの時、titleの中身は検索しない
                        data = memo.content.indexOf(state.filterQuery) !== -1
                    }
                    return data;
                });
            }
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
        //authエラー処理用フラグ
        setErrorFlag(state, flag) {
            state.errorFlag = flag;
        },
        //authエラーメッセージ
        setAuthErrorMessages(state, messages) {
            let msg  = messages.slice(32);
            if (msg === "400"){
                state.authErrorMessages = "400 Bad Request 不正なリクエストです";
            }else if (msg === "401"){
                state.authErrorMessages = "401 Unauthorized メールアドレス又はパスワードが間違っています";
            }else if (msg === "408"){
                state.authErrorMessages = "408 Request Timeout 少し時間をおいてからアクセスしてください";
            }else if (msg === "422"){
                state.authErrorMessages = "422 Unprocessable Entity 入力内容が間違っています";
            }else if (msg === "500"){
                state.authErrorMessages = "500 Internal Server Error サーバーエラーが発生しました";
            }else if (msg === "503"){
                state.authErrorMessages = "503 Service Unavailable サーバーにアクセスが集中しています。少し時間をおいてからアクセスしてください";
            }else if (msg === "504"){
                state.authErrorMessages = "504 Gateway Timeout 少し時間をおいてからアクセスしてください";
            }else{
                state.authErrorMessages = messages;
            }
            console.log("setAuthErrorMessages:"+ messages);
        },
    },
    // 非同期の処理を入れる
    actions: {
        /**
         * memo
         */
        async getMemos({ commit }) {
            try {
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
                console.log("getMemosエラー");
                console.error(error);
            }
        },
        /**
         * auth
         */
        //会員登録
        async register({commit, dispatch }, credentials) {
            try {
                await axios.get('/sanctum/csrf-cookie');
                // 新規ユーザーの作成
                await axios.post('/api/register', credentials);
                // 新規ユーザーでログイン
                await axios.post('/api/login', credentials);
                await dispatch('me');
            } catch (error) {
                console.log('registerエラー情報の表示');
                console.log(error);
                console.log(error.message);
                // エラーメッセージを表示
                commit('setAuthErrorMessages', error.message);
                commit('setErrorFlag', true);
            }
        },

        //ログイン
        async login({ commit, dispatch }, credentials) {
            try {
                await axios.get('/sanctum/csrf-cookie');
                await axios.post('/api/login', credentials);
                await dispatch('me');
            } catch (error) {
                console.log('loginエラー情報の表示');
                console.log(error);
                console.log(error.message);
                // エラーメッセージを表示
                commit('setAuthErrorMessages', error.message);
                commit('setErrorFlag', true);
                
            }
        },
        async me({ commit }) {
            try {
                const response = await axios.get('/api/user',{
                    //認証のトークン
                    headers:''
                });
                console.log('認証情報の表示');
                console.log(response.data);
                if (response.status === 200) {
                    // エラーメッセージを非表示
                    commit('setErrorFlag', false);
                    // 認証情報を設定
                    commit('setIsAuth', true);
                    commit('setUser', response.data);
                }

            } catch (error) {
                console.log('meエラー情報の表示');
                console.log(error);
                console.log(error.message);

                // 認証情報を初期化
                commit('setIsAuth', false);
                commit('setUser', null);

                // エラーメッセージを表示
                commit('setAuthErrorMessages', error.message);
                commit('setErrorFlag', true);
            }
        },

        //ログアウト
        async logout({ dispatch }) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.get('/api/logout');
            await dispatch('out');
        },
        async out({ commit }) {
            try {
                // 認証情報を初期化
                commit('setIsAuth', false);
                commit('setUser', null);
            } catch (error) {
                console.log(error)

                // 認証情報を初期化
                commit('setIsAuth', false);
                commit('setUser', null);
            }
        },
    }
})

