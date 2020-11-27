/**
 * CHESS HIGHLIGHT (2013 refactoring)
 *
 * 
 *
 */


/**

  this was the original prologue of this file,
  with a french writted poem on humanity future
  (optimistic)

*/

//
// CHESSHIGHLIGHT project - 2007 by Hefeust - www.eozine.fr
//
//  Quand les dirigeables reviendront
//  Tous les nids d'aigle de la Terre
//  Afghanistan, Sicile, l'Altiplano et le Bhutan
//  Deviendront des zones portuaires
//  Et retrouveront leur grandeur d'antan
//  Du temps des galions ou de la route de la soie
//  
//


/**
 * Color side definitions
 * - singleton object
 */

// objet singleton ancrée sur 1 variable
// ca évite de balader des tonnes de constantes globales
// var Camps = Class.create();

var Camps = 
{
  Blancs :
  {
    nom : "Blancs",
    RoseDesVents : { 
      H: { offsetC : 0, offsetR :+1 }, 
      B: { offsetC : 0, offsetR :-1 },
      D: { offsetC :+1, offsetR : 0 },
      G: { offsetC :-1, offsetR : 0 } 
    },
    estAdversaire : function(autreCamp)
      {
        if(autreCamp == this) return false ;  
        if(autreCamp == Camps.Noirs) return true;  
    },
    Roque : { 
      petit : {
        destinationRoi : "g1",
        positionTour : "h1",
        trajet : "f1"
      },
      grand : {
        destinationRoi : "c1",
        positionTour : "a1",
        trajet : "d1"
      }
    },
    Sprites : {
      Pion : "pion_blanc.png",
      Tour : "tour_blanche.png",
      Cavalier : "cavalier_blanc.png",
      Fou  : "fou_blanc.png",
      Dame : "dame_blanche.png",
      Roi : "roi_blanc.png"
    },
    DepartStandard : 
    {
      a1 : Tour, b1 : Cavalier, c1 : Fou,  d1 : Dame, e1 : Roi,  f1 : Fou,  g1 : Cavalier, h1 : Tour,
      a2 : Pion, b2 : Pion,     c2 : Pion, d2 : Pion, e2 : Pion, f2 : Pion, g2 : Pion,     h2 : Pion
    },
    toString : function() {
      return "Blancs";
    }    
  },
  Noirs :
  {
    toString : function() {
      return this.nom;
    },  
    nom : "Noirs",
    RoseDesVents : {
      H: { offsetC : 0, offsetR :-1 },
      B: { offsetC : 0, offsetR :+1 }, 
      D: { offsetC :-1, offsetR : 0 },           
      G: { offsetC :+1, offsetR : 0 }
    },
    estAdversaire : function(autreCamp)
      {
        if(autreCamp == this) return false ;  
        if(autreCamp == Camps.Blancs) return true;  
    },    
    Roque : { 
      petit : {
        destinationRoi : "g8",
        positionTour : "h8",
        trajet : "f8"
      },
      grand : {
        destinationRoi : "c8",
        positionTour : "a8",
        trajet : "d8"
      }    },
    Sprites : {
      Pion : "pion_noir.png",
      Tour : "tour_noire.png",
      Cavalier : "cavalier_noir.png",
      Fou  : "fou_noir.png",
      Dame : "dame_noire.png",
      Roi : "roi_noir.png"
    },
    DepartStandard : 
    {
     a8 : Tour, b8 : Cavalier, c8 : Fou,  d8 : Dame, e8 : Roi,  f8 : Fou,  g8 : Cavalier, h8 : Tour, 
     a7 : Pion, b7 : Pion,     c7 : Pion, d7 : Pion, e7 : Pion, f7 : Pion, g7 : Pion,     h7 : Pion
 
    }    
  },
  Vide :
  {
    nom : "camp vide"
  },
  adversaire : function(camp) {
    if(camp == this.Blancs) return this.Noirs;
    if(camp == this.Noirs) return this.Blancs;
    return this.Vide;
  }  
}

// quelques tests

//  var rdvb = Camps.Noirs.RoseDesVents;
//  var dest = RefAlgebr.translater("c3", rdvb, "HHD");
// //console.log(dest);
  
