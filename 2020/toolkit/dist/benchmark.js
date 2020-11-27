(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /**
   * create a new Multiply-With-Carry pseudo random number  generator
   * 
   * @param {number} a - the multiplier chaeacteristic of the MWC PRNG
   * @param {number} b - digits number of positions
   * @param {number} r - number of digits (generator lag)
   * @returns {Object} generator instance
   */
  var create_mwc = function (a, b, r) {

    var values = new Array (2 * r);
    var lag = 0;
    var idx = (lag + r) % (2 * r);

    var init = function (seeds) {
      // if(!seeds.length) { throw new Error('seeds must be a lenfth of  2 * r = ' + 2 * r) }
  //    console.log ('seeding...', seeds)

      
      seeds.map (function (s, idx) {
        values[idx] = s; 
      });
    };
    
    /**
     * one generator step
     * 
     * adapted friom wikipeida:
     * 
     * https://en.wikipedia.org/wiki/Multiply-with-carry_pseudorandom_number_generator
     * 
     * @returns {Array}
     */
    var step = function () {

    // values and carries stored in the same array
      var result = new Array(r);
      var xn =            (a * values[idx] + values[lag]) % b;
      var cn = Math.floor((a * values[idx] + values[lag]) / b);

      idx = (idx + 1) % (2 * r);
      lag = (lag + 1) % (2 * r);
      
      values[idx] = xn;
      values[lag] = cn;
            
      for(var i = 0; i < r; i++) {
        result[i] = values[(lag + i + 1) % (2 * r)];
      }

  //    console.log ('step: ', result)
         
      return result    
    };
    
    /**
     * to avoid need of keeping lag in values array,
     * we invoke 2 * r  times the step() function 
     * so lag is always 0 through two consecutive next() calls
     * 
     * @returns {Array} 
     */
    var next = function () {
  //    console.log ('next', values)
      var result = [];
      
      for (var k = 0; k < 2 * r; k++) {
         result = step();
      }

      
      return result
    };

    /**
     * to save the state for future use
     * 
     * create and new MWC and init it with the getState() output
     * 
     * @returns {Array}
     */  
    var get_state = function () {
      return values
    };
    
    return { init: init, next: next, get_state: get_state }
  };

  var MAX_POTS =  1024 * 1024;
  var POT_SIZE = 16 * 1024;
  var STEP = 16 * 1024;
  var N_LOOPS = MAX_POTS * POT_SIZE;
  var POTS = new Array(MAX_POTS);
  var EMPTIES = new Array();
  var CLASHES = new Array();

  var pot_number = function (x) { return Math.floor(x / POT_SIZE); };

  var emptyness = function (pots) {
      var empties = pots.reduce (function (acc, pot) { return pot === 0 ? acc + 1: acc; } , 0);

      return empties / MAX_POTS
  };

  var overhelms = function (pots) {
      var fullfilled = pots.reduce (
          function (acc, pot) { return (pot >= 0.5 * POT_SIZE) ? acc + 1 : acc; }
      , 0);

      return fullfilled / MAX_POTS
  };

  var idx = 0;
  var value = 0;
  var text = ''; 

  var mwc = create_mwc(12345, 64, 4);

  console.log ('init MWC');

  mwc.init ([1, 3,5,7,9,11,13, 15]);

  POTS.fill(0);

  console.log ('LOOPING');

  for (var t = 0; t < N_LOOPS; t++) {

      if(t % STEP === 0)  {
          text = ['trial:', t, ', ', (t/ N_LOOPS).toFixed(5), '%'].join(' ');
          console.log(text);
      }
      
      value = mwc.next ();           
      idx = pot_number(value);
      POTS[idx]++;

      if(t % STEP === 0)  {
  //        EMPTIES.push(emptyness(POTS))
  //        CLASHES.push(overhelms(POTS))
          
          text = ['empties', emptyness(POTS),'\t', 'overhelms:', overhelms(POTS)].join(' ');
          console.log (text);
      }
  }

})));
