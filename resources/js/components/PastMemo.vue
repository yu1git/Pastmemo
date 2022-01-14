<template>
  <div>
    <div class="d-flex mb-3 justify-content-center">
      <h4 class="text-center m-3 flex-grow-1">過去メモ</h4>
      <button @click="changeMemo()" class="btn btn-outline-info mt-2">
        再読み込み
      </button>
    </div>
    <div class="alert alert-info" style="margin-top: 20px">
      <div
        v-for="(memo, index) in $store.state.memos"
        v-bind:key="(memo, index)"
      >
        <!-- ▼クリックすると編集画面に移動 -->
        <router-link
          :to="{ name: 'MemoEdit', params: { id: memo.id } }"
          v-if="index === $store.state.randomMemo"
          style="text-decoration: none"
          class="text-body"
        >
          <h6 v-if="index === $store.state.randomMemo" class="card-title">
            {{ memo.title }}
          </h6>
          <p v-if="index === $store.state.randomMemo" class="card-text">
            {{ memo.content }}
          </p>
          <div v-if="index === $store.state.randomMemo" class="text-end">
            <small>{{ makeDate(memo.updated_at) }}</small>
          </div>
        </router-link>
        <!-- ▲クリックすると編集画面に移動 -->
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "PastMemo",
  methods: {
    //日付フォーマット
    makeDate(date) {
      return dayjs(date).format("YYYY/MM/DD HH:mm");
    },
    //ランダムなメモを表示
    changeMemo() {
      this.$store.commit("setRandomMemo");
    },
  },
};
</script>