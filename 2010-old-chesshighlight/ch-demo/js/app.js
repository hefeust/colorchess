
require([], function() {

	if(window.console == undefined) {
	
		window.console = ( function() {
			
			var output = document.createElement('div');
			document.body.appendChild(output);
			
			return {
				log : function(message) {
					output.innerHTML += '<code>' + message + '</code>' + '<br/>';
					return true;
				}
			}
		})();
	}
	
	console.log('app is running...');
	
});

