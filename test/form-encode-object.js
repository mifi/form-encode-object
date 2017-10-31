'use strict';

const chai = require('chai'); // eslint-disable-line import/no-extraneous-dependencies

const assert = chai.assert;

const formEncodeObject = require('../');

it('should parse correctly', () => {
  assert.deepEqual(formEncodeObject({
    key1: '123',
    key2: '456',
  }), { key1: '123', key2: '456' });

  assert.deepEqual(
    formEncodeObject({
      fullname: 'parent 1 fullname',
      children: [
        {
          fullname: 'child 1 fullname',
          mail: 'child1mail@example.com',
          password: 'password',
        },
        {
          fullname: 'child 2 fullname',
          mail: 'child2mail@example.com',
          password: 'password',
        },
      ],
    }), {
      fullname: 'parent 1 fullname',
      'children[0][fullname]': 'child 1 fullname',
      'children[0][mail]': 'child1mail@example.com',
      'children[0][password]': 'password',
      'children[1][fullname]': 'child 2 fullname',
      'children[1][mail]': 'child2mail@example.com',
      'children[1][password]': 'password',
    },
    {
      'firstkey[0][fullname]': 'parent 1 fullname',
      'firstkey[0][children][0][fullname]': 'child 1 fullname',
      'firstkey[0][children][0][mail]': 'child1mail@example.com',
      'firstkey[0][children][0][password]': 'password',
      'firstkey[0][children][1][fullname]': 'child 2 fullname',
      'firstkey[0][children][1][mail]': 'child2mail@example.com',
      'firstkey[0][children][1][password]': 'password',
      'firstkey[1][fullname]': 'parent 2 fullname',
    }
  );

  assert.deepEqual(formEncodeObject({
    firstkey: [
      {
        secondKey: [
          {
            fullname: 'child 1 fullname',
            mail: 'child1mail@example.com',
            password: 'password',
          },
        ],
      },
      {
        thirdKey: 'parent 2 fullname',
        children: [],
      },
    ],
  }), {
    'firstkey[0][secondKey][0][fullname]': 'child 1 fullname',
    'firstkey[0][secondKey][0][mail]': 'child1mail@example.com',
    'firstkey[0][secondKey][0][password]': 'password',
    'firstkey[1][thirdKey]': 'parent 2 fullname',
  });

  assert.deepEqual(formEncodeObject({ key: '' }), { key: '' });
  assert.deepEqual(formEncodeObject({ key: 123 }), { key: 123 });
  assert.deepEqual(formEncodeObject({ key: undefined }), { key: undefined });
  assert.deepEqual(formEncodeObject({ key: null }), { key: null });
  assert.deepEqual(formEncodeObject({ key: new Date() }), {});
  assert.deepEqual(formEncodeObject({ key: {} }), {});
  assert.deepEqual(formEncodeObject({ key: [] }), {});
  assert.deepEqual(formEncodeObject({ key: true }), { key: true });

  assert.deepEqual(formEncodeObject(), {});
  assert.deepEqual(formEncodeObject(null), {});
  assert.deepEqual(formEncodeObject([]), {});
  assert.deepEqual(formEncodeObject(123), {});
  assert.deepEqual(formEncodeObject(new Date()), {});
  assert.deepEqual(formEncodeObject(''), {});

  assert.deepEqual(formEncodeObject(true), {});
});
