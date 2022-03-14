<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--CSRFトークン-->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>過去メモ</title>

    <!--bootstrap5-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!--CSS-->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

</head>
<body>
    <div id="app"></div>
    <!--script
    <script src="js/app.js"></script>-->
    <script src="{{ mix('js/app.js') }}"></script>

</body>
</html>