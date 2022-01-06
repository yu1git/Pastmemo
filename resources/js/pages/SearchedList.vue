<template>
  <div class="container-fluid">
    <div class="d-flex">
        <button @click="$router.go(-1)" >戻る</button>
        <h1 class="text-center m-3">検索：{{ $store.state.filterQuery }}</h1>
    </div>
    <div class="row">
        <div 
        class="col-sm-2 col-xs-6 mb-3" 
        style="width: 12rem;" 
        v-for="SearchedMemo in SearchedMemos" 
        v-bind:key="SearchedMemo" 
        >
        <div class="card" style="height:12rem;">
            <div class="card-body">
            <h6 class="card-title">{{ SearchedMemo.title }}</h6>
            <p class="card-text">{{ SearchedMemo.content }}</p>
            <div class="text-end">
                <small class="card-text">{{ makeDate(SearchedMemo.updated_at) }}</small>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
    name: 'memoList',
    computed: {
        ...mapGetters([
            'filteredMemos'
        ]),
        SearchedMemos(){
          return this.$store.getters.filteredMemos
        }
    },
    methods:{
      makeDate(date){
        return dayjs(date).format('YYYY/MM/DD HH:mm')
      }
     },
}
</script>