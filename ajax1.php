<?php
	$servername = "localhost";
	$username = "ajax1";
	$password = "123456";
	$dbName = "ajax1";

	$string = file_get_contents("weapons.json");
	$json_array_weapons = json_decode($string, true);
	$string = file_get_contents("armors.json");
	$json_array_armors = json_decode($string, true);
	$conn = new mysqli($servername,$username,$password,$dbName);
	if ($conn->connect_error) {
		echo "connection failed" . $conn->connect_error;
	}
	echo "connected successfully";
	$sql = "CREATE TABLE armors (
		ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		Name VARCHAR(50) NOT NULL,
		Rating INT(6) NOT NULL
	)";
	if ($conn->query($sql) === TRUE) {
		echo "Table created";
	} else {
		echo "error: " . $conn->error;
	}
	for ($i=0; $i < sizeof($json_array_armors); $i++) {
		$name = $json_array_armors[$i]["Name"];
		$rating = $json_array_armors[$i]["Rating"];
		$sql = "INSERT INTO armors(name, rating)
		VALUES ('$name', '$rating')";
		if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
		} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	$sql = "CREATE TABLE weapons (
		ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		Name VARCHAR(50) NOT NULL,
		Rating INT(6) NOT NULL
	)";
	if ($conn->query($sql) === TRUE) {
		echo "Table created";
	} else {
		echo "error: " . $conn->error;
	}
	for ($o=0; $o < sizeof($json_array_weapons); $o++) {
		$name = $json_array_weapons[$o]["Name"];
		$rating = $json_array_weapons[$o]["Rating"];
		$sql = "INSERT INTO weapons(name, rating)
		VALUES ('$name', '$rating')";
		if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
		} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	$conn->close();
?>
