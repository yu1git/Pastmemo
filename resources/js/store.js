//import { reactive } from "vue";
import {createStore} from 'vuex'
import axios from 'axios'
//import dayjs from 'dayjs'

export const store = createStore({
    // 保管する値を用意
    state: ()=>{
        return{
            memos:[],
        }
    },
    // getters: ()=>{
    // },
    // stateの更新
    mutations: {
        setMemos: (state,memos)=> {
            state.memos = memos
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
        getMemos: ({commit})=>{
            return axios.get("http://127.0.0.1:8000/api/memos").then(response => {
                commit('setMemos',response.data)
            })
            // const url = "http://127.0.0.1:8000/api/memos";
            // const getAPI = async () => {
            //     const result = await axios.get(url);
                
            //     console.log(result);
            //     };
            //     getAPI();
    
            //     return {
            //         getAPI,
            //     }

            // let n = Math.floor(Math.random() * 10)
            // context.commit('count', n)
            // context.commit('say','add' + n + '!')
        },
        getPastMemo: ({commit})=>{
            
        }
    }
})