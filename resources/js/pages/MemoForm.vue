<template>
    <div class="memo-form">
        <h2 class="title">New Memo</h2>
        <nav type="dark" variant="info">
            <button class="btn btn-info p-2 m-2 text-white">Add Memo</button>
        </nav>
        <br>
        <form 
            class="relative mb-3 flex flex-col justify-between bg-white rounded-md shadow overflow-hidden"
            @submit.prevent="handleAddNewTask"
        >
        <div class="p-3 flex-1">
            <input
                class="block w-full px-2 py-1 text-lg border-b border-blue-800 rounded"
                type="text"
                placeholder="Enter a title"
                v-model.trim="newMemo.title"
            />
            <texterea 
                class="block w-full px-2 py-1 text-sm border border-blue-800 rounded"
                rows="2"
                placeholder="Add a description (optional)"
                v-model.trim="newTask.description"
            ></texterea>
            <div v-show="errorMessage">
                <span class="text-xs text-red-500">
                {{ errorMessage }}
                </span>
            </div>
        </div>

        <div class="p-3 flex justify-between items-end text-sm bg-gray-100">
            <button
                @click="$emit('task-canceled')"
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

export default {
  props: {
    statusId: Number
  },
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        status_id: null
      },
      errorMessage: ""
    };
  },
  mounted() {
    this.newTask.status_id = this.statusId;
  },
  methods: {
    handleAddNewTask() {
      if (!this.newTask.title) {
        this.errorMessage = "The title field is required";
        return;
      }

      axios
        .post("/tasks", this.newTask)
        .then(res => {
          this.$emit("task-added", res.data);
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
  }
};
</script>