const SwaggyC = require('../lib/swaggyc');
const buster  = require('buster-node');
const referee = require('referee');
const runner  = require('../lib/runner');
const yamljs  = require('yamljs');
const assert  = referee.assert;

buster.testCase('swaggyc - run', {
  setUp: function () {
    this.mockRunner = this.mock(runner);
    this.mockYamljs = this.mock(yamljs);
  },
  'should construct commands and pass them to series': function (done) {
    var mockTasksDef = {
      javascript: {
        gen: 'somejavascriptgencommand {lang}',
        test: 'somejavascripttestcommand {lang}'
      }
    };
    this.mockYamljs.expects('load').withArgs('somedir/conf/tasks.yml').returns(mockTasksDef);
    var commands = [{
      exec: 'somejavascriptgencommand javascript',
      meta: { language: 'javascript', task: 'javascript-gen', type: 'gen' }
    }, {
      exec: 'somejavascripttestcommand javascript',
      meta: { language: 'javascript', task: 'javascript-test', type: 'test' }
    }];
    this.mockRunner.expects('execSeries').withArgs(commands).callsArgWith(2, null, 'someresult');;
    var params = {
      lang: 'javascript'
    };
    var opts = {
      swaggycDir: 'somedir'
    };
    var swaggyC = new SwaggyC(params, opts);
    swaggyC.run(['javascript-gen', 'javascript-test' ], function (err, result) {
      assert.isNull(err);
      assert.equals(result, 'someresult');
      done();
    });
  },
  'should pass error when jazz encounters an error when executing commands': function (done) {
    var mockTasksDef = {
      javascript: {
        gen: 'somejavascriptgencommand lang}',
        test: 'somejavascripttestcommand {lang}'
      }
    };
    this.mockYamljs.expects('load').withArgs('somedir/conf/tasks.yml').returns(mockTasksDef);
    var commands = [{
      exec: 'somejavascriptgencommand javascript',
      meta: { language: 'javascript', task: 'javascript-gen', type: 'gen' }
    }, {
      exec: 'somejavascripttestcommand javascript',
      meta: { language: 'javascript', task: 'javascript-test', type: 'test' }
    }];
    var params = {
      lang: 'javascript'
    };
    var opts = {
      swaggycDir: 'somedir'
    };
    var swaggyC = new SwaggyC(params, opts);
    swaggyC.run(['javascript-gen', 'javascript-test' ], function (err, result) {
      assert.equals(err.message, 'unexpected token: \'}\'');
      done();
    });
  }
});
