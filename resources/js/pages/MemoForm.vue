<template>
  <div class="memo-form">
    <form class="" @submit.prevent="addNewMemo">
      <nav class="d-flex bd-highlight mb-3">
        <h2 class="title p-2 flex-grow-1 bd-highlight">New Memo</h2>
        <button
          @click="ret"
          type="reset"
          class="btn btn-outline-info p-2 m-2 bd-highlight"
        >
          戻る
        </button>
        <button type="submit" class="btn btn-outline-info p-2 m-2 bd-highlight">
          新規メモ作成
        </button>
      </nav>
      <br />

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
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { baseurl } from "../const";

export default {
  // props: {
  //   id: Number
  // },
  data() {
    return {
      newMemo: {
        title: "",
        content: "",
      },
      errorMessage: "",
      flag: false,
    };
  },
  // created() {
  //   window.addEventListener('popstate', this.backAlert);
  // },
  created() {
    window.addEventListener("beforeunload", this.confirmSave);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.confirmSave);
  },
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
  
  // mounted() {
  // const url = baseurl + 'api/memos'
  // axios.post(url,{
  //   title:'テスト',
  //   content:'内容',
  // }).then((response) => {
  //   // axiosが成功したときのHTTPレスポンスを表示
  //   console.log(response)
  // }).catch((error) => {
  //   // axiosが失敗したときのエラーを表示
  //   console.log(error)
  // })
  // this.newMemo.id = this.id;
  // },
  methods: {
    addNewMemo() {
      this.flag = false;
      if (this.newMemo.title.length > 20){
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
          // this.newMemo.title = "";
          // this.newMemo.content = "";
          //this.$emit("Memo-added", res.data);
          //console.log(res);
          this.$router.push({ name: "MemoList" });
        })
        .catch((err) => {
          this.handleErrors(err);
        });
    },
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
    //キャンセルの時は文章リセットして戻る
    ret() {
      this.$router.push({
        name: "MemoList",
      });
    },
    flagChange() {
      this.flag = true;
    },
    confirmSave(event) {
      if (this.flag) {
        event.returnValue = "編集中のものは保存されませんが、よろしいですか？";
      }
    },
    // backAlert() {
    //   // if (!this.newMemo.content) {
    //   //       this.errorMessage = "本文を記入してください";

    //   //     }
    //   if(this.flag){
    //     //this.errorMessage = "変更された内容があります。保存しますか？"
    //     if(window.confirm('変更された内容があります。保存しますか？')){
    //     //if(){
    //       this.flag = false;
    //       if (!this.newMemo.content) {
    //         const ans = window.confirm('本文を記入してください');
    //         if(ans){
    //           this.$router.push({ name: "MemoForm" });
    //         }
    //       }
    //       this.addNewMemo();
    //     }else{
    //       this.flag = false;
    //       this.ret();
    //     };
    //   }
    // }
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