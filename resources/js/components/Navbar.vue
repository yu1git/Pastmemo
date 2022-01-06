<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid d-flex">
      <RouterLink class="navbar-brand" to="/"> ホーム </RouterLink>
      <ul class="navbar-nav flex-grow-1 p-2">
      <!-- 検索フォーム -->
        <div class="d-flex form-inline mr-auto"> 
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
          >検索</RouterLink>
        </div>
      </ul>
      <ul class="navbar-nav">
        <RouterLink class="nav-link" to="/memoForm">New</RouterLink>
      </ul>
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
            <RouterLink class="nav-link" to="/login"
              >Login / Register</RouterLink
            >
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