//  var rdvb = Camps.Noirs.RoseDesVents;
//  var dest = RefAlgebr.translater("c3", rdvb, "DDH");
// //console.log(dest);

var RefAlgebr = {
    
    colonnes : "kabcdefghK",
    rangees  : "r12345678R",
    
    colonnes_inversees : "Khgfedcbak",
    rangees_inversees  : "R87654321r",
        
    c : function(ref) { return ref.charAt(0); },
    r : function(ref) { return ref.charAt(1); },
        
    dansPlateau : function(ref)
    {
      if(ref.length != 2) return false;
      var ok_c = ( /[a-h]/.test(ref.charAt(0)) );
      var ok_r = ( /[1-8]/.test(ref.charAt(1)) );
      return (ok_r && ok_c);
    },
    
    type : function(ref)
    {
      var c = this.c(ref).toUpperCase();
      var r = this.r(ref).toUpperCase();
      // console.log('TYPE : ' + 'c' + c + ' r ' + r  + 'ref : ' + ref);
      
      if(c != 'K'  && r != 'R')  return 'DansPlateau';
      if(c == 'K'  && r == 'R')  return 'Coin';
      if(c == 'K') return 'BordureR';
      if(r == 'R') return 'BordureC';
      
      return false;
      
    },
    
    couleur : function(ref)
    {
        var ic = RefAlgebr.colonnes.indexOf(RefAlgebr.c(ref));
        var ir = RefAlgebr.rangees.indexOf(RefAlgebr.r(ref));
        return ((ic + ir) % 2) ? "CaseBlanche" : "CaseNoire";
    },
    
    translater : function(ref, rdv, sequence)
    {
      var c = this.c(ref);
      var r = this.r(ref);
      for(i=0; i<sequence.length; i++) {
        var depl_elem = sequence.charAt(i);
        
        if(rdv[depl_elem] == undefined) return false;        
        c = this.colonnes.charAt(this.colonnes.indexOf(c) + rdv[depl_elem].offsetC) ;
        r = this.rangees .charAt(this.rangees .indexOf(r) + rdv[depl_elem].offsetR) ;   
        
        if(! this.dansPlateau (c + r) ) return false;                
      }
      return c + r;
    }
}



// Définition de l'objet Piece  
function Piece(camp){
  this.nom = "piece-generique";
  this.camp = camp;
  this["*"] = false;
  this.ref = "";
  this.place = undefined;
  this.compteur = 0;
  this.dernierCoup =   0;  
}

// Définition de l'objet Place qui est en interne la représentation d'une case de l'échiquier
function Place(ref, couleur, position)
{
  this.ref = ref;
  this.couleur = couleur;
  // référence vers son conteneur
  this.position = position; 
  // additionnel
  this.piece = undefined;
  this.estARaffraichir = true;
}

Object.extend(Place.prototype, {
  toString : function() {
    return 'PLACE (case)' + 'ref : ' + this.ref +  ' couleur :  ' + this.couleur + ' piece ' + this.piece;    
  }
});

// Boite de rangement des pièces prises
function Prises()  {
  this.Blancs = [];
  this.Noirs  = [];
};

Object.extend(Prises.prototype, {
  toString : function() {
    return 'Prises :\n' + '\tBLANCS : ' + this.Blancs.join(', ') + '\n' + '\tNOIRS : ' + this.Noirs.join(', ');
  },
  ajouter : function (piece) {
    // console.log('PRISES : ' + piece);
    if(piece.camp == Camps.Blancs) this.Blancs.push(piece);
    if(piece.camp == Camps.Noirs) this.Noirs.push(piece);
  },
  vider : function() {
    this.Blancs = [];
    this.Noirs  = [];
  }
});

// stockage des influences d'une position
function Influences(position) {
  this.position = position;
  this._stockage = {};
};

