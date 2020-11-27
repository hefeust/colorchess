
/*
function Echiquier(id) {
	this.id = id;
};
*/
function Echiquier (id) {  
  this.id = id;
  this._carres = {};
//  this.progression = Echiquier.EST_INIT;    
  this.progression = 0;    
  
  // this.setConteneur( $( id ) );
}

Echiquier.prototype.setConteneur = function(element) {
	console.log('setConteneur : ' + element);
	this.conteneur = element;
};

Echiquier.prototype.setPDV = function(pdv) {
	this.pdv = pdv;
};

Echiquier.prototype.setPartie = function(partie) {
	this.partie = partie;
};

Echiquier.prototype.setModele = function(modele) {
	this.modele = modele;
};

Echiquier.prototype.setMethode = function(methode) {
	this.methode = methode;
};

Echiquier.prototype.setCompteurs = function(actifs) {
	this.compteurs = actifs;
};

Object.extend(Echiquier, {
 
  EST_INIT : 0,
  EST_CONSTRUIT : 1,
  EST_ATTACHE : 2,
  EST_PARAMETRE : 3,
  EST_EN_COURS : 4,
  toString : function() { return "Echiquier (" + this.id + ")" + 'progression '  + this.progression; },

});

Object.extend(Echiquier.prototype, { 

    attacher : function(partie) {
      // this.partie = partie;
      this.setPartie(partie);
      
      this.progression = Echiquier.EST_ATTACHE;
    },

    parametrer : function(modele, methode, afficheCPressions) { 
        if(this.progression == Echiquier.EST_INIT) {
            // LigneDeCommande.afficher('paramétrage impossible : échiquier non construit dans l\'arbre DOM'); 
console.log( 'paramétrage impossible : échiquier non construit dans l\'arbre DOM'); 
            return false; 
        }
        if(this.progression == Echiquier.EST_CONSTRUIT) {
            // LigneDeCommande.afficher('paramétrage impossible : partie a rattacher avant !'); 
console.log( 'paramétrage impossible : partie a rattacher avant !' );
            
            return false; 
        }


        // LigneDeCommande.afficher('PARAMETRER : ' + modele + ' ' + methode + ' '+afficheCPressions);
        console.log( 'PARAMETRER : ' + modele + ' ' + methode + ' '+afficheCPressions);

		this.setModele(modele);
        // this.ModeleCouleurs = modele; 

		this.setCompteurs(afficheCPressions);
        // this.afficheCPressions = afficheCPressions; 

		this.setMethode(methode);
        // this.methodeColoration = methode;

        // Carre.prototype.ModeleCouleurs = modele; 
        // Carre.prototype.afficheCPressions = afficheCPressions; 
        // Carre.prototype.methodeColoration = methode;

        // LigneDeCommande.afficher('Echiquier > Paramétrage : OK');
        console.log( 'Echiquier > Paramétrage : OK' );
        this.progression = Echiquier.EST_PARAMETRE; 
        
        // var P = e.partie;
        // var P = this.partie;
        // P._mouvements[P.numMouvementCourant].position.raffraichirTout();
    }

});

// ***** MONTAG DE L ARBRE DOM *****

Object.extend(Echiquier.prototype,
{

  construire : function(PDV)
  {
    this.PointDeVue = PDV;
    this.setPDV(PDV);
    
    Carre.prototype.PointDeVue = PDV;
	var carre;
    
    console.log('echiquier#construire');
    
    // LigneDeCommande.afficher('CONSTRUIRE');

    // $(this.conteneur).innerHTML = '';
    this.conteneur.innerHTML = '';

    var tr_refs = RefAlgebr[PDV.tr];
    var td_refs = RefAlgebr[PDV.td];
    
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);



    for(tr_index=0; tr_index < tr_refs.length; tr_index++)
    {
      // définir ref eb fonction des tr, td et pdv courants
      var tr = document.createElement('tr');
      for(td_index=0; td_index < td_refs.length; td_index++)
      {
        tbody.appendChild(tr);     
        var td = document.createElement('td');        
        switch(PDV.nom)
        {
          // les références des cases doivent être toujours écries sous la forme "a1" ..  "h8"
          // quelque soit le point de vue adopté 
          // - donc le sens de parcours et de construction de la table
          case 'Nord'  : 
          case 'Sud'   :
            var ref = td_refs.charAt(td_index) + tr_refs.charAt(tr_index);  
          break;
          case 'Est'   :
          case 'Ouest' :
            var ref = tr_refs.charAt(tr_index) + td_refs.charAt(td_index);
          break;
          default : 
            var ref="00";
          break;
        }
        tr.appendChild(td);             
        
        td.setAttribute('id', ref);
        
        //this._carres[ref] = new Carre(ref, this);
        carre = new Carre(ref, this);
        carre.setModele(this.modele);
        carre.setMethode(this.methode);
        carre.setCompteurs(this.compteurs);
        this._carres[ref] = carre;
      } // for td
    } // for tr
    
    // $('plateau').appendChild(table);    
    //$(this.conteneur).appendChild(table);    
    this.conteneur.appendChild(table);    

    //Temps.pointer('Cases créées');

    //LigneDeCommande.afficher('Table montée OK');
    // logProps(this._carres);
    for(ref in this._carres) 
      this._carres[ref].construire();
      
    //Temps.pointer('Cases montées');  
            
    // LigneDeCommande.afficher('Echiquier > Construction : OK');
    this.progression = 1;
  }
});



