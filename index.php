<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/material-kit.css">
    <link rel="stylesheet" href="assets/css/main.css">

    <script src="https://apis.google.com/js/api.js"></script>
    <script>
        window.fbAsyncInit = function() {
            FB.init({
                appId: '1812723498959286',
                xfbml: false,
                version: 'v2.7',
                status: true
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
</head>
<body>
<nav class="navbar" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">Contacts</a>
        </div>

        <div class="" id="navbar-collapse-1">
            <ul class="nav navbar-nav nav-pills">
                <li class="active"><a data-toggle="tab" role="tab" id="contacts_link" href="#" ><i class="fa fa-users" aria-hidden="true"></i></i>CONTACTS</a></li>
                <li class="" ><a data-toggle="tab" role="tab" id="fb_link" href="#" ><i class="fa fa-facebook-official" aria-hidden="true"></i>Facebook</a></li>
                <li class=""><a data-toggle="tab" role="tab" id="google_link" href="#" ><i class="fa fa-google" aria-hidden="true"></i>Google</a></li>
            </ul>
        </div>
    </div>
</nav>

<section id="contacts" class="panel">
    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false">
        <div class="panel-heading">
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
            <i class="fa fa-users" aria-hidden="true"></i>
            Contacts
        </div>
    </a>
    <div class="panel-body panel-collapse collapse in" role="tabpanel" id="collapseOne" aria-expanded="false">
        <form class="col-sm-12 form" name="add_user" id="add_user">
            <div class="row">
                <div class="form-group label-floating col-sm-6" id="first">
                    <label class="control-label">First Name</label>
                    <input type="text" class="form-control">
                </div>
                <div class="form-group label-floating col-sm-6">
                    <label class="control-label">Last Name</label>
                    <input type="text" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="form-group label-floating col-sm-6">
                    <label class="control-label">Phone</label>
                    <input type="tel" class="form-control">
                </div>
                <div class="form-group label-floating col-sm-6">
                    <label class="control-label">Email</label>
                    <input type="email" class="form-control">
                </div>
            </div>
            <button type="button" class="btn btn-info btn-fab btn-fab-mini btn-round" style="margin-top: 7px" onclick="addUser()">
                <i class="fa fa-user-plus" aria-hidden="true" style="margin-left: 7px"></i>
            </button>
        </form>
    </div>
    <ul id="contacts_ul" class="list-group"></ul>
</section>

<section id="fb_contacts" class="panel panel-info">
    <div class="panel-heading"><i class="fa fa-facebook" aria-hidden="true"></i>Facebook Contacts (that use this app)</div>
    <div class="panel-body">
        <ul id="fb_contacts_ul" class="list-group"></ul>
    </div>
</section>

<section id="google_contacts" class="panel panel-danger">
    <div class="panel-heading"><i class="fa fa-google-plus" aria-hidden="true"></i>Google Contacts</div>
    <div class="panel-body">
        <ul id="google_contacts_ul" class="list-group"></ul>
    </div>
</section>

</body>

<!--   Core JS Files   -->
<script src="assets/js/jquery.min.js" type="text/javascript"></script>
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/material.min.js" type="text/javascript"></script>

<!-- Control Center for Material Kit: activating the ripples, parallax effects, scripts from the example pages etc -->
<script src="../assets/js/material-kit.js" type="text/javascript"></script>

<script src="assets/js/contacts.js" type="text/javascript"></script>
</html>