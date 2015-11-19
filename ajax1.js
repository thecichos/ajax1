function compare(a, b) {
	if (a.Rating < b.Rating) {
		return -1;
	}
	if (a.Rating > b.Rating) {
		return 1;
	}
	return 0;
}

function fill(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].Rating == document.getElementById('change').value) {
			var row = "";
			row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
			$('#table').append(row);
		}
	}
}
var oReq = new XMLHttpRequest();
var url = "array.json"
var ratings = [];
var newArra = [];

function begin() {
	if ($("tr").size() != 0) {
		$("#table").empty();
	}
	oReq.onreadystatechange = function() {
		if (oReq.readyState == 4 && oReq.status == 200) {
			var myArr = JSON.parse(oReq.responseText);
			fill(myArr)
		}
	}
	oReq.open("GET", url, true);
	oReq.send();
}
