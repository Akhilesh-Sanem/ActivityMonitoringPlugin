 self.port.on("reload", function (text) {
  console.log(text);
  location.reload();
});
window.addEventListener('click', function(event) {
var t = event.target;
if(t.id=="authorize-button"){
//self.port.emit('click-link', "clicked");
//var currentColor = localStorage.getItem('useriduniqueforactivitymonitoring');
//console.log(currentColor);

}

}, false);


var myVar = setInterval(function () {myTimer()}, 100);
function myTimer() {
    
	var currentColor = localStorage.getItem('useriduniqueforactivitymonitoring');
	//console.log(currentColor);
	if(currentColor!=null){
	self.port.emit('useriduniqueforactivitymonitoring', currentColor);
	clearInterval(myVar);
	//alert("user login successful")
	}
}
//self.port.emit('useriduniqueforactivitymonitoring', "akil");