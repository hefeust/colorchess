


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


Event.observe(window, "load", function() {

  /* Command Line Interface  */
	// ligne de commande
	var ldc = new LDC();
	
	ldc.setEntree('ldc-in');
	ldc.setSortie('ldc-out');
	ldc.setButton('ldc-button');
	
	ldc.install();
	
	ldc.set('test', function(args) { 
		return 'test ok';
	});

  /* Chess board */
	// echiquier
	var echiquier = new Echiquier('plateau');
	echiquier.setConteneur( $('plateau') );

	ldc.set('echiquier', function(args) {
		return echiquier;
	});

    // var positionDepart = (new Position()).demarrerStandard();
    var position = new Position();
    var positionDepart = position.demarrerStandard();
    // var positionDepart = Position.demarrerStandard();
    // console.log(positionDepart);
    var partie = new Partie(positionDepart, Camps.Blancs);
    partie.reset();
    
	ldc.set('partie', function(args) {
		return partie;
	});
	/*
	ldc.set('reset', function(args) {
		return partie.reset();
	});
	*/
	
    var modele = ModelesCouleurs['OBNK_GRADIENT'];
    var methode = 'tOus';
    var compteurs = false;

	var pdv = PointsDeVue["Sud"];
    echiquier.construire(pdv);
    
	ldc.set('pdv', function(args) {
		return pdv;
	});

    echiquier.attacher(partie);    

    echiquier.setModele(modele);
    echiquier.setMethode(methode);
    echiquier.setCompteurs(compteurs);
    echiquier.dessiner();

	// boutons de l'interface
	
	var pdvs = ["Nord", "Est", "Sud", "Ouest"];	
	pdvs.each( function(pdv, ipdv) {
		// alert(pdv);
		$(pdv + "-pdv").observe("click", function(event) {
			
      // console.log('selection pdv : ' + pdv);
			
			echiquier.construire(PointsDeVue[ pdv ]);
			echiquier.attacher(partie);    

			echiquier.setModele(modele);
			echiquier.setMethode(methode);
			echiquier.setCompteurs(compteurs);

			echiquier.position.raffraichirTout();

			echiquier.dessiner();
			
		});
	});
	
	$('afficher-cp').observe('click', function(event) {
		echiquier.setCompteurs( this.checked );
		echiquier.position.raffraichirTout();
		echiquier.dessiner();
	});
	$('afficher-cp').checked = false;
	

	
	
    
	
});







	
// window.onload = function() {
//	Event.observe(window, "load", function() {
	



/*
var PanelCtrl = (new function() 
{ 
  //Items : [],
  initialiser : function() 
  {
    // Onglets du panneau de controle
    var onglets = document.getElementsByClassName('tab');
    onglets.each(
        function(elm, index){
            var item = elm.id.split('-')[1];
            $('panel-'+ item).addClassName('Invisible');
            elm.observe( "click", function() { 
              onglets.each(              
                function(elm_2, index_2){
                  var itemAMasquer = elm_2.id.split('-')[1];
                  // console.log(itemAMasquer);
                  $('panel-' + itemAMasquer).addClassName('Invisible');
                });  
                $('panel-' + item).removeClassName('Invisible');            
            });
        });
    $('panel-partie').removeClassName('Invisible');
     
    // ***** HISTORIQUE *****
    $('btInitJeu').observe('click', function() {
      e.partie.reset();
      e.dessiner();
    });
    
    
    $('btAnnuler').   observe('click', function() {
      e.partie.annuler();
      e.dessiner();
    });
    
    
    // ***** VISUALISATIO? *****
    
    
    
    // boutons de direction
    document.getElementsByClassName('ChoixPDV').each(
       function(elm, index){
           var pdv = PointsDeVue[elm.id.split('-')[1]];
           elm.observe( "click", function() {           
              e.construire(PointsDeVue[pdv]);
              e.attacher(e.partie);
              e.parametrer(e.ModeleCouleurs, e.methodeColoration, e.afficheCPressions);
              e.dessiner();   
       });
    });
    
    // affichage des compteurs de pression
    $('chkAfficherCompteursPressions').observe('click', function() {    
        e.parametrer(e.ModeleCouleurs, e.methodeColoration, this.checked);
        e.dessiner();
    });
    $('chkAfficherCompteursPressions').checked = false;
     
    $('selectModeleCouleurs').observe('change', function(){        
        var m = $('selectModeleCouleurs').options[$('selectModeleCouleurs').selectedIndex].value;
        e.parametrer(ModelesCouleurs[m], e.methodeColoration, e.afficheCPressions);
        e.dessiner();          
    });

    document.getElementsByClassName('rbMethode').each(
       function(elm, index){
           elm.observe( "click", function() {           
             var methode = $F(elm.id);
             LigneDeCommande.afficher('méthode d`affichage : ' + methode);
              e.parametrer(e.ModeleCouleurs, methode, e.afficheCPressions);
              e.dessiner();
              
       });
    });
    $('rbMethode-tOus').checked = true;
        
    // ***** Ligne de commande *****
    $('btLancer').observe('click', function() { LigneDeCommande.lancer(); });
    $('btEffacer').observe('click', function() { $('ResultatsLDC').value = ""   ; });
    
    $('ResultatsLDC').value = "";    
    
    
  }
})();


function logProps(obj)
{
  var tab = [];
  for(p in obj) 
  {
    var i = String(obj[p]).indexOf('(');
    var value = (i == -1) ? obj[p] : (obj[p].toString().substring(0, i)).split(' ')[0] + '()' ;
    tab.push(p + " : " + value);
  }
  console.log(tab.join(' '));
}

function echoProps(obj)
{
  LigneDeCommande.afficher('\nPROPRIETES');
  for(p in obj) 
  {
    //var tab = [];
    var i = String(obj[p]).indexOf('(');
    var value = (i == -1) ? obj[p] : (obj[p].toString().substring(0, i)).split(' ')[0] + '()' ;
    //tab.push(p + " : " + value);
    LigneDeCommande.afficher(p + " : " + value);
  }

  LigneDeCommande.afficher('\n\n');
}

*/


// });

// } // window.onload


