			var { ToggleButton } = require('sdk/ui/button/toggle');
			var panels = require("sdk/panel");
			var self = require("sdk/self");
			var tabs = require('sdk/tabs');
			var gmailtabs = new Object();
			//var tabs1 = require("sdk/tabs");
			var userid = null;
		
		
			// Listen for tab openings.
			tabs.on('open', function onOpen(tab) {
			var ctimestamp = Date.now();
			if(checkUserLogin()&&tab.url.indexOf("https://mail.google.com/mail/") == 0){
			   gmailtabs[tabs.id+""]=Date.now();
			  console.log(userid, 'Inbox Opened', Date.now());
			  console.log(userid,gmailtabs[tabs.id+""]);
			  syncData1(userid, "Inbox", tab.url, 'Opened', Date.now());
			  worker = tab.attach({
			 contentScriptFile: self.data.url("content.js")
		  });
		  worker.port.on("keyPoints", function(keyPoints) {
			console.log(userid, "Key", tab.url, keyPoints, Date.now());
			syncData(userid, "Key", tab.url, keyPoints, Date.now());
			
			});
			worker.port.on("Mouse", function(mouse) {
			
			if(tab.url.indexOf("?compose=new") > -1){
			console.log(userid, "Compose Mail started",Date.now());
			 syncData1(userid, "Compose Mail", tab.url, "Started", Date.now());
			}
			else{
			console.log(userid, tab.url,"not a Compose Mail started",mouse,Date.now());
			}
			});
			worker.port.on("Selected", function(selected) {
			console.log(userid, "Selected", tab.url, selected, Date.now());
			 syncData(userid, "Selected", tab.url, selected, Date.now());
			
			});
			worker.port.on("Input", function(input) {
			console.log(userid, "Input", tab.url, input, Date.now());
			 syncData(userid, "Input", tab.url, input, Date.now());
			
			});
			  worker.port.on("Tab", function(status) {
			console.log(userid, "Tab", tab.url, status, Date.now());
			syncData(userid, "Tab", tab.url, status, Date.now());
			
			});
			 worker.port.on("Window", function(status) {
			console.log(userid, "Window", tab.url, status, Date.now());
			syncData(userid, "Window", tab.url, status, Date.now());
			
			});
			
			worker.port.on("mailrow", function(st_time,end_time,timerecieved,sender,subject_content) {
			
			console.log(userid,st_time,end_time, timerecieved,sender,subject_content,"Read");
			//console.log("Subject :", document.getElementById("nh").value);
			
			//console.log(userid, "mailrow", tab.url, rowclass, Date.now());
			 syncData(userid, "mailrow", tab.url, Date.now());
			
			});
			  }
			  
			});

			
			
			
			
			// Listen for tab content loads.
			tabs.on('ready', function(tab) {
			console.log(userid, 'Page Reloaded', Date.now());
			var ctimestamp = Date.now();
		 			if(checkUserLogin()&&tab.url.indexOf("https://mail.google.com/mail/") == 0){
					 gmailtabs[tabs.id+""]=Date.now();
					console.log(userid,'Inbox Loaded', Date.now());
			syncData1(userid, "Inbox", tab.url, 'Loaded', Date.now());
			worker = tab.attach({
			 contentScriptFile: self.data.url("content.js")
		  });
		  worker.port.on("keyPoints", function(keyPoints) {
			console.log(userid, "Key", tab.url, keyPoints, Date.now());
			syncData(userid, "Key", tab.url, keyPoints, Date.now());
			});
			worker.port.on("Mouse", function(mouse) {
			if(tab.url.indexOf("?compose=new") > -1){
			console.log(userid, "Compose Mail started",Date.now());
			 syncData1(userid, "Compose Mail", tab.url, "started", Date.now());
			}
			else{
			console.log(userid, tab.url,"not a Compose Mail started",mouse,Date.now());
			}
			});
			worker.port.on("Selected", function(selected) {
			console.log(userid, "Selected", tab.url, selected, Date.now());
			 syncData(userid, "Selected", tab.url, selected, Date.now());
			
			});
			worker.port.on("Input", function(input) {
			console.log(userid, "Input", tab.url, input, Date.now());
			 syncData(userid, "Input", tab.url, input, Date.now());
			
			});
			 worker.port.on("Tab", function(status) {
			console.log(userid, "Tab", tab.url, status, Date.now());
			syncData(userid, "Tab", tab.url, status, Date.now());
			
			});
			worker.port.on("Window", function(status) {
			console.log(userid, "Window", tab.url, status, Date.now());
			syncData(userid, "Window", tab.url, status, Date.now());
			
			});
			worker.port.on("mailrow", function(st_time,end_time,timerecieved,sender,subject_content) {
			console.log(userid,st_time,end_time, timerecieved,sender,subject_content,"Read");
			 syncData(userid, "mailrow", tab.url, Date.now());
			
			});
			}  
		  
			});
			
			
			
			
			
			
			tabs.on('activate', function (tab) {
			var ctimestamp = Date.now();
			if(checkUserLogin()&&tab.url.indexOf("https://mail.google.com/mail/") == 0){
			console.log(userid,'Inbox Selected' + tabs.activeTab.url,ctimestamp);
			syncData1(userid,'Inbox',tab.url,'Selected', Date.now());
			worker = tab.attach({
			contentScriptFile: self.data.url("content.js")
			
		 });
		 worker.port.on("keyPoints", function(keyPoints) {
			console.log(userid, "Key", tab.url, keyPoints, Date.now());
			syncData(userid, "Key", tab.url, keyPoints, Date.now());
			});
			worker.port.on("Mouse", function(mouse) {
			if(tab.url.indexOf("?compose=new") > -1){
			console.log(userid, "Compose Mail started",Date.now());
			 syncData1(userid, "Compose Mail", tab.url, "started", Date.now());
			 }
			else{
			console.log(userid, tab.url,"not a Compose Mail started",mouse,Date.now());
			}
			});
			worker.port.on("Selected", function(selected) {
			console.log(userid, "Selected", tab.url, selected, Date.now());
			 syncData(userid, "Selected", tab.url, selected, Date.now());
			
			});
			worker.port.on("Input", function(input) {
			console.log(userid, "Input", tab.url, input, Date.now());
			 syncData(userid, "Input", tab.url, input, Date.now());
			
			});
			 worker.port.on("Tab", function(status) {
			console.log(userid, "Tab", tab.url, status, Date.now());
			syncData(userid, "Tab", tab.url, status, Date.now());
			
			});
			worker.port.on("Window", function(status) {
			console.log(userid, "Window", tab.url, status, Date.now());
			syncData(userid, "Window", tab.url, status, Date.now());
			worker.port.on("mailrow", function(timerecieved,sender,subject_content) {
			
			console.log(userid, st_time,end_time,timerecieved,sender,subject_content,Read);
			 syncData(userid,st_time,end_time, "mailrow", tab.url,Date.now());
			
			});
			});
			}
			
		
		   //worker.port.emit("alert", "Message from the add-on");
			});
			
			
			
			
			
			// Listen for tab close.
			tabs.on('close', function(tab) {
			var ctimestamp = Date.now();
			if(checkUserLogin()&&tab.url.indexOf("https://mail.google.com/mail/") == 0){
			
			console.log(userid,'Inbox Closed', Date.now());
			console.log(userid,"Time spent",ctimestamp-gmailtabs[tabs.id+""]+" milliseconds")
			syncData1(userid, "Inbox", tab.url, 'Closed', Date.now());
			}});
			var button = ToggleButton({
			  id: "my-button",
			  label: "Activity Monitoring",
			  icon:  "./button.png",
			  onChange: handleChange
			});

			
			var panel = panels.Panel({
			  contentURL: self.data.url("panel.html"),
			   contentScriptFile: self.data.url("contentscriptemail.js"),
			  onHide: handleHide
			});

			panel.port.on("useriduniqueforactivitymonitoring", function(uid) {
			console.log("userid "+uid);
			userid = uid;
			});

			function handleChange(state) {
			  if (state.checked) {
			  panel.port.emit('reload', "reload");
				disabled: false;
				panel.show({
				position: button
				});
			  }
			  else{
			  disabled: false;
			  }
			}

			function handleHide() {
			  button.state('window', {checked: false});
			}
			var notifications = require("sdk/notifications");
			var self = require("sdk/self");
			var myIconURL = self.data.url("./button.png");
			
			function checkUserLogin() {
			if(userid==null){
			//alert("Please login to Activity monitoring Extension");
//userid="akhilesh";
		notifications.notify({
		text: "Please login to Email monitoring Extension",
		iconURL: myIconURL
			});
			return false;
			}
			
			 return true;
			}
			
		
	function syncData(emailid, eventtype, urllink, datas, ts){
	 console.log("Data to server");
	}
  
	var {Cu, Cc, Ci} = require('chrome'); //addon-sdk way
//var {Cu: utils, Cc: classes, Ci: instances} = Components; //non addon-sdk
Cu.import('resource://gre/modules/Services.jsm');
   function syncData1(emailid, eventtype, urllink, datas, ts){
      
	   var {Cc, Ci} = require('chrome');
var http = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
        createInstance(Ci.nsIXMLHttpRequest);
		var url = "https://autocode.pythonanywhere.com/EmailCogAutoLog/gmail/syncmozdata";
      
       var params = "emailid="+emailid+"&eventtype="+eventtype+"&urllink="+urllink+"&datas="+datas+"&ts="+ts;
       
       http.open("POST", url, true);

       //Send the proper header information along with the request
       http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       //http.setRequestHeader("Content-length", params.length);
       http.setRequestHeader("Connection", "close");

       http.onreadystatechange = function() {//Call a function when the state changes.
               if(http.readyState == 4 && http.status == 200) {
                     
                       console.log("Send Data to server: "+http.status+"| "+http.responseText);
               }
       }
       http.send(params);
}

	