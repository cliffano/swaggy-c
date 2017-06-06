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

buster.testCase('cli - javascript', {
  setUp: function () {
    this.mock({});
  },
  'should contain javascript command and delegate to Swaggy-C run when exec is called': function (done) {
    this.stub(bag, 'command', function (base, actions) {
      actions.commands['javascript-gen'].action('somedir', { _name: 'javascript-gen', parent: { args: [], apiSpec: 'somespec.yaml' } });
    });
    this.stub(SwaggyC.prototype, 'run', function (tasks, cb) {
      assert.equals(typeof cb, 'function');
      done();
    });
    cli.exec();
  }
});
