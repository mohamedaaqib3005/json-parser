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
  if (!string.startsWith("null")) {
    return null;
  }
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
  if (string.startsWith("true")) {
    return [true, string.slice(4)];
  }

  if (string.startsWith("false")) {
    return [false, string.slice(5)];
  }

  return null;
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

  if (!string.startsWith('"')) {
    return null;
  }

  let i = 1;
  let result = "";

  while (i < string.length) {
    let char = string[i];

    if (char === '"') {
      return [result, string.slice(i + 1)];
    }

    if (char === "\\") {
      i++;

      if (i >= string.length) 
        return null;

      let esc = string[i];

      // const charMap = { '"': '"', '\\': '\\', '/': '/', 'b': '\b', }
      // if (charMap[esc]) {
      //   result += charMap[esc]
      }
      switch (esc) {
        case '"':
          result += '"';
          break;
        case "\\":
          result += "\\";
          break;
        case "/":
          result += "/";
          break;
        case "b":
          result += "\b";
          break;
        case "f":
          result += "\f";
          break;
        case "n":
          result += "\n";
          break;
        case "r":
          result += "\r";
          break;
        case "t":
          result += "\t";
          break;
        case "u":
          let hex = string.slice(i + 1, i + 5);
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) 
            return null;

          let code = parseInt(hex, 16);
          if (code >= 0 && code <= 31) 
            return null;
          result += String.fromCharCode(code);
          i += 4;
          break;

        default:
          return null;
      }
      i++;
    } else {
      if (char.charCodeAt(0) < 32) {
        return null;
      }
      result += char;
      i++;
    }
  }
  return null;
}

console.log(parseString('"\u0041"'));

 console.log(parseString('"name":"Sam"'))
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
function parseArray(string) {
  if (!string.startsWith("[")) {
    return null;
  } 
  let i = 1;

  function skipWhitespace() {
    while (/\s/.test(string[i])) 
      i++;
  }

  const arr = [];

  skipWhitespace();
  if (string[i] === "]") {
    return [arr, string.slice(i + 1)];

  }
  while (i < string.length) {
    skipWhitespace();

    const value = parseValue(string.slice(i));
    if (!value) {
      return null;

    }
    const [parsedValue, remaining] = value;
    arr.push(parsedValue);
    i = string.length - remaining.length;

    skipWhitespace();

    if (string[i] === "]") {
      return [arr, string.slice(i + 1)];

    } else if (string[i] === ",") {
      i++;
      continue;
    } else {
      return null;

    }
  }
  return null;

}
// console.log(parseArray("[1, 2, 3] rest"));
 console.log(parseArray("[a,c,v]"));
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
function parseObject(string) {
  if (!string.startsWith("{")) {
    return null;
  }

  let i = 1;
 
  function skipWhitespace() {
    while (/\s/.test(string[i])) 
      i++;
  }

  skipWhitespace();

  const obj = {};
  if (string[i] === "}") 
    return [obj, string.slice(i + 1)];

  while (i < string.length) {
    skipWhitespace();

    const keyResult = parseString(string.slice(i));
    if (!keyResult) 
      return null;

    const [key, remainingAfterKey] = keyResult;
    i = string.length - remainingAfterKey.length;

    skipWhitespace();

    if (string[i] !== ":") 
     return null;

     i++;

    skipWhitespace();

    const valueResult = parseValue(string.slice(i));
    if (!valueResult) 
      return null;

    const [value, remainingAfterValue] = valueResult;
    obj[key] = value;
    i = string.length - remainingAfterValue.length;

    skipWhitespace();

    if (string[i] === "}") {
      return [obj, string.slice(i + 1)];
    } else if (string[i] === ",") {
      i++;
      continue;
    } else {
      return null;

    }
  }
  return null;

}
// console.log(parseObject('{"{:}": 1}'));
console.log(parseObject('{"key{}":"value"}'));
console.log(parseObject('{"name":"Aaqib"}'));


function parseValue(string)  {
  string = string.trim();
  return (
    parseNull(string) ||
    parseBool(string) ||
    parseNumber(string) ||
    parseString(string) ||
    parseArray(string) ||
    parseObject(string)
  );
};
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
function parseJSON(string) {
  const result = parseValue(string.trim())

  if (!result){
    throw new Error ('Invalid Json')
  }

  const [value,rest] = result;
  return value;
}

