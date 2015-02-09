			var { ToggleButton } = require('sdk/ui/button/toggle');
			var panels = require("sdk/panel");
			var self = require("sdk/self");
			var tabs = require('sdk/tabs');
			//var tabs1 = require("sdk/tabs");
			var userid = null;
			//tabs1.open("https://autocode.pythonanywhere.com/Googleplus/default/index");
			//localStorage.setItem('useriduniqueforactivitymonitoring', "novalue");
		
			// Listen for tab openings.

			tabs.on('open', function onOpen(tab) {
			var ctimestamp = Date.now();
			if(checkUserLogin()){
			  console.log(userid, "Tab", tab.url, 'Created', Date.now());
			  syncData(userid, "Tab", tab.url, 'Created', Date.now());
			  worker = tab.attach({
			 contentScriptFile: self.data.url("content.js")
		  });
		  worker.port.on("keyPoints", function(keyPoints) {
			console.log(userid, "Key", tab.url, keyPoints, Date.now());
			syncData(userid, "Key", tab.url, keyPoints, Date.now());
			
			});
			worker.port.on("Mouse", function(mouse) {
			console.log(userid, "Mouse", tab.url, mouse, Date.now());
			 syncData(userid, "Mouse", tab.url, mouse, Date.now());
			
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
			  }
			  
			});

			// Listen for tab content loads.
			tabs.on('ready', function(tab) {
			var ctimestamp = Date.now();
		   if(checkUserLogin()){
			console.log(userid, "Tab", tab.url, 'Loaded', Date.now());
			syncData(userid, "Tab", tab.url, 'Loaded', Date.now());
			worker = tab.attach({
			 contentScriptFile: self.data.url("content.js")
		  });
		  worker.port.on("keyPoints", function(keyPoints) {
			console.log(userid, "Key", tab.url, keyPoints, Date.now());
			syncData(userid, "Key", tab.url, keyPoints, Date.now());
			});
			worker.port.on("Mouse", function(mouse) {
			console.log(userid, "Mouse", tab.url, mouse, Date.now());
			 syncData(userid, "Mouse", tab.url, mouse, Date.now());
			
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
			}  
		  
			});
			tabs.on('activate', function (tab) {
			var ctimestamp = Date.now();
			if(checkUserLogin()){
			console.log(userid,'active: ' + tabs.activeTab.url,ctimestamp);
			syncData(userid, "Tab", tab.url, 'Switched', Date.now());
			worker = tab.attach({
			contentScriptFile: self.data.url("content.js")
			
		 });
		 worker.port.on("keyPoints", function(keyPoints) {
			console.log(userid, "Key", tab.url, keyPoints, Date.now());
			syncData(userid, "Key", tab.url, keyPoints, Date.now());
			});
			worker.port.on("Mouse", function(mouse) {
			console.log(userid, "Mouse", tab.url, mouse, Date.now());
			 syncData(userid, "Mouse", tab.url, mouse, Date.now());
			
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
			}
			
		
		   //worker.port.emit("alert", "Message from the add-on");
			});
			// Listen for tab close.
			tabs.on('close', function(tab) {
			var ctimestamp = Date.now();
		if(checkUserLogin()){
			console.log(userid, "Tab", tab.url, 'Closed', Date.now());
			syncData(userid, "Tab", tab.url, 'Closed', Date.now());
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
		text: "Please login to Activity monitoring Extension",
		iconURL: myIconURL
			});
			return false;
			}
			
			 return true;
			}
			
		
	
  
	var {Cu, Cc, Ci} = require('chrome'); //addon-sdk way
//var {Cu: utils, Cc: classes, Ci: instances} = Components; //non addon-sdk
Cu.import('resource://gre/modules/Services.jsm');
   function syncData(emailid, eventtype, urllink, datas, ts){
      
	   var {Cc, Ci} = require('chrome');
var http = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
        createInstance(Ci.nsIXMLHttpRequest);
		var url = "https://autocode.pythonanywhere.com/BrowserMonitoring/webapi/syncmozdata";
      
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

	