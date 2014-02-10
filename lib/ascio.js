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
  var self = this;
  this.client.LogIn({'session' : {'Account': account, 'Password': password}}, function(err, result) {
    if(err) return cb(err, undefined);

    debug(require('util').inspect(result));

    if (result.LogInResult.ResultCode == 200) {
      self.sessionid = result.sessionId;
      cb(err, result.sessionId);
    } else {
      cb(new Error(result.LogInResult.Message), undefined);
    }
  });
};

Ascio.prototype.logout = function(sessionid, cb) {
  this.client.LogOut({'sessionId' : sessionid}, function(err, result) {
    if(err) return cb(err, undefined);

    debug(require('util').inspect(result));

    if (result.LogOutResult.ResultCode == 200) {
      cb(err, result.LogOutResult.Message);
    } else {
      cb(new Error(result.LogOutResult.Message), undefined);
    }
  });
};


Ascio.prototype.isDomainAvailable = function(domains, tlds, cb, quality) {
  var self = this;
  var opts = {
    'sessionId': self.sessionid,
    'domains': {'string': domains},
    'tlds': {'string': tlds},
    'quality': quality || 'SmartLive'
  };

  this.client.AvailabilityCheck.LogOut(opts, function(err, result) {
    if(err) return cb(err, undefined);

    debug(require('util').inspect(result));

    if (result.LogOutResult.ResultCode == 200) {
      cb(err, result.results.AvailabilityCheckResult);
    } else {
      cb(new Error(result.LogOutResult.Message), undefined);
    }
  });
};

module.exports = Ascio;
