/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2024 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

'use strict';

// Required Moduls
const os = require('os');


function getIPs () {
  let interfaces = os.networkInterfaces();
  let addresses = {};
  for (let k in interfaces) {
    for (let m in interfaces[k]) {
      let address = interfaces[k][m];
      if (address.family === 'IPv4') {
        addresses[k] = address.address;
      }
    }
  }
  return addresses;
}


module.exports = getIPs;