function Position() {

    this.id = 0;
    this._places = {};
    
    for(ci=0; ci<RefAlgebr.colonnes.length; ci++)
    {
      for(ri=0; ri<RefAlgebr.rangees.length; ri++)
      {
        // inutile ? interêt uniquement décoratif !
        var c = RefAlgebr.colonnes.charAt(ci);
        var r = RefAlgebr.rangees .charAt(ri);        
        var ref = c + r;
        var couleur = ((ci + ri) % 2) ? "blanche" : "noire";
        this._places[ref] = new Place(ref, couleur, this);
      }
    }
    this._influences = new Influences(this);
    this._prises = new Prises();
};

Object.extend(Position.prototype, 
{
  poser : function(ref, piece) {
    this._places[ref].poser(piece);
  },
  soulever : function(ref) {
    return this._places[ref].soulever();
  },
  capturer : function (piece) {
    this._prises.ajouter(piece);
  },
  demarrerStandard : function()
  {
    var thisPosition = this;
//    LigneDeCommande.afficher('Démarrer Standard');
    $H(Camps.Blancs.DepartStandard).each(function(paire, index){
        var ref = paire.key;
        var piece = paire.value; 
        thisPosition.poser(ref, new piece(Camps.Blancs) ) ; 
    });
    $H(Camps.Noirs.DepartStandard).each(function(paire, index){
        var ref = paire.key;
        var piece = paire.value; 
        thisPosition.poser(ref, new piece(Camps.Noirs) ) ; 
    });
    
    return thisPosition;
  }, // demarrerStandard  
  vider : function() {
    var thisPosition = this;
    var tab = [];
    $H(this._places).each(function(paire, index) {
      var ref = pair.key;
      tab.push(ref);
      thisPosition.soulever(ref);
    });
    console.log(tab.join(' '));
  } // vider
}); 


// les influences en déplacement et en pression sont une relation N-N entre références
// il y a donc lieu de créer une classe pour les stocker et les retrouver rapidement
//
// dans une table relationnelle on dirait que la clé qui  les indexe est une double clé 
// de type concatenation( "ref_source",  "ref_dest")
// on doit pouvoir obtenir facilement, à partir d'une référence de case (une place) :
// - les cases qu'elle influe
// - les cases qui l'influent
// et rapidement ! hash + filter si possible
//


function Influence(refOrigine, refDestination, direction, camp, estDeplacement, estPrise)
{
  this.refOrigine = refOrigine;
  this.refDestination = refDestination;
  this.direction = direction;
  this.camp = camp;
  this.estDeplacement = estDeplacement;
  this.estPrise = estPrise;  
}

// ***** pour le stockage *****
var Clefs = 
{
  MATCH_ALL : "*",
  generer : function() { 
    ////console.log('generer args : ' + $A(arguments)); 
    return $A(arguments).join('-'); 
  },
  filtrer : function(clef, critere) { 
      var splitClef =    clef.split('-');
      var splitCritere = critere.split('-');
      if(splitClef.length != splitCritere.length) return false;
      var r = true;
      for(k=0; k < splitClef.length; k++)
        r = r && (splitCritere[k] == this.MATCH_ALL || splitClef[k] == splitCritere[k]);
      return r;  }
}

/*
    // Clef : filtrer version LOOP
    function filtrer_loop(clef, critere) {
      var i_clef = 0, i_critere = 0, cl = clef.length, kl = critere.length;
      for(;;) {
  //      console.log(i_clef + ' , ' + i_critere);
        if(critere.charAt(i_critere) == "*") {
          i_critere++;
          if(i_critere == kl) return true;
          while(clef.charAt(i_clef) != "-") i_clef++;
  //        console.log('IF : ' + i_clef + ' , ' + i_critere);
        }
        if(i_critere == kl) return i_clef == cl ? true : false;
        if(clef.charAt(i_clef) != critere.charAt(i_critere)) return false;
        i_clef++;
        i_critere++;
      }
      return +3;
    }
*/

Object.extend(Influence.prototype, {
  toKey : function () {
    with(this) {
        return Clefs.generer(refOrigine, refDestination, direction, camp);
    }
  }
}); 

