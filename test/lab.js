var Ascio = require('../lib/ascio');

var ascio = new Ascio(process.env.ASCIO_USERNAME, process.env.ASCIO_PASSWORD);

ascio.on('ready', function () {
  if(err) throw err;
  console.log(sessionid);

  ascio.isDomainAvailable(['adsfafavaf'], ['pt', 'com'], function(err, msg) {
    if(err) throw err;
    console.log(msg);

    ascio.logout(sessionid, function(err, msg) {
      if(err) throw err;
      console.log(msg);
    });
  });
});
