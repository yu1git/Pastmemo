<template>
    <div class="memo-form">
        <form 
            class=""
            @submit.prevent="addNewMemo"
        >
        <nav class="d-flex bd-highlight mb-3">
            <h2 class="title p-2 flex-grow-1 bd-highlight">New Memo</h2>
            <button
                @click="$emit('memo-canceled')"
                type="reset"
                class="btn btn-outline-info p-2 m-2 bd-highlight"
            >
                キャンセル
            </button>
            <button 
                type="submit"
                class="btn btn-outline-info p-2 m-2 bd-highlight"
            >
                新規メモ作成
            </button>
            
        </nav>
        <br>
        
        <div class="p-3 d-flex flex-column memo-box">
            <input
                class="memo-title h5"
                style="border:none;"
                type="text"
                v-model="newMemo.title" 
                placeholder="タイトル"
            />
            <textarea
                class="memo-content"
                style="border:none; resize: none;"
                rows="10"
                v-model="newMemo.content" 
                placeholder="ここからメモを書きましょう。"
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
import axios from 'axios'
import {baseurl} from '../const'

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
      errorMessage: ""
    };
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
  methods: {
    addNewMemo() {
      if (!this.newMemo.title) {
        this.errorMessage = "The title field is required";
        return;
      }
      const url = baseurl + 'api/memos';
      axios
        .post(url, this.newMemo)
        .then(res => {
          // this.newMemo.title = "";
          // this.newMemo.content = "";
          //this.$emit("Memo-added", res.data);
          console.log(res)
        })
        .catch(err => {
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
    }
  },
};
</script>
<style scoped>
.memo-box{
  color: #696969;
  font-weight: bold;
  border: solid 1px #e6e6e6;
  box-shadow:2px 2px 0 rgba(0,0,0,.1);
}
.memo-content{
  background-color: #fff;
  background-image:
  linear-gradient(90deg, rgba(237, 119, 128, 0) 0%, rgba(237, 119, 128, 0) 50%, #fff 0%, #fff 100%), linear-gradient(180deg, rgba(100, 100, 100, 0) 0%, rgba(100, 100, 100, 0) 97.5%, #646464 100%);
  background-size: 8px 100%,100% 2rem;
  line-height: 2rem;
  padding: 2rem 1rem 0.2rem 1rem;
}
</style>