/*
var LigneDeCommande = 
{
  lancer : function()
  {
    
    var entree = $('commande').value;
    var indexEspace = entree.indexOf(' ');
    var opcode = ((indexEspace != -1) ? entree.substring(0, indexEspace) : entree).toLowerCase();
    var reliquat = entree.substring(indexEspace+1);
    var args = (opcode != 'eval') ? reliquat.split(' ') : [reliquat];
    var len = args.length;
    
    console.log('ldc : ' + args + " (" + len + ")");
    var retour = 'non effectué';
      
try {    
    
    switch(opcode)
    {
      case 'poser' :
      // poser TB a1
        if(len != 2) throw new LDCErreur("Nombre de paramètres incorrect");            
        var short = args[0].toUpperCase().toArray();
        if(short[0] == 'P') var p = Pion;
        if(short[0] == 'T') var p = Tour;
        if(short[0] == 'F') var p = Fou;
        if(short[1] == 'B') var c = Camps.Blancs;
        if(short[1] == 'N') var c = Camps.Noirs;
        ////console.log(p + ' ' + typeof(p));
        var piece = new p(c);
        var ref = args[1].toLowerCase();
        //e.partie.cases[ref].poser(piece);
        //e.dessiner();
        retour = 'LDC : poser ' + piece.nom + ' ' + ref + ' : ok';
      break;
      case 'soulever' :
      // oter ref
        if(len != 1) throw new LDCErreur("Nombre de paramètres incorrect");            
        var ref = args[0].toLowerCase();
        // Plateau.cases[ref].soulever();      
        e.dessiner();
        retour = 'LDC : oter piece en '  + ref + ' : ok';
      break;
      case 'pdv' : 
      // pdv point-de-vue
        console.log(args);
        var pdv = args[0].charAt(0).toUpperCase() + args[0].substring(1).toLowerCase();
        // console.log(pdv);
        //e.parametrer(PointsDeVue[pdv], e.ModeleCouleurs, e.afficheCPressions);
        e.construire(PointsDeVue[pdv]);
        e.attacher(e.partie); 
        e.parametrer( e.ModeleCouleurs, e.ModeleCouleurs, e.afficheCPressions);
        e.dessiner();
        retour = 'LDC : PointDeVue '  + pdv + ' : ok';
      break;
      case 'init' :
      // init   

        var P = new Partie();
        P.reset(positionDepart, Camps.Blancs);
        e.attacher(P);
        e.dessiner();
        retour = 'LDC : initialisation standard : ok';
      break;
      case 'maj' :
        e.dessiner();
        retour = 'LDC : maj : ok';
      break;
      case 'vider' :
        Plateau.cases.each( function(ref, index) { this.piece = undefined; } ) ;
        e.dessiner();
        retour = 'LDC : vider : ok';
      break;
      case 'log' :
        var P = e.partie;
        var position = P._mouvements[P.numMouvementCourant].position;
        //console.log("LOG");
        LigneDeCommande.afficher('LOG ' + args[0  ]);
        if(args[0]) { 
           echoProps(position._places[args[0]]);
        } else { 
          echoProps(P);
          LigneDeCommande.afficher(position);
        }
     break;
     
     case 'infl' :
        var P = e.partie;
        var influences = P._mouvements[P.numMouvementCourant].position._influences;
        
        var zap = args[0];
        var ref = args[1];

        if(zap.toLowerCase() == "de") {
          LigneDeCommande.afficher('INFLUENCES DEPUIS : ' + ref);
          var infl_visees = influences.obtenirRefsVisees(ref);
          for(i in infl_visees) { LigneDeCommande.afficher(infl_visees[i].toKey()); }

         
        } 
        if(zap.toLowerCase() == "vers") {
          LigneDeCommande.afficher('INFLUENCES VERS : ' + ref);
          var vers = influences.obtenirRefsVisant(ref);
          $A(vers).each(function(influence, index) {
            LigneDeCommande.afficher(influence.toKey());
          });          
        }

     break;
     


      
      default :
       this.afficher('ERREUR : COMMANDE INCONNUE');
      break;
    } // switch

    } catch(e) { 
    console.log("LDC ERREUR : " + e); 
    }
     console.log('commande : ' + opcode + ' ' + args + ' retour : ' + retour);
  },
  
  afficher : function(texte)
  {
    $('ResultatsLDC').value += '\n' + texte;
  }
}
*/


function LDC() {
	this.commands = LDC.commands;
	this.entree = null;
	this.sortie = null;
	this.buttin = null;
};

LDC.prototype.setEntree = function(entree) {
	this.entree = entree;
}

LDC.prototype.setSortie = function(sortie) {
	this.sortie = sortie;
}

LDC.prototype.setButton = function(button) {
	this.button = button;
}

LDC.prototype.install = function() {
		if(this.entree) { }
		if(this.sortie) { }
		if(this.button) { 
			var that = this;
			$(this.button).observe('click', function() {
				that.process();
			});
			
		}
}

LDC.prototype.setEchiquier = function(echiquier) {
	this.echiquier = echiquier;
}

LDC.prototype.setPartie = function(partie) {
	this.partie = partie;
}

LDC.commands = {
	"echo" : function(args) {
		return args.join(' - ');
	},
	"aide" : function(args) {
		var text = '*** commandes disponibles ***' + '\n';
		var names = Object.keys(this.commands);
		for(var cmd in this.commands) {
			//text += cmd + '\n';
		}
		text += names.sort().join('\n');
		return text;
	}
};

/*
      case 'aide' :
        this.afficher('* ChessHighlight version 0.5 *');
        this.afficher('\nAide de la console de commande');
        this.afficher('----------------------------------------------------------------');
        this.afficher('pdv [nord sud est ouest]\n\t\tchange le point de vue');
        this.afficher('init\t démarre une nouvelle partie standard');
        this.afficher('aide\t affiche ce message');
        this.afficher('poser piece ref\t pose une piece sur la case ref');
        this.afficher('oter ref\t\t eneleve la piece de la case ref');
        this.afficher('');
        this.afficher('----------------------------------------------------------------');
        retour = 'LDC : aide : ok';
      break;
      
      case 'mouv' :
        if(args[1] == 'B') var camp = Camps.Blancs;
        if(args[1] == 'N') var camp = Camps.Noirs;
        echoProps(e.partie.obtenirCoup(args[0], camp).position);
      break;
*/

LDC.prototype.set = function(name, command) {
	this.commands[ name ] = command;
};

LDC.prototype.run = function(name, args) {
	var cmd = this.commands[ name ];
	if(cmd) {
		try {			
			return cmd.call(this, args);
		} catch(err) {
			console.log(err);
			return 'error : during run of command : "' + name + '"';
		}
	} else {
		return 'error : unknown command "' + name + '"';
	}
};

LDC.prototype.process = function() {
	var raw = $F(this.entree);
	var result;	
	raw = raw.replace(/^\s+/, '').replace(/\s+$/, '');
	// console.log( raw );
	if(raw == '') {
		result = '';
	} else {
		var parts = raw.split(/\s+/);
		var name = parts[0];
		var args = parts.splice(1);
		result = this.run(name, args);
	}
	$(this.entree).value = '';
	$(this.sortie).innerHTML += result + '\n';	
};




