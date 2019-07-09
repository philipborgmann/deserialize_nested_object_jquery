$(function() {
var myObj = {notNested: "nono", nestedElems: {001: {name: "hello"}, 002: {name: "test", secondvalue: "supertest"}}}

function index(obj,is, value) {
    if (typeof is == 'string')
        return index(obj,is.split('.'), value);
    else if (is.length==1 && value!==undefined)
        return obj[is[0]] = value;
    else if (is.length==0)
        return obj;
    else
        return index(obj[is[0]],is.slice(1), value);
}




 function QueryStringToJSON(objString) {
    var pairs = objString.split('&');

    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');

        result[pair[0]] = decodeURIComponent(pair[1] || '');

    });



    $.each( result, function( key, value ) {
      if(key.includes("]")){
        var tempKey = key;

        var splitKeys = key.split( /\[/g);
        var tempPath = []

        $.each(splitKeys, function( ind, splitvalue ) {
          tempPath.push(splitvalue.replace(/\[|\]/g,""))
          if ( typeof index(result, tempPath) == 'undefined' && ind + 1 < splitKeys.length){
            index(result, tempPath, {})
          } else if ( typeof index(result, tempPath) == 'undefined' && ind + 1 == splitKeys.length){
            index(result, tempPath, value)
          }

        });

      }
    });
    $.each( result, function( key, value ) {
      if(key.includes("]")){
        delete result[key];
      }
    });
    return result;
}


/* TESTING */
        console.log(myObj);
        var queryString = $.param(myObj);
        console.log(queryString);
        console.log(QueryStringToJSON(decodeURIComponent(queryString)).nestedElems[2]);

});
