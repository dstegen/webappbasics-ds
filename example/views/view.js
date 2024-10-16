/*!
 * webappbasics-ds (https://github.com/dstegen/webappbasics-ds)
 * Copyright 2024 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webappbasics-ds/blob/master/LICENSE)
 */

// Required modules
const {SendObj} = require('../../../webappbasics-ds');

function view (wsport, obj, msg='') {
  let sendObj = new SendObj();
  if (obj[0]) {
    sendObj.data = `
      <!DOCTYPE HTML>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <!-- Bootstrap, jquery and CSS -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
          <style>
            a, a:hover {
              text-decoration: none;
            }
          </style>
          <title>webapputils-ds</title>
        </head>
        <body>
          <main class="container p-5 h-100">
            <h1>Hello World!</h1>
            <p>${msg}</p>
            <div class="table-responsive">
              <table border="1" class="table table-bordered">
                <tr>
                  <th class="px-3 py-1 font-weight-bold">
                  ${Object.keys(obj[0]).join('</th><th class="px-3 py-1">')}
                  <th colspan="2" class="px-3 py-1 font-weight-bold text-center">edit</th>
                </th>
                </tr>
                <tr>
                ${obj.map(tableRow).join('</tr><tr>')}
                </tr>
                <tr>
                  <td colspan="${Object.keys(obj[0]).length + 1}" class="px-3 py-1 text-right"></td>
                  <td class="px-3 py-1"><a href="/edit" class="btn btn-sm btn-success">add</a></td>
                </tr>
              </table>
            </div>
            <hr />
            <div class="d-flex justify-content-center">
              <a href="logout" class="btn btn-sm btn-secondary my-3 texte-right">logout</a>
            </div>
          </main>
          <!-- jQuery first, then Bootstrap bundle JS -->
          <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="crossorigin="anonymous"></script>
          <script>
          // Websockets
            const hostname = window.location.hostname ;
            const socket = new WebSocket('ws://'+hostname+':${wsport}/', 'protocolOne', { perMessageDeflate: false });
            socket.onopen =  function () {
              socket.onmessage = function (msg) {
                location.reload();
                console.log(msg.data);
              };
            };
          </script>
        </body>
      </html>
    `;
  }
  return sendObj;
}

function tableRow (item) {
  let returnHtml = '';
  Object.keys(item).forEach( key => {
    returnHtml += `<td class="px-3 py-1">${item[key]}</td>`;
  });
  returnHtml += `
    <td class="px-3 py-1">
      <form id="delform" action="/delete" method="post">
        <input type="text" name="id" class="d-none" hidden value="${item.id}" />
        <input type="submit" class="btn btn-sm btn-danger" value="delete" />
      </form>
    </td>
    <td class="px-3 py-1">
    <form id="editform" action="/edit" method="post">
      <input type="text" name="id" class="d-none" hidden value="${item.id}" />
      <input type="submit" class="btn btn-sm btn-primary" value="edit" />
    </form>
    </td>
  `;
  return returnHtml;
}


module.exports = view;
