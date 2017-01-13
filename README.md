node-ascio
==========

Node.js [ASCIO AWS](http://aws.ascio.info/) module/connector.

## Installation

`npm install ascio`

## Usage

### Login

``` js
var Ascio = require('ascio');
var ascio = new Ascio(process.env.ASCIO_USERNAME, process.env.ASCIO_PASSWORD);

ascio.on('ready', function () {
  //...
});
```

### Domain Availability

``` js
var Ascio = require('ascio');
var ascio = new Ascio(process.env.ASCIO_USERNAME, process.env.ASCIO_PASSWORD);

ascio.on('ready', function () {
  ascio.isDomainAvailable(['adsfafavaf'], ['pt', 'com'], function(err, msg) {
    if(err) throw err;
    console.log(msg);
  });
});
```

## Implemented endpoints

* ascio.login
* ascio.logout
* ascio.isDomainAvailable
* ascio.domainInfo
* ascio.updateNS

## License

Pedro Dias - [@pedromdias](https://twitter.com/pedromdias)

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

    http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.
