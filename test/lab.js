var Ascio = require('../lib/ascio');

var ascio = new Ascio();

ascio.on('ready', function () {
  ascio.login(process.env.ASCIO_USERNAME, process.env.ASCIO_PASSWORD, function(err, sessionid) {
    if(err) throw err;
    console.log(sessionid);

    ascio.isDomainAvailable(['ptisp'], ['pt', 'com'], function(err, msg) {
      if(err) throw err;
      console.log(msg);

      ascio.logout(sessionid, function(err, msg) {
        if(err) throw err;
        console.log(msg);
      });
    });
  });
});
