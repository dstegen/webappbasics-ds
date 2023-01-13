/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2023 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

'use strict';

// Required Moduls
const fs = require('fs');
const path = require('path');
const mimetype = require('mimetype');
const uniSend = require('./uniSend');
let SendObj = require('./SendObj');


function deliver (request, response, staticPath=path.join(__dirname, '../../../')) {
  let sendObj = new SendObj();
  sendObj.contentType = mimetype.lookup(request.url.substr(1));
  sendObj = getMyFile(sendObj, path.join(staticPath, request.url));
  uniSend(sendObj, response);
}


// Additional function
function getMyFile (sendObjLocal, pathLocal) {
  try {
    sendObjLocal.data = fs.readFileSync(pathLocal.split('?')[0]);
  } catch (e) {
    sendObjLocal.statusCode = 404;
    sendObjLocal.data = null;
  }
  return sendObjLocal;
}


module.exports = deliver;
