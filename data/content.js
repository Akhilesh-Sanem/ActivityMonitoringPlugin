   var record="";
    var charCount=0;
    var keyPoints="";
    document.onkeyup=function(e) {
        //Shift Key released
		if(e.which!=0){
        if(e.which == 16){
            keyPoints=keyPoints+ ' ' + e.which;
           // console.log(keyPoints);
           
        }
        //Backspace key pressed
        else if(e.which == 8){
            keyPoints=keyPoints+ ' ' + e.which;
            var subso = "'"+record+"' "+record.length+" ";
            record = record.substring(0,(record.length-1));
            subso = subso + "'"+record+"' "+record.length;
            //console.log(subso);
           
        }
        //Spacebar key or Tab pressed
        else if(e.which == 32||e.which == 9){
            //do nothing
			self.port.emit("keyPoints", keyPoints);
			keyPoints="";
        }
        //Enter key pressed
        else if(e.which == 13){
            keyPoints=keyPoints+ ' ' + e.which;
           // console.log(record);
			saveFormFields();
          	self.port.emit("keyPoints", keyPoints);
			keyPoints="";
        }
        //If any key other than alpha-numerals then log
        else if(e.which > 96 && e.which < 123){
        } else if(e.which > 64 && e.which < 91){
        } else if(e.which > 47 && e.which <58){
        } else {
            keyPoints=keyPoints+ ' ' + e.which;
            //console.log(keyPoints);
         
        }   
		}
    }
    document.onkeypress=function(e){
	if(e.which!=0){
        if(e.which == 32 || e.which == 8) {
                 // console.log(response);
        }
            record=record+String.fromCharCode(e.which);
            keyPoints=keyPoints+ ' ' +e.which;
            charCount++;
            //console.log(keyPoints);
    }}
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
			self.port.emit("Mouse", e.screenX + " " + e.screenY+" "+e.target+"Tag Name :"+e.target.tagName+" "+e.target.value);
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
 self.port.emit("Window",window.windowState);
 }, false);
window.addEventListener("resize", function(event) { 
//console.log("Window " , window.windowState + " " + window.screenX + " " + window.screenY); 
self.port.emit("Window",window.windowState + " " + window.screenX + " " + window.screenY);
 },false);		
 
 var idleService = Components.classes["@mozilla.org/widget/idleservice;1"]
                  .getService(Components.interfaces.nsIIdleService)
var idleObserver = {
  observe: function(subject, topic, data) {
   // alert("topic: " + topic + "\ndata: " + data);
	self.port.emit("Window",topic);
  }
};
idleService.addIdleObserver(idleObserver, 10); // 10 seconds