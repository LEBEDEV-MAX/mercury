document.getElementById("loginForm").addEventListener("submit", submitForm);
document.getElementById("loginForm").addEventListener("input", closeErrorInfo);

function closeErrorInfo(){
	document.getElementById("errorBlock").style.display = "none";
	
	let inputs = document.getElementsByClassName("inputs");
	Array.prototype.forEach.call(inputs, function(el) {
		el.classList.remove("hasError");
	});
}

function submitForm(event) {
	let obj = {};
	let formData = new FormData(event.target);
	formData.forEach((value, key) => obj[key] = value);
	
	let request = new Request(event.target.action, {
		body: JSON.stringify(obj),
		headers: {"Content-Type": "application/json"},
		method: "POST"});
		
		fetch(request).then(
			function(response) {
				if (response.ok) {
					response.json().then(
						function(data){
							localStorage.setItem("name", data["name"]);
							localStorage.setItem("photoUrl", data["photoUrl"]);
							document.location.href = "profile.html";
						});
				} 
				else {
					response.json().then(
						function(data){
							showError(data);
						});
				}
			});
		
	event.preventDefault();
}


function showError(data){
	document.getElementById("errorBlock").style.display = "block";
	document.getElementById("error").innerHTML = data["error"];
	
	let inputs = document.getElementsByClassName("inputs");
	Array.prototype.forEach.call(inputs, function(el) {
		if(el.value != "") el.classList.add("hasError");
	});
}