class util {


 static log (message) {
    console.log(message);
  };

  static isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }
  
}  
  module.exports = util;