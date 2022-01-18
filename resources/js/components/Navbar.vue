<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <div class="container-fluid d-flex">
      <RouterLink
        class="navbar-brand d-flex align-items-center"
        :to="{ name: 'MemoList' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-house m-1"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
        ホーム
      </RouterLink>
      <!-- ▼検索フォーム -->
      <form action="/memo" method="POST">
        <input type="hidden" name="_token" :value="csrf" />
        <ul class="navbar-nav flex-grow-1 p-2">
          <div class="d-flex mr-auto">
            <input
              v-model="filterQuery"
              class="form-control"
              type="search"
              placeholder="検索..."
              aria-label="検索..."
            />

            <RouterLink
              tag="button"
              v-on:click="searchMemo"
              to="/Searched"
              class="nav-link p-2 myborder rounded-3 d-flex align-items-center"
              style=""
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search m-1"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
              <br />
            </RouterLink>
          </div>
        </ul>
      </form>
      <!-- ▲検索フォーム -->
      <!-- ▼その他のボタン -->
      <ul>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="ナビゲーションの切替"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- ▼トグルメニューの中身 -->
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav me-auto">
            <!-- ▼過去メモ非表示ボタン -->
            <li class="nav-item">
              <a href="#" class="nav-link" @click="changeShow()"
                >過去メモ非表示</a
              >
            </li>
            <!-- ▼過去メモ非表示ボタン -->
            <!-- ▼ログイン・ユーザー登録ボタン -->
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login">
                ログイン・ユーザー登録
              </RouterLink>
            </li>
            <!-- ▲ログイン・ユーザー登録ボタン -->
            <!-- ▼ログアウトボタン -->
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logoutButton">ログアウト</a>
            </li>
            <!-- ▲ログアウトボタン -->
          </ul>
        </div>
        <!-- ▲トグルメニューの中身 -->
      </ul>
      <!-- ▲その他のボタン -->
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      csrf: document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
      filterQuery: "",
    };
  },
  methods: {
    ...mapMutations(["setFilterQuery"]),
    ...mapActions({ logout: "logout" }),
    // 検索キーワードをstoreにセットする
    searchMemo() {
      this.setFilterQuery(this.filterQuery);
      console.log("実行した");
    },
    // 過去メモの表示・非表示を切り替える
    changeShow() {
      this.$store.commit("changeShow");
    },
    // ログアウト
    async logoutButton() {
      // storeのlogoutアクションを呼び出す
      await this.logout();
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>
<style scoped>
.myborder {
  border: solid rgba(255, 255, 255, 0.45);
}
.myborder:hover {
  border: solid rgba(255, 255, 255, 0.65);
}
</style>
