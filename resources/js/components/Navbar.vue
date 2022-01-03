<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <div class="container-fluid d-flex">
      <RouterLink class="navbar-brand" to="/"> ホーム </RouterLink>
      <ul class="navbar-nav flex-grow-1 p-2">
        <form class="d-flex form-inline mr-auto">
          <input
            class="form-control"
            type="search"
            placeholder="検索..."
            aria-label="検索..."
          />
        </form>
      </ul>
      <ul class="navbar-nav">
        <RouterLink class="nav-link" to="/memoForm">New</RouterLink>
      </ul>
      <ul>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="ナビゲーションの切替"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login"
                >Login / Register</RouterLink
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >ドロップダウン</a
              >
              <div class="dropdown-menu" aria-labelledby="dropdown">
                <a class="dropdown-item" href="#">リンク1</a>
                <a class="dropdown-item" href="#">リンク2</a>
                <a class="dropdown-item" href="#">リンク3</a>
              </div>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  </nav>
</template>