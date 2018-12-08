/*function unhide(id) {
   document.getElementById(id).style.visibility = "visible";
}*/

function register() {
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
   };

	$.post("/register", params, function(regResult) {
		if (regResult && regResult.success) {
			$("#Reg").text("Successfully registered.");
		} else {
			$("#Reg").text("Error registering.");
		}
	});
}

function p1login() {
	var username = $("#player1").val();
	var password = $("#p1pass").val();

	var params = {
		username: username,
		password: password
	};

	$.post("/p1login", params, function(result) {
		if (result && result.success) {
			$("P1").text("Successfully logged in.");
		} else {
			$("P1").text("Error logging in.");
		}
	});
}