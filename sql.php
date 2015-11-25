<?php
 	$servername = "localhost";
	$username = "ajax1";
	$password = "123456";
	$dbName = "ajax1";

	$conn = new mysqli($servername,$username,$password,$dbName);
	if ($conn->connect_error) {
		echo "connection failed: " . $conn->connect_failed;
	}

	$sort1 = $_POST['sort1'];
	// $sort2 = $_POST['sort2'];
	if ($sort1 === "") {
		echo "please enter something";
	} else {


	$sql = "SELECT * FROM weapons"; //weapons should be $sort2
	$result = $conn->query($sql);

	$re1 = "/(\\b$sort1)/i";
	if ($result->num_rows > 0) {
		while ($row = $result->fetch_assoc()) {
			if (preg_match($re1, $row["Name"])) {
						echo "<tr><td>id: " . $row["ID"] . "</td><td> Name: " . $row["Name"] . "</td><td> Rating: " . $row["Rating"] . "</td></tr>";
				}
		}
	} else {
		echo "0 results";
	}
}

	$conn->close();
?>
