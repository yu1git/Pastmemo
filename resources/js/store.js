//import { reactive } from "vue";
import {createStore} from 'vuex'
import axios from 'axios'

export const store = createStore({
    // 保管する値を用意
    state: ()=>{
        return{
            memos:[],
            maxMemo:0,
            randomMemo:0,
            // 検索パラメータ
            filterQuery:"",
            //filterQuery:{},
        }
    },
    getters: {
        filteredMemos: (state)=> {
            let data = state.memos;
            if (state.filterQuery != ""){
                    data = data.filter(function (memo){
                        return (
                            memo.title.indexOf(state.filterQuery)!== -1 ||
                            memo.content.indexOf(state.filterQuery) !== -1
                            );
                    });
                }
            return data;
            // // タイトル検索
            // if (state.filterQuery.title != ""){
            //     data = data.filter(function (row){
            //         return row['title'].indexOf(state.filterQuery.title) !== -1;
            //     });
            // }
            // // 本文検索
            // if (state.filterQuery.content != ""){
            //     data = data.filter(function (row){
            //         return row['content'].indexOf(state.filterQuery.content) !== -1;
            //     });
            // }
        }
    //     getPastMemo: (state) => (id) =>{
    //         return state.memos.id( Math.floor(Math.random() * 10));
    //    }
    },
    // stateの更新
    mutations: {
        setMemos: (state,memos)=> {
            state.memos = memos
        },
        setMaxMemo: (state, maxMemo)=> {
            state.maxMemo = maxMemo
        },
        setRandomMemo: (state)=> {
            let r =  Math.floor(Math.random() *state.maxMemo);
            state.randomMemo = r
        },
        setFilterQuery: (state, filterQuery)=> {
            state.filterQuery = filterQuery;
        },
        // count: (state, n)=> {
        //     state.counter += n
        // },
        // say: (state, msg)=> {
        //     state.message = msg
        // },
        // reset: (state)=> {
        //     state.message = "reset!"
        //     state.counter = 0        
        // },
    },
    // 非同期の処理を入れる
    actions: {
        async getMemos( {commit} ) {
            const response = await axios.get("http://127.0.0.1:8000/api/memos")
            commit('setMemos', response.data)
            commit('setMaxMemo', response.data.length)
            commit('setRandomMemo')
        },
            // const url = "http://127.0.0.1:8000/api/memos";
            // const getAPI = async () => {
            //     const result = await axios.get(url);
                
            //     console.log(result);
            //     };
            //     getAPI();
    
            //     return {
            //         getAPI,
            //     }
    }
})

