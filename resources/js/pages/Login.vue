<template>
  <div>
     <!-- tabの数字を切り替え -->
    <ul>
      <li
        @click="tab = 1"
      >
        Login
      </li>
      <li
        @click="tab = 2"
      >
        Register
      </li>
    </ul>
    <!-- /tabの数字を切り替え -->
    <!-- tabによってログインとRegisterの画面を切り替える -->
    <!-- Login Form -->
    <div  v-show="tab === 1">
    <form @submit.prevent="loginSubmit">
      <div>
        <label for="login-email">Email</label>
        <input 
          type="text" 
          v-model="loginForm.email" 
          id="login-email"/>
      </div>
      <div>
        <label for="login-password">パスワード</label>
        <input 
          type="password" 
          v-model="loginForm.password" 
          id="login-password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
    </div>
    <!-- /Login Form -->
    <!-- Register Form -->
      <div  v-show="tab === 2">
        <form @submit.prevent="registerSubmit">
          <label for="username">名前</label>
          <input
            type="text"
            id="username"
            v-model="registerForm.name"
          />
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="registerForm.email"
          />
          <label for="password">パスワード</label>
          <input
            type="password"
            id="password"
            v-model="registerForm.password"
          />
          <label for="password-confirmation">パスワード (確認)</label>
          <input
            type="password"
            id="password-confirmation"
            v-model="registerForm.password_confirmation"
          />
          <div>
            <button type="submit">
              register
            </button>
          </div>
        </form>
      </div>
      <!-- /Register Form -->
       <!-- /tabによってログインとRegisterの画面を切り替える -->
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      tab: 1,
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    };
  },
  methods: {
    ...mapActions({
      login: 'login',
      register: 'register'
    }),
    async loginSubmit() {
      // storeのloginアクションを呼び出す
      await this.login(this.loginForm);
      this.$router.replace({ name: 'MemoList' });
    },
    async register () {
      // authストアのresigterアクションを呼び出す
      await this.register(this.registerForm);
      this.$router.replace({ name: 'MemoList' });
    }
  },
};
</script>