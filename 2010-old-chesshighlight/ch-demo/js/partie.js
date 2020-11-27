
//function Boite() {};

// cette classe sert juste à stocker les résultats d'un deplacement
function DeplacementResultat() {
  this.pieceActrice = undefined;
  this.refActOrig = "";
  this.refActDest = "";
  this.pieceSpectatrice = undefined;
  this.refSpectOrig = "";
  this.refSpectDest = "";
  this.type = DeplacementResultat.Types.NORMAL;
};

Object.extend(DeplacementResultat, {
  Types : {
      INDEFINI : "Indéfini",
      NORMAL  : "Déplacemeent",
      PRISE : "Prise",
      GRAND_ROQUE : "Grand Roque",
      PETIT_ROQUE : "Petit Roque",
      INTERDIT : "Déplacement interdit !"      
  }
});

Object.extend(DeplacementResultat, {
  toString : function () {
    var pAct = this.pieceActrice + ' (' +  this.refActOrig + '-' +   this.refActDest + ')';
    return 'Déplacement : ' + pAct + ' ' + this.type;
  }
});

Object.extend(Piece.prototype, {
  deplacer : function(refDestination) {
    var depl = new DeplacementResultat();
    depl.type = DeplacementResultat.Types.NORMAL;
    var place = this.place; 
    var position = place.position; 
    var refOrig = place.ref;
    var I = position._influences.obtenir(refOrig, refDestination);
    if(I && I.estDeplacement) {      
      if(I.estPrise)  {
        var pieceCapturee = position.soulever(refDestination);
        position.capturer(pieceCapturee);
        
        depl.pieceSpectatrice = pieceCapturee;
        depl.refSpectOrig = refDestination;
        depl.refSpectDest = "Prises";
        depl.type = DeplacementResultat.Types.CAPTURE;
      }
      var piece = position.soulever(refOrig);
      position.poser(refDestination, piece);
      
      depl.pieceActrice = piece;
      depl.refActOrig = refOrig;
      depl.refActDest = refDestination;
    } else {
      depl.type = DeplacementResultat.Types.INTERDIT;
    }    
    return depl;
  }
});

function Mouvement(position, camp) {
	// throw new TypeError('aaaaaaa');
  this.posPrecedente = position;
  this.position = position.dupliquer();
  //console.log("NEW m : " + (this.posPrecedente ? 'POSITION Pre' : undefined));
  this.camp = camp;
  this.deplacementResultat = undefined;
  this.estLegal = true;

}

Object.extend(Mouvement.prototype, {

  effectuer : function (refOrigine, refDestination) {
    // console.log("m.effectuer : " + (this.camp ? this.camp : undefined));
    // this.position = this.posPrecedente.dupliquer();
    this.deplacementResultat = this.position._places[refOrigine].piece.deplacer(refDestination);    
    //console.log(this.posPrecedente._influences);
    //console.log(this.position._influences);
    if(this.deplacementResultat.type != DeplacementResultat.Types.INTERDIT) {
      this.estValide = true;
    } else {
      this.estValide = false;
    }
  },
  tester : function() {
   // renvoie vrai ou faux selon que le coup est légal ou non
  }

});

function Partie(positionInitiale, campQuiALeTrait) {
  this._mouvements = [];
  this.positionInitiale = positionInitiale;
  this.campInitial = campQuiALeTrait;
  this.campQuiALeTrait = campQuiALeTrait;
}

Object.extend(Partie.prototype, {
  
  reset : function() { 
	  console.log(this); 
	  console.log(this.positionInitiale);  
	  console.log(this.campInitial);  	  
    var m = new Mouvement(this.positionInitiale, this.campInitial); 
    m.position.raffraichirTout();
    this._mouvements = [m];
    this.numMouvementCourant = 0;
    this.numDernierMouvement = 0;
    this.numeroCoup = 1;
    
  },
  jouer : function(refOrigine, refDestination) {

    var posPrecedente = this._mouvements[this.numDernierMouvement].position;
    
    var m = new Mouvement(posPrecedente, this.campQuiALeTrait);
    m.effectuer(refOrigine, refDestination);
    if(m.estValide) {
      this._mouvements.push(m);        
      this.numDernierMouvement++;
      this.numMouvementCourant++;    
      this.campQuiALeTrait = Camps.adversaire(this.campQuiALeTrait);    
      if(this.campQuiALeTrait == Camps.Blancs) this.numeroCoup++;    
      console.log('JOUER FIN : ' + this.numeroCoup + ' ' + this.campQuiALeTrait + '(' + this.numDernierMouvement + ')');    
    } else {
      console.log('Mouvement invalide !');
      alert('Impossible de jouer le mouvement : ' + refOrigine + '-' + refDestination);
    }
  },

  annuler : function() {
    // this.campQuiALeTrait = Camps.adversaire(this.campQuiALeTrait);    
    // if(this.campQuiALeTrait == Camps.Blancs) this.numeroCoup++;    
    console.log('ANNULER : ' + this.numeroCoup + ' ' + this.campQuiALeTrait + '(' + this.numDernierMouvement + ')');    
    if(this.numMouvementCourant > 0)
    {
      this._mouvements.pop();
      this.numDernierMouvement--;
      this.numMouvementCourant--;    
      this.campQuiALeTrait = Camps.adversaire(this.campQuiALeTrait);    
    if(this.campQuiALeTrait == Camps.Noirs) this.numeroCoup--;    
    } else {
      alert('Impossible de revenir en arrière ! Vous êtes au coup initial.');
    }
  },

  toString : function () {
    var stats =  "PARTIE : " + "N° Pos : " + this.numDernierePosition + 
      " Camp : " + this.campQuiALeTrait + ' nb mouvements : ' + this._mouvements.length;
    return stats + '\n\n' + this._mouvements[this.numDernierMouvement].position + '\n\n';
  },

  obtenirNumeroCoup : function(numMouvement) {
    return numMouvement % 2 ? (numMouvement + 1) / 2 : (numMouvement / 2) + 1;
  },

  obtenirCampQALT : function() {
     return this.campQuiALeTrait;
  },

  obtenirMouvement : function(numMouvement) {
    return this._mouvements[numMouvement];
  },

  obtenirCoup : function (numero, camp) {
    if(numero == 0) 
      return this._mouvements[0];
    var base = 2 * (numero - 1);
    var offset;
    //console.log('OBTENIR : ' + this.campInitial);
    if(this.campInitial == Camps.Blancs) {
      if(this.campQuiALeTrait == Camps.Blancs) offset = 1;  
      if(this.campQuiALeTrait == Camps.Noirs) offset = 2;  
    }
    if(this.campInitial == Camps.Noirs) {
      if(this.campQuiALeTrait == Camps.Blancs) offset = 0;  
      if(this.campQuiALeTrait == Camps.Noirs) offset = 1;
    }
    //console.log('obtenirCoup : ' + base + ' + ' + offset);
    //console.log(this  );
    return this._mouvements[base + offset];
  },

});




