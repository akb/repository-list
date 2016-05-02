// `prop` returns a function which acts as an accessor for a value. Calling
// the function with a value will set the value, calling the function without
// a value will return the value. The function has a `toJSON` method to make
// it compatible with `JSON.stringify()`
export function prop(value) {
  const accessor = (newValue) => {
    if (typeof newValue !== 'undefined') value = newValue;
    return value;
  };
  accessor.toJSON = () => value;
  return accessor;
}

// `resolve` accepts a `prop` function or a value and returns either the value
// or the value returned by the function
export function resolve(prop) {
  if (typeof prop === 'function')
    return prop();
  else
    return prop;
}

// `range` returns an array of consecutive integers from 0 to `count` - 1
export function range(start, end) {
  const array = [];
  if (typeof end === 'undefined') end = start, start = 0;
  for (let i = start; i < end; i++) array.push(i);
  return array;
}

// `merge` returns a new array consisting of the union of key/value pairs in
// `a` and `b` with the values in `b` taking precedence over those in `a`
export function merge(a, b) {
  const out = {}, aKeys = Object.keys(a), bKeys = Object.keys(b);
  aKeys.forEach((k) => out[k] = a[k]);
  bKeys.forEach((k) => out[k] = b[k]);
  return out;
}

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
export function cond(match) {
  match = resolve(match);

  let matched, conditional = {};

  conditional.when = (matcher, value) => {
    if (typeof matched !== 'undefined') return conditional;
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
      return resolve(matched);
    } else {
      return resolve(value);
    }
  };

  return conditional;
}

// `capitalize` returns a passed-in string with the first letter made
// uppercase
export function capitalize(string) {
  if (!string && string.length) return;
  return string[0].toUpperCase() + string.slice(1);
}
