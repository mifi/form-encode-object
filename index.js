'use strict';

/* eslint-disable no-param-reassign */
function flattenObject(obj, ret = {}, prefix = '') {
  if (typeof obj === 'object' && obj != null) {
    Object.keys(obj).forEach((key) => {
      flattenObject(obj[key], ret, prefix === '' ? key : `${prefix}[${key}]`);
    });
  } else if (prefix !== '') {
    ret[prefix] = obj;
  }

  return ret;
}
/* eslint-enable no-param-reassign */

module.exports = flattenObject;
