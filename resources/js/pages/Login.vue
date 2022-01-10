<template>
  <div>
    <!-- tabの数字を切り替え -->
    <ul>
      <li @click="tab = 1">Login</li>
      <li @click="tab = 2">Register</li>
    </ul>
    <!-- /tabの数字を切り替え -->
    <!-- tabによってログインとRegisterの画面を切り替える -->
    <!-- Login Form -->
    <div v-show="tab === 1">
      <form @submit.prevent="loginSubmit">
        <div>
          <label for="login-email">メールアドレス</label>
          <input type="text" v-model="loginForm.email" id="login-email" />
          <span v-show="errors.email">{{ errors.email }}</span>
        </div>
        <div>
          <label for="login-password">パスワード</label>
          <input
            type="password"
            v-model="loginForm.password"
            id="login-password"
          />
          <span v-show="errors.password">{{ errors.password }}</span>
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
    <!-- /Login Form -->
    <!-- Register Form -->
    <div v-show="tab === 2">
      <form @submit.prevent="registerSubmit">
        <label for="username">名前</label>
        <input type="text" id="username" v-model="registerForm.name" />
        <span v-show="errors.name">{{ errors.name }}</span>

        <label for="email">メールアドレス</label>
        <input type="text" id="email" v-model="registerForm.email" />
        <span v-show="errors.email">{{ errors.email }}</span>

        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="registerForm.password" />
        <span v-show="errors.password">{{ errors.password }}</span>

        <label for="password-confirmation">パスワード (確認)</label>
        <input
          type="password"
          id="password-confirmation"
          v-model="registerForm.password_confirmation"
        />
        <span v-show="errors.password_confirmation">{{ errors.password_confirmation }}</span>
        <div>
          <button type="submit">register</button>
        </div>
        <div v-show="errorMessage">
          <span class="text-xs text-red-500">
            {{ errorMessage }}
          </span>
        </div>
      </form>
    </div>
    <!-- /Register Form -->
    <!-- /tabによってログインとRegisterの画面を切り替える -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tab: 1,
      errorMessage: "",
      errors: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    ...mapActions({
      login: "login",
      register: "register",
    }),
    async loginSubmit() {
      this.validMsg(this.loginForm);
      // storeのloginアクションを呼び出す
      await this.login(this.loginForm);
      // 現在のhistoryを置換(上書き)して移動する
      this.$router.replace({ name: "MemoList" });
    },
    async registerSubmit() {
      this.validMsg(this.registerForm);
      // authストアのresigterアクションを呼び出す
      await this.register(this.registerForm)
        .then((res) => {
          console.log(res);
          // 現在のhistoryを置換(上書き)して移動する
          this.$router.replace({ name: "MemoList" });
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
        if (errorBag.name) {
          this.errorMessage = errorBag.name[0];
        } else if (errorBag.email) {
          this.errorMessage = errorBag.email[0];
        } else if (errorBag.password) {
          this.errorMessage = errorBag.password[0];
        } else if (errorBag.password_confirmation) {
          this.errorMessage = errorBag.password_confirmation[0];
        } else {
          this.errorMessage = err.response.message;
        }
      } else {
        console.log(err.response);
      }
    },
    // バリデーション
    validMsg(form) {
      let validEmail = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if(!form.name) {
        this.errors.name = "名前を記入してください"
      } else if(form.name.length > 255) {
        this.errors.name = "名前は255文字以内で記入してください"
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.name = ""
      }
      if(!form.email) {
        this.errors.email = "メールアドレスを記入してください"
      } else if(form.email.length > 255) {
        this.errors.email = "メールアドレスは255文字以内で記入してください"
      } else if(!validEmail.test(form.email)) {
        this.errors.email = "メールアドレスの形式で入力してください"
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.email = ""
      }
      if(!form.password) {
        this.errors.password = "パスワードを記入してください"
      } else if(form.password < 8) {
        this.errors.password = "パスワードは8文字以上で記入してください"
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.password= ""
      }
      if(!form.password_confirmation) {
        this.errors.password_confirmation = "パスワード（確認）の入力は必須です"
      } else if(form.password !== form.password_confirmation) {
        this.errors.password_confirmation = "パスワードが異なります"
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.password_confirmation = ""
      }
    }
  },
};
</script>