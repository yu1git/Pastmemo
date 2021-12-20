<template>
  <div class="container">
    <h1>Memo List</h1>
    <div class="row">
    <div class="col-sm-2" style="width: 15rem; margin-top:20px; " v-for="i in 10" v-bind:key="i">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">タイトル{{}}</h5>
        <p class="card-text">テキスト{{}}</p>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>