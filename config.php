<?php
// Database connection parameters
$servername = "sql313.infinityfree.com"; // MySQL host
$username = "if0_37295792"; // MySQL username
$password = "01Hellouser-"; // MySQL password (replace with your actual password)
$dbname = "if0_37295792_VOGUE"; // Database name (replace with your actual database name)

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";
}

$conn->close();
?>
