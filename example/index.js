/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2024 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

'use strict';

// Required modules
const { ServerDS } = require('../../webappbasics-ds');
const router = require('./lib/router');

// Name the process
process.title = 'webappbasics-ds example';

let devmode = false;
if (process.argv.includes('devmode=true')) {
	console.log('Entering developer mode...');
	devmode=true;
}

const server = new ServerDS('webappbasics-ds example');
server.setCallback(router, devmode);
server.startServer();
