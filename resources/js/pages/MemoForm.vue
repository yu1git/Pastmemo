<template>
  <div class="memo-form">
    <form class="" @submit.prevent="addNewMemo">
      <!-- ▼ナビゲーションバー -->
      <nav class="d-flex mb-3">
        <h2 class="title p-2 flex-grow-1">New Memo</h2>
        <button
          @click="$router.go(-1)"
          type="button"
          class="btn btn-outline-info p-2 m-2 d-flex align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-backspace m-1"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"
            />
            <path
              d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"
            />
          </svg>
          戻る
        </button>
        <button
          type="submit"
          class="btn btn-outline-info p-2 m-2 d-flex align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check-circle m-1"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
            />
          </svg>
          新規メモ作成
        </button>
      </nav>
      <!-- ▲ナビゲーションバー -->
      <!-- ▼メモ新規作成画面 -->
      <div class="p-3 d-flex flex-column memo-box">
        <input
          class="h5"
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
          <span class="text-xs text-danger">
            {{ errorMessage }}
          </span>
        </div>
      </div>
      <!-- ▲メモ新規作成画面 -->
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { baseurl } from "../const";
import { mapGetters } from "vuex";

export default {
  name: "MemoForm",
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