Object.extend(Influences.prototype, 
{
  ajouter : function(influence) {
    this._stockage[influence.toKey()] = influence;
    //console.log(influence.refDestination);
    //console.log(this.position._places[influence.refDestination]);
    this.position._places[influence.refOrigine].estARaffraichir = true;
    this.position._places[influence.refDestination].estARaffraichir = true;
  },
  viderDepuis : function(refOrigine, direction) {
    var dir = direction ? direction : Clefs.MATCH_ALL;
    //var camp = this.position.-places[refOrigine].piece.camp;
    var critere = Clefs.generer(refOrigine, Clefs.MATCH_ALL, dir, Clefs.MATCH_ALL);
    for(clef in this._stockage)
    {
      if(Clefs.filtrer(clef, critere)) 
      {
        //console.log(this._stockage[clef].refDestination);
        this.position._places[this._stockage[clef].refOrigine].estARaffraichir = true;        
        this.position._places[this._stockage[clef].refDestination].estARaffraichir = true;        
        delete this._stockage[clef]; 
      }
    }
  },
  obtenirRefsVisees : function (refOrigine) {
    var result = {};
    var critere = Clefs.generer(refOrigine, Clefs.MATCH_ALL, Clefs.MATCH_ALL, Clefs.MATCH_ALL);
    for(clef in this._stockage)
    {
      if(Clefs.filtrer(clef, critere)) {
        var i = this._stockage[clef]; 
        result[i.refDestination] = i;
      }
    }
    return result;
  },
  obtenirRefsVisant : function (refDestination) {
    var result = {};
    var critere = Clefs.generer(Clefs.MATCH_ALL, refDestination, Clefs.MATCH_ALL, Clefs.MATCH_ALL);
    for(clef in this._stockage)
    {
      if(Clefs.filtrer(clef, critere)) {
        var i = this._stockage[clef]; 
        //console.log('VISANT FILTRER : ' + i);
        result[i.refOrigine] = i;
      }
    }
    return result;
  }, 
  obtenir : function(refOrigine, refDestination){
    var critere = Clefs.generer(refOrigine, refDestination, Clefs.MATCH_ALL, Clefs.MATCH_ALL);
    // console.log("OBTENIR : "+ critere);
    for(clef in this._stockage) {
      if(Clefs.filtrer(clef, critere)) 
        return this._stockage[clef];
    }
  },
  toString : function() {
    var compteur = 0;
    for(i in this._stockage) compteur++;
    return "Influences (" + compteur+ ")";
  }
}); // Position.prototype

Object.extend(Place.prototype, {
  compterPressions : function()
  {
    var thisPlaceRef = this.ref;
    var pblancs = 0;
    var pnoirs  = 0;

    //var k = Influences.obtenirVers(this.ref);
    with(this.position)
    {
      var refsVisant = _influences.obtenirRefsVisant(thisPlaceRef);
      // console.log('CP : ' + refsVisant);
      $H(refsVisant).each(function(paire, index) {
            var refV = paire.key;
           // console.log('COP PRESSION REF V : ' + refV + thisPlaceRef);
            with (_influences.obtenir(refV, thisPlaceRef))            
              if(estPrise)
              {
                //console.log('COMPTER_PRESSION REFS: ' + refV + '-'+ thisPlaceRef);
                //console.log(_influences.obtenir(refV, thisPlaceRef));
                if(camp == Camps.Blancs) pblancs++;
                if(camp == Camps.Noirs) pnoirs++;    
              }
      });
    }
    return { Blancs : pblancs, Noirs : pnoirs }; 
  }
});


// ***** LOG d'UNE POSITION *****

Object.extend(Position.prototype,
{
  toString : function() {
    return this.log(0);
  },

  log : function(niveau) {
    var ret = "POSITION\n";
    for(ci=0; ci<RefAlgebr.colonnes.length; ci++)
    {
      
      var tab = [];
      for(ri=0; ri<RefAlgebr.rangees.length; ri++)
      {
        
        var c = RefAlgebr.colonnes.charAt(ci);
        var r = RefAlgebr.rangees .charAt(ri);        
        var ref = c + r;
        if(RefAlgebr.dansPlateau(ref))
        {
          var C = this._places[ref];
          //logProps(C);
          var P = C.piece ? C.piece.nom.charAt(0) + '.' + C.piece.camp.nom.charAt(0) : ' . ';
          var pressions = '(' + C.compterPressions().Blancs + ',' + C.compterPressions().Noirs + ')';
          var S = P + pressions; 
          // var S = P;
        } else { 
          var S = '   ' + ref + '   ';
        }
        tab.push(S);
      }
      ret += tab.join(' ') + '\n';
    }
    ret += this._prises.toString() + '\n';
    //ret += 'INFLUENCES : \n';
    //$H(this._influences._stockage).each(function(paire, index){
    //  ret += paire.key + ' ,   ';
    //});
    ret += '\n\n';
    //ret += this._influences.toString() + '\n';
    return ret;
  } // log
  
});

