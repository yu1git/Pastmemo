<template>
  <div class="container">
    <h1>Memo List</h1>
    <div class="row">
    <div class="col-sm-2" style="width: 15rem; margin-top:20px; " v-for="memo in $store.state.memos" v-bind:key="memo.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ memo.title }}</h5>
        <p class="card-text">{{ memo.content }}</p>
        <small class="card-text">{{ makeDate(memo.updated_at) }}</small>
      </div>
    </div>
  
    </div>
    </div>
  </div>
</template>

<script>
//import PastMemo from '/components/pastmemo'
import dayjs from 'dayjs'

export default {
    name: 'memoList',
    components:{
        
    },
    methods:{
      makeDate:function(date){
        return dayjs(date).format('YYYY/MM/DD HH:mm')
      }
    },
    // computed: {
    //     memos: ()=>{
    //     this.$store.getters.memos
    //     }
    // },
    mounted(){
      this.$store.dispatch('getMemos')
    }
    
}
</script>