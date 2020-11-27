
Event.observe(window, "load", function() {

	// alert('test/ldc');
	console.log('test/ldc');
	

	
	var div = document.createElement("div");
	div.innerHTML = '<form style="background-color : navy;">'
		+ '<input id="ldc-entree" type="text">'
		+ '<input id="ldc-submit" type="button" value="ok">'
		+ '<br />'
		+ '<textarea id="ldc-sortie" rows="10" cols="40"></textarea>'
		+ '</form>';
		
	//document.body.appendChild(div);
	$("cardbox-item-ldc").appendChild(div);
	
	var ldc = new LDC();
	ldc.setEntree('ldc-entree');
	ldc.setSortie('ldc-sortie');
	ldc.setButton('ldc-submit');
	
	ldc.install();
	
/*	
	ldc.set('echo', function(args) {
		// console.log('cmd echo');
		// console.log(this);
		return args.join(' - ');
	});
*/
	
});
