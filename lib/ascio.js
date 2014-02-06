var soap = require('soap'),
  events = require('events'),
  sys = require('sys'),
  path = require('path');

var Ascio = function(url) {
  var self = this;
  this.url = url || path.resolve(__dirname + '/../wsdl/AscioService.wsdl');

  soap.createClient(this.url, function(err, client) {
    //console.log(client.describe());
    self.client = client;
    self.emit('ready');
  });
};

sys.inherits(Ascio, events.EventEmitter);

Ascio.prototype.login = function(account, password, cb) {
  this.client.LogIn({'Account': account, 'Password': password}, function(err, result) {
    cb(err, result);
  });
};


module.exports = Ascio;