// ______________________________________

/*
  Abbrev_FR : {
    P : Pion, C : Cavalier, F : Fou, T : Tour, D : Dame, R : Roi
  },
  Abbrev_SAN : {
    P : Pion, N : Cavalier, B : Fou, R : Tour, Q : Dame, K : Roi
  },

*/

// ***** GENERATION DES INFLUENCES D UNE PIECE *****

Object.extend(Piece.prototype, {
  
  toString : function(niveau) {
    if(! niveau)
      return this.nom.charAt(0) + '' +  this.camp.toString().charAt(0);
    return this.nom + '-' + this.camp;  
  },  
  influencer : function(direction)
  { 
    if(! this.place) { 
      console.log('piece hors case plateau !'); 
      return false; 
    }
    var position = this.place.position;
    var tab = [];
    
    if(RefAlgebr.dansPlateau(this.ref))
    {
      ////console.log('if ok');
      var tabDirectionsInfluences = direction ? [direction] : this.directionsInfluences;
      
      for(di=0; di < tabDirectionsInfluences.length; di++)
      {
        var d =  tabDirectionsInfluences[di];
        var rd = this.ref;
        
        //  RefAlgebr . translater : function(ref, rdv, sequence)
        while(RefAlgebr.dansPlateau(rd = RefAlgebr.translater(rd, this.camp.RoseDesVents, d)))
        {          
          // selon la présence d'une pièce ou non
          // selon qu'elle est adversaire ou amie
          var piece = position._places[rd].piece;
          var depl = true;
          var stop = false;
          if(piece)
          {
            stop = true;
            if(piece.camp == this.camp) depl = false;
            if(piece.camp.estAdversaire(this.camp)) depl = true;
          }
          tab.push(rd);
          // function Influence(refOrigine, refDestination, camp, direction, estDeplacement, estPression)          
          var I = new Influence(this.ref, rd, d, this.camp, depl, true);
          position._influences.ajouter(I);
          if(! this["*"]) break;
          if(stop) break;
        }
      }
    }
    ////console.log('Influence :' + tab.join(', '));
    //return stop;
  }
});

// ***** DEFINITION DES PIECES *****
// + redéfinition de influencer() pour le pion et le roi (cas spéciaux)

Pion.prototype = new Piece();
function Pion(camp) { this.camp = camp; }
Object.extend(Pion.prototype, 
{
  nom : "Pion",
  influencer : function(direction) 
  {
    
    var d = "HG";
    if(! direction || d == direction)  this._infl(this.ref, d, true);
    
    d = "HD";
    if(! direction || d == direction) this._infl(this.ref, d, true);
    
    d = "H";
    if(! direction || d == direction) this._infl(this.ref, d, false);
    
    
    
    if(this.camp == Camps.Blancs) var rangee_depart = '2';
    if(this.camp == Camps.Noirs) var rangee_depart = '7';
    if(RefAlgebr.r(this.ref) == rangee_depart)
    {
      var refDevant = RefAlgebr.translater(this.ref, this.camp.RoseDesVents, "H");
      var oqp = this.place.position._places[refDevant].piece;    
    // PREMIER COUP : 
      d = "HH";
      if((! direction || d == direction) && ! oqp) this._infl(this.ref, d, false);
      // vérifier que les pieces soient sur leur rangée de départ
    }
  },

  _infl : function(_ref, direction, estDiagonale)
  {
    if(! this.place) { 
      // console.log('piece hors case plateau !'); 
      return false; 
    }
    var position = this.place.position;
    var depl;
    var stop = false;
    if(RefAlgebr.dansPlateau(_ref = RefAlgebr.translater(_ref, this.camp.RoseDesVents, direction)))
    {          
      // selon la présence d'une pièce ou non
      // selon qu'elle est adversaire ou amie
      var piece = position._places[_ref].piece;
      if(estDiagonale)
      {
        if(piece)
        {
          stop = true;
          if(piece.camp == this.camp) depl = false  ;
          if(piece.camp.estAdversaire(this.camp)) depl = true; 
        } else {
          depl = false;
        }
      } else {
        if(! piece) depl = true; 
        else depl = false;
      }

      var I = new Influence(this.ref, _ref,  direction, this.camp, depl, estDiagonale);
     //console.log('_infl pion : ' + this.ref + ' ' + _ref);
      position._influences.ajouter(I);
    }
    //return stop;
  }
});

