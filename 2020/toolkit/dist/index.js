(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global._toolkit = {}));
}(this, (function (exports) { 'use strict';

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

  // apply a callback function to each element of a slice of an array
  var ii_iterate = function (arr, ii, callback) {
      return arr.slice(ii.min, ii.max + 1).map(function (val, idx) {

          return callback(val, idx)
      })
  };

  // basic intersection code
  // allows lists to handle duplicates
  var dumb_intersect = function (arrays, intervals, params) {
      var arr1 = arrays.arr1;
      var arr2 = arrays.arr2;
      var results = arrays.results;
      var matches = params.matches;
      var i1 = intervals.i1;
      var i2 = intervals.i2;
      
      ii_iterate(arr1, i1, function (value, rank) {    
          var count = matches.get(value) || 0;
          
    //      console.log({ matches: value })
          
          matches.set(value, count + 1);
      });
      
      ii_iterate(arr2, i2, function (value, rank) {
          var count = matches.get(value) || 0;
     
  //        console.log({ counts: value, count })   
          
          if(count > 0) {
              results.push(value);
              
              if (count > 1) {
                  matches.set(value, count - 1);
              } else {
                  matches.delete(value);
              }
          }
      });
  };

  // the slow version of intersect
  var intersect = function (arr1, arr2, options) {
      var results = [];
      var arrays = { arr1: arr1, arr2: arr2, results: results };
      var matches = new Map();
      var params = { matches: matches };
      
      var intervals = {
          i1: { min: 0, max: arr1.length - 1 },
          i2: { min: 0, max: arr2.length - 1 }
      };    

      dumb_intersect(arrays, intervals, params);
      
      return results
  };

  /**
   * convert a linear list to a cycled list
   *
   * work with lists of primitie (scalar) types
   * work better if there a no doubles inside the list !!!
   *
   * @param { Array <any> } 
   * @returns Map
   */
  var create_cycled_map =  function (list) {
    var cm = new Map ();
    var last = list.length - 1;
    
    list.map (function (item, idx) {
      var prev = idx > 0 ? list [idx - 1] : list [last];
      var next = idx < last ? list [idx + 1] : list [0];   
      var entry = { item: item, prev: prev, next: next };
      
      // cm [item] = entry
      cm.set(item, entry);
    });
    
    return cm
  };

  // const arrayize = (value) => Array.isArray(value) ? value : [value]

  // this function replace a value by its arrayisation
  // - if value is undefined, return an empty array
  // - if value is an array, returns the array
  // - if value is another, piut it as single elemùent array
  var arrayize = function (value) {
      if(value === undefined) { return [] }
      if(Array.isArray(value))
          { return value }
      else
          { return [value] }
  };

  /**
      create and returns a Biirectional Map
      - no parameters needed
  */
  var create_bidimap = function () {

      // left side  (a) uids lookup
      // Map <key> => <array_of_uids >
      var a_lookup = new Map();
      
      // right side (b) uids lookup
     // Map <key> => <array_of_uids >
      var b_lookup = new Map();
      
      // Map <uid => association_pair>
      var pairings = new Map();

      // setup an association pair
      var set_matching_pair = function (pair, data) {
          var a_uids = arrayize(a_lookup.get(pair.a));
          var b_uids = arrayize(b_lookup.get(pair.b));        
  //        const isect = intersect(a_uids, b_uids)
          var chunk = { pair: pair, data: data };        
          var uid = ++UID;

          a_lookup.set(pair.a, a_uids.concat(uid));
          b_lookup.set(pair.b, b_uids.concat(uid));
          pairings.set(uid, chunk );
      };


      // setup an association pair
      // @TODO: remove pairs with joker '*'
      var remove_matching_pair = function (pair) {
          var a_uids = arrayize(a_lookup.get(pair.a));
          var b_uids = arrayize(b_lookup.get(pair.b));        
          var isect = intersect(a_uids, b_uids);
          
  //        console.log({ a_uids, b_uids, isect })
  //        console.log( pairings )

          if(a_uids.length === 0) { return null }
          if(b_uids.length === 0) { return null }
          if(isect.length === 0) { return null }         

          isect.map(function (uid) {
              var a_uid_idx = a_uids.indexOf(uid);
              var b_uid_idx = b_uids.indexOf(uid);

              pairings.delete(uid);

              if(a_uid_idx > -1) { a_uids.splice(a_uid_idx, 1); }
              if(b_uid_idx > -1) { b_uids.splice(b_uid_idx, 1); }
          });
      };

      // link the two sides <a, b> holding an optional data
      var link = function (pair, data) {
          var a_selectors = arrayize(pair.a);        
          var b_selectors = arrayize(pair.b);                

          a_selectors.map(function (a) {
              b_selectors.map(function (b) {
                  set_matching_pair({ a: a, b: b }, data);
              });
          });
      };
      
      // break a existing pairing link
      // @TODO: remove pairs with joker '*'
      var unlink = function (pair) {
          var a_selectors = arrayize(pair.a);        
          var b_selectors = arrayize(pair.b);                

          a_selectors.map(function (a) {
              b_selectors.map(function (b) {
                  remove_matching_pair({ a: a, b: b });
              });
          });        

          return null
      };

      // colects uids inside lookup according to selector(s)

      /// BUG: 2020-11-20
      /// performs and logical OR instead of a logical AND  !!!
      ///
      /// added: conjunction parameter
      var collect = function (lookup, selectors, conjunction) {

  /*
          // this works for pizzas, but not for chess !
          return selectors.map((selector) => {
              const uids = arrayize(lookup.get(selector))

              return uids
         }).reduce((acc, arr) => acc.concat(arr), [])
  */

          // that worked with pizzas too

          var results = [];
          var scores = new Map();

          var lists = selectors.map(function (selector) {
              var uids =  arrayize(lookup.get(selector));

              return uids
          });

          lists.map(function (uids) {
              uids.map(function (uid) {
                  var pair = pairings.get(uid);
                  var score = scores.has(uid) ? scores.get(uid) : 0;

                  scores.set(uid, 1 + score);
              });
          });

  //         console.log(a_lookup)
  //         console.log(b_lookup)
  //        console.log(a_lookup.get('king'))
  //        console.log(a_lookup.get('white'))

  //        console.log('pairings:', pairings)

  //        console.log('scores:', scores)

          var keys = Array.from(scores.keys());

  //        console.log({ selectors })
  //        console.log({ keys })

          keys.map(function (key) {
              if(scores.get(key) > 0) { results.push(key); }
          });

          return results        
      };

      var scored_filtering = function (uids_list, criteria, value) {
          var scores = new Map();

          return uids_list.map(function (uid) {
              var chunk = pairings.get(uid);
              var pair = chunk.pair;
              var score = scores.get(pair[criteria]) || 0;
                          
              scores.set(pair[criteria], 1 + score);

              return uid
          }).filter(function (uid) {
              var chunk = pairings.get(uid);
              var pair = chunk.pair;
              var score = scores.get(pair[criteria]) || 0;
                          
              return score === value
          }).reduce(function (acc, uid) {
              var chunk = pairings.get(uid);
              var pair = chunk.pair;
              var score = scores.get(pair[criteria]) || 0;

              if(score > 0) {
                  scores.set(pair[criteria], 0);
                  acc = acc.concat( [uid]);
              }

              return acc
          }, [])
      };
      
      // test if list of selectors contains a wildcard joker
      var contains_joker = function (list) {
          var i = 0;

          while(i <= list.length) {
              if(list[i] === true || list[i] === '*') 
                  { return true }
              i++;
          }

          return false
      };

      // slect (query) inside bidirectional map
      // bdm.select({ a: 'a10', b: 'b11' })    
      // bdm.select({ a: 'a10', b: '*' })        
      // bdm.select({ a: '*', b: 'b11' })    
      // bdm.select({ a: ['a1', 'a2'], b: {'b3', 'b4'] })    
      var select = function (query, conjunction) {
         
           var results = [];
          var a_query = arrayize(query.a);
          var b_query = arrayize(query.b);        
          var a_joker = contains_joker(a_query);
          var b_joker = contains_joker(b_query);
          var a_uids = collect(a_lookup, a_query);
          var b_uids = collect(b_lookup, b_query);        
          var isect = [];

          if(a_joker && b_joker) {
              throw new Error('could not dump all links at same time')
          } else if(a_joker) {
              isect = scored_filtering(b_uids, "a", b_query.length);
  //            isect = b_uids
          } else if (b_joker) {
              isect = scored_filtering(a_uids, "b", a_query.length);
  //            isect = a_uids
          } else {
              isect = intersect(
                  scored_filtering(b_uids, "a", b_query.length),
                  scored_filtering(a_uids, "b", a_query.length)
              );
          }

          // onsole.log({ a_joker, b_joker, isect })

          isect.map(function (uid) {
              results.push(pairings.get(uid));
          });
          
          return results
      };

      var toString = function () {
          var texts = [];
          var ac = Array.from(a_lookup.keys()).length;
          var bc = Array.from(b_lookup.keys()).length;
          var pc = Array.from(pairings.keys()).length;

          texts.push('toolkit bidimap');
          texts.push('found a_lookups: count = ' + ac);
          texts.push('found b_lookups: count = ' + bc);
          texts.push('found records: count = ' + pc);

          //console.log(a_lookup)
          //console.log(b_lookup)
          //console.log(pairings)

          return texts.join('\n')
      };
      
      var api = {
          link: link, 
          unlink: unlink, 
          select: select,
          toString: toString
      };
      
      // UID counter  for pairs
      // @TODO optimsation with MWC generator
      var UID = 0;

      return api
  };

  var key_for = function (arr) {
      var chars36 = 'abcdefghijklmnopqrstuvwxyz1234567890';

      return arr.map(function (idx) { return chars36.charAt(idx); }).join('')
  };

  var create_bmp = function (options) {

      var mwc = create_mwc(357979131, 36, 4);
      var chunks = [];
      var lookup = new Map();

      var reallocate = function (qty) {
  //        console.log({ reallocate: qty})
          var length = Math.floor(qty);
  //        const length = (qty <= size) ?  size : qty
          var newer = new Array(length);
          var idx = 0;
          var uid = null;
          var chunk = null;
          
          while(idx < length) {
              do {
                  uid = key_for(mwc.next());        
              } while(lookup.has(uid))    
          
              chunk = { uid: uid, data: null, used: false  };
              newer[idx] = chunk;
              lookup.set(uid, chunk); 
              idx++;
          }
          
          chunks.push.apply(chunks, newer);
          size  += length;

          
      };
      
      var check_resize = function (qty) {
          var rest = size - watermark;
          var critical = size * thresold;


          // console.log({ size, qty, rest, critical, length: chunks.length })

          if (qty + critical > rest) { 
            reallocate(size * growth);
          }
      };    
      
      var set_data_chunk = function (data) {
          var chunk = null;

          check_resize(1);

  //        console.log('set_data_chunk', { watermark, size })

          chunk = chunks[watermark];
          watermark++;

          chunk.data = data;
          chunk.used = true;

          return chunk.uid
      };
      
      var get_data_chunk = function (uid) {
          var chunk = lookup.get(uid);

          if(debug) { console.log('         bmp.get_data_chunk:', { uid: uid }); }
          if(debug) { console.log('         SUCCESS:', !!chunk ); }


          if(!chunk) 
              { throw new Error('unexisting chunk for uid=' + uid) }

          return chunk.data
      };
      
      var free_data_chunk = function (uid) {
          var chunk = lookup.get(uid);
          var last = list[length - 1];
          var swap = chunk;
          
          if(!chunk) { return null }

          chunk.data = null;
          chunk.used = false;

          chunk = last;
          last = swap;

          watermark--;
      };

      var toString = function () {
          var texts = [];

          texts.push('### BLOCK MEMORY POOL ###');
          texts.push('');
          texts.push('size: ' + size + ' chunks');
          texts.push('watermark: ' + watermark);
          texts.push('ratio: ' + (size ?  100 * watermark / size : '#n/a!')+ ' %')*
          texts.push('');

          return texts.join('\n')
      };        

      var api = { 
          set_data_chunk: set_data_chunk,
          get_data_chunk: get_data_chunk,
          free_data_chunk: free_data_chunk,
          toString: toString
      };    

      var setup = function (params) {
          growth = params.growth || 0.2;
          thresold = params.thresold || 0.1;
          
          mwc.init([1, 2, 3, 5, 7, 11, 13, 17]);
          
          reallocate(params.size || 100);
      };

      var debug = !!options.debug;

      var size = 0;
      var growth = 0.2;
      var watermark = 0;
      var thresold = 0.1;

      setup(options || {});

      return api
  };

  var create_trie = function (options) {

      var bmp = create_bmp({
          size: 20,
          thresold: 0.05,
          growth: 0.05,
          debug: !!options.debug
      });

      var move = function (path) {
          var parts = path.length ? path.split ('/') : [];
          
          var uid = parts.reduce(function (vuid, subpath) {
              // console.log('parts.move reducer:', { vuid, subpath })
          
              var vnode = bmp.get_data_chunk(vuid);
              var cnode = null;
              var cuid = null;

              if(debug) { console.log('        reduce: ', { vuid: vuid, subpath: subpath }); }
              if(debug) { console.log('        reduce: ',  vnode ); }
              
              if(!vnode) { return null }
              if(false === vnode.children.has(subpath)) { return null }
              cuid = vnode.children.get(subpath);
              cnode = bmp.get_data_chunk(cuid);
              if(!cnode) { return null }
              if(cnode.subpath !== subpath) { return null }
              
              if(debug) { console.log('    reduce:', { cuid: cuid }); }

              return cuid
          }, root);

          if(debug) { console.log ('     trie.move:', { parts: parts, uid: uid }); }        
         
          return uid
      };

      var value = function (path) {
          var vuid = move (path);
          var vnode = bmp.get_data_chunk (vuid);

          // console.log ('trie.value', { vuid, vnode })

          if (!vnode ) { return null }
          
          return vnode.data
       };

      var subpaths = function (path) {
          var vuid = move (path);
          var vnode = bmp.get_data_chunk (vuid);

          // console.log ('trie.subpaths', { vuid, vnode })
          
          if(!vnode) { return null }
          
          return Array.from(vnode.children.keys())
      };

      var attach = function (path, subpath, data) {
          var vuid = move(path);
          var vnode = bmp.get_data_chunk(vuid);
          var cuid = bmp.set_data_chunk({
              subpath: subpath, 
              children: new Map(),
              data: data
          });

          if(debug) { console.log('trie.attach:', { path: path, subpath: subpath, vuid: vuid, cuid: cuid}); }
          
          vnode.children.set (subpath, cuid);
      };

      var detach = function (path, subpath) {
          var vuid = move(path);
          var vnode = bmp.get_data_chunk(vuid);

          bmp.free_data_chunk(vnode.uid);
      };    

      var root = bmp.set_data_chunk({ 
          subpath: '', 
          children: new Map(), 
          data: '#root!'
      });    
      
      var debug = !!options.debug;

      console.log ({ root: root });

      return {
          value: value, subpaths: subpaths, attach: attach, detach: detach
      }
  };

  exports.create_bidimap = create_bidimap;
  exports.create_bmp = create_bmp;
  exports.create_cycled_map = create_cycled_map;
  exports.create_mwc = create_mwc;
  exports.create_trie = create_trie;
  exports.intersect = intersect;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
