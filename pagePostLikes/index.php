<?php
session_start();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Facebook Insights</title>
  <link rel="stylesheet" href="stylesheets/screen.css">
</head>
<body>
<?php
//init variables
$cf = array();
$sr = false;
if(isset($_SESSION['cf_returndata'])){
$cf = $_SESSION['cf_returndata'];
$sr = true;
}
?>
  <div id="id"><?php echo ($sr) ? $cf['id'] : '' ?></div>
  <div id="controls">
    <div id="status">
     <form method="post" action="process.php">
       <input type="text" name="page" id="input" value="<?php echo ($sr) ? $cf['name'] : '' ?>" placeholder="Page Name">
       <input type="submit" id="submit" class="button">
     </form>
    </div>
    <div id="user"></div>
    <div id="labels">
      <p>Post</p>
      <p>Likes</p>
    </div>
    <div id="feed">
    </div>
    <div id="message"></div>
  </div>
  
  <!-- Facebook Likes Chart-->
  <div id="dashboard">
    <div id="stringFilter"></div>
    <div id="fbLikesChart"></div>
  </div>

  <div id="fb-root"></div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script src="https://www.google.com/jsapi"></script>
  <script src="js/app.js"></script>
</body>
</html>