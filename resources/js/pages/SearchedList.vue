<template>
  <div class="container-fluid">
    <div class="d-flex mb-3 justify-content-center">
      <h4 class="text-center m-3 flex-grow-1">
        検索：{{ $store.state.filterQuery }}
      </h4>
      <button
        @click="$router.go(-1)"
        class="btn btn-outline-info mt-2 d-flex align-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-circle m-1"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
          />
        </svg>
        戻る
      </button>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-sm-2 col-xs-6 mb-3"
        style="width: 12rem"
        v-for="SearchedMemo in SearchedMemos"
        v-bind:key="SearchedMemo"
      >
        <!-- ▼クリックすると編集画面に移動 -->
        <router-link
          :to="{ name: 'MemoEdit', params: { id: SearchedMemo.id } }"
          style="text-decoration: none"
          class="text-body"
        >
          <div class="card" style="height: 12rem">
            <div class="card-body">
              <h6 class="card-title">{{ SearchedMemo.title }}</h6>
              <p class="card-text">{{ SearchedMemo.content }}</p>
              <div class="text-end">
                <small class="card-text">{{
                  makeDate(SearchedMemo.updated_at)
                }}</small>
              </div>
            </div>
          </div>
        </router-link>
        <!-- ▲クリックすると編集画面に移動 -->
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters } from "vuex";

export default {
  name: "memoList",
  computed: {
    ...mapGetters(["filteredMemos"]),
    // 検索した結果をstoreからもってくる
    SearchedMemos() {
      return this.$store.getters.filteredMemos;
    },
  },
  methods: {
    //日付フォーマット
    makeDate(date) {
      return dayjs(date).format("YYYY/MM/DD HH:mm");
    },
  },
};
</script>