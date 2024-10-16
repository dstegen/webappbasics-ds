/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2024 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

'use strict';

const formidable = require('formidable');


function getFormObj (req) {
  let formObj = {};
  let form = new formidable.IncomingForm();
	return new Promise((resolve, reject) => {
		form.parse(req, function (err, fields, files) {
			if (err) {
				reject(err);
			} else {
				formObj.fields = fields;
        formObj.files = files;
				resolve(formObj);
			}
    });
	});
}


module.exports = getFormObj;
