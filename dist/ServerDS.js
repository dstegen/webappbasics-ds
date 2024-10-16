/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2024 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

'use strict';

 // Required modules
const HttpServer = require('http').Server;
const WebSocket = require('ws');
const getIPs = require('./getIPs');


class ServerDS extends HttpServer {
  constructor (serverName='Server', port=8080, host='0', serverOptions={}) {
    super(serverOptions);
    this._serverName = serverName;
    this._port = port;
    this._host = host;
    this._wss = new WebSocket.Server({
      server: this,
      clientTracking: true
    });
  }
  setCallback (callback, optPar='') {
    this.on('request', function (request, response) {
      callback(request, response, this._wss, this._port, optPar);
    });
  }
  startServer () {
    this.listen(this._port, this._host);
    this.on('listening', function () {
      console.log(this._serverName+' is online: http://'+getMyIp(this._host)+':'+this._port);
    });
  }
}


// Additional functions

function getMyIp (host) {
  if (host === '0') {
    host = 'localhost';
    if (getIPs()['en0']) {
      host = getIPs()['en0'];
    } else if (getIPs()['wlo1']) {
      host = getIPs()['wlo1'];
    } else if (getIPs()['eth0']) {
      host = getIPs()['eth0'];
    }
  }
  return host;
}


module.exports = ServerDS;
