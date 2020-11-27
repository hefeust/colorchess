
/*
var LigneDeCommande = {
	
	afficher : function(message) {
		console.log(message);
	}
	
};
*/


// document.write('<div id="plateau" class="plateau"></div>');
// document.write('<textarea id="ResultatsLDC"></textarea>');



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

// document.write('<div id="tab-partie"></div>');

var ua = navigator.userAgent;

console.log(ua);

// document.write('<div id="plateau_table"></div>');

// $('plateau_table').refresh = function() { console.log(ua); };











