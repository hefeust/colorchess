
Event.observe(window, "load", function() {
	
	//alert('We gonna test it !');
	console.log('We gonna test it !');
	
	//console.log(Camps);
	//console.log(RefAlgebr);	
	//console.log(Clefs);	
	
	var props = [];
	for(p in this) {
		props.push(p);
	}
	// console.log(props);
	//console.log(this);
	
	var LigneDeCommande;
	
	var e0 = new Echiquier('plateau');
	console.log(e0);
	this.e = e0;
	
	var props = [];
	for(p in e0) {
		props.push(p);
	}
	console.log(props);	
	
	e.setConteneur( $('plateau') );
	
	e0.construire(PointsDeVue["Sud"]);
	console.log(e0);


	var p0 = new Partie();
	console.log(p0);
	
	var pos0 = new Position();
	pos0.demarrerStandard(); 
	console.log(pos0);

	// var p0 = new Partie();
	var p0 = new Partie(pos0, Camps.Blancs);
	console.log(p0);
	
	p0.reset();
	console.log(p0);

	e0.attacher(p0);
	console.log(e0);

	
	//  e0.parametrer(PointsDeVue["Sud"], e0.ModelesCouleurs, true);
	// ModelesCouleurs
	var methode = 'tOus';
	e0.parametrer(ModelesCouleurs.STANDARD, methode, true);
	console.log(e0);
	
	e0.dessiner();
	console.log(e0);
	
});

