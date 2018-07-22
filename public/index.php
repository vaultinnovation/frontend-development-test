<?php

// Get compiled asset
function asset($file)
{
    $assets = json_decode(file_get_contents(__DIR__ . '/build/rev-manifest.json'), true);
    return $assets[$file];
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Vault Innovation">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>Vault App</title>

    <!-- Custom styles for this template -->
    <link href="/build/<?php echo asset('app.css'); ?>" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="//oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><img src="https://vaultinnovation.com/app/themes/vault/assets/img/logo.png"
                                          class="logo"/></a>
    <button id="mobile-menu" class="hamburger hamburger--collapse navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="hamburger-box">
            <span class="hamburger-inner"></span>
        </span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#">Users </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
            </li>
        </ul>
    </div>
</nav>

<div class="container">
    <div class="my-3 menu">
        <ul class="sort-menu">
            <li><button class="btn btn-gray my-2 mr-2" value="hats" onClick="getCats(this.value)">Hats</button></li>
            <li><button class="btn btn-gray my-2 mr-2" value="boxes" onClick="getCats(this.value)">Boxes</button></li>
            <li><button class="btn btn-gray my-2 mr-2" value="space" onClick="getCats(this.value)">Space</button></li>
            <li><button class="btn btn-gray my-2 mr-2" value="sunglasses" onClick="getCats(this.value)">Sunglasses</button></li>
            <li><button class="btn btn-gray my-2 mr-2" value="ties" onClick="getCats(this.value)">Ties</button></li>
            <li><button class="btn btn-gray my-2 mr-2" value="sinks" onClick="getCats(this.value)">Sinks</button></li>
            <li><button class="btn btn-gray my-2 mr-2" value="clothes" onClick="getCats(this.value)">Clothes</button></li>
            <li><button class="btn btn-gray my-2 mr-2" value="action" onClick="getCats(this.value)">Cats in Action</button></li>
        </ul>
    </div>

    <div id="catGrid" class="my-4"></div>

</div>


<script id="handlebars-demo" type="text/x-handlebars-template">

    <div class="row">
        {{#each catLink}}
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="image-container mb-4">
                <a href="http://thecatapi.com"><img src="{{this}}" class="image"></a>
            </div>
        </div>
        {{/each}}
    </div>

</script>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="/build/<?php echo asset('components.js'); ?>"></script>
<script src="/build/<?php echo asset('app.js'); ?>"></script>

</body>
</html>