<template>
  <div>
    <!-- ▼tabの数字を切り替え -->
    <nav class="d-flex justify-content-end mb-3">
      <button @click="tab = 1" class="btn btn-outline-info p-2 m-2">
        ログイン
      </button>
      <button @click="tab = 2" class="btn btn-outline-info p-2 m-2">
        ユーザー登録
      </button>
    </nav>
    <!-- ▲tabの数字を切り替え -->
    <div class="container">
      <!-- ▼tabの数字によってログインとRegisterの画面を切り替える -->
      <!-- ▼Login Form -->
      <div v-show="tab === 1">
        <div class="row">
          <div class="col-sm-8 pb-3">
            <div class="card" style="width: 100%">
              <div class="card-body">
                <h5 class="card-title">ログイン</h5>
                <p>登録済みの方はこちらからログインしてください</p>
                <form @submit.prevent="loginSubmit">
                  <input type="hidden" name="_token" :value="csrf">
                  <div class="row mb-3">
                    <label for="login-email" class="col-sm-3 col-form-label">
                      メールアドレス
                      <span class="text-light bg-danger px-1 small">必須</span>
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        v-model="loginForm.email"
                        id="login-email"
                        class="form-control"
                        v-bind:class="{ errorOutline: errors.email }"
                      />
                      <span v-show="errors.email" class="text-danger">
                        {{ errors.email }}
                      </span>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="login-password" class="col-sm-3 col-form-label">
                      パスワード
                      <span class="text-light bg-danger px-1 small">必須</span>
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="password"
                        v-model="loginForm.password"
                        id="login-password"
                        class="form-control"
                        v-bind:class="{ errorOutline: errors.password }"
                      />
                      <span v-show="errors.password" class="text-danger">
                        {{ errors.password }}
                      </span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-info p-2 m-2">
                      ログイン
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- ▼ユーザー登録への移動 -->
          <div class="col-sm-4 pb-3">
            <div class="card " style="width: 80%; height: 100%;">
              <div class="card-body">
                <h5 class="card-title">新規ユーザー登録</h5>
                <p class="d-flex align-items-center" style="height: 40%;">はじめての方はユーザー登録をしてください</p>
                <div class="d-flex justify-content-center">
                  <button @click="tab = 2" class="btn btn-info p-2 m-2">
                    ユーザー登録画面へ
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- ▲ユーザー登録への移動 -->
        </div>
      </div>
      <!-- ▲Login Form -->
      <!-- ▼Register Form -->
      <div v-show="tab === 2" class="pb-3">
        <div class="card" style="width: 100%">
          <div class="card-body">
            <h5 class="card-title">新規ユーザー登録</h5>
            <form @submit.prevent="registerSubmit">
              <input type="hidden" name="_token" :value="csrf">
              <div class="row mb-3">
                <label for="username" class="col-sm-3 col-form-label">
                  名前
                  <span class="text-light bg-danger px-1 small">必須</span>
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    id="username"
                    v-model="registerForm.name"
                    class="form-control"
                    v-bind:class="{ errorOutline: errors.name }"
                  />
                  <span v-show="errors.name" class="text-danger">
                    {{ errors.name }}
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <label for="email" class="col-sm-3 col-form-label">
                  メールアドレス
                  <span class="text-light bg-danger px-1 small">必須</span>
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    id="email"
                    v-model="registerForm.email"
                    class="form-control"
                    v-bind:class="{ errorOutline: errors.email }"
                  />
                  <span v-show="errors.email" class="text-danger">
                    {{ errors.email }}
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <label for="password" class="col-sm-3 col-form-label">
                  パスワード
                  <span class="text-light bg-danger px-1 small">必須</span>
                </label>
                <div class="col-sm-9">
                  <input
                    type="password"
                    id="password"
                    v-model="registerForm.password"
                    class="form-control"
                    v-bind:class="{ errorOutline: errors.password }"
                  />
                  <span v-show="errors.password" class="text-danger">
                    {{ errors.password }}<br />
                  </span>
                  <span style="font-size: 0.7rem">
                    8文字以上で入力して下さい
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <label
                  for="password-confirmation"
                  class="col-sm-3 col-form-label"
                >
                  パスワード (確認)
                  <span class="text-light bg-danger px-1 small">必須</span>
                </label>
                <div class="col-sm-9">
                  <input
                    type="password"
                    id="password-confirmation"
                    v-model="registerForm.password_confirmation"
                    class="form-control"
                    v-bind:class="{
                      errorOutline: errors.password_confirmation,
                    }"
                  />
                  <span
                    v-show="errors.password_confirmation"
                    class="text-danger"
                  >
                    {{ errors.password_confirmation }}
                  </span>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-info p-2 m-2">
                  新規ユーザー登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- ▲Register Form -->
      <!-- ▲tabの数字によってログインとRegisterの画面を切り替える -->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      tab: 1,
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
    },
    // バリデーション
    validMsg(form) {
      let validEmail =
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if (!form.name) {
        this.errors.name = "名前を記入してください";
      } else if (form.name.length > 255) {
        this.errors.name = "名前は255文字以内で記入してください";
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.name = "";
      }
      if (!form.email) {
        this.errors.email = "メールアドレスを記入してください";
      } else if (form.email.length > 255) {
        this.errors.email = "メールアドレスは255文字以内で記入してください";
      } else if (!validEmail.test(form.email)) {
        this.errors.email = "メールアドレスの形式で入力してください";
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.email = "";
      }
      if (!form.password) {
        this.errors.password = "パスワードを記入してください";
      } else if (form.password < 8) {
        this.errors.password = "パスワードは8文字以上で記入してください";
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.password = "";
      }
      if (!form.password_confirmation) {
        this.errors.password_confirmation =
          "パスワード（確認）の入力は必須です";
      } else if (form.password !== form.password_confirmation) {
        this.errors.password_confirmation = "パスワードが異なります";
      } else {
        //2度目以降に正しい入力をしたとき、表示したエラーメッセージを空白に戻す
        this.errors.password_confirmation = "";
      }
    },
  },
};
</script>
<style scoped>
.errorOutline {
  outline: 1px red solid;
}
</style>