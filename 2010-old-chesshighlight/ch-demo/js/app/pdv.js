
// ***** LISTE DES PDV ***** 

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


 
