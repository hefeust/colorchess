

Object.extend(Echiquier.prototype, {     
  
  dessiner : function()
  {
    
    var td = new Temps();
    td.init();
    if(this.progression < 2) 
    {

      console.log('dessin impossible : paramètres manquants');
      return false;
    }

    var P = this.partie;
    console.log('PROGRESSION : ' + this.progression);
    // affichage des coordonnées du coup suivant :
/*
      $('tab-partie').innerHTML = 'Partie &nbsp;<b>' 
                                + P.obtenirNumeroCoup(P.numMouvementCourant) + '&nbsp;' 
                                + P.obtenirCampQALT () + '</b>';
*/
    if(P.numMouvementCourant > 0) {
      console.log('DESSINER : ' + P.numeroCoup + ' ' + P.campQuiALeTrait);
      this.position = P._mouvements[P.numMouvementCourant].position;    
    } else if(P.numDernierMouvement == 0) {
      console.log('DESSINER : POSITION INITIALE');
      this.position = P._mouvements[P.numMouvementCourant].position;    
    } else {
      console.log('ECHIQUIER : IMPOSSIBLE DE DESSINER');    
    }

    if(this.progression == Echiquier.EST_PARAMETRE) { 
		console.log('RAFFRAICHIR TOUT');
		this.position.raffrachirTout();
	}

    var numCarresDessines = 0;
    var tab = [];

    //
    for(ref in this._carres)
    {
      try {
         if(this._carres[ref].dessiner()) 
         {
           numCarresDessines++;

         }
      } catch(e) {  

       console.log('ERREUR - dans ' + ref + ' - ' + e.message); 
       console.log(e);
      }
    }    
    
    //console.log('DESSINER : ' + numCarresDessines + ' carrées');
    td.pointer('temps ');
    //Temps.tracer();

/*
    if(/MSIE/.test(navigator.userAgent))  
    {  
      console.log('IE patch'  );
      $('plateau_table').refresh();
    }
*/  

		console.log('e.dessiner : ' + numCarresDessines + ' carrés ' + ' (' + td.dernier() +'s)' );

  } // dessiner

});  // Echiquier.prototype EXTEND parametrer, dessiner

