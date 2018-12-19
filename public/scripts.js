/*function unhide(id) {
   document.getElementById(id).style.visibility = "visible";
}*/

var player1;
var player2;

function register() {
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
   };

	$.post("/register", params, function(result) {
		if (result && result.success) {
			$("#Reg").text(result.username + " successfully registered.");
		} else {
			$("#Reg").text("Error registering " + result.username);
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
			$("#P1").text(result.message);
			player1 = result.player1;
			document.getElementById("1game").style.visibility = "visible";
		} else {
			$("#P1").text(result.message);
		}
	});
}

function p2login() {
	var username = $("#player2").val();
   var password = $("#p2pass").val();

	var params = {
		username: username,
		password: password
	};

	$.post("/p2login", params, function(result) {      
		if (result && result.success) {
			$("#P2").text(result.message);
			player2 = result.player2;
			document.getElementById("1game").style.visibility = "hidden";
			document.getElementById("2game").style.visibility = "visible";
		} else {
			$("#P2").text(result.message);
		}
	});
}

function updateRecord() {

}

