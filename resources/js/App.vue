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
import Navbar from './components/Navbar.vue'

export default {
    name: 'App',
    components:{
        Navbar
    },
    // setup(){
    //     const data = reactive({
    //         message :'Hello Vue!'
    //     });
        
    //     try{
    //         const getAPI = async () => {
    //         const result = await axios.get(url);
    //         self.items = result.data;
    //         console.log(result);
    //         };
    //         getAPI();

    //         return {
    //             data,
    //             getAPI,
    //         }
    //     }catch(error){
    //         const{
    //             status,
    //             statusText
    //         } = error.response;
    //     console.log(`Error! HTTP Status: ${status} ${statusText}`);
    //     }
    // }
};
</script>