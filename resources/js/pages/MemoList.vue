<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <!-- ▼メモが0の時、初回の説明画面を表示する -->
      <div v-if="$store.state.firstFlag">
        「New」ボタンを押してメモを新規作成してください。
      </div>
      <!-- ▲メモが0の時、初回の説明画面を表示する -->
      <div v-else>
        <!-- ▼過去メモ表示・非表示でMemoListを表示する幅を変える -->
        <div
          v-bind:class="[$store.state.show === true ? 'col-md-9' : 'col-md-12']"
        >
          <h1 class="text-center m-3">Memo List</h1>
          <div class="row justify-content-center">
            <div
              class="col-sm-2 col-xs-6 mb-3"
              style="width: 12rem"
              v-for="memo in $store.state.memos"
              v-bind:key="memo.id"
            >
              <div class="card" style="height: 12rem">
                <!-- ▼クリックすると編集画面に移動 -->
                <router-link
                  :to="{ name: 'MemoEdit', params: { id: memo.id } }"
                  style="text-decoration: none"
                  class="text-body"
                >
                  <div class="card-body">
                    <h6 class="card-title">{{ memo.title }}</h6>
                    <p class="card-text">{{ memo.content.slice(0, 24) }}</p>
                    <div class="text-end">
                      <small class="card-text">{{
                        makeDate(memo.updated_at)
                      }}</small>
                    </div>
                  </div>
                </router-link>
                <!-- ▲クリックすると編集画面に移動 -->
              </div>
            </div>
          </div>
        </div>
        <!-- ▼過去メモ -->
        <div class="col-md-3" v-show="$store.state.show">
          <PastMemo />
        </div>
        <!-- ▲過去メモ -->
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
  mounted() {
    // すべてのメモをstoreからもってくる
    this.$store.dispatch("getMemos");
    // メモが0の時、初回の説明画面を表示するためのフラグを設定する
    if(this.$store.state.maxMemo === 0){
      this.$store.commit('setFirstFlag',true);
    }else{
      this.$store.commit('setFirstFlag',false);
    }
  },
  methods: {
    // 日付フォーマット
    makeDate(date) {
      return dayjs(date).format("YYYY/MM/DD HH:mm");
    },
  },
};
</script>