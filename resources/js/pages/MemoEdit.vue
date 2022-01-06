<template>
  <div>
    <!-- ナビゲーションバー -->
    <nav class="d-flex mb-3 justify-content-end">
      <button
        @click="$router.go(-1)"
        type="reset"
        class="btn btn-outline-info p-2 m-2"
      >
        戻る
      </button>
      <button
        @click="destroyMemo"
        type="reset"
        class="btn btn-outline-info p-2 m-2"
      >
        削除
      </button>
      <button
        @click="updateMemo"
        type="submit"
        class="btn btn-outline-info p-2 m-2"
      >
        保存
      </button>
    </nav>
    <!-- /ナビゲーションバー -->
    <!-- メモ編集画面 -->
    <div class="p-3 d-flex flex-column memo-box">
      <input
        class="memo-title h5"
        style="border: none"
        type="text"
        v-model="memo.title"
        @input="flagChange"
      />
      <textarea
        class="memo-content"
        style="border: none; resize: none"
        rows="10"
        v-model="memo.content"
        @input="flagChange"
      ></textarea>
      <div v-show="errorMessage">
        <span class="text-xs text-red-500">
          {{ errorMessage }}
        </span>
      </div>
    </div>
    <!-- /メモ編集画面 -->
  </div>
</template>

<script>
import axios from "axios";
import { baseurl } from "../const";

export default {
  name: "MemoEdit",
  //props:['userId'],
  data() {
    return {
      memo: {
        id: Number,
        title: "",
        content: ",",
      },
      errorMessage: "",
      //メモの入力が始まっているか確認するフラグ
      flag: false,
    };
  },
  created() {
    // クリックしたメモの情報を持ってくる
    axios
      .get(baseurl + "api/memos/" + this.$route.params.id)
      .then((response) => (this.memo = response.data))
      .catch((err) => console.log(err));
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
    // メモ更新
    updateMemo() {
      this.flag = false;
      if (this.memo.title.length > 20) {
        this.errorMessage = "タイトルは20文字以内で入力してください";
        return;
      }
      if (!this.memo.content) {
        this.errorMessage = "本文を記入してください";
        return;
      }
      const url = baseurl + "api/memos/" + this.memo.id;
      axios
        .put(url, {
          //id: this.userId,
          title: this.memo.title,
          content: this.memo.content,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "MemoList" });
        })
        .catch((err) => {
          this.handleErrors(err);
        });
    },
    // メモ削除
    destroyMemo() {
      this.flag = false;
      const url = baseurl + "api/memos/" + this.memo.id;
      axios
        .delete(url, {
          //id: this.userId,
          title: this.memo.title,
          content: this.memo.content,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "MemoList" });
        })
        .catch((err) => {
          this.handleErrors(err);
        });
    },
    // エラー処理
    handleErrors(err) {
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