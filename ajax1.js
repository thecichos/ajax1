	var oReq = new XMLHttpRequest();
	var url = "array.json"

	function fill(arr) {
		for (var i = 0; i < arr.length; i++) {
			var row = "";
			row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
			$('#table').prepend(row);
		}
	}

	oReq.onreadystatechange = function() {
		if (oReq.readyState == 4 && oReq.status == 200) {
			var myArr = JSON.parse(oReq.responseText);
			fill(myArr)
		}
	}
	oReq.open("GET", url, true);
	oReq.send();
