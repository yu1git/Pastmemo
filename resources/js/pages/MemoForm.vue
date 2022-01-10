<template>
  <div class="memo-form">
    <form class="" @submit.prevent="addNewMemo">
      <!-- ナビゲーションバー -->
      <nav class="d-flex  mb-3">
        <h2 class="title p-2 flex-grow-1 ">New Memo</h2>
        <button
          @click="$router.go(-1)"
          type="button"
          class="btn btn-outline-info p-2 m-2 "
        >
          戻る
        </button>
        <button type="submit" class="btn btn-outline-info p-2 m-2 ">
          新規メモ作成
        </button>
      </nav>
      <!-- /ナビゲーションバー -->
      <!-- メモ新規作成画面 -->
      <div class="p-3 d-flex flex-column memo-box">
        <input
          class="memo-title h5"
          style="border: none"
          type="text"
          v-model="newMemo.title"
          placeholder="タイトル"
          @input="flagChange"
        />
        <textarea
          class="memo-content"
          style="border: none; resize: none"
          rows="10"
          v-model="newMemo.content"
          placeholder="ここからメモを書きましょう。"
          @input="flagChange"
        ></textarea>
        <div v-show="errorMessage">
          <span class="text-xs text-red-500">
            {{ errorMessage }}
          </span>
        </div>
      </div>
      <!-- /メモ新規作成画面 -->
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { baseurl } from "../const";

export default {
  data() {
    return {
      newMemo: {
        title: "",
        content: "",
      },
      errorMessage: "",
      //メモの入力が始まっているか確認するフラグ
      flag: false,
    };
  },

  created() {
    // 意図しない移動に対して注意喚起
    window.addEventListener("beforeunload", this.confirmSave);
  },
  destroyed() {
    // 意図しない移動に対して注意喚起
    window.removeEventListener("beforeunload", this.confirmSave);
  },
  // 意図しない移動に対して注意喚起
  beforeRouteLeave(to, from, next) {
    if (this.flag) {
      const answer = window.confirm(
        "編集中のものは保存されませんが、よろしいですか？"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  methods: {
    // 新規メモ作成
    addNewMemo() {
      this.flag = false;
      if (this.newMemo.title.length > 20) {
        this.errorMessage = "タイトルは20文字以内で入力してください";
        return;
      }
      if (!this.newMemo.content) {
        this.errorMessage = "本文を記入してください";
        return;
      }
      const url = baseurl + "api/memos";
      axios
        .post(url, this.newMemo)
        .then((res) => {
          console.log(res);
          // 終了後MemoListに移動
          this.$router.push({ name: "MemoList" });
        })
        .catch((err) => {
          this.handleErrors(err);
        });
    },
    // エラー処理
    handleErrors(err) {
      console.log(err);
      if (err.response && err.response.status === 422) {
        const errorBag = err.response.data.errors;
        if (errorBag.title) {
          this.errorMessage = errorBag.title[0];
        } else if (errorBag.content) {
          this.errorMessage = errorBag.content[0];
        } else {
          this.errorMessage = err.response.message;
        }
      } else {
        console.log(err.response);
      }
    },
    // メモの入力が始まっているか確認するフラグの変更
    flagChange() {
      this.flag = true;
    },
    // 意図しない移動に対して注意喚起
    confirmSave(event) {
      if (this.flag) {
        event.returnValue = "編集中のものは保存されませんが、よろしいですか？";
      }
    },
  },
};
</script>
<style scoped>
.memo-box {
  color: #696969;
  font-weight: bold;
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
  background-size: 8px 100%, 100% 2rem;
  line-height: 2rem;
  padding: 2rem 1rem 0.2rem 1rem;
}
</style>