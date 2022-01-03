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
            show:true,
        }
    },
    // getters: ()=>{
    //     getPastMemo: (state) => (id) =>{
    //         return state.memos.id( Math.floor(Math.random() * 10));
    //    }
    // },
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
        changeShow: (state)=>{
            state.show = !state.show;
            console.log(state.show)
        }
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
        // getMemos: ({commit})=>{
        //     return axios.get("http://127.0.0.1:8000/api/memos").then(response => {
        //         commit('setMemos',response.data);
        //         commit('setMaxMemo', response.data.length);
        //         commit('setRandomMemo');
        //     })
        // },
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

