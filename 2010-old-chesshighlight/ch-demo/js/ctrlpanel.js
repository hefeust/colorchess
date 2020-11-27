	
// window.old_onload = function() {
	Event.observe(window, "load", function() {
	
	return true;
	
var e = new Echiquier('plateau');
e.setConteneur( $('plateau') );

/*
function LDCErreur(message) { 
  this.message = message; 
  this.toString = function() { return this.message; }
}
*/


function Temps() {
  this._t = 0;
  this.log = [];
}

Object.extend(Temps.prototype, {
  init : function() {
    this._log = [];    
    this._t = new Date().getTime();
  },
  pointer : function(evenement) {
    var _t2 = new Date().getTime();
    var dt = (_t2 - this._t) / 1000;
    this._log.push(evenement + ' : ' + dt);
    this._t = _t2;
  },
  tracer : function() {
    console.log(this._log.join('\n'));
  },
  dernier : function() {
    return this._log[this._log.length - 1];
  }
  
});

//window.onload = function()
//{ 
// var t = new Temps();
//    t.init();
    var positionDepart = new Position();
//    Temps.pointer('new Position');    
    positionDepart.demarrerStandard();
//    t.pointer('démarrer Standard');
    
    var P = new Partie(positionDepart, Camps.Blancs);
//    t.pointer('new Partie');
    P.reset();
//    Temps.pointer('reset Partie');

    // PanelCtrl.initialiser();
//    t.pointer('Panel CTRL init');

    var modele = ModelesCouleurs[$F('selectModeleCouleurs')];
    var afficheCPressions = ! ! $F('chkAfficherCompteursPressions');    // double not !
    var methode = '';    
    document.getElementsByClassName('rbMethode').each(
      function(elm, index){
        methode += $F(elm.id) ? $F(elm.id) : '';
    });

//    t.pointer('Panel 2');
    
    
    
    e.construire(PointsDeVue["Sud"]);

//    t.pointer('e.construire');

    e.attacher(P);    
    e.parametrer(modele, methode, afficheCPressions);
    e.dessiner();

});

// } // window.onload

