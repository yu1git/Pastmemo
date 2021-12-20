<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">
                ホーム
            </RouterLink>
            <form class="d-flex"><input class="form-control" type="search" placeholder="検索..." aria-label="検索..."></form>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="ナビゲーションの切替">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">

                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="#">New</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/login">Login / Register</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ドロップダウン</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown">
                        <a class="dropdown-item" href="#">リンク1</a>
                        <a class="dropdown-item" href="#">リンク2</a>
                        <a class="dropdown-item" href="#">リンク3</a>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </nav>
</template>