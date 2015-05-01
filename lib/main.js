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
			   
			  console.log(userid, 'Inbox Opened', Date.now());
			  console.log(userid,gmailtabs[tabs.id+""]);
			  //syncData1(userid, "Inbox", tab.url, 'Opened', Date.now());
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
			 syncData1(userid, gmailtabs[tabs.id+""],formatDate(new Date()),"", "", "", "Compose Mail Started");
			
			}
			else{
			console.log(userid, tab.url,"Mouse Click",mouse,Date.now());
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
			worker.port.on("mailRorF", function(action,date,checkmailsubject) {
			console.log(userid, "mailRorF", date,checkmailsubject,action);
			
			syncData1(userid, date,date,"","",checkmailsubject,action);
			
			});
			 worker.port.on("Window", function(status) {
			console.log(userid, "Window", tab.url, status, Date.now());
			syncData(userid, "Window", tab.url, status, Date.now());
			
			});
			
			worker.port.on("mailrow", function(st_time,end_time,timerecieved,sender,subject_content) {
			
			console.log(userid,st_time,end_time, timerecieved,sender,subject_content,"Read");
			//console.log("Subject :", document.getElementById("nh").value);
			
			//console.log(userid, "mailrow", tab.url, rowclass, Date.now());
			 syncData1(userid, st_time,end_time,timerecieved,sender,subject_content,"Read");
			
			});
			  }
			  
			});

			
			
			
			
			// Listen for tab content loads.
			tabs.on('ready', function(tab) {
			console.log(userid, 'Page Reloaded', Date.now());
			var ctimestamp = Date.now();
		 			if(checkUserLogin()&&tab.url.indexOf("https://mail.google.com/mail/") == 0){
					gmailtabs[tabs.id+""]=formatDate(new Date());
			   
					 //gmailtabs[tabs.id+""]=Date.now();
					console.log(userid,'Inbox Loaded', Date.now());
					syncData1(userid, gmailtabs[tabs.id+""],formatDate(new Date()),"", "", "", "Inbox Loaded");
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
			syncData1(userid, gmailtabs[tabs.id+""],formatDate(new Date()),"", "", "", "Compose Mail Started");
			}
			else{
			console.log(userid, tab.url,"Mouse Click",mouse,Date.now());
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
			worker.port.on("mailRorF", function(action,date,checkmailsubject) {
			console.log(userid, "mailRorF", date,checkmailsubject,action);
			
			syncData1(userid, date,date,"","",checkmailsubject,action);
			
			});
			worker.port.on("Window", function(status) {
			console.log(userid, "Window", tab.url, status, Date.now());
			syncData(userid, "Window", tab.url, status, Date.now());
			
			});
			worker.port.on("mailrow", function(st_time,end_time,timerecieved,sender,subject_content) {
			console.log(userid,st_time,end_time, timerecieved,sender,subject_content,"Read");
		    syncData1(userid, st_time,end_time,timerecieved,sender,subject_content,"Read");
			
			
			});
			}  
		  
			});
			
			
			
			
			
			
			tabs.on('activate', function (tab) {
			var ctimestamp = Date.now();
			if(checkUserLogin()&&tab.url.indexOf("https://mail.google.com/mail/") == 0){
			console.log(userid,'Inbox Selected' + tabs.activeTab.url,ctimestamp);
			syncData1(userid, formatDate(new Date()),formatDate(new Date()),"", "", "", "Inbox Selected");
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
			syncData1(userid, gmailtabs[tabs.id+""],formatDate(new Date()),"", "", "", "Compose Mail Started");
			 }
			else{
			console.log(userid, tab.url,"Mouse Click",mouse,Date.now());
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
			 worker.port.on("mailRorF", function(action,date,checkmailsubject) {
			console.log(userid, "mailRorF", date,checkmailsubject,action);
			
			syncData1(userid, date,date,"","",checkmailsubject,action);
			
			});
			worker.port.on("Window", function(status) {
			console.log(userid, "Window", tab.url, status, Date.now());
			syncData(userid, "Window", tab.url, status, Date.now());
			worker.port.on("mailrow", function(timerecieved,sender,subject_content) {
			
			console.log(userid, st_time,end_time,timerecieved,sender,subject_content,"Read");
			 syncData1(userid, st_time,end_time,timerecieved,sender,subject_content,"Read");
			
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
			syncData1(userid, formatDate(new Date()),formatDate(new Date()),"", "", "", "Inbox Closed");
		
		}});
			var button = ToggleButton({
			  id: "my-button",
			  label: "Email Monitoring",
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
   function syncData1(emailid, starttime,endtime,recievedtimestamp, sender, mail_content, events){
       emailid = "Tara-PC"
      
	   var {Cc, Ci} = require('chrome');
var http = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
        createInstance(Ci.nsIXMLHttpRequest);
		var url = "https://autocode.pythonanywhere.com/BrowserMonitoring/webapi/emailmozdata";
      
       var params = "emailid="+emailid+"&starttime="+starttime+"&endtime="+endtime+"&recievedtimestamp="+recievedtimestamp+"&sender="+sender+"&mail_content="+mail_content+"&events="+events;
       console.log("params :"+params);
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

	function formatDate(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
		month = month < 10 ? "0" + month : month
		 day = day < 10 ? "0" + day : day
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
		
		hour = hour < 10 ? "0" + hour : hour
        //hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
		second = second < 10 ? "0" + second : second
        morning = hour < 12 ? "am" : "pm";

    return  day+ "/" + month + "/" + year + " " + hour + ":" +
            minuteFormatted + ":" +second;
}