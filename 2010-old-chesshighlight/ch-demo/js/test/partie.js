
Event.observe(window, 'load', function() {

	console.log(Partie);
	console.log(Mouvement);
	console.log(DeplacementResultat);
	
	
	var pos0 = new Position();
	pos0.demarrerStandard(); 
	console.log(pos0);

	
	
	//var p0 = new Partie();
	var p0 = new Partie( pos0, Camps.Blancs);
	console.log(p0);
	
	p0.reset();
	console.log(p0);
});
