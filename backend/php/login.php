<?php
include('connection.php');

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id,first_name,last_name,email,password from users where email=?');
$query->bind_param('s', $email);
$query->execute();

$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id, $first_name, $last_name, $email, $hashed_password);
$query->fetch();
$response = [];
if ($num_rows == 0) {
    $response['response'] = "user not found";
} else {
    
    if (password_verify($password, $hashed_password)) {
        $response['response'] = "logged in";
        $response['user_id'] = $id;
        $response['first_name'] = $first_name;
        $response['last_name'] = $last_name;
        $response['email'] = $email;
        
    } else {
        $response["response"] = "Incorrect password";
    }
}

echo json_encode($response);
?>
