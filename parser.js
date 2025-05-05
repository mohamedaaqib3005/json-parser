/**
 * @param {string} string - The string to parse.
 * @returns {(Array|null)} array containing parsed value and rest of the string, null if parsing fails,.
 * @example
 *   parseNull('null rest')
 *   // => [null, ' rest']
 * @example
 *   parseNull('wabalabadubdub')
 *   // => null
 */
function parseNull(string) {
  if (!string.startsWith("null")) return null;

  const remaining = string.slice(4);
  return [null, remaining];
}
// console.log(parseNull("null$@$@$@fas"));

/**
 * @param {string} string - The string to parse.
 * @returns {(Array|null)} array containing parsed value and rest of the string, null if parsing fails,.
 * @example
 *   parseBool('false rest')
 *   // => [false, ' rest']
 * @example
 *   parseBool('wabalabadubdub')
 *   // => null
 */
function parseBool(string) {
  
  if (!string.startsWith("true") && !string.startsWith("false")) {
    return null;
  }
  if (string.startsWith("true")) return [true, string.slice(4)];
  return [false, string.slice(5)];
}
// console.log(parseBool("false333$@$@hfhsd"))

/**
 * @param {string} string - The string to parse.
 * @returns {(Array|null)} array containing parsed value and rest of the string, null if parsing fails,.
 * @example
 *   parseString('"UN" rest')
 *   // => ['UN', ' rest']
 * @example
 *   parseString('wabalabadubdub')
 *   // => null
 */
function parseString(string) {
  // const regex = /^"([\u0000-\u001F^"\\])*"/;

  // const match = string.match(regex);
  // if (!match) {
  //   return null;
  // }
  // const matchedString = match[0];
  // const remaining = string.slice(matchedString.length);

  return [matchedString, remaining];
    if (!input.startsWith('"')) return null;
     
    let i =1;
    while (i<input.length){
        if (input[i]=='"') return [result,remaining];
        if (input[i]=="\\") 
          i++ ;
    }
    
    let esc = input[i];
    
    switch (esc){
       case '"':
       result += '"';
       break;
       case "\\":
       result += "\\"
       break;
       case "/":
       result +="/";
       break;
       case "/b":
       result +="/b";
       break;
       case "/f":
        result +="/f";
        break;
        case "n":
          result +="/n";
          break;  
          case "/r":
            result +="/r";
            break;
            case "t":
           result += "\t"
           break;
           

            let hex = input.slice(i+1,i+5);
            if (!/^[0-9a-fA-F]{4}$/.test(hex))
             return null;
            let code=parseInt(hex,16)
          
            if (code >=0 && code <= 32){
                return null;
            }
            result+= String.fromCharCode(code);
            i+=4
            break;
            default:
              return null;
            
          }
         i ++;


         return null;
 
     
    


      

       }
      console.log(parseString("string566")) 
    
       



// console.log(parseString('"U\"N" rest'))
/**
 * @param {string} string - The string to parse.
 * @returns {(Array|null)} array containing parsed value and rest of the string, null if parsing fails,.
 * @example
 *   parseNumber('42 rest')
 *   // => [42, ' rest']
 * @example
 *   parseNumber('wabalabadubdub')
 *   // => null
 */
function parseNumber(string) {
  const regex = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/;
  const match = string.match(regex);
  if (!match) {
    return null;
  }
  const number = Number(match[0]);
  const remaining = string.slice(match[0].length);
  return [number, remaining];
}

/**
 * @param {string} string - The string to parse.
 * @returns {(Array|null)} array containing parsed value and rest of the string, null if parsing fails,.
 * @example
 *   parseArray('[1, 2, 3] rest')
 *   // => [[1, 2, 3], ' rest']
 * @example
 *   parseArray('wabalabadubdub')
 *   // => null
 */
function parseArray(string) {}

/**
 * @param {string} string - The string to parse.
 * @returns {(Array|null)} array containing parsed value and rest of the string, null if parsing fails,.
 * @example
 *   parseObject('{"a": 1} rest')
 *   // => [{a: 1}, ' rest']
 * @example
 *   parseObject('wabalabadubdub')
 *   // => null
 */
function parseObject(string) {}

/**
 * @param {string} string - The string to parse.
 * @returns {Object} array containing parsed value, throws error if parsing fails.
 * @throws Error
 * @example
 *   parseObject('{"a": 1} rest')
 *   // => [{a: 1}, ' rest']
 * @example
 *   parseObject('wabalabadubdub')
 *   // throws error
 */
function parseJSON(string) {}
