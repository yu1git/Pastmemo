<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <div class="container-fluid d-flex">
      <RouterLink class="navbar-brand" :to="{ name: 'MemoList' }"> ホーム </RouterLink>
      <!-- 検索フォーム -->
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
          >検索アイコンのみ</RouterLink>
        </div>
      </ul>
      <!-- /検索フォーム -->
      <!-- メモ新規作成ボタン -->
      <ul class="navbar-nav">
        <RouterLink class="nav-link" to="/memoForm">New</RouterLink>
      </ul>
      <!-- /メモ新規作成ボタン -->
      <!-- その他のボタン -->
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
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <!-- ログアウトボタン -->
              <button class="nav-link">Logout</button>
            <!-- /ログアウトボタン -->
            </li>
            <li class="nav-item">
            <!-- ログインボタン -->
            <RouterLink class="nav-link" to="/login"
              >Login / Register</RouterLink
            >
            <!-- /ログインボタン -->
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >ドロップダウン</a
            >
            <div class="dropdown-menu" aria-labelledby="dropdown">
              <button 
                  class="dropdown-item" 
                  @click="changeShow()"
              >過去メモ非表示</button>
              <a class="dropdown-item" href="#">リンク2</a>
              <a class="dropdown-item" href="#">リンク3</a>
            </div>
          </li>
        </ul>
      </div>
      </ul>
      <!-- /その他のボタン -->
    </div>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name:'Navbar',
  data() {
    return {
      filterQuery: "",
    };
  },
  methods: {
    ...mapMutations(["setFilterQuery"]),
    //検索キーワードをstoreにセットする
    searchMemo() {
      this.setFilterQuery(this.filterQuery);
      console.log("実行した");
    },
    //過去メモの表示・非表示を切り替える
    changeShow(){
      this.$store.commit('changeShow')
    }
  },
};
</script>

