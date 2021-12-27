<template>
    <div class="memo-form">
        <h2 class="title">New Memo</h2>
        <nav type="dark" variant="info">
            <button class="btn btn-info p-2 m-2 text-white">Add Memo</button>
        </nav>
        <br>
        
        <form 
            class="relative mb-3 flex flex-col justify-between bg-white rounded-md shadow overflow-hidden"
            @submit.prevent="addNewMemo"
        >
        <div class="p-3 flex-1">
            <input
                class="block w-full px-2 py-1 text-lg border-b border-blue-800 rounded"
                type="text"
                placeholder="タイトル"
            />
            <textarea
                class="block w-full px-2 py-1 text-sm border border-blue-800 rounded"
                rows="2"
                placeholder="ここからメモを書きましょう。"
            ></textarea>
            <div v-show="errorMessage">
                <span class="text-xs text-red-500">
                {{ errorMessage }}
                </span>
            </div>
        </div>
        <div class="p-3 flex justify-between items-end text-sm bg-gray-100">
            <button
                @click="$emit('memo-canceled')"
                type="reset"
                class="py-1 leading-5 text-gray-600 hover:text-gray-700"
            >
                キャンセル
            </button>
            <button
                type="submit"
                class="px-3 py-1 leading-5 text-white bg-orange-600 hover:bg-orange-500 rounded"
            >
                追加
            </button>
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
          this.newMemo.title = "";
          this.newMemo.content = "";
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