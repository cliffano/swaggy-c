const bag     = require('bagofcli');
const buster  = require('buster-node');
const cli     = require('../lib/cli');
const referee = require('referee');
const assert  = referee.assert;
const SwaggyC = new require('../lib/swaggyc');

buster.testCase('cli - exec', {
  'should contain commands with actions': function (done) {
    var mockCommand = function (base, actions) {
      assert.defined(base);
      assert.defined(actions.commands['javascript-gen'].action);
      done();
    };
    this.mock({});
    this.stub(bag, 'command', mockCommand);
    cli.exec();
  }
});

buster.testCase('cli - run', {
  setUp: function () {
    this.mockConsole = this.mock(console);
    this.mockProcess = this.mock(process);
  },
  'should contain command and delegate to Swaggy-C run when exec is called successfully': function () {
    this.mockConsole.expects('log').withExactArgs('%s | exit code 0', 'SUCCESS'.green);
    this.mockProcess.expects('exit').withExactArgs(0);
    this.stub(bag, 'command', function (base, actions) {
      actions.commands['javascript-gen'].action('somedir', { _name: 'javascript-gen', parent: { args: [], apiSpec: 'somespec.yaml' } });
    });
    this.stub(SwaggyC.prototype, 'run', function (tasks, cb) {
      assert.equals(typeof cb, 'function');
      cb();
    });
    cli.exec();
  },
  'should log error and delegate exit to bagofcli when error does not contain code': function () {
    this.mockConsole.expects('error').withExactArgs('%s | %s', 'ERROR'.red, 'some error');
    this.mockProcess.expects('exit').withExactArgs(1);
    this.stub(bag, 'command', function (base, actions) {
      actions.commands['javascript-gen'].action('somedir', { _name: 'javascript-gen', parent: { jar: 'path/to/some.jar', args: [], apiSpec: 'somespec.yaml' } });
    });
    this.stub(SwaggyC.prototype, 'run', function (tasks, cb) {
      assert.equals(typeof cb, 'function');
      cb(new Error('some error'));
    });
    cli.exec();
  },
  'should force exit when error contains code': function () {
    this.mockConsole.expects('error').withExactArgs('%s | exit code %d', 'FAILURE'.red, 123);
    this.mockProcess.expects('exit').withExactArgs(123);
    this.mockProcess.expects('exit').withExactArgs(1);
    this.stub(bag, 'command', function (base, actions) {
      actions.commands['javascript-gen'].action('somedir', { _name: 'javascript-gen', parent: { jar: 'path/to/some.jar', args: [], apiSpec: 'somespec.yaml' } });
    });
    this.stub(SwaggyC.prototype, 'run', function (tasks, cb) {
      assert.equals(typeof cb, 'function');
      cb({ code: 123 });
    });
    cli.exec();
  }
});
