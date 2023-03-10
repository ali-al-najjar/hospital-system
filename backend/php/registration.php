<?php

include('connection.php');

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$user_type= $_POST['user_type'];

$check_email =  $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

if ($email_exists > 0) {
    $response['status'] = "failed";
} else {
    $query =  $mysqli->prepare('insert into users(first_name,last_name,email,password,usertype_id) values(?,?,?,?,?)');
    $query->bind_param('ssssi', $first_name, $last_name, $email, $hashed_password,$user_type);
    $query->execute();
    $response['status'] = "success";
}

echo json_encode($response);


?>