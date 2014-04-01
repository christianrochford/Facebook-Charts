<?php
if(isset($_POST)){
$page = $_POST['page'];
if($page !=''){
$json = file_get_contents('https://graph.facebook.com/' . $page);
$obj = json_decode($json);
$id = $obj->id;
}
}
//what we need to return back to our form
$returndata = array('name' => $page,'id' => $id);
//if this is not an ajax request
if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'){
//set session variables
session_start();
$_SESSION['cf_returndata'] = $returndata;
//redirect back to form
header('location: ' . $_SERVER['HTTP_REFERER']);  
}
?>