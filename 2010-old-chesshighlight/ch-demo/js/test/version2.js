
Event.observe(window, "load", function() {
	
	alert('We gonna test it !');
	
	console.log(Camps);
	console.log(RefAlgebr);	
	console.log(Clefs);	
	
	var props = [];
	for(p in this) {
		props.push(p);
	}
	// console.log(props);
	//console.log(this);
	
	var position = new Position();
	console.log(position);
	
	// console.log();
	
});