Tour.prototype = new Piece();
function Tour(camp) { this.camp = camp; }
Object.extend(Tour.prototype, 
{
  nom : "Tour",
  "*" : true,
  directionsInfluences : ["H", "B", "D", "G"]
});


Cavalier.prototype = new Piece();
function Cavalier(camp) { this.camp = camp; }
Object.extend(Cavalier.prototype, 
{
  nom : "Cavalier",
  "*" : false,
  directionsInfluences : ["HHD", "HHG", "BBD", "BBG", "HDD", "BDD", "HGG", "BGG"]
});


Fou.prototype = new Piece();
function Fou(camp) { this.camp = camp; }
Object.extend(Fou.prototype, 
{
  nom : "Fou",
  "*" : true,
  directionsInfluences : ["HG", "HD", "BD", "BG"]
});

Dame.prototype = new Piece();
function Dame(camp) { this.camp = camp; }
Object.extend(Dame.prototype, 
{
  nom : "Dame",
  "*" : true,
  directionsInfluences : ["H", "B", "D", "G", "HG", "HD", "BD", "BG"]
});

Roi.prototype = new Piece();
function Roi(camp) { this.camp = camp; }
Object.extend(Roi.prototype, 
{
  nom : "Roi",
  "*" : false,
  directionsInfluences : ["H", "B", "D", "G", "HG", "HD", "BD", "BG"]
});

// ***** POSER ET SOULEVER UNE PIECE D UNE PLACE  DANS LA POSITION COURANTE *****

Object.extend(Place.prototype, {
  poser : function(piece)
  {
    var position = this.position;
   //console.log('PLACE POSER PIECE' + piece.nom + ' ' + piece.camp.nom);
    if(this.piece) 
    {
      return false;      
    }
    
    this.piece = piece;
    piece.ref = this.ref;
    piece.place = this;
    
    this.estARaffraichir = true;
    
    piece.influencer();
    var depuis = position._influences.obtenirRefsVisant(this.ref);
    for(refOrigine in depuis) {
      var direction = depuis[refOrigine].direction;
      position._influences.viderDepuis(refOrigine, direction);
      position._places[refOrigine].piece.influencer(direction);
      // console.log(refOrigine);
      ////console.log(origine + ' influe(vider) : ' + Influences.obtenirDepuis('b2').join(', '));    }
    }
  },
  soulever : function()
  {
    var position = this.position;
    var p = this.piece;
    if(! this.piece) 
    {
     //console.log('case vide !');
      return false;      
    }
   
    p.ref = undefined;
    p.place = undefined;
    this.piece = undefined;

    this.estARaffraichir = true;

    var depuis = position._influences.obtenirRefsVisant(this.ref);
    for(refOrigine in depuis) {
      var direction = depuis[refOrigine].direction;
      position._influences.viderDepuis(refOrigine, direction);
      position._places[refOrigine].piece.influencer(direction);
      // console.log(refOrigine);
      ////console.log(origine + ' influe(vider) : ' + Influences.obtenirDepuis('b2').join(', '));

    }

    position._influences.viderDepuis(this.ref);
    
    return p; 
    // on renvoie la référence à la pièce enlevée      
  }
});

// ***** Raffraichissement pour tout lz monde ! *****
Object.extend(Position.prototype, {
  raffraichirTout : function() {
    for(ref in this._places) {
      this._places[ref].estARaffraichir = true;
    }
  }
});



