<template>
  <div>
    <nav class="d-flex bd-highlight mb-3 justify-content-end">
      <button
        @click="ret"
        type="reset"
        class="btn btn-outline-info p-2 m-2 bd-highlight"
      >
        キャンセル
      </button>
      <button
        @click="destroyMemo"
        type="reset"
        class="btn btn-outline-info p-2 m-2 bd-highlight"
      >
        削除
      </button>
      <button
        @click="updateMemo"
        type="submit"
        class="btn btn-outline-info p-2 m-2 bd-highlight"
      >
        保存
      </button>
    </nav>

    <div class="p-3 d-flex flex-column memo-box">
      <input
        class="memo-title h5"
        style="border: none"
        type="text"
        v-model="memo.title"
        @input="flagChange"
        @keyup.enter="$event.target.nextElementSibling.focus()"
      />
      <textarea
        class="memo-content"
        style="border: none; resize: none"
        rows="10"
        v-model="memo.content"
        @input="flagChange"
      ></textarea>
    </div>
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
      flag: false,
    };
  },
  created() {
    axios
      .get(baseurl + "api/memos/" + this.$route.params.id)
      .then((response) => (this.memo = response.data))
      .catch((erorr) => console.log(error));
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
  methods: {
    updateMemo() {
      this.flag = false;
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
    handleErrors(err) {
      if (err.response && err.response.status === 422) {
        const errorBag = err.response.data.errors;
        if (errorBag.title) {
          this.errorMessage = errorBag.title[0];
        } else if (errorBag.description) {
          this.errorMessage = errorBag.description[0];
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
  },
  //mounted() {
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