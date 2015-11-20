function compare(a, b) {
	if (a.Rating < b.Rating) {
		return -1;
	}
	if (a.Rating > b.Rating) {
		return 1;
	}
	return 0;
}

function type(category, patt) {
	this.category = category;
	this.patt = patt;
}


var iron = new type("iron", /Iron/gi);
var robe = new type("Robe", /Robe/gi);
var Daedric = new type("Daedric", /Daedric/gi);
var glass = new type("glass", /Glass/gi);
var nord = new type("Nord", /Nord/gi);
var orc = new type("Orcish", /Orcish/gi);
var Elven = new type("Elven", /Elven/gi);
var Dwarven = new type("Dwarven", /Dwarven/gi);
var Steel = new type("Steel", /Steel/gi);
var Hide = new type("Hide", /Hide/gi);
var Leather = new type("Leather", /Leather/gi);
var Scaled = new type("Scaled", /Scaled/gi);
var OGuard = new type("Guard", /guard/gi);
var Dragonplate = new type("Dragonplate", /Dragonplate/gi);
var Dragonscale = new type("Dragonscale", /Dragonscale/gi);
var patterns = [robe, iron, Daedric, glass, nord, orc, Elven, Dwarven, Steel, Hide, Leather, Scaled, OGuard, Dragonplate, Dragonscale];

function ench(category, patt) {
	this.category = category;
	this.patt = patt;
}

var Destruction = new ench("Destruction", /Destruction/gi);
var Alteration = new ench("Alteration", /Alteration/gi);
var Conjuration = new ench("Conjuration", /Conjuration/gi);
var Illusion = new ench("Illusion", /Illusion/gi);
var Restoration = new ench("Restoration", /Restoration/gi);

var ench = [Destruction, Alteration, Conjuration, Illusion, Restoration];

function fillW(arr) {
	arr.sort(compare);
	var x = 0
	for (var i = 0; i < arr.length; i++) {
		for (x; x < patterns.length; x++) {
			if (document.getElementById('typeW').value == patterns[x].category) {
				break;
			}
		}
		if (arr[i].Name.match(patterns[x].patt) == patterns[x].category || arr[i].Name.search(patterns[x].patt) != null && arr[i].Name.search(patterns[x].patt) >= 0 ) {
			var row = "";
			row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
			$('#table').append(row);
		}
	}
}

function fillA(arr) {
	arr.sort(compare);
	var x = 0;
	var y = 0;
	for (var i = 0; i < arr.length; i++) {
		for (x; x < patterns.length; x++) {
			if (document.getElementById('typeA').value == patterns[x].category) {
				break;
			}
		}
		if (arr[i].Name.match(patterns[x].patt) == patterns[x].category || arr[i].Name.search(patterns[x].patt) != null && arr[i].Name.search(patterns[x].patt) >= 0) {
			for (var y = 0; y < ench.length; y++) {
				if (document.getElementById('encha').value == ench[y].category) {
					break;
				}
			}
			if (arr[i].Name.match(ench[y].patt) == ench[y].category || arr[i].Name.search(ench[y].patt) != null && arr[i].Name.search(ench[y].patt) >= 0) {
				var row = "";
				row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
				$('#table').append(row);
			}
		}
	}
}
var oReq = new XMLHttpRequest();
var url;
var ratings = [];
var newArra = [];

function begin() {
	$("#typeA").show();
	$("#typeW").show();
	if (document.getElementById('wOa').value == "Weapons") {
		$("#typeA").hide();
		url = "weapons.json"
		if ($("tr").size() != 0) {
			$("#table").empty();
		}
		oReq.onreadystatechange = function() {
			if (oReq.readyState == 4 && oReq.status == 200) {
				var myArr = JSON.parse(oReq.responseText);
				fillW(myArr)
			}
		}
		oReq.open("GET", url, true);
		oReq.send();
	} else if (document.getElementById('wOa').value == "Armors") {
		$("#typeW").hide();
		url = "armors.json"
		if ($("tr").size() != 0) {
			$("#table").empty();
		}
		oReq.onreadystatechange = function() {
			if (oReq.readyState == 4 && oReq.status == 200) {
				var myArr = JSON.parse(oReq.responseText);
				fillA(myArr)
			}
		}
		oReq.open("GET", url, true);
		oReq.send();
	}
	if ($("tr").size() != 0) {
		$("#table").empty();
	}
}
