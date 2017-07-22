const buster     = require('buster-node');
const child      = require('child_process');
const fs         = require('fs');
const proxyquire = require('proxyquire');
const referee    = require('referee');
const runner     = require('../lib/runner');
const assert     = referee.assert;

buster.testCase('runner - exec', {
  setUp: function () {
    this.mockChild = this.mock(child);
    this.mockConsole = this.mock(console);
    this.mockFs = this.mock(fs);
    this.mockProcessStderr = this.mock(process.stderr);
    this.mockProcessStdout = this.mock(process.stdout);
  },
  'should write data to stream': function () {
    this.mockProcessStderr.expects('write').once().withExactArgs('somedata');
    this.mockProcessStdout.expects('write').once().withExactArgs('somedata');

    var mockChildProcess = {
      stderr: {
        on: function (event, cb) {
          assert.equals(event, 'data');
          cb('somedata');
        }
      },
      stdout: {
        on: function (event, cb) {
          assert.equals(event, 'data');
          cb('somedata');
        }
      }
    };
    var mockStream = {
      write: function (data) {
        assert.equals(data, 'somedata');
      }
    };

    var opts = { logDir: 'somedir', quiet: false };
    var cb = function (err) {};

    this.mockConsole.expects('log').withExactArgs('%s | %s', 'javascript'.cyan, 'somecommand arg1 arg2');
    this.mockChild.expects('exec').withExactArgs('somecommand arg1 arg2', opts, cb).returns(mockChildProcess);
    this.mockFs.expects('createWriteStream').withExactArgs('somedir/gen.log').returns(mockStream);

    var command = {
      exec: 'somecommand arg1 arg2',
      meta: {
        task: 'javascript',
        type: 'gen'
      }
    };
    runner.exec(command, opts, cb);
  },
  'should not write stderr and stdout data when in quiet mode': function () {
    this.mockProcessStderr.expects('write').never().withExactArgs('somedata');
    this.mockProcessStdout.expects('write').never().withExactArgs('somedata');

    var mockChildProcess = {
      stderr: {
        on: function (event, cb) {
          assert.equals(event, 'data');
          cb('somedata');
        }
      },
      stdout: {
        on: function (event, cb) {
          assert.equals(event, 'data');
          cb('somedata');
        }
      }
    };
    var mockStream = {
      write: function (data) {
        assert.equals(data, 'somedata');
      }
    };

    var opts = { logDir: 'somedir', quiet: true };
    var cb = function (err) {};

    this.mockConsole.expects('log').withExactArgs('%s | %s', 'javascript'.cyan, 'somecommand arg1 arg2');
    this.mockChild.expects('exec').withExactArgs('somecommand arg1 arg2', opts, cb).returns(mockChildProcess);
    this.mockFs.expects('createWriteStream').withExactArgs('somedir/gen.log').returns(mockStream);

    var command = {
      exec: 'somecommand arg1 arg2',
      meta: {
        task: 'javascript',
        type: 'gen'
      }
    };
    runner.exec(command, opts, cb);
  }
});

buster.testCase('runner - execSeries', {
  setUp: function () {
    this.mockChild = this.mock(child);
    this.mockConsole = this.mock(console);
    this.mockFs = this.mock(fs);
    this.mockProcessStderr = this.mock(process.stderr);
    this.mockProcessStdout = this.mock(process.stdout);
  },
  'should execute commands when there is no error': function () {
    var mockStream = {
      write: function (data) {
        assert.equals(data, 'somedata');
      }
    };
    var mockChildProcess = {
      stderr: {
        on: function (event, cb) {
          assert.equals(event, 'data');
          cb('somedata');
        }
      },
      stdout: {
        on: function (event, cb) {
          assert.equals(event, 'data');
          cb('somedata');
        }
      }
    };
    this.mockConsole.expects('log').withExactArgs('%s | %s', 'javascript'.cyan, 'somecommand arg1 arg2');
    this.mockChild.expects('exec').withArgs('somecommand arg1 arg2').returns(mockChildProcess);
    this.mockFs.expects('createWriteStream').withExactArgs('somedir/gen.log').returns(mockStream);
    var mockMkdirp = function (dir, cb) {
      assert.equals(dir, 'somedir');
      cb();
    };
    var commands = [
      {
        exec: 'somecommand arg1 arg2',
        meta: {
          task: 'javascript',
          type: 'gen'
        }
      }
    ];
    var opts = { logDir: 'somedir', quiet: true };
    var runner = proxyquire('../lib/runner', { mkdirp: mockMkdirp });
    runner.execSeries(commands, opts, function (err) {
      done();
    });
  },
  'should pass error when an error occurs while executing command': function (done) {
    var mockMkdirp = function (dir, cb) {
      assert.equals(dir, 'somedir');
      cb(new Error('someerror'));
    };
    var commands = [
      {
        exec: 'somecommand arg1 arg2',
        meta: {
          task: 'javascript',
          type: 'gen'
        }
      }
    ];
    var opts = { logDir: 'somedir', quiet: true };
    var runner = proxyquire('../lib/runner', { mkdirp: mockMkdirp });
    runner.execSeries(commands, opts, function (err) {
      assert.equals(err.message, 'someerror');
      done();
    });
  }
});
