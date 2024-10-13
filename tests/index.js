/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2024 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

'use strict';

 // Required Moduls
const fork = require('child_process').fork;

let myForks = [];
let i = 0;

myForks[i] = fork('./tests/getIPs_test');

myForks[i++] = fork('./tests/Auth_test');
