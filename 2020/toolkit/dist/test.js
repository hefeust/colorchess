(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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

  // acceletor groups for piece selection
  var groups = create_bidimap();

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


  console.log( groups.toString() );

  var q1 = { a: ['black', 'king'], b: '*'};
  var q2 = { a: ['white', 'king'], b: '*'};

  console.log(q1, groups.select(q1));
  console.log(q2, groups.select(q2));

  console.log('ColorChess-Toolkit Tests');

})));
