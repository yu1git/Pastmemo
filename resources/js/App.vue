<template>
    <div>
        <header>
            <Navbar />
        </header>
        <main>
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
    setup(){
        const data = reactive({
            message :'Hello Vue!'
        });
        const url = "http://127.0.0.1:8000/api/memos";
        const getAPI = async () => {
        const result = await axios.get(url);
        console.log(result);
        };
        getAPI();

        return {
            data,
            getAPI,
        }
    }
};
</script>