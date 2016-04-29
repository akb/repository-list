export var util = {
  // `prop` returns a function which acts as an accessor for a value. Calling
  // the function with a value will set the value, calling the function without
  // a value will return the value. The function has a `toJSON` method to make
  // it compatible with `JSON.stringify()`
  prop: (value) => {
    let accessor = (newValue) => {
      if (typeof newValue !== 'undefined') {
        value = newValue;
      }
      return value;
    };
    accessor.toJSON = () => value;
    return accessor;
  },

  // `cond` mimics LISP's (cond) function. A value or function returning a
  // value is passed to `cond` function. `when` calls are then chained on the
  // returned object until an `else` call is chained. When `else` is called,
  // the value for the last-matched `when` call is returned. If none of the
  // `when` calls produced a match, then the value passed to `else` is
  // returned.
  //
  // Example:
  //
  //     let color = 'blue';
  //
  //     let fruit = cond(color)
  //       .when('red', 'apple')
  //       .when('yellow', 'banana')
  //       .when('blue', 'blueberry')
  //       .else('must be a vegetable');
  //
  //     assert(fruit === 'blueberry');
  //
  cond: (match) => {
    if (typeof match === 'function') match = match();
    var matched;

    let conditional = {};
    conditional.when = (matcher, value) => {
      if (typeof matched !== 'undefined') return matched;
      let isMatch;
      switch(typeof matcher) {
        case 'function': isMatch = matcher(match); break;
        case 'regexp':   isMatch = matcher.exec(match); break;
        default:         isMatch = matcher === match;
      }

      if (isMatch) matched = value;
      return conditional;
    };

    conditional.else = (value) => {
      if (typeof matched !== 'undefined') {
        return matched;
      } else {
        return value;
      }
    }

    return conditional;
  },

  // `capitalize` returns a passed-in string with the first letter made
  // uppercase
  capitalize: (string) => {
    if (!string && string.length) return;
    return string[0].toUpperCase() + string.slice(1)
  }
};
