<template>
  <div class="container-fluid">
    <div class="d-flex mb-3 justify-content-center">
      <h4 class="text-center m-3 flex-grow-1">
        検索：{{ $store.state.filterQuery }}
      </h4>
      <button @click="$router.go(-1)" class="btn btn-outline-info mt-2">
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
        <div class="card" style="height: 12rem">
          <!-- クリックすると編集画面に移動 -->
          <router-link
            :to="{ name: 'MemoEdit', params: { id: SearchedMemo.id } }"
            style="text-decoration: none"
            class="text-body"
          >
            <div class="card-body">
              <h6 class="card-title">{{ SearchedMemo.title }}</h6>
              <p class="card-text">{{ SearchedMemo.content }}</p>
              <div class="text-end">
                <small class="card-text">{{
                  makeDate(SearchedMemo.updated_at)
                }}</small>
              </div>
            </div>
          </router-link>
          <!-- /クリックすると編集画面に移動 -->
        </div>
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