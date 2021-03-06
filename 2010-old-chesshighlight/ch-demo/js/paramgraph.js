
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

var PointsDeVue = 
{
  Nord : {
    nom   : "Nord",
    label : "Vue du Nord (joueur Noir)",
    tr : "rangees", 
    td : "colonnes_inversees",
    toString : function () { return this.nom; }
  },

  Est : { 
    nom   : "Est",  
    label : "Vue de l'Est (spectateur droit)",
    tr : "colonnes", 
    td : "rangees",
    toString : function () { return this.nom; }    
  },
  
  Sud : { 
    nom   : "Sud",
    label : "Vue du Sud (joueur Blanc)",
    tr : "rangees_inversees", 
    td : "colonnes",
    toString : function () { return this.nom; }    
  },

  Ouest : { 
    nom   : "Ouest",  
    label : "Vue de l'Ouest (spectateur)",
    tr : "colonnes_inversees",
    td : "rangees_inversees",
    toString : function () { return this.nom; }    
  }
}

/*
  
 ***** LISTE DES CODES DE COUULEURS POUR OBNK *****
 
ATTENTION : la r�f�rence pour acc�der  aux valeurs de pression est blancs puis noirs
ATTENTION : il faut donc prendre la transpos�e de la matrice !
________________ _______ ______ __________
O   0   1   2   3   B

0   #00FF00 #94FF94 #D1FFD1 #FFFFFF 
 
1   #007100 #FFFF00 #FFFF94 #FFFFD1 
 
2   #001D00 #717100 #FFC600 #FFDB94 

3   #000000 #1D1D00 #715800 #FF0000 

N                   K
__________________________________________
  
 ***** LISTE DES CODES DE COUULEURS POUR OBNK *****
 
ATTENTION : la r�f�rence pour acc�der  aux valeurs de pression est blancs puis noirs
ATTENTION : il faut donc prendre la transpos�e de la matrice !
*/

var ModelesCouleurs = 
{
  'STANDARD' : {
    toString : function() { return 'STANDARD'; },
    obtenirClasse : function(ref)  
    {
      if(Plateau._carres[ref].couleur == "blanche") return "STD_Blanche";
      if(Plateau._carres[ref].couleur == "noire")   return "STD_noire";       
    }      
  },
  
  'OBNK_GRADIENT' : {
    toString : function() { return 'OBNK_GRADIENT'; },    
    "0-0" : "#00FF00", "1-0" : "#94FF94", "2-0" : "#D1FFD1", "3-0" : "#FFFFFF",
    "0-1" : "#009600", "1-1" : "#FFFF00", "2-1" : "#FFFF94", "3-1" : "#FFFFD1",
    "0-2" : "#006600", "1-2" : "#bcbc00", "2-2" : "#FFC600", "3-2" : "#FFDB94",
    "0-3" : "#000000", "1-3" : "#6d6d08", "2-3" : "#715800", "3-3" : "#FF0000"   
    // Couleurs pr�calcul�es, puis r�-ajust�es visuellement et � la main
  },  // OBNK_GRADIENT

  'OBNK_CONTRASTE' : {
    toString : function() { return 'OBNK_CONTRASTE'; },
    "0-0" : "#00FF00", "1-0" : "#B1FFB1", "2-0" : "#FFFFFF", "3-0" : "#FFFFFF",
    "0-1" : "#008800", "1-1" : "#FFFF00", "2-1" : "#FFFF94", "3-1" : "#FFFFFF",
    "0-2" : "#000000", "1-2" : "#bcbc00", "2-2" : "#FFC600", "3-2" : "#FFDB94",
    "0-3" : "#000000", "1-3" : "#000000", "2-3" : "#715800", "3-3" : "#FF0000"   
  },  // OBNK_CONTRASTE

  'OBNK_BASIQUE' : {
    toString : function() { return 'OBNK_BASIQUE'; },
    "0-0" : "#00FF00", "1-0" : "#FFFFFF", "2-0" : "#FFFFFF", "3-0" : "#FFFFFF",
    "0-1" : "#000000", "1-1" : "#FFFF00", "2-1" : "#FFFFFF", "3-1" : "#FFFFFF",
    "0-2" : "#000000", "1-2" : "#000000", "2-2" : "#FFC600", "3-2" : "#FFFFFF",
    "0-3" : "#000000", "1-3" : "#000000", "2-3" : "#000000", "3-3" : "#FF0000"   
  },  // OBNK_BASIQUE

    setup : function(name) {
        if(name in this) {
            this.name = name;
        }
    },

    get : function (key) {
        return this.name[key];
    }   
}


