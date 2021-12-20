<template>
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <table>
                <tr v-for="item in items" v-bind:key="item"><td v-text="item.title"></td></tr>
            </table>
            <div class="container">
                <RouterView />
            </div>
        </main>
    </div>
</template>

<script>
import { reactive } from "vue";
import Navbar from './components/Navbar.vue'
import axios from "axios";

export default {
    name: 'App',
    components:{
        Navbar
    },
    data:{
        items: {}
    },
    setup(){
        const data = reactive({
            message :'Hello Vue!'
        });
        const url = "http://127.0.0.1:8000/api/memos";
        try{
            const getAPI = async () => {
            const result = await axios.get(url);
            self.items = result.data;
            console.log(result);
            };
            getAPI();

            return {
                data,
                getAPI,
            }
        }catch(error){
            const{
                status,
                statusText
            } = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
        }
    }
};
</script>