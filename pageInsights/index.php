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
      <div id="feed">
        <p id="total-fans"></p>
        <p id="new-fans"></p>
        <p id="lost-fans"></p>
        <p id="organic-impressions-day"></p>
        <p id="viral-impressions-day"></p>
        <p id="consumers"></p>
        <p id="engaged-users"></p>
        <p id="post-engagement-rate"></p>
        <p id="positive-feedback"></p>
        <p id="negative-feedback"></p>
      </div>
      <div id="labels">
        <p class="button" id="logOut">Log Out</p>
      </div>
    </div>
  </div>

  <!- Load Facebook SDK ->
  <div id="fb-root"></div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script src="https://www.google.com/jsapi"></script>
  <script src="js/app.js"></script>
</body>
</html>