#!/usr/bin/env node
'use strict';

var os = require('os');
var request = require('request');
var config = require('config');
var server = config.get('server');
var id = config.get('id');

var Filemon = require('filemon');
var filemon = new Filemon({
  schedule: config.get('schedule.system'),
  files: config.get('files')
});

filemon.on('data', function iostatCb(data){
  var output = {
    os: {
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      uptime: os.uptime(),
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      cpus: os.cpus(),
      platform: os.platform(),
      type: os.type(),
      arch: os.arch(),
      release: os.release()
    },
    files: data
  };
  request.post(
    server + '/agentData/' + id,
    {json: output},
    function requestCb(err){
      if(err) console.error(err);
    }
  );
});

filemon.start();
