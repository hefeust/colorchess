(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var COLS = 'abcdefgh'.split ('');
  var ROWS = '12345678'.split ('');
  var NULL_REF = '**';

  var _refs = new Map();

  String.prototype.ref_as_object = function() {
      var str = this;
      var col = str[0];
      var row = str[1];    
      var cidx = COLS.indexOf (col);
      var ridx = ROWS.indexOf (row);    
      var is_valid = function () { return cidx !== -1 && ridx !== -1; };

      if (str.length !== 2) { return null }
      if(str === NULL_REF) { return null }
      
      
      return {
          col: col, row: row,
          cidx: cidx, ridx: ridx,
          is_valid: is_valid, str: str
      }
  };

  COLS.forEach(function (col) {
      ROWS.forEach(function (row) {
          var str = '' + col + row;
          
          _refs.set(str, str.ref_as_object());
      });
  });

  String.prototype.move = function(deltas) {
      var obj = this.ref_as_object();
      var new_cidx = obj.cidx + deltas.col;
      var new_ridx = obj.ridx + deltas.row;       
      var new_str = '' + COLS[new_cidx] + ROWS[new_ridx];
    
      return _refs.has(new_str) ? new_str : NULL_REF
  };

  String.prototype.sequence = function(deltas, iterative) {
      var results = [];
      var nloops = iterative ? 7 : 1;
      var moved = this;
      var i = 0;
      
      results.push(moved);
      
      while(i++ < nloops) {
          moved = moved.move(deltas);
          if(moved === NULL_REF) { break }
          results.push(moved);
      }
      
      return results
  };

  var refs = Array.from(_refs.keys());

  console.log('testing refs');

  console.log(refs);

  console.log('a1'.sequence({ col: 1, row: 1}, true).join(','));
  console.log('a8'.sequence({ col: 1, row: -1}, true).join(','));
  console.log('h1'.sequence({ col: -1, row: 1}, true).join(','));
  console.log('h8'.sequence({ col: -1, row: -1}, true).join(','));

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var dist = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
       factory(exports) ;
  }(commonjsGlobal, (function (exports) {
      var SILENT = 0;
      var LOG = 1;
      var DEBUG = 2;

      var setup_log_level = function (mode) {
          level = mode;    
          counter = 0;
      };

      var log = function (something) {
          if (level === SILENT) { return null }

          counter++;

          if(level === DEBUG) { console.log(); }
          console.log ('[' + counter + ']: ' + something);
          if(level === DEBUG) { console.log(); }
      };

      var debug = function (something) {
          if (level === SILENT) { return null }
          if (level === LOG) { return null }

          console.log('## DEBUG ##');
          console.log(something);
          console.log( '===========');
      };

      var counter = 0;
      var level = SILENT;

      var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

      function getDefaultExportFromCjs (x) {
      	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
      }

      function createCommonjsModule(fn, basedir, module) {
      	return module = {
      		path: basedir,
      		exports: {},
      		require: function (path, base) {
      			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      		}
      	}, fn(module, module.exports), module.exports;
      }

      function commonjsRequire () {
      	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
      }

      var dist = createCommonjsModule(function (module, exports) {
      (function (global, factory) {
         factory(exports) ;
      }(commonjsGlobal$1, (function (exports) {
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
      });

      var toolkit = /*@__PURE__*/getDefaultExportFromCjs(dist);

      var COLS = 'abcdefgh'.split ('');
      var ROWS = '12345678'.split ('');
      var REV_ROWS = '87654321'.split ('');
      var NULL_REF = '**';

      var _refs = new Map();

      String.prototype.ref_as_object = function() {
          var str = this;
          var col = str[0];
          var row = str[1];    
          var cidx = COLS.indexOf (col);
          var ridx = ROWS.indexOf (row);    
          var is_valid = function () { return cidx !== -1 && ridx !== -1; };

          if (str.length !== 2) { return null }
          if(str === NULL_REF) { return null }
          
          
          return {
              col: col, row: row,
              cidx: cidx, ridx: ridx,
              is_valid: is_valid, str: str
          }
      };

      COLS.forEach(function (col) {
          ROWS.forEach(function (row) {
              var str = '' + col + row;
              
              _refs.set(str, str.ref_as_object());
          });
      });

      String.prototype.move = function(deltas) {
          var obj = this.ref_as_object();
          var new_cidx = obj.cidx + deltas.col;
          var new_ridx = obj.ridx + deltas.row;       
          var new_str = '' + COLS[new_cidx] + ROWS[new_ridx];
        
          return _refs.has(new_str) ? new_str : NULL_REF
      };

      String.prototype.sequence = function(deltas, iterative) {
          var results = [];
          var nloops = iterative ? 7 : 1;
          var moved = this;
          var i = 0;
          
          results.push(moved);
          
          while(i++ < nloops) {
              moved = moved.move(deltas);
              if(moved === NULL_REF) { break }
              results.push(moved);
          }
          
          return results
      };

      var refs = Array.from(_refs.keys());

      // acceletor groups for piece selection
      var groups = dist.create_bidimap();

      groups.link({ a: ['king', 'white', 'delta'], b: 'K' });
      groups.link({ a: ['king', 'black', 'delta'], b: 'k' });

      groups.link({ a: ['queen', 'white', 'delta'], b: 'Q' });
      groups.link({ a: ['queen', 'black', 'delta'], b: 'q' });

      groups.link({ a: ['rook', 'white', 'delta'], b: 'R' });
      groups.link({ a: ['rook', 'black', 'delta'], b: 'r' });

      groups.link({ a: ['bishop', 'white', 'delta'], b: 'B' });
      groups.link({ a: ['bishop', 'black', 'delta'], b: 'b' });

      groups.link({ a: ['knight', 'white', 'delta'], b: 'N' });
      groups.link({ a: ['knight', 'black', 'delta'], b: 'n' });

      groups.link({ a: ['pawn', 'white'], b: 'P' });
      groups.link({ a: ['pawn', 'black'], b: 'p' });

      // console.log( groups.toString() )

      var create_board = function (options) {

          // bidiamp
          // *   a-relation-side: piece
          // *   b-relation-side: ref
          var locations = dist.create_bidimap();

          var whois = function (ref) {
              var results = locations.select({
                  a: '*', b: ref
              });        

              if(results.length > 1) 
                  { throw new Error('/!\ board.whois: 0 or 1 piece at same time on a ref...') }

              // empty board tile
              if(results.length === 0) { return null }

              return results[0].pair.a
          };

          var place = function (ref, piece) {
              var fen = piece ? (piece.fen || piece) : null;

              // bugfix 20201010 in make_delta_moves #target_ref
              // console.log({ref, piece })

              debug('## board.place: ' + ref + ' ' + fen);

              if(refs.indexOf(ref) === -1) 
                  { throw new Error('/!\ board.place; unexisting ref ?' + ref) }

              if(!piece) 
                  { return null }
      //            throw new Error('/!| board.place: attempting to place NULL piece at ref = ' + ref)

              locations.link({
                  a: fen, b: ref
              });

          };

          var remove = function (ref) {
              var fen = whois(ref);

              debug('board.remove ref =' + ref);

              if(refs.indexOf(ref) === -1) 
                  { throw new Error('/!\ board.remove; unexisting ref ?' + ref) }

              if(fen) {
                  locations.unlink({
                      a: fen, b: ref
                  });  
              }
          };

          var arrayize = function (value)  {
              if(value === undefined) { return [] }
              if(Array.isArray(value)) { return value }

              return [value]    
          };

          // a-relation-side: group names
          // b-relation-side: group qualities (FEN form)

          /// BUG: 2020-11-20
          ///     when multiple groups are specified, 
          ///     performs logical OR
          ///     instead of a logical AND
          /// @see toolkit/src/smart-maps/bidimap.js for details
          ///     (needs to recompile toolkit !)
          var select = function (group_names) {
              var gna = arrayize(group_names);
              var fens = groups.select({ a: gna, b: '*' }, true);
              var results = [];

      //        log('# board select ')
              log('# board.select: ' + gna.join(', '));
      //        debug({ gna })

      //        console.log( fens )
      //        debug({ pair: fens.map((r) => r.pair) })
              //debug('' + locations)

              fens.map(function (res) {
                  // in fens group bidimap sleection reslults
                  // a-relation-side: group names
                  // b-relation-side: group qualities (FEN form)            
                  var fen = res.pair.b;

                  // in locatiions bidimap
                  //  a-relation-side: quality (FEN form)
                  //  b-relation-side: ref

                  var locs = locations.select({ a: fen, b: '*' }).map(function (r) { return r.pair.b; });

                  results.push.apply(results, locs);
              });

              log('found refs: count = ' + results.length);
              debug({ results: results });

              return results
          };

          var fork = function () {
              var forked = create_board();

              log('# board.fork');

              refs.map (function (ref) {
                  forked.place(ref, whois(ref)); 
              });
             
              return forked
          };

          var toString = function () {
              var texts = ['### BOARD ###', ''];
              var EXPANDED_COLS = ['-'].concat(COLS).concat(['+']);
              var EXPANDED_ROWS = ['+'].concat(REV_ROWS).concat(['-']);        

              EXPANDED_ROWS.forEach(function (row) {
                  var line = [];
              
                  EXPANDED_COLS.forEach(function (col) {
                      var ref = col + row;
      //                const piece = locations.has(ref) ? locations.get(ref) : '.'
                      var piece = whois(ref);

                      var slot = '. ';
                      
                      if (['--', '-+', '+-', '++'].indexOf(ref) > -1) {
                          slot = '# ';
                      } else if(['-', '+'].indexOf(ref[0]) > -1) {
                          slot =  ref[1] + ' '; 
                      } else if(['-', '+'].indexOf(ref[1]) > -1) {
                          slot =  ref[0] + ' ';
                      } else if(piece) {
                          slot = piece + ' ';
                      }
                      
                      line.push(slot);
                  });        
                  
                  texts.push(line.join(''));
              });
              
              return texts.join('\n') + '\n'
          };

          var api = {
              whois: whois,
              place: place,  
              remove: remove, 
              select: select, 
              fork: fork,
              toString: toString
          };

          return api
      };

      var defaults =  new Map([

          ['ply-turn', 0],
          ['half-turn', 0],
          ['current-player', 'white'],
          ['black-O-O-O', true],
          ['black-O-O', true],
          ['white-O-O-O', true],
          ['white-O-O', true],        
          ['en-passant' , '**'],
          ['is-check', false],
          ['is-end', false],
          ['is-legal', true],
          ['is-gas', false]
      ]);

      var keys = Array.from(defaults.keys());

      var create_flags = function (options) {

          var pairs = new Map();
          
          var set_pair = function (key, value) {
              var ok = false;

              if (pairs.has(key)) {
                  pairs.set (key, value);
                  ok = true;
              }
              
              return ok
          };
       
          var get_pair = function (key) {

              if (pairs.has(key)) {
                  return { key: key, value: pairs.get(key) }
              }

              return null
          };
       
          var fork = function () {
              var forked = create_flags();

              keys.map(function (key) {
                  var pair = get_pair(key);
       
                  forked.set_pair(key, pair.value );
              });
              
              return forked
          };

          /// clones and export all flags pairs
          var get_all_pairs = function () {
              var results = [];

              keys.map(function (key) {
                  var pair = get_pair(key);

                  results.push(pair);
              });

              return results
          };

          var toString = function () {
              var texts = ['### FLAGS ###', ''];
              
      //        items.forEach ((v, k ) => texts.push('\t' + [k, v ].join (': ')))
              get_all_pairs().map(function (pair) { return texts.push(((pair.key) + ": " + (pair.value))
              ); });

              return texts.join ('\n') + '\n'
          };

       //   defaults.forEach ((v, k) => items.set (k, v))
          keys.map(function (key) {
              var value = defaults.get(key);

              pairs.set(key, value);
          });

          return { 
              set_pair: set_pair, 
              get_pair: get_pair,
              get_all_pairs: get_all_pairs,
              fork: fork, 
              toString: toString }
      };

      var create_captures = function (options) {
       
          var pieces = [];
       
          var submit = function (piece) {
              if(!piece) { return null }
          
              pieces.push ( piece );
          };
       
          var list = function (side) {
              return pieces.filter (function (piece) { return piece.side === side; })
          };

          var fork = function () {
              var forked = create_captures();
          
              pieces.forEach(function (piece) { return forked.submit(piece); });
              
              return forked
          };

          var toString = function () {
              var texts = ['### CAPTURES ###'];
              
              
              
              return texts.join ('\n') + '\n'
          };
       
          return {
              submit: submit, list: list,  fork: fork, toString: toString
          }   
      };

      /*
          ray kinds:
          - DELTA:   both attacking and moving
          - OFFSET:  only moves, without attack and capture
          - CAPTURE: only capture move, triggered only by enemy piece
      */
      var RAY_DELTA = 'ray-delta';
      var RAY_OFFSET = 'ray-offset';
      var RAY_CAPTURE = 'ray-capture';

      var create_raycaster = function () {
          var starting = new Map();
          var tracking = new Map();

          var cast = function (side, kind, sequence) {

              // const started_hits = []
              var hits = [];

              var ray = { side: side, kind: kind, sequence: sequence, shadow: 0 };

              if([RAY_DELTA, RAY_OFFSET, RAY_CAPTURE].indexOf(kind) === -1)
                  { throw new Error('[X] internal error: raycaster.cast invalid ray kind: ' + kind) }

              if(['black', 'white'].indexOf(side) === -1)
                  { throw new Error('[X] internal error: raycaster.cast invalid ray side: ' + side) }

              if(Array.isArray(sequence) === false)
                  { throw new Error('[X] internal error: raycaster.cast invalid ray sequence array !') }

              // exit if ray sequence is not relevant
              if(sequence.length < 2) { return null }

              sequence.map(function (sref, sidx) {
                  var started = starting.get(sref);
                  var tracked = tracking.get(sref);

                  if(sidx === 0) {
                      started.push(ray);
                      hits.push.apply(hits, tracked);
                  } else {
                      tracked.push(ray);

                  }
              });

              // shadow newly creted ray
              sequence.map(function (sref, sidx) {
                  var started = starting.get(sref);

                  if(sidx === 0) { return null }

                  // some ray starts at sref
                  if(started.length > 0) {
                      if(ray.shadow === 0) { ray.shadow = sidx; }
                      if(sidx < ray.shadow)  { ray.shadow = sidx; }
                  }
              });

              // shadowing existing rays
              hits.map(function (another_ray) {
                  var anhidx = another_ray.sequence.indexOf(sequence[0]);

                  if(anhidx === -1) { return null }
                  if(another_ray.shadow === 0) { another_ray.shadow = anhidx; }
                  if(anhidx < another_ray.shadow) { another_ray.shadow = anhidx; }
              });

      //        log('raycaster.cast')
      //        log(ray_format(ray))
          };

          /**
          * get accessible refs from ref
          */
          var get_dests_for = function (ref) {
              var obj;

              var started = starting.get(ref);    
              var results = [];

              // are there starting rays from here ?
              if(started.length > 0) {
                  started.map(function (sray) {
                      
                      sray.sequence.map(function (seqref, seqidx) {
                          var others = starting.get(seqref);

                          // skip other tests for starting position of current ray
                          if(seqidx === 0) { return null }

                          // skip other tests if we're other the shadow
                          if(0 < sray.shadow && sray.shadow < seqidx) { return null }
                          // if(seqidx === sray.shadow && ray.kind === RAY_OFFSET) return null

                          // capturing rays are not triggered by empty tiles !!!
                          if(others.length == 0 && sray.kind === RAY_CAPTURE) { return null }

                          // MUST NOT capture a friend piece !!!
                          if(others.length > 0 && others[0].side === sray.side) { return null }


                        
                          results.push(seqref);
                      });
                  });
              }        

              log('get_dests_for ref=' + ref + ', count=' + results.length);
              debug(( obj = {}, obj[ref] = results, obj ));
              
              return results
          };

          /**
          * get ray starting refs for ref square
          */
          var get_starts_to = function (ref) {
              var tracked = tracking.get(ref);
              var results = [];

              // log(`\n\t # tracked on ref=${ ref } count=${ tracked.length }`)

              if(tracked.length > 0) {
                  tracked.map(function (tray) {
      //                log(ray_format(tray))

                      var tidx = tray.sequence.indexOf(ref);

      //                console.log({ tidx, shadow: tray.shadow })
                      if(tidx === 0) { return null }
                      if(tray.shadow > 0 && tidx > tray.shadow) { return null }
                      if(tray.kind === RAY_OFFSET && tidx <= tray.shadow) { return null }
                      // console.log('PUSH_RESULTS')
                      results.push(tray.sequence[0]);
                  });            
              }

              //log('\t get_starts_to ref=' + ref + ', count=' + results.length)
              // log('\t results: ' + results.join(', '))
              // debug({ [ref]: results })

              return results
          };

          /**
          * get pressions balance for the "ref"square
          */
          var get_pressions = function (ref) {
              var tracked = tracking.get(ref);
              var black = 0;
              var white = 0;
              
              tracked.map(function (tray) {
                  var tidx = tray.sequence.indexOf(ref);

                  if(tray.kind === RAY_OFFSET) { return null }

                  if(tidx === 0) { return null }
                  if(0 < tray.shadow && tray.shadow < tidx) { return null }
                  if(tray.side === 'black') { black++; }
                  if(tray.side === 'white') { white++; }
              }); 

              return { black: black, white: white }
          };

          var ray_format = function (ray) {
              var texts = ['RAY: ', ray.side, ray.kind];
              
              ray.sequence.map(function (sref, sidx) {
                  var separator = (0 < ray.shadow && ray.shadow <= sidx) ?  '#' : ' ';
                  
                  texts.push(separator + sref);

              });
              
              return texts.join(' ')
          };

          var format_rays_from = function (ref) {
              var started = starting.get(ref);
              var results = [];
              
              results.push('DEBUG raycaster rays from ref=' + ref);
              
              started.map(function (ray) {
                  results.push('\t' + ray_format(ray));
              });
              
              return results.join('\n')
          };    

          var toString = function () {
              var results = [];

              REV_ROWS.map(function (row) {
                  var line = [];
              
                  COLS.map(function (col) {
                      var ref = '' + col + row;
                      var pressions = get_pressions(ref);
                      var text = ref + ':' + pressions.black + ',' + pressions.white;
                      
                      line.push(text);
                  });
                  
                  results.push(line.join('  '));
              });
            
              return results.join('\n')
          };

          refs.map(function (ref) {
              starting.set(ref, []);
              tracking.set(ref, []);
          });

          return {
              cast: cast,
              get_dests_for: get_dests_for,
              get_starts_to: get_starts_to,
              get_pressions: get_pressions,
              toString: toString,
              format_rays_from: format_rays_from
          }
      };

      var create_position = function (other) {
          var board = other ? other.board.fork() : create_board();
          var flags = other ? other.flags.fork() :create_flags();
          var captures = other ? other.captures.fork() : create_captures();        
          var raycaster = create_raycaster();

          var toString = function () {
      //        console.log ('position.toString')
      //        console.log (board)
          
              return [
                  board, captures, flags
              ].join('\n')
          };

          var prettified = function () {
              var lines = [];
              var spaces_8 = ' '.repeat(8);
              var newlines_8 = (spaces_8 + '\n').repeat(8).split('\n').slice(0, 8);
              var board_lines = board.toString().split('\n').concat(newlines_8).slice(0, 16);
              var flags_lines = flags.toString().split('\n').concat(newlines_8).slice(0, 16);

              lines.push(('#### Colorchess position (pretty print) ####').padEnd(64, ' '));
              lines.push(spaces_8.repeat(8));

              for(var i = 0; i < 16; i++) {
                  lines.push(((spaces_8 + board_lines[i]).padEnd(32, ' ') + flags_lines[i]).padEnd(64, ' '));
              }

              lines.push('');
              lines.push('Captured:');
              lines.push('White:  ');
              lines.push('Black:  ');

              return lines.slice(0, 24).join('\n')
          };

          var api = {
              toString: toString, prettified: prettified
          };
          
          Object.defineProperty(api, 'board', { 
              get: function () { return board; } 
          });
          
          Object.defineProperty(api, 'flags', { 
              get: function () { return flags; } 
          });

          Object.defineProperty(api, 'captures', { 
              get: function () { return captures; } 
          });
          
         Object.defineProperty(api, 'raycaster', { 
              get: function () { return raycaster; } 
         });


          return api
      };

      var create_context = function (options) {

          var trie = toolkit.create_trie({});
          var current_path = '';
          
          var toString = function () {
              var text = '';
              var current_position = trie.value (current_path);
          
              text += current_position.prettified() + '\n';
              text += 'path: '  + current_path + '\n';
              text += 'futures: ' + '#' + get_futures().length + '.\n';
          
              text += 'illegals: ' + get_futures().filter(function (subpath) {
                  var ref = peek(current_path + '/' + subpath );
                  var flags = ref.flags;

                  return flags.get_pair('is-legal').value === false
              }).map(function (subpath) {
                  return 'ILLEGAL; ' + subpath
              }).length;
          
              text += '\n\n\n';

              return text
          };

          var setup = function (position) {
              trie.attach('', '#init!', position);
              current_path += '#init!';
          };
          
          var fork = function (selector, subpath, is_gas) {
              var src = trie.value(selector);
              var dest = null;
              
              if(!src) { return null }

              dest = create_position(src);
              dest.flags.set_pair('is-gas', is_gas);
              trie.attach(selector, subpath, dest);

              return dest
          };

          var peek = function (selector) {
              log('# context.peek, with selector: ' + selector);
              
              return trie.value (selector)
          };

          var get_futures = function (options) {

              // return trie.subpaths(current_path)
              var subpaths = trie.subpaths(current_path);
      /*
              return subpaths.filter((subpath, sidx) => {
                  const selector = [current_path, subpath].join('/')
                  const position = peek(selector)
                  const { flags } = position
                  const legal_check = flags.get_pair('is-legal').value

      //            console.log({ [sidx]: legal_check })

                  return legal_check === true
              })
      */

              return subpaths
          };

          
          var push = function (subpath) {
              // history.push(subpath)
              current_path += '/' + subpath;
              
          };

          var pop = function (selector) {
          
          };

          var cutoff_branchs = function (selector) {
              return 0
          };

          ///
          /// WARNING
          /// possible performance bugs if depth is to big !
          /// depth should be less than 4
          /// Math.pow(40, 4) = 25600000...
          ///
          var stupid_subpaths = function (basepath, depth, aperture) {
              if ( aperture === void 0 ) { aperture = 1; }

              var range = (new Array(aperture)).fill(null);

              var lists = [
                  [basepath]
              ];

              console.log('ctx.stupid_subpaths');
              console.log('    depth = ' + depth );
              console.log('    aparture = ' + aperture );
              console.log('    basepath = ' + basepath );

              if(depth >= 0) {
                  range.map(function (_, idx) {
                      var nexties = [];

                      lists[idx].map(function (path) {
                          trie.subpaths(path).map(function (subpath) {
                              nexties.push(path + '/' +subpath);
                          });
                      });

                      lists.push(nexties);
                  });

                  
              } else {
                  lists = [[], ['#init!']];
              }

              console.log({ stupid_subpaths: lists });
      //        return lists.slice(depth, aperture)
              return lists    
          };
          
          var api = {
              setup: setup, push: push, pop: pop,
              fork: fork, peek: peek,
              get_futures: get_futures, 
              toString: toString,
              cutoff_branchs: cutoff_branchs,
              stupid_subpaths: stupid_subpaths
          };

          // API getter: current_path
          Object.defineProperty(api, 'current_path', {
              get: function () { return current_path; }
          });

          // API getter: current_position
          Object.defineProperty(api, 'current_position', {
              get: function () { return trie.value(current_path); }
          });

          return api
      };

      var king = function (side) {
          var name = side + '-' + 'king';

          var deltas = [
              { col: -1, row: -1 }, 
              { col: -1, row: 0 }, 
              { col: -1, row: 1 }, 

              { col: 0, row: 1 }, 
              { col: 0, row: -1 },                         

              { col: 1, row: -1 },                         
              { col: 1, row: 0 }, 
              { col: 1, row: 1 }
          ];

          var iterative = false;

          var fen = '';

          if(side === 'black') {
              fen = 'k';
          }

          if(side === 'white') {
              fen = 'K';
          }
          
          return { name: name, fen: fen, deltas: deltas, iterative: iterative, side: side }
      };

      var pawn = function (side) {
          var name = side + '-' + 'pawn';
          var deltas = [];
          var iterative = false;
          var fen = '';

          if(side === 'black') {
              fen = 'p';
          }

          if(side === 'white') {
              fen = 'P';
          }
          
          return { name: name, fen: fen, deltas: deltas, iterative: iterative, side: side }
      };

      var queen = function (side) {
          var name = side + '-' + 'queen';

          var deltas = [
              { col: -1, row: -1 }, 
              { col: -1, row: 0 }, 
              { col: -1, row: 1 }, 

              { col: 0, row: 1 }, 
              { col: 0, row: -1 },                         

              { col: 1, row: -1 },                         
              { col: 1, row: 0 }, 
              { col: 1, row: 1 }
          ];

          var iterative = true;

          var fen = '';

          if(side === 'black') {
              fen = 'q';
          }

          if(side === 'white') {
              fen = 'Q';
          }
          
          return { name: name, fen: fen, deltas: deltas, iterative: iterative, side: side }
      };

      var rook = function (side) {
          var name = side + '-' + 'rook';

          var deltas = [
              { col: -1, row: 0 }, 
              { col: 0, row: 1 }, 
              { col: 0, row: -1 },                         
              { col: 1, row: 0 } ];

          var iterative = true;

          var fen = '';

          if(side === 'black') {
              fen = 'r';
          }

          if(side === 'white') {
              fen = 'R';
          }
          
          return { name: name, fen: fen, deltas: deltas, iterative: iterative, side: side }
      };

      var bishop = function (side) {
          var name = side + '-' + 'bishop';

          var deltas = [
              { col: -1, row: -1 }, 
              { col: -1, row: 1 }, 
              { col: 1, row: -1 },                         
              { col: 1, row: 1 }
          ];

          var iterative = true;

          var fen = '';

          if(side === 'black') {
              fen = 'b';
          }

          if(side === 'white') {
              fen = 'B';
          }
          
          return { name: name, fen: fen, deltas: deltas, iterative: iterative, side: side }
      };

      var knight = function (side) {
          var name = side + '-' + 'knight';

          var deltas = [
              { col: -1, row: -2 }, 
              { col: -1, row: 2 }, 
              { col: -2, row: 1 }, 
              { col: -2, row: -1 }, 

              { col: 1, row: -2 }, 
              { col: 1, row: 2 }, 
              { col: 2, row: 1 }, 
              { col: 2, row: -1 } ];

          var iterative = false;

          var fen = '';

          if(side === 'black') {
              fen = 'n';
          }

          if(side === 'white') {
              fen = 'N';
          }
          
          return { name: name, fen: fen, deltas: deltas, iterative: iterative, side: side }
      };

      var qualities = [king, queen, rook, pawn, knight, bishop];

      var aliases = new Map();

      var create_piece = function (options) {
          var ots = ({}).toString.call(options);
          var piece = null; 
          
      //    console.log('create_piece', options)
          
          if(ots === '[object String]') {
              if(aliases.has(options)) {
                  piece = aliases.get(options);
              }
          } else if(ots === '[object Object]') {
              /// recursive call
              piece = create_piece(opttions.side + '-' + options.quality);
          }
          
          return piece
      };

      String.prototype.piece = function() {
          return create_piece(this)
      };

      /*
      aliases.set('k', king('black'))
      aliases.set('K', king('white'))
      aliases.set('black-king', king('black'))
      aliases.set('white-king', king('white'))
      */

      qualities.forEach(function (quality) {
          var black_piece = quality('black');
          var white_piece = quality('white');
          
          aliases.set(black_piece.name, black_piece);  
          aliases.set(white_piece.name, white_piece);  
          aliases.set(black_piece.fen,  black_piece);  
          aliases.set(white_piece.fen,  white_piece);      
      });

      // console.log(aliases)

      var cast_delta_moves = function (ctx, params) {
          var selector = params.selector;
          var position = ctx.peek(selector);
          var board = position.board;
          var flags = position.flags;
          var captures = position.captures;
          var raycaster = position.raycaster;    
          var locations = board.select('delta');

          log('## RULE: cast-deltas');
          debug({ params: params });
          debug({ locations: locations });

          locations.forEach(function (ref) {
              var fen = board.whois(ref);
              var piece = create_piece(fen);
              
              piece.deltas.forEach(function (deltas) {
                  var sequence = ref.sequence(deltas, piece.iterative);

       //           console.log( piece.name, sequence.join(','))
                  raycaster.cast(piece.side, RAY_DELTA, sequence);    

             });             
          });
      };

      var make_delta_moves = function (ctx, params) {
          var selector = params.selector;
          var position = ctx.peek(selector);
          var board = position.board;
          var flags = position.flags;
          var captures = position.captures;
          var raycaster = position.raycaster;    
          var locations = board.select('delta');
          
          log('# rule: make_delta_moves');
          debug({ params: params });
          debug({ locations: locations });

          locations.map(function (starting_ref) {
              var fen_to_move = board.whois(starting_ref);
              var piece_to_move = create_piece(fen_to_move);
              var targets = raycaster.get_dests_for(starting_ref);
              var side_to_move = flags.get_pair('current-player').value;

      //        console.log(flags.value('side-turn'))
              if(piece_to_move.side !== side_to_move) { return null }
              
              targets.map(function (target_ref) {
                  var subpath = [starting_ref, target_ref].join(':');
                  var fen_captured = board.whois(target_ref);
                  var piece_captured = create_piece(fen_captured); 
                  var forked;
                  
                  if (piece_captured && piece_captured.side === piece_to_move.side) { return null }

                  forked = ctx.fork(selector, subpath);

                  forked.board.remove(starting_ref);
                  forked.board.remove(target_ref);
                  forked.board.place (target_ref, piece_to_move);
                  
                  if(piece_captured) { forked.captures.submit(piece_captured); }
              });
          });
      };

      var black = new Map();
      var white = new Map();

      black.set('name', 'black');
      black.set('delta-row', -1);
      black.set('start-row', 7);
      black.set('promote-row', 1);
      black.set('O-O-king', ['e8', 'f8', 'g8']);
      black.set('O-O-rook', ['h8', 'g8', 'f8']);
      black.set('O-O-O-king', ['e8', 'd8', 'c8']);
      black.set('O-O-O-rook', ['a8', 'b8', 'c8', 'd8']);
         
      white.set('name', 'white');
      white.set('delta-row', 1);
      white.set('start-row', 2);
      white.set('promote-row', 8);
      white.set('O-O-king', ['e1', 'f1', 'g1']);
      white.set('O-O-rook', ['h1', 'g1', 'f1']);
      white.set('O-O-O-king', ['e1', 'd1', 'c1']);
      white.set('O-O-O-rook', ['a1', 'b1', 'c1', 'd1']);

      var sides = { black: black, white: white };

      var get_side_param = function (name, key) {
          var side = sides[name];

          if(side) {
              return {
                  name: name, key: key, value: side.get(key)
              }
          }
              
          return { error: 'no side named: ' + name}
      };

      /*
      const next = (position, options) => {
          const CURRENT_PLAYER = 'current-player' 
          const gas = options.gas || false
          const cp = position.flags.value(CURRENT_PLAYER)
          
          if(!gas) {
              switch(cp) {
      -            case 'black': 
                      position.flags.setup(CURRENT_PLAYER, 'white')
                  break            
                  case 'white': 
                      position.flags.setup(CURRENT_PLAYER, 'black')
                      break            
              }
          
          }
      }

      export const sides = {
          black, white, 
          next
      }
      */

      var cast_pawn_moves = function (ctx, params) {
          var selector = params.selector;
          var position = ctx.peek(selector);
          var board = position.board;
          var flags = position.flags;
          var captures = position.captures;
          var raycaster = position.raycaster;    
          var side_to_move = flags.get_pair('current-player').value;
          var locations = board.select('pawn');

          log('cast-pawns-moves');
          log('side_to_move:' + side_to_move);
          debug({ params: params });
          debug({ locations: locations });

          locations.forEach(function (ref) {
              var fen = board.whois(ref);
              var piece = create_piece(fen);
              var delta_row = get_side_param(piece.side, 'delta-row').value;
              var start_row = get_side_param(piece.side, 'start-row').value;

              debug('' + board);
              debug({ delta_row: delta_row, start_row: start_row });
              
              // simple move
              var sms = ref.sequence({ col: 0, row: delta_row}, false);
              raycaster.cast(piece.side, RAY_OFFSET, sms);
              
              // capture move
              var c1 = ref.sequence({ col: -1, row: delta_row}, false);
              raycaster.cast(piece.side, RAY_CAPTURE, c1);

              var c2 = ref.sequence({ col: 1, row: delta_row}, false);
              raycaster.cast(piece.side, RAY_CAPTURE, c2);        
       
      //        console.log({ sms, c1, c2})
              
              // first move
              
               if(piece.side === side_to_move && ref[1] == start_row) {
                   var fms = ref.sequence({ col: 0, row: delta_row}, true).slice(0, 3);
                   raycaster.cast(piece.side, RAY_OFFSET, fms);
                   
      //             console.log({ fms })
               }
               //promotion
               
               // en-passant capture move
          });
      };

      var promoted = function (side) {
          if(side === 'black') { return 'q,r,b,n'.split(',') }
          if(side === 'white') { return 'Q,R,B,N'.split(',') }
          return [] // do not promote if neutral...
      };

      var make_pawn_moves = function (ctx, params) {
          var selector = params.selector;
          var position = ctx.peek(selector);
          var board = position.board;
          var flags = position.flags;
          var captures = position.captures;
          var raycaster = position.raycaster;    

      //    const locations = board.select('pawn')
      //    const side_to_move = flags.get_pair('current-player').value
          var futures = [];

          var proponent = flags.get_pair('current-player').value;
          var opponent = (proponent === 'white') ? 'black' : 'white';

          var our_pawns_refs = board.select(['pawn', proponent]);
          var all_their_refs = board.select([opponent]);

          log('# RULE: make-pawn-moves');
          log('\t our_pawns_refs count =' + our_pawns_refs.length);


          debug({ params: params });
          debug({ our_pawns_refs: our_pawns_refs, all_their_refs: all_their_refs });

          our_pawns_refs.map(function (src_ref, sridx) {
              var dests = raycaster.get_dests_for(src_ref);

              log('    trying move #' + sridx + ' from ref = ' + src_ref);        
      //        debug({ dests })        
              log('\t' + dests.join(', '));
              log('\t' + dests.length);

              dests.map(function (dest_ref, drix) {
                  var attacker_refs = raycaster.get_starts_to(dest_ref);
                  var subpath = [src_ref, dest_ref].join(':');        

                  if(attacker_refs.indexOf(src_ref) === -1) { return null }

      //            if(piece_to_move.side !== side_to_move) return null
      //            if(is_attacker && !piece_capture) return null
      //            if(!is_attacker && piece_capture) return null


                  if(dest_ref[1] === get_side_param(proponent, 'promote-row') ) {
                      promoted(proponent).map(function (promoted_fen) {
                          futures.push(subpath + '=' + promoted_fen);
                      });
                  } else {
                      futures.push(subpath);
                  }
              });
          });
       
          log('    found futures, count = ' + futures.length);    

          futures.map(function (subpath) {
              var forked = ctx.fork(selector, subpath);

              // a2:a4
              // b7:b8=Q
              var src = subpath.substr(0, 2);
              var dest = subpath.substr(3, 2);
              var fen_promote = subpath.substr(6, 1); // more often an empty string...

              var fen_attacker = forked.board.whois(src);
              var fen_capture = forked.board.whois(dest);

              forked.board.remove(src);
              forked.board.remove(dest);
         
              if(fen_promote === '') {
                  forked.board.place(dest, fen_attacker);
              } else {
                  forked.board.place(dest, fen_promote);
              }
                  
             if(fen_capture) { forked.captures.submit(fen_capture); }
         });    
      };

      var cast_castling_moves = function (ctx, params) {
          var selector = params.selector;
          var position = ctx.peek(selector);
          var board = position.board;
          var flags = position.flags;
          var captures = position.captures;
          var raycaster = position.raycaster;    

          var castling_infos= [
              { player: 'black', castle: 'O-O'},
              { player: 'black', castle: 'O-O-O'},
              { player: 'white', castle: 'O-O'},
              { player: 'white', castle: 'O-O-O'}
          ];

          log('## RULE: cast-castling-moves');
          debug({ params: params });

          castling_infos.map(function (infos) {
              var flag_name = infos.player + '-' + infos.castle;
              var king_path = get_side_param(infos.player, infos.castle + '-king').value;
              var rook_path = get_side_param(infos.player, infos.castle + '-rook').value;
              var king_refs = board.select(['king', infos.player]);
              var rook_refs = board.select(['rook', infos.player]);

              debug({ flag_name: flag_name, king_path: king_path, rook_path: rook_path });
              debug({ king_refs: king_refs, rook_refs: rook_refs });

              // a quick'n'dirty legality check hre...
              if(king_refs.length !== 1) { flags.set_pair('is-legal', false); }

              // exit with message ?
              if(flags.get_pair(flag_name).value === false) { return null }

              // if conditions are satisafied, castle castling flags
              // otherwise the flag falls down
              if(king_path[0] === king_refs[0] && rook_refs.indexOf(rook_path[0] > -1)) {
                  raycaster.cast(infos.player, RAY_OFFSET, king_path);
                  raycaster.cast(infos.player, RAY_OFFSET, rook_path);
              } else {
                  flags.set_pair(flag_name, false);
              }
          });
      };

      var make_castling_moves = function (ctx, params) {
          var selector = params.selector;
          var position = ctx.peek(selector);
          var board = position.board;
          var flags = position.flags;
          var captures = position.captures;
          var raycaster = position.raycaster;    

          var castlings = ['O-O', 'O-O-O'];

          var proponent = flags.get_pair('current-player').value;
          var opponent = null;

          // @TODO: could be directly set in flags ?
          if(proponent === 'black') { opponent = 'white'; }
          if(proponent === 'white') { opponent = 'black'; }

          log('# rule: make_castling_moves');
          debug({ params: params });

          castlings.map(function (castle) {
              var flag_name = proponent + '-' + castle;
              var king_path = get_side_param(proponent, castle + '-king').value;
              var rook_path = get_side_param(proponent, castle + '-rook').value;    
              var kpn = king_path[king_path.length - 1];
              var rpn = rook_path[rook_path.length - 1];

              var ok_king = true;
              var ok_rook = true;
              var forked, subpath;
              var fen_king, fen_rook;

              if(flags.get_pair(flag_name).value === false) { return null }

              // could the king pass ?
              if(raycaster.get_dests_for(king_path[0]).indexOf(kpn) === -1) { ok_king = false; }

              // is there a checking position ??
              king_path.map(function (ref, ridx) {
                  var pressions = raycaster.get_pressions(ref);

                  if(pressions[opponent] > 0) { ok_king = false; }
              });

              // rook path
              if(raycaster.get_starts_to(rpn).indexOf(rook_path[0]) === -1) { ok_rook = false; }

              console.log({
                  king_path: king_path,
                  rook_path: rook_path,              
                  ok_king: ok_king,
                  ok_rook: ok_rook,
              });

              if(ok_king && ok_rook) {
                  subpath = [king_path[0], king_path[2]].join(':');
                  forked = ctx.fork(selector, subpath);
                  
                  fen_king = forked.board.whois(king_path[0]);
                  fen_rook = forked.board.whois(rook_path[0]);

                  forked.board.remove(king_path[0]);
                  forked.board.remove(rook_path[0]);
                  forked.board.place(kpn, fen_king);
                  forked.board.place(rpn, fen_rook);

                  // the two castling flags fall down simultaneously when castling
                  forked.flags.set_pair(proponent + '-O-O', false);
                  forked.flags.set_pair(proponent + '-O-O-O', false);
              }
          });
      };

      var test_kings = function (position, checking_mode) {
          var board = position.board;
          var flags = position.flags;
          var raycaster = position.raycaster;

          var proponent, opponent;
          var ours, theirs;

      //    if(checking_mode === 'check-present') {
              proponent = flags.get_pair('current-player').value;
               // @TODO: put this logic inside flags...
              opponent = (proponent === 'white') ? 'black' : 'white';

      //    } 

      //    if(checking_mode === 'anticipate-future') {
      //        proponent = flags.get_pair('current-player').value
               // @TODO: put this logic inside flags...
      //        opponent = (proponent === 'white') ? 'black' : 'white'
      //    }

          // @TODO: needs to perform some checks for arrays safety !!!
          ours = board.select(['king', proponent]);
          theirs = board.select(['king', opponent]);

      //    console.log({ proponent, opponent, ours, theirs })

          var checks = 0;
          var illegals = 0;

         // just one king per side !!!
          if(ours.length === 1 && theirs.length === 1) {
      //        console.log(ours[0], raycaster.get_pressions(ours[0]))
      //        console.log(theirs[0], raycaster.get_pressions(theirs[0]))

              // does our king being under attack ?
              if(raycaster.get_pressions(ours[0])[opponent] > 0) {
                  flags.set_pair('is-check', true);

                  if(checking_mode === 'anticpate_future') {
                      flags.set_pair('is-legal', false);
                  }
              } else {
                  flags.set_pair('is-check', false);
              }

              // does thir king being under attack ?
              if(raycaster.get_pressions(theirs[0])[proponent] > 0) {
                  flags.set_pair('is-check', true);
                  flags.set_pair('is-legal', false);
              } 




          } else {
              // in some variations, king could be captured --> illegal
              flags.set_pair('is-legal', false);
              illegals++;
          }

      //    console.log({ checks, illegals })
          return { checks: checks, illegals: illegals }
      };

      var test_checkings = function (ctx, params) {
          var selector = params.selector;
          var current_path = ctx.current_path;
          var current_position = ctx.current_position;

          var subpaths = ctx.get_futures();

      //    console.log('# rule: test-checking selector=' + selector)
          //debug({ params })  

          test_kings(current_position, 'check-present');

          subpaths.map(function (subpath) {
              var f_selector = current_path + '/' + subpath;
              var future_position = ctx.peek(f_selector);

      //        console.log({ f_selector, future_position })
              
              test_kings(future_position, 'anticapte-future');
          });
      };

      var test_ending = function (ctx, params) {

          var selector = params.selector;
          var position = ctx.peek(selector);
          var board = position.board;
          var flags = position.flags;
          var captures = position.captures;
          var raycaster = position.raycaster;    

          var futures = ctx.get_futures();

          var illegals = 0;

          futures.map(function (subpath) {
              var ref = ctx.peek(selector + '/' + subpath);
              var flags = ref.flags;

              if(flags.get_pair('is-legal').value === false) {
      //            console.log('ILLEGAL VARIATION')
                  illegals++;
              }
          });

      //    console.log('futures #=' + futures.length)
      //    console.log({ illegals })

          if(futures.length === illegals) {
              flags.set_pair('is-end', true);
          } else {
              flags.set_pair('is-end', false);
          }    
      };

      var ply_turn = function (ctx, params) {
          var selector = params.selector;
      //    const position = ctx.peek(selector)
      //    const { board, flags, captures, raycaster } = position    
          var futures = ctx.get_futures();

          log('# rule: ply-turn');
          debug({ params: params });  

          futures.map(function (selector) {
              var path = ctx.current_path + '/' + selector;
              var position = ctx.peek(path);
              var board = position.board;
              var flags = position.flags;
              var captures = position.captures;
              var raycaster = position.raycaster;
              var side_to_move = flags.get_pair('current-player').value;
              var ply_turn = flags.get_pair('ply-turn').value;
              var half_turn = flags.get_pair('half-turn').value;

              switch(side_to_move) {
                  case 'black':
                      flags.set_pair('current-player', 'white');
                  break

                  case 'white':
                      flags.set_pair('current-player', 'black');
                  break
              }

              flags.set_pair('half-turn', 1 - half_turn);        

              flags.set_pair('ply-turn', ply_turn + half_turn);
          });    
      };

      // @TODO !!!
      // importing { filty_moves } from '../rules/filthy_moves.js'

      /*
          I+0: SELECT MOVE
          ...: (skip)
          I+4: makes
          I+4: ply-turn
          I:5: casts
          I+5: test-checkings
          I+5: test-filthy-moves
          I+4: test-ending
          I+4: CLEANUP
      */

      var create_generator = function (ctx) {

          // @TODO: MUST be in context
          var history = [];
          
          // cleans dead postions in lookup
          var cleanup = function (ctx, options) {
              var selector = options.selector;
              var ref = ctx.peek(selector);
              var flags = ref.flags;

              if(flags.get_pair('is-legal') === false) ;
          };

          var pipeline = [
              { 
                  name: 'make-delta-moves',
                  action: make_delta_moves, 
                  work_on: 'present'
              },  { 
                  name: 'make-pawn-moves',
                  action: make_pawn_moves, 
                  work_on: 'present'
              },  { 
                  name: 'make-castling-moves',
                  action: make_castling_moves,
                  work_on: 'present'
              }, {
                  name: 'ply-turn',
                  action: ply_turn,
                  work_on: 'present'
              },

      /*
          {
              name: 'test-filty-moves',
              action: test_filthy_moves,
              subject: 'future'
          },
      */
              { 
                  name: 'cast-delta-moves',
                  action: cast_delta_moves,
                  work_on: 'futures'
              }, { 
                  name: 'cast-pawn-moves',
                  action: cast_pawn_moves,
                  work_on: 'futures'
              }, { 
                  name: 'cast-castling-moves',
                  action: cast_castling_moves,
                  work_on: 'futures'
              }, { 
                  name: 'test-checkings',        
                  action: test_checkings,
                  work_on: 'present'
              }, { 
                  name: 'test-ending',
                  action: test_ending,
                  work_on: 'present'
              }, { 
                  name: 'cleanup',    
                  action: cleanup,
                  work_on: 'futures'
              }
          ];

          // depth: positive number
          // work-on: 'present', or 'future

      //            paths.rewind()
      //            while (selectors.has_next()) {
      //                const selector = selector.get_next()
      //                const options = { selector }
      //           }            
      //

          var iterate = function (depth) {

              pipeline.map(function (rule, ridx) {
                  var action = rule.action;
                  var work_on = rule.work_on;
                  var paths = [];
                  var basepath = history.join('/');

      //            console.log({ basepath })

                  if(depth >=0) {
                      // console.log({ work_on, history })
                      
                      if(work_on === 'present') {
                          paths = [basepath];
                      } else {
                          paths = ctx.get_futures().map(function (subpath) {
                              return basepath + '/' + subpath
                          });
                      }
                  } else {
                      if(work_on === 'present') {
                          paths = [];
                      } else {
                          paths = ['#init!'];
                      }
                  }
                  
      //            console.log('generator.iterate', { basepath })
                  // console.log('iterate: rule ridx=' + ridx + ' name=' + rule.name)

      //                console.log('generator.iterate', { paths: paths.length })

                      paths.map(function (selector) {
                          var options = { selector: selector };

      //                    console.log('action: ', { selector }, '')
                          action(ctx, options);
                      });

                  // console.log('...')
              });

              // depth++    
          };

          // selector <-- path + '/' + subpath
          var setup = function () {
              depth = -1;
              iterate({ depth: depth});        
              depth = 0;
              history.push('#init!');
              iterate(depth);        
              
          };

          var process = function (options) {
              var selector = options.selector;

              depth++;

              history.push(selector);

      //        iterate({ depth, present })        
              iterate(depth);
          };

          var depth = -1;

          return {
              setup: setup, process: process
          }   
      };

      var create_standard_position = function () {
          var position = create_position();
       
           
          position.board.place('a1', 'R');
          position.board.place('b1', 'N');
          position.board.place('c1', 'B');
          position.board.place('d1', 'Q');
          position.board.place('e1', 'K');
          position.board.place('f1', 'B');
          position.board.place('g1', 'N');
          position.board.place('h1', 'R');

          position.board.place('a2', 'P');
          position.board.place('b2', 'P');
          position.board.place('c2', 'P');
          position.board.place('d2', 'P');
          position.board.place('e2', 'P');
          position.board.place('f2', 'P');
          position.board.place('g2', 'P');
          position.board.place('h2', 'P');

          position.board.place('a7', 'p');
          position.board.place('b7', 'p');
          position.board.place('c7', 'p');
          position.board.place('d7', 'p');
          position.board.place('e7', 'p');
          position.board.place('f7', 'p');
          position.board.place('g7', 'p');
          position.board.place('h7', 'p');

          position.board.place('a8', 'r');
          position.board.place('b8', 'n');
          position.board.place('c8', 'b');
          position.board.place('d8', 'q');
          position.board.place('e8', 'k');
          position.board.place('f8', 'b');
          position.board.place('g8', 'n');
          position.board.place('h8', 'r');

          log ('src/assets/standard-position.js: position');
          debug ("" + position);

          return position
      };

      var ops_setup = function (ctx, generator, options) {
          var standard_position = create_standard_position();
          var products = new Array();

          log('# setting up game...');
          
          if (options.fen) {
              log ('# ... with FEN');       

          } 

          if (options.pgn) {
              log ('# ... with PGN');            

          } 

          if(!options.fen && !options.pgn) {
              log ('basic setup, standard game');               

              ctx.setup(standard_position);        
              
      //        generator.process({
      //            selector: '#init!'
      //       })        

              generator.setup();

              log('ops_setup');
              log('found futures; count = ' + ctx.get_futures().length);
              debug({ futures: ctx.get_futures() });
          }
      };

      var make_selector = function (move) {
          var ots = ({}).toString.call(move);
          
          if(ots === '[object String]') {
              return move
          } else {
              return move.start + ':' + move.end + (promote? '=' + promote : '')
          }
      };

      var ops_play = function (ctx, generator, move) {
          log ('playing move...');
          debug({ move: move });
          
          var subpath = make_selector (move);   
        
          if(ctx.get_futures().indexOf(subpath) > -1) {
              ctx.push(subpath);
              
              log('ctx.current_path= ' + ctx.current_path );
              
              generator.process({
      //            selector: ctx.current_path
                  selector: subpath
              });        
              
              log('futures: ' + ctx.get_futures().length);
          } else {
              log('ops-play: error NO FUTURES for selection !');
      //        throw new Error('no-futures-to-play!')
          }
      };

      var ops_undo = function (ctx) {
          var gamestate = ctx.history.pop();
          var status = 'reverting: ok';

          ctx.futures.clear();
          
                  

          return status
      };

      /**
       * ColorChess engine factory
       * 
       * @param Object options
       * @returns ColorChess engine API object instance
       *
       *
       * options key/value pairs:
       * - debug: String "silent" "log" "debug"
       */
      var create_engine = function (options) {

          /* gamep operations (ops) */

          /**
           *  setup colorchess
           *  @see ./ops/setup.js for details
           */
          var setup = function () {
              return ops_setup (ctx, generator, options)
          };

          var play = function (move) {
              return ops_play(ctx, generator, move)
          };
              
          var undo = function (steps_count) {

              return ops_undo (ctx)
          };
          
          /* game state getters */

          /**
           *    whois (chessman) on tile identified by ref ? 
           */
          var get_whois = function (ref) {
              var position = ctx.current_position;

              return position.board.whois(ref)
          };

          /**
           *    get pressions balance  on tile identified by ref
           */
          var get_pressions = function (ref) {
              var position = ctx.current_position;

              return position.raycaster.get_pressions(ref)
          };
          
          /*
          * game flag for name
          * @see./core/flags.js for details
          */
          var get_flag = function (name) {
      //        const position = ctx.current_position
              
      //        return position.flags.get_pair(name).value
              return ctx.current_position.flags.get_pair(name).value
          };

          var get_flags_pairs = function () {
              var position = ctx.current_position;

              return position.flags.get_all_pairs( )
          };

          /**
           * captures list for given side
           */
          var get_captures = function (side) {
              return ctx.captured(side)
          };
          
          /**
          * game state stringification
          *
          * @returns String
          */
          var toString = function () {
      //        return ['ColorChess engine 2020', ctx].join ('\n\n')
              return ctx.toString()
          };

          var prettified = function () {
              var position = ctx.current_position;

              return position.prettified()
          };

          var get_futures = function () {
              return ctx.get_futures()
          };

          /**
          * game context { board, captured, flags }
          */
          var ctx = create_context ();

          /**
          * moves generator
          */
          var generator = create_generator (ctx);
          
          /* game API */
          var api = {
              play: play,
              undo: undo,
              get_whois: get_whois,
              get_pressions: get_pressions,
              get_flag: get_flag,
              get_captures: get_captures,
              get_flags_pairs: get_flags_pairs,
              toString: toString,
              prettified: prettified,
              get_futures: get_futures
          };

          setup_log_level (options.log_level || SILENT);
          setup ();
         
          return api
      };

      exports.create_engine = create_engine;

      Object.defineProperty(exports, '__esModule', { value: true });

  })));
  });

  var engine = dist.create_engine ({
      gas_level: 0    ,
      log_level: 0
  });

  var futures = engine.get_futures();

  console.log (''  + engine);

  console.log({ futures: futures }, futures.length);

  //separate()
  console.log ('#####', 'engine.play');
  //separate()

  // from wikipedia (mat de Legal, 1715)
  var sequence = "e2:e4 e7:e5 f1:c4 d7:d6 g1:f3 c8:g4 b1:c3 g7:g6 f3:e5 g4:d1 c4:f7 e8:e7 c3:d5";

  var moves = sequence.split(' ');
  // const moves = []
  // moves = moves.slice(0, 4)

  moves.map(function (move, midx) {
      try {
          console.log('== playing: ' + midx + ' ' + move + ' ======');
          engine.play(move);
          console.log('' + engine);
      } catch(error) {
          console.log('ERROR!');
      }
  });

})));
