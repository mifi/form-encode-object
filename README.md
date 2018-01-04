# form-encode-object [![npm version](https://badge.fury.io/js/form-encode-object.svg)](https://badge.fury.io/js/form-encode-object) [![Build Status](https://travis-ci.org/mifi/form-encode-object.svg?branch=master)](https://travis-ci.org/mifi/form-encode-object) [![Known Vulnerabilities](https://snyk.io/test/github/mifi/form-encode-object/badge.svg)](https://snyk.io/test/github/mifi/form-encode-object)

Convert a deep object structure to be sent as urlencoded or form data (PHP style).



## Install

```
npm install form-encode-object
```

## Example

Say you have an arbitrarily deep object:

```
const obj = {
  somekey: 'value',
  children: [
    {
      foo: 'bar',
      bar: 'foo',
    },
    {
      foo: 'bar2',
      bar: 'foo2',
    },
  ],
};
```

...and you need to send it to an API that accepts x-www-form-urlencoded or form data (multipart/form-data) for instance using the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object, or a query string. In particular, PHP expects this format.

### Plain Example
```
const formEncodeObject = require('form-encode-object');

formEncodeObject(obj);
```
Returns an object like this:
```
{
  'somekey': 'value',
  'children[0][foo]': 'bar',
  'children[0][bar]': 'foo',
  'children[1][foo]': 'bar2',
  'children[1][bar]': 'foo2',
}
```

### Example urlencoded
```
const formEncodeObject = require('form-encode-object');

const formEncoded = formEncodeObject(obj);
Object.keys(formEncoded).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formEncoded[key])}`).join('&');
```
Returns: `somekey=value&children%5B0%5D%5Bfoo%5D=bar&children%5B0%5D%5Bbar%5D=foo&children%5B1%5D%5Bfoo%5D=bar2&children%5B1%5D%5Bbar%5D=foo2`


### Example FormData
```
const formEncodeObject = require('form-encode-object');

const formEncoded = formEncodeObject(obj);

const formData = new FormData();

Object.keys(formEncoded)
  .forEach(key => formData.append(key, formEncoded[key]));
```
Now you have a formData object populated to send to the server
