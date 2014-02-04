var soap = require('soap'),
  events = require('events'),
  sys = require('sys');

var Ascio = function(url) {
  var self = this;
  this.url = url || 'https://awstest.ascio.com/2012/01/01/AscioService.wsdl';

  soap.createClient(this.url, function(err, client) {
    console.log(client.describe());
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
