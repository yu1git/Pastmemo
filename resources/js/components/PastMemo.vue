<template>
  <div>
    <div class="d-flex mb-3 justify-content-center">
      <h5 class="text-center m-3 flex-grow-1">過去メモ</h5>
      <button @click="changeMemo()" class="btn btn-outline-info mt-2">
        再読み込み
      </button>
    </div>
    <div class="p-3 memo-box" style="margin-top: 20px">
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
          <h6 v-if="index === $store.state.randomMemo" class="">
            {{ memo.title }}
          </h6>
          <p v-if="index === $store.state.randomMemo" class="memo-content">
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
<style scoped>
.memo-box {
  color: #696969;
  border: solid 1px #e6e6e6;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.memo-content {
  background-color: #fff;
  background-image: linear-gradient(
      90deg,
      rgba(237, 119, 128, 0) 0%,
      rgba(237, 119, 128, 0) 50%,
      #fff 0%,
      #fff 100%
    ),
    linear-gradient(
      180deg,
      rgba(100, 100, 100, 0) 0%,
      rgba(100, 100, 100, 0) 97.5%,
      #646464 100%
    );
  background-size: 4px 80%, 80% 2rem;
  line-height: 2rem;
  padding: 2rem 1rem 0.2rem 1rem;
}
</style>