
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


// ***** CONSTRUCTION DE COPIES *****

Object.extend(Pion.prototype, {
  dupliquer : function() { 
    var dup = new Pion(this.camp);
    //dup.ref = this.ref;
    //dup.place = this.place;
    return dup;          
  }
});
Object.extend(Cavalier.prototype, {
  dupliquer : function() { return new Cavalier(this.camp); }
});
Object.extend(Fou.prototype, {
  dupliquer : function() { return new Fou(this.camp); }
});
Object.extend(Tour.prototype, {
  dupliquer : function() { return new Tour(this.camp); }
});
Object.extend(Dame.prototype, {
  dupliquer : function() { return new Dame(this.camp); }
});
Object.extend(Roi.prototype, {
  dupliquer : function() { return new Roi(this.camp); }
});

// ***** *****

Object.extend(Place.prototype, {
  dupliquer : function() {
    var ret = new Place(this.ref, this.couleur, this.position);
    // ret.estARaffraichir = false ;
    return ret;
    
  }
});

Object.extend(Influence.prototype, {
  dupliquer : function() {
    with(this) {
        return new Influence( refOrigine,  refDestination,  direction,  camp,  estDeplacement,  estPrise);
    }
  }
});

Object.extend(Influences.prototype, {
  dupliquer : function(positionDuplicata)
  {
    var ret = new Influences(positionDuplicata);
    for(clef in this._stockage)
      ret._stockage[clef] = this._stockage[clef].dupliquer(); 
    return ret;
  }
});

Object.extend(Prises.prototype, {
  dupliquer : function() {
    var ret = new Prises();
    this.Blancs.each(function(piece, index) {
      ret.ajouter(piece.dupliquer());
    });
    this.Noirs.each(function(piece, index) {
      ret.ajouter(piece.dupliquer());
    }); 
    return ret;
  }  
});

Object.extend(Position.prototype, {
  dupliquer : function() {
    var ret = new Position();
    //var dup = [];
    
    ret.id = this.id + 1;
   
    for(ref in this._places) {
      delete ret._places[ref];
      ret._places[ref] = this._places[ref].dupliquer();
      ret._places[ref].position = ret;
      if(this._places[ref].piece) {
          ret._places[ref].piece = this._places[ref].piece.dupliquer();
          ret._places[ref].piece.ref = ref;
          ret._places[ref].piece.place = ret._places[ref];
      }
      ret._places[ref].estARaffraichir = false;

      //if(ref == "e5") console.log('DUPLIQUER : ' + this._places[ref]);
      //dup.push(ref);  
    }
    //console.log('DUPLIQUER : ' + dup.join(', '));
    ret._influences = this._influences.dupliquer(ret);
    //ret._influences.position = this;
    ret._prises = this._prises.dupliquer();
    return ret;
  }
});

// ______________________________________

