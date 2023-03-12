<?php

include('connection.php');

$user_id= $_POST['user_id'];
$department_id = $_POST['department_id'];

$query = $mysqli->prepare('insert into user_departments(user_id,department_id) values(?,?)');
$query->bind_param('ii', $user_id,$department_id);
$query->execute();
$response['status'] = "success";

echo json_encode($response);


?>