// Signup Controller

function signup(object) {
	// Lets pass this object to a function in helpers to submit this to the server
	let user = object.user;
	let result = addNewUser(user);
	if(result) {
		let updatepkg = {
			type: "user",
			user: user
		};
		setDollarState(updatepkg, state);
		window.location.href = '/index.html';
	} else {
		// error handling here
		console.log("Failed");
	}
}