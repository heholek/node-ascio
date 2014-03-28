var Ascio = require('../lib/ascio');

var ascio = new Ascio(process.env.ASCIO_USERNAME, process.env.ASCIO_PASSWORD);

ascio.on('ready', function () {
  /*
  ascio.isDomainAvailable(['adsfafavaf'], ['pt', 'com'], function(err, msg) {
    if(err) throw err;
    console.log(msg);
  });
  */
  
  ascio.domainInfo('algarve.bike', function(err, msg) {
    if(err) throw err;
    console.log(require('util').inspect(msg, { showHidden: true, depth: null }));
  });
  
});
