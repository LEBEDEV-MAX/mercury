let photoUrl = localStorage.getItem("photoUrl");
let userName = localStorage.getItem("name");

if(userName == null) logout();
document.getElementById("photo").src = photoUrl;
document.getElementById("userName").innerHTML = userName;

function logout(){
	document.location.href = "index.html";
	localStorage.clear();
}