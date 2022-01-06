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
            //検索結果を表示するフラグ
            serchFlag: false,

            //過去メモ表示・非表示を管理するフラグ
            show:true,
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
                console.log(data);
            return data;
        }
    },
    // stateの更新
    mutations: {
        setMemos: (state,memos)=> {
            state.memos = memos
        },
        setMaxMemo: (state, maxMemo)=> {
            state.maxMemo = maxMemo
        },
        //過去メモをランダムに表示するため
        setRandomMemo: (state)=> {
            let r =  Math.floor(Math.random() *state.maxMemo);
            state.randomMemo = r
        },

        //検索キーワードをstateにセットする
        setFilterQuery: (state, filterQuery)=> {
            state.filterQuery = filterQuery;
            console.log("store実行した");
            console.log(state.filterQuery);
        },
        
        //過去メモの表示・非表示を切り替える
        changeShow: (state)=>{
            state.show = !state.show;
            console.log(state.show)
        }
    },
    // 非同期の処理を入れる
    actions: {
        async getMemos( {commit} ) {
            const response = await axios.get("http://127.0.0.1:8000/api/memos")
            commit('setMemos', response.data)
            commit('setMaxMemo', response.data.length)
            commit('setRandomMemo')
        },
    }
})

