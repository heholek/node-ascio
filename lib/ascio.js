var soap = require('soap'),
  events = require('events'),
  sys = require('sys'),
  path = require('path'),
  debug = require('debug')('network');

var Ascio = function(account, password, url) {
  var self = this;
  this.url = url || path.resolve(__dirname + '/../wsdl/AscioService.wsdl');
  this.account = account;
  this.password = password;

  soap.createClient(this.url, function(err, client) {
    if(err) throw err;
    //console.log(client.describe());
    self.client = client;

    self.login(function(err) {
      self.emit('ready');
    });
  });
};

sys.inherits(Ascio, events.EventEmitter);

Ascio.prototype.resetTimer = function() {
  var self = this;

  if(this.timer) clearTimeout(this.timer);

  this.timer = setInterval(function() {
    self.login(function(err) {});
  }, process.env.TIMEOUT || 900000);
};

Ascio.prototype.login = function(cb) {
  var self = this;
  this.client.LogIn({'session' : {'Account': self.account, 'Password': self.password}}, function(err, result) {
    if(err) return cb(err, undefined);

    debug(require('util').inspect(result));

    if (result.LogInResult.ResultCode == 200) {
      self.resetTimer();
      self.sessionid = result.sessionId;
      cb(err, result.sessionId);
    } else {
      cb(new Error(result.LogInResult.Message), undefined);
    }
  });
};

Ascio.prototype.logout = function(cb) {
  var self = this;
  this.client.LogOut({'sessionId' : self.sessionid}, function(err, result) {
    if(err) return cb(err, undefined);

    debug(require('util').inspect(result));

    if (result.LogOutResult.ResultCode == 200) {
      if(this.timer) clearTimeout(this.timer);
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

  debug(require('util').inspect(opts));

  this.client.AvailabilityCheck(opts, function(err, result) {
    if(err) return cb(err, undefined);

    debug(require('util').inspect(result));

    if (result.AvailabilityCheckResult.ResultCode == 200) {
      self.resetTimer();
      cb(err, result.results.AvailabilityCheckResult);
    } else {
      cb(new Error(result.AvailabilityCheckResult.Message), undefined);
    }
  });
};

module.exports = Ascio;
