<template>
  <div>
    <div class="d-flex mb-3 justify-content-center">
      <h5 class="text-center m-3 flex-grow-1" style="width: 15%">過去メモ</h5>
      <button
        @click="changeMemo()"
        class="btn btn-outline-info mt-2 d-flex align-items-center"
        style="width: 6.6rem; height: 3rem"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-repeat m-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
          />
          <path
            fill-rule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
          />
        </svg>
        <small>ランダム</small>
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