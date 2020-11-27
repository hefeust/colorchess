

function Boite() {};
Boite.prototype = 
{
  // commodité d'affichage ?
  Blancs : [],
  Noirs : [],
  ranger : function(piece)
  {
    if(piece.camp = Camps.Blancs) 
      this.Blancs.concat([piece]);
    if(piece.camp = Camps.Noirs) 
      this.Noirs.concat([piece]);      
  },
  vider : function()
  {
    var pieces = this.Blancs.concat(this.Noirs);
    this.Blancs = [];
    this.Noirs = [];
    return pieces;
  },
  MODE_AFFICHAGE_NORMAL   : "Affichage de la bôite avec les pièces dans leur ordre de capture",
  MODE_AFFICHAGE_CONDENSE : "Affichage de la bôite sous forme condensée",
  initialiser : function(PDV, modeAff)
  {
    // on ne s'amuse pas à dessiner la bôite dans tous les sens
    if(PDV == PointsDeVue.Est)    PDV = PointsDeVue.Nord;
    if(PDV == PointsDeVue.Ouest)  PDV = PointsDeVue.Sud;
    //
    this.modeAffichage = modeAff;
    //
  },
  dessiner : function() {
    // desine la boite à l'écran
  }
}

