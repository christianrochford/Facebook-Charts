<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Facebook Insights</title>
  <link rel="stylesheet" href="stylesheets/screen.css">
</head>
<body>
  <img id="login" src="http://hayageek.com/examples/oauth/facebook/oauth-javascript/LoginWithFacebook.png" style="cursor:pointer;" onclick="Login()"/>
  <div id="wrapper">
    <div id="user"></div>
    <div id="id"></div>
    <div id="controls">
      <div id="status">
         <input type="text" name="page" id="input" placeholder="Page Name">
         <input type="submit" id="submit" class="button">
      </div>
      <div id="labels">
        <p class="button" id="logOut">Log Out</p>
      </div>
      <div id="feed"></div>
    </div>
  </div>

  <!- Load Facebook SDK ->
  <div id="fb-root"></div>
    <script>
      
    </script>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script src="https://www.google.com/jsapi"></script>
  <script src="js/app.js"></script>
</body>
</html>