<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-9">
        <h1 class="text-center m-3">Memo List</h1>
        <div class="row">
          <div class="col-sm-2 col-xs-6 mb-3" style="width: 12rem;" v-for="memo in $store.state.memos" v-bind:key="memo.id">
            <div class="card" style="height:12rem;">
              <div class="card-body">
                <h6 class="card-title">{{ memo.title }}</h6>
                <p class="card-text">{{ memo.content }}</p>
                <div class="text-end">
                  <small class="card-text">{{ makeDate(memo.updated_at) }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <PastMemo />
      </div>
    </div>
  </div>
</template>

<script>
import PastMemo from '../components/PastMemo.vue'
import dayjs from 'dayjs'

export default {
    name: 'memoList',
    components:{
        PastMemo,
    },
    methods:{
      makeDate(date){
        return dayjs(date).format('YYYY/MM/DD HH:mm')
      }
    },
    // computed: {
    //     memos: ()=>{
    //     this.$store.getters.memos
    //     }
    // },
    mounted(){
      this.$store.dispatch('getMemos');
    }
    
}
</script>