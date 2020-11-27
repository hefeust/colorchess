
function Carre(ref, echiquier) {
    this.ref = ref;
    this.echiquier = echiquier;
    this.couleur = RefAlgebr.couleur(ref);
}

Carre.prototype.setModele = function(modele) {
	this.modele = modele;
};

Carre.prototype.setMethode = function(methode) {
	this.methode = methode;
};

Carre.prototype.setCompteurs = function(actifs) {
	this.compteurs = actifs;
};


Object.extend(Carre.prototype,
{ 
  construire : function()
  {
    var ref = this.ref;
    this.estARaffraichir = true;   
    this.type = RefAlgebr.type(ref);
    var ref = this.ref;
    var echiquier = this.echiquier;
    if(RefAlgebr.dansPlateau(ref)) {

      // MONTAGE BRUT SANS PASSER PAR LE DOM + RAPIDE

      var divIMG  =  '<div id="' + ref + 'IMG"></div>';
      var divUP   =  '<div id="' + ref + 'UP"></div>';
      var divDOWN =  '<div id="' + ref + 'DOWN"></div>';       
      var divCASE =  '<div id="' + ref + 'CASE">'+ divUP + divIMG + divDOWN +'</div>';       
      $(ref).innerHTML = divCASE;
      $(ref).observe("click", function() { 
        echiquier.clickCase(ref);
      });

    }  
  } // construire
});