Object.extend(Carre.prototype, { 

	 
    dessiner : function () { 
        var position = this.echiquier.position;
        var ref = this.ref;

        // with (position._places[ref] )  // ne dessiner que les cases qui en ont besoin //
        var place = position._places[ref];
        if ( place.estARaffraichir) 
        {
            place.estARaffraichir = false;   			  
        } else {
            $(ref).removeClassName('raffraichissement');
            return false;
        }
          

        if(ref == 'b4') { 
			console.log('Dessine ' + ref  );
			console.log(this);
		}
        //LigneDeCommande.afficher("DESSINER : " + ref);
        //console.log("DESSINER CASE : " + ref);
        
        var cup = $(ref + 'UP');
        var cdown = $(ref + 'DOWN');
        var cimg = $(ref + 'IMG');
        var ccase =  $(ref + 'CASE');
        
        switch(this.type) { 
            case 'DansPlateau' :
                cup.addClassName('CaseUp'); 
                cimg.addClassName('CaseImg'); 
                cdown.addClassName('CaseDown');
                ccase.addClassName('CaseDiv');
                
                //if(this.afficheCPressions) { 
                    cup.removeClassName('Invisible'); 
                    cdown.removeClassName('Invisible');             					
                /*
                } else {
                    cup.addClassName('Invisible'); 
                    cdown.addClassName('Invisible'); 
                }
                */
                
                var place = position._places[ref];
                
                // with (position._places[ref] ) { // ne dessiner que les cases qui en ont besoin //
                    //  estARaffraichir = false;
                    // suite 
                    $(ref).className = ""; 
                    $(ref).addClassName('raffraichissement');
                    $(ref).addClassName('Case');                 
                    var piece = place.piece;
                    var img = piece ? piece.camp.Sprites[piece.nom] : 'vide.png'; 
                    
					cimg.innerHTML = '<img src="./pieces/' + img + '" width="45" height="45">';

                    $(ref).addClassName('SocleNeutre');
                    // coloration de la case et marqueurs de pression 
                    
                    var pressions = place.compterPressions();
                    console.log(pressions);
                    
                    //with() { 
                        cup.innerHTML = pressions.Blancs;
                        cdown.innerHTML = pressions.Noirs; 
                        var pb = pressions.Blancs; 
                        var pn  = pressions.Noirs;
                        // switch(this.methodeColoration) { 
						// console.log(this.methode);
						switch(this.echiquier.methode) { 
                            case "tOus"    : // on affiche tout 
                            break; 
                            case "Blancs"   : pn = 0; 
                            break;
                            case "Noirs"    : pb = 0; 
                            break; 
                            case "Konflits" : 
                              pb = (pb * pn) ? pb : 0; 
                              pn = (pb * pn) ? pn : 0;
                              //if(this.ModeleCouleurs == ModelesCouleurs.OBNK_BASIQUE) pb = pn = Math.floor((pn+pn)/2); 
                              if(this.modele == ModelesCouleurs.OBNK_BASIQUE) 
								pb = pn = Math.floor( ( pn + pn ) / 2 ); 
                            break; 
                        }
                           //normalisation entre 0 et 3
                        pb = pb < 3 ? pb : 3;
                        pn = pn < 3 ? pn : 3;
                         var index = Clefs.generer(pb, pn);
                        //switch(this.ModeleCouleurs) { 
						switch(this.echiquier.modele) { 
                            case ModelesCouleurs.STANDARD : 
                                // $(ref).removeAttribute('style');    
                                $(ref).addClassName(this.couleur); 
                            break;
                            case ModelesCouleurs.OBNK_BASIQUE : 
                            case ModelesCouleurs.OBNK_CONTRASTE : 
                            case ModelesCouleurs.OBNK_GRADIENT : 
								// $(ref).style.backgroundColor = this.ModeleCouleurs[index]; 
								console.log("case " + ref);
								
								// $(ref).style.backgroundColor = this.modele[index]; 
								var color = this.echiquier.modele[index];
								console.log( ref + " " + ('color:' +  color) + " " + 'index:' + index);
								$(ref).style.backgroundColor = color; 
                            
								
                            break;
                            default : console.log('rien de trouvé - pas de concordance sur les modeles de couleur'); break;
                         }
                        

                    // }
                // } 
            break;
            case 'BordureR' : 
            $(ref).addClassName('raffraichissement');
            
                $(ref).innerHTML = RefAlgebr.r(ref);
                switch(this.PointDeVue.nom) { 
                // points de vue joueurs 
                    case 'Nord'  :
                    case 'Sud'   : 
                        $(ref).addClassName('BordV');
                    break;
                    // points de vue spectateurs 
                    case 'Est'   : 
                    case 'Ouest' :
                        $(ref).addClassName('BordH');
                    break;
                } 
            break;
            case 'BordureC' : 
            $(ref).addClassName('raffraichissement');
            
            $(ref).innerHTML = RefAlgebr.c(ref);
                switch(this.PointDeVue.nom) { 
                // points de vue joueurs 
                    case 'Nord' : 
                    case 'Sud'  : 
                        $(ref).addClassName('BordH');
                    break;
                // points de vue spectateurs
                    case 'Est'   : 
                    case 'Ouest' : 
                        $(ref).addClassName('BordV');
                    break;
                }
            break;
            case 'Coin' : 
            $(ref).addClassName('raffraichissement');
            
                  $(ref).innerHTML = "&nbsp;";
                $(ref).addClassName('Coin');
            break;
        }
      //LigneDeCommande.afficher('Case.dessiner ' + ref + ' : ' + ' classes : ' + $(ref).classNames() + ' style : ' + $(ref).getAttribute('style'));
      return true;
  } // dessiner Case
  
}); // Case.prototype.extend(dessiner)

// ***** GESTION DES DEPLACELENTS *****    

Object.extend(Echiquier.prototype, {

    clickCase : function(ref) {
      var onJoueMaintenant = true;
      var P = this.partie;
      // mouvement courant ? (mc)
      var dm = P._mouvements[P.numDernierMouvement];
      var piece = dm.position._places[ref].piece;

      console.log('CLICK  - ' + ref + ' SélPrécédente : ' + this.refMemorisee);

      if(this.refMemorisee) {
        if(this.refMemorisee == ref) {
          // deux fois au même endroit : j'adoube !
          $(ref).toggleClassName("selection");   
          this.refMemorisee = undefined; 
          return;
        } else if(RefAlgebr.dansPlateau(ref) && onJoueMaintenant) {
          
          //  console.log('numCOUP : ' + P.numeroCoup + 'campQALT : ' + P.campQuiALeTrait);
          var pieceAJouer = dm.position._places[this.refMemorisee].piece;
          
          if(pieceAJouer) {
            P.jouer(this.refMemorisee, ref);
            // e.dessiner();
            this.dessiner();
          } else {
            alert('pas de pièce à jouer en : ' + this.refMemorisee);
          }

          $(this.refMemorisee).removeClassName("selection");
          this.refMemorisee = undefined;
        }
      } else  {
        if(piece && piece.camp != P.campQuiALeTrait)
          alert('Impossible de jouer cette pièce à ce tour !')
        else {
          this.refMemorisee = ref;
          $(ref).toggleClassName("selection");   
        }
      }
    } // Echiquier.prototype.click
}); 

