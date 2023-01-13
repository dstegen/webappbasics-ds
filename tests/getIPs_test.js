/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2023 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

'use strict';

// Required Modules
const assert = require('assert');
const getIPs = require('../dist/getIPs');

const myInterface = Object.keys(require('os').networkInterfaces())[0];
const toTest = require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]][0].address;

//console.log('- Test: "utils/fred-utils-getIPs().lo0"\n');
assert.strictEqual(getIPs()[myInterface], toTest);
