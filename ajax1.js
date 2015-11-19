function compare(a, b) {
	if (a.Rating < b.Rating) {
		return -1;
	}
	if (a.Rating > b.Rating) {
		return 1;
	}
	return 0;
}

function type(category, pattern) {
	this.category = category;
	this.pattern = pattern;
}
var iron = new type("iron", /iron/i);
var rope = new type("rope", /rope/i);
var Daedric = new type("Daedric", /Daedric/i);
var glass = new type("glass", /glass/i);
var Dragonplate = new type("Dragonplate", /Dragonplate/i);
var Dragonscale = new type("Dragonscale", /Dragonscale/i);
var nord = new type(nord, /nord/i);
var patterns = [rope, iron, Daedric, glass, Dragonplate, Dragonscale, nord]

function fill(arr) {
	arr.sort(compare);
	var x = 0
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].Rating == document.getElementById('change').value) {
			for (x; x < patterns.length; x++) {
				if (document.getElementById('type').value == patterns[x].category) {
					break;
				}
			}
			if (arr[i].Name.search(patterns[x].pattern) > 0) {
				var row = "";
				row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
				$('#table').append(row);
			}
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
