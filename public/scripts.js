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
   
   console.log(params);

	$.post("/register", params, function(result) {
		if (regResult && regResult.success) {
			$("#Reg").text("Successfully registered.");
		} else {
			$("#Reg").text("Error registering.");
		}
	});
}