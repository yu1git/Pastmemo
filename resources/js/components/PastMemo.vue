<template>
    <div>
        <button @click="changeMemo()" class="btn btn-outline-info">再読み込み</button>
        <div class="alert alert-info" style="margin-top:20px; ">
            <div v-for="(memo, index) in $store.state.memos" v-bind:key="(memo, index)">
                <h6 v-if="index===$store.state.randomMemo" class="card-title">{{ memo.title }}</h6>
                <p v-if="index===$store.state.randomMemo" class="card-text">{{ memo.content }}</p>
                <div v-if="index===$store.state.randomMemo"  class="text-end">
                    <small  class="card-text">{{ makeDate(memo.updated_at) }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: 'PastMemo',
    //setup(){
    //    const data 
    //}
    methods:{
      makeDate(date){
        return dayjs(date).format('YYYY/MM/DD HH:mm')
      },
      changeMemo(){
        this.$store.commit('setRandomMemo')
      }
    },
    
}
</script>