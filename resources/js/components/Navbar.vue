<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <div class="container-fluid d-flex">
      <RouterLink class="navbar-brand" :to="{ name: 'MemoList' }">
        ホーム
      </RouterLink>
      <!-- ▼検索フォーム -->
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
            class="nav-link p-2"
            >検索アイコンのみ</RouterLink
          >
        </div>
      </ul>
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
          <span class="navbar-toggler-icon" ></span>
        </button>
        <!-- ▼トグルメニューの中身 -->
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav me-auto">
            <!-- ▼過去メモ非表示ボタン -->
            <li class="nav-item">
              <a 
                  href="#"
                  class="nav-link" 
                  @click="changeShow()"
              >過去メモ非表示</a>
            </li>
            <!-- ▼過去メモ非表示ボタン -->
            <!-- ▼ログイン・会員登録ボタン -->
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login">
                ログイン・会員登録
              </RouterLink>
            </li>
            <!-- ▲ログインボタン -->
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

