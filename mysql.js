function start() {
	$(document).ready(function() {
			if ($("tr").length != 0 || $("#blue").length != 0) {
				$("#test").empty();
			}
			var sort1 = $("#sort1").val();
			var sort2 = $("#type").val();
			var dataString = 'sort1=' + sort1 ;
			$.ajax({
					url: 'sql.php',
					type: 'POST',
					data: dataString,
					cache: false
				})
				.done(function(result) {
					$("#test").append("" + result + "");
				})
				.fail(function(result) {
					alert("failed");
				});
		});
	}
