'use strict';

var os = require('os');

var config = {
  id: os.hostname(),
  server: 'http://localhost:9000',
  schedule: {
    system: '*/1 * * * * *'
  },
  files: [
    '/proc/diskstats',
    '/proc/meminfo',
    '/proc/stat'
  ]
};

module.exports = config;
