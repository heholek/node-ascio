var soap = require('soap'),
  events = require('events'),
  sys = require('sys'),
  path = require('path'),
  debug = require('debug')('network');

var Ascio = function(url) {
  var self = this;
  this.url = url || path.resolve(__dirname + '/../wsdl/AscioService.wsdl');

  soap.createClient(this.url, function(err, client) {
    if(err) throw err;
    //console.log(client.describe());
    self.client = client;
    self.emit('ready');
  });
};

sys.inherits(Ascio, events.EventEmitter);

Ascio.prototype.login = function(account, password, cb) {
  this.client.LogIn({'session' : {'Account': account, 'Password': password}}, function(err, result) {
    if(err) return cb(err, undefined);

    debug(require('util').inspect(result));

    if (result.LogInResult.ResultCode == 200) {
      cb(err, result.sessionId);
    } else {
      cb(new Error(result.LogInResult.Message), undefined);
    }
  });
};


module.exports = Ascio;
