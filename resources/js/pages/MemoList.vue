<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div v-bind:class="[$store.state.show === true ? 'col-md-9' : 'col-md-12']">
        <h1 class="text-center m-3">Memo List</h1>
        <div class="row justify-content-center">
          <div
            class="col-sm-2 col-xs-6 mb-2"
            style="width: 12rem"
            v-for="memo in $store.state.memos"
            v-bind:key="memo.id"
          >
            <div class="card" style="height: 12rem">
              <router-link
                :to="{ name: 'MemoEdit', params: { id: memo.id } }"
                style="text-decoration: none"
                class="text-body"
              >
                <div class="card-body">
                  <h6 class="card-title">{{ memo.title }}</h6>
                  <p class="card-text">{{ memo.content }}</p>
                  <div class="text-end">
                    <small class="card-text">{{
                      makeDate(memo.updated_at)
                    }}</small>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="col-md-3 collapse" id="collapsePastMemo">-->
      <div class="col-md-3" v-show="$store.state.show">
        <PastMemo />
      </div>
    </div>
  </div>
</template>

<script>
import PastMemo from "../components/PastMemo.vue";
import dayjs from "dayjs";

export default {
  name: "MemoList",
  components: {
    PastMemo,
  },
  
  methods: {
    makeDate(date) {
      return dayjs(date).format("YYYY/MM/DD HH:mm");
    },
      
  },
  // computed: {
  //     memos: ()=>{
  //     this.$store.getters.memos
  //     }
  // },
  mounted() {
    this.$store.dispatch("getMemos");
  },
};
</script>