# webappbasics-ds #
Basic utils for making nodejs web apps programming more easy

## Howto use the example ##

Start example with
```
node node_modules/webappbasics-ds/example/index.js
```

**Example login credentials:**

Name: Dani

Password: 123

## Usage ##

```
const { cookie, SendObj, uniSend, getFormObj, Auth, ServerDS, ServerDSS } = require('webapputils-ds');
```

- **cookie(request)** returns the cookie-object, access cookie-properties like this:
```
cookie(request).sessionid
```
- **SendObj()** returns a new sendObj, you can use properties for statusCode, cookies, redirect path and data
```
let sendObj = new SendObj(302);  //redirect to '/'
let sendObj = new SendObj(302, [sessionid=1001]);  //redirect to '/' with sessionid in cookie
let sendObj = new SendObj(200, [], '/', '<!DOCTYPE HTML><html lang="en"><body><h1>Hello World!</h1></body></html>');
```

- use **uniSend(sendObj, response)** for sending the response
```
uniSend(new SendObj(302, [sessionid=1001]), response);
uniSend(sendObj, response);
```

- **getFormObj(request)** returns a promise and the form fields and files in the data object, use like this:
```
getFormObj(request).then(
  data => {
    uniSend(new SendObj(302, ['sessionid='+authenticate.login(passwd, data.fields.username, data.fields.password, sessionFilePath)]), response);
  }
).catch(
  error => {
    console.log('ERROR login: '+error.message);
});
```

- **Auth()** is the class module for authentication, and replaces *authenticate*
```
const authenticate = new Auth(sessionFilePath);
```
  - **passwdObj format**: { 'userId': 'bcrypt(password)'}
```
authenticate.login(passwdObj, myUserId, myPassword); //returns an uuid-v4 sessionid if successful, otherwise undefined
authenticate.loggedIn(sessionId); //returns true if user is logged in, otherwise false
authenticate.getUserId(sessionId); //returns the userId, given in the login
authenticate.getUserTimeStamp(sessionId); //returns the user login timeStamp/date
authenticate.addPasswd(passwdObj, myUserId, myPassword); //returns passwdObj with new user and password added
authenticate.logout(sessionId); //returns nothing
authenticate.jwtLogin(passwdObj, myUserId, myPassword, payload, key, optionsSign); //returns a jwt-token if successful, otherwise undefined
authenticate.jwtVerify(token, key, optionsVerify); //returns true, if the token is valid, otherwise false
```

- **ServerDS** and **ServerDSS** are the class modules for easy starting a web server (incl. web sockets on the same port), ServerDSS is the TSL/SSL version

  - **simple example:**
  ```
  const server = new ServerDS('webapputils-ds example');
  server.setCallback(router);
  server.startServer();
  ```
  - ***new ServerDS(serverName, port, host, serverOptions)***
    - for **ServerDS** are all parameters *optional*, **ServerDSS** *needs all parameters* because of the serverOptions for the SSL key and cert
    - ***serverName*** [type: String]: Server name for the console log, default is 'Server'
    - ***port*** [type: Integer]: Server port, default is 8080
    - ***host*** [type: String]: Server ip-address, default is '0', which means all available network devices, incl. localhost
    - ***serverOptions*** [type: Object]: for adding server options, which are directly passed to the http/s-server, example for https:
    ```
    serverOptions = {
      key = 'SSL-key',
      cert = 'SSL-cert'
    }
    ```
  - ***setCallback(callback, optionalParameter)*** method to give the server the callback function
    - ***callback*** [type: Function]: The callback function, usually it's the router function. The following parameters are passed to the callback function:
      - request, response, wss, wsport, optionalParameter
    - ***optionalParameter*** [type: variable]: optional parameter for the callback function which will be passed through to the callback function
  - ***startServer()*** will finally start the web server


#### About 'formidable version 1' beeing deprecated ####
As the new version 3 of the formidable module have breaking changes and it needs more depending npm modules, I stay for the moment with version 1.


## Changelog ##

#### v0.5.2
- updated copyright
- updated dependencies

#### v0.5.1
- cloned webapputils-ds and removed api
- updated dependencies



## License Code ##

The MIT License (MIT)

Copyright (c) 2024 Daniel Stegen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Authors: Daniel Stegen

Email: info@danielstegen.de
