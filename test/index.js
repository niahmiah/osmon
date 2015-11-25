'use strict';

var chai = require('chai');
chai.should();
var sinon = require('sinon');
var request = require('request');

var config = require('config');
var server = config.get('server');
var id = config.get('id');

describe('sending data to server', function(){
  this.timeout(5000);
  var post;

  before(function(){
    post = sinon.stub(request, 'post');
  });

  after(function(){
    post.restore();
  });

  it('should send an http post', function(done){
    var osmon = require('../index');
    setTimeout(function(){
      post.called.should.be.true;
      post.calledWith(server + '/agentData/' + id).should.be.true;
      done();
    }, 2000);
  });
});
