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

	$.post("/register", params, function(result) {
		if (result && result.success) {
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
      console.log(result.message);
      console.log(req.session.username);
      
		if (result && result.success) {
			$("P1").text(result.message);
		} else {
			$("P1").text(result.message);
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
      console.log(result.message);
      
		if (result && result.success) {
			$("P2").text(result.message);
		} else {
			$("P2").text(result.message);
		}
	});
}

function updateRecord() {

}