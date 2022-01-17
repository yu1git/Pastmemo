<template>
  <div class="container-fluid">
    <!-- ▼メモが0の時、初回の説明画面を表示する -->
    <div v-if="$store.state.firstFlag">
      「New」ボタンを押してメモを新規作成してください。
    </div>
    <!-- ▲メモが0の時、初回の説明画面を表示する -->
    <div v-else>
      <div class="row justify-content-center">
        <!-- ▼過去メモ表示・非表示でMemoListを表示する幅を変える -->
        <div
          v-bind:class="[$store.state.show === true ? 'col-md-9' : 'col-md-12']"
        >
          <div class="d-flex mb-3 justify-content-center">
            <h1 class="text-center m-3 flex-grow-1">Memo List</h1>
            <!-- ▼メモ新規作成ボタン -->
            <RouterLink
              class="btn btn-outline-info mt-2 d-flex align-items-center"
              style="width: 5.75rem; height: 3rem"
              to="/memoForm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle-fill m-1"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                />
              </svg>
              <small>New</small>
            </RouterLink>
            <!-- ▲メモ新規作成ボタン -->
          </div>
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
  },
  methods: {
    // 日付フォーマット
    makeDate(date) {
      return dayjs(date).format("YYYY/MM/DD HH:mm");
    },
  },
};
</script>