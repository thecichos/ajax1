function compare(a, b) {
	if (a.Rating < b.Rating) {
		return -1;
	}
	if (a.Rating > b.Rating) {
		return 1;
	}
	return 0;
}

function type(category, patt, typ) {
	this.category = category;
	this.patt = patt;
	this.typ = typ;
}


var iron = new type("iron", /Iron/gi, "both");
var robe = new type("Robe", /Robe/gi, "armor");
var Daedric = new type("Daedric", /Daedric/gi, "both");
var glass = new type("glass", /Glass/gi, "both");
var nord = new type("Nord", /Nord/gi, "both");
var orc = new type("Orcish", /Orcish/gi, "both");
var Elven = new type("Elven", /Elven/gi, "both");
var Dwarven = new type("Dwarven", /Dwarven/gi, "both");
var Steel = new type("Steel", /Steel/gi, "both");
var Hide = new type("Hide", /Hide/gi, "armor");
var Leather = new type("Leather", /Leather/gi, "armor");
var Scaled = new type("Scaled", /Scaled/gi, "armor");
var OGuard = new type("Guard", /guard/gi, "armor");
var Dragonplate = new type("Dragonplate", /Dragonplate/gi, "armor");
var Dragonscale = new type("Dragonscale", /Dragonscale/gi, "armor");
var patterns = [robe, iron, Daedric, glass, nord, orc, Elven, Dwarven, Steel, Hide, Leather, Scaled, OGuard, Dragonplate, Dragonscale];

function fillItems(typ, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (typ == "Weapons") {
			if (arr[i].typ == "both") {
				$('#typeW').append('<option value="' + arr[i].category + '">' + arr[i].category + '</option>')
			}
		} else if (typ == "Armors") {
			if (arr[i].typ == "both" || arr[i].typ == "armor") {
				$('#typeA').append('<option value="' + arr[i].category + '">' + arr[i].category + '</option>')
			}
		}
	}
}


function ench(category, patt) {
	this.category = category;
	this.patt = patt;
}

var Destruction = new ench("Destruction", /Destruction/gi);
var Alteration = new ench("Alteration", /Alteration/gi);
var Conjuration = new ench("Conjuration", /Conjuration/gi);
var Illusion = new ench("Illusion", /Illusion/gi);
var Restoration = new ench("Restoration", /Restoration/gi);
var none = new ench("none", /of/gi);

var ench = [Destruction, Alteration, Conjuration, Illusion, Restoration, none];

function test(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].Name.match(ench[0].patt) != ench[0].category && arr[i].Name.match(ench[1].patt) != ench[1].category && arr[i].Name.match(ench[2].patt) != ench[2].category && arr[i].Name.match(ench[3].patt) != ench[3].category && arr[i].Name.match(ench[4].patt) != ench[4].category) {
			var row = "";
			row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
			$('#table').append(row);
		}
	}
}

// function fillW(arr) {
// 	arr.sort(compare);
// 	var x = 0
// 	for (var i = 0; i < arr.length; i++) {
// 		for (x; x < patterns.length; x++) {
// 			if (document.getElementById('typeW').value == patterns[x].category) {
// 				break;
// 			}
// 		}
// 		if (arr[i].Name.match(patterns[x].patt) == patterns[x].category || arr[i].Name.search(patterns[x].patt) != null && arr[i].Name.search(patterns[x].patt) >= 0) {
// 			var row = "";
// 			row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
// 			$('#table').append(row);
// 		}
// 	}
// }

function fillW(arr) {
	arr.sort(compare);
	var x = 0
	for (var i = 0; i < arr.length; i++) {
		for (x; x < patterns.length; x++) {
			if (document.getElementById('typeW').value == patterns[x].category) {
				break;
			}
		}
		if (arr[i].Name.match(patterns[x].patt) == patterns[x].category || arr[i].Name.search(patterns[x].patt) != null && arr[i].Name.search(patterns[x].patt) >= 0) {
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
			for (0; y < ench.length; y++) {
				if (document.getElementById('encha').value == ench[y].category) {
					break;
				}
			}
			if (document.getElementById('encha').value != "none") {
				if (arr[i].Name.match(ench[y].patt) == ench[y].category || arr[i].Name.search(ench[y].patt) != null && arr[i].Name.search(ench[y].patt) >= 0) {
					var row = "";
					row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
					$('#table').append(row);
				}
			} else if (document.getElementById('encha').value == "none") {
				if (arr[i].Name.search(/of/gi) === -1) {
					var row = "";
					row = '<tr><td>' + arr[i].Name + '</td><td>' + arr[i].Rating + '</td></tr>';
					$('#table').append(row);
				}
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
