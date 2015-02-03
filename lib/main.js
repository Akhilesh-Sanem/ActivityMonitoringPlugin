			var { ToggleButton } = require('sdk/ui/button/toggle');
			var panels = require("sdk/panel");
			var self = require("sdk/self");
			var tabs = require('sdk/tabs');
			// Listen for tab openings.
			tabs.on('open', function onOpen(tab) {
			var ctimestamp = Date.now();
			var datestamp = new Date(ctimestamp).toUTCString();
			  console.log('Newtab',ctimestamp);
			console.log('start');
			  worker = tab.attach({
			 contentScriptFile: self.data.url("content.js")
		  });
		  console.log('end');

			});

			// Listen for tab content loads.
			tabs.on('ready', function(tab) {
			var ctimestamp = Date.now();
			var datestamp = new Date(ctimestamp).toUTCString();
			  console.log('Tab_loaded',tab.url,ctimestamp);
			  worker = tab.attach({
			 contentScriptFile: self.data.url("content.js")
		  });
		  
			});
			tabs.on('activate', function (tab) {
			var ctimestamp = Date.now();
			var datestamp = new Date(ctimestamp).toUTCString();
			console.log('active: ' + tabs.activeTab.url,ctimestamp);

			console.log('start');
		   
			worker = tab.attach({
			contentScriptFile: self.data.url("content.js")
			
		 });
		 console.log('end');

		   //worker.port.emit("alert", "Message from the add-on");
			});
			// Listen for tab close.
			tabs.on('close', function(tab) {
			var ctimestamp = Date.now();
			var datestamp = new Date(ctimestamp).toUTCString();
			  console.log('Tab_closed',tab.url,ctimestamp);
			});
			var button = ToggleButton({
			  id: "my-button",
			  label: "my button",
			  icon:  "./button.png",
			  onChange: handleChange
			});

			var panel = panels.Panel({
			  contentURL: self.data.url("panel.html"),
			  onHide: handleHide
			});

			function handleChange(state) {
			  if (state.checked) {

				panel.show({
				position: button
				});
			  }
			}

			function handleHide() {
			  button.state('window', {checked: false});
			}
			