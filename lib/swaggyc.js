const async  = require('async');
const jazz   = require('jazz');
const p      = require('path');
const runner = require('./runner');
const yamljs = require('yamljs');

function SwaggyC(params, opts) {
  this.params   = params;
  this.opts     = opts;
  this.tasksDef = yamljs.load(p.join(params.swaggycDir, 'conf', 'tasks.yml'));
}

/**
 * Execute specified tasks
 *
 * @param {Array} tasks: an array of task names
 * @param {Function} cb: standard cb(err, result) callback
 */
SwaggyC.prototype.run = function (tasks, cb) {
  var self = this;

  this._commands(tasks, function (err, commands) {
    if (err) { cb(err); } else {
      runner.execSeries(commands, self.opts, cb);
    }
  });
};

/**
 * Prepare commands to execute.
 *
 * @param {Array} tasks: an array of task names
 * @param {Function} cb: standard cb(err, result) callback
 */
SwaggyC.prototype._commands = function (tasks, cb) {
  var self = this;

  var commands = [];
  tasks.forEach(function (task) {

    var taskElems = task.split('-');
    var language  = taskElems[0];
    var type      = taskElems[1];
    var format    = self.tasksDef[language][type];

    var command = {
      format: format,
      meta: {
        task: task,
        language: language,
        type: type
      }
    }
    commands.push(command);
  });

  var jobs = [];
  commands.forEach(function (command) {
    jobs.push(function (cb) {
      jazz.compile(command.format).process(self.params, function (result) {
        command.exec = result;
        delete command.format;
        cb(null, command);
      });
    });
  });
  async.parallel(jobs, cb);
};

module.exports = SwaggyC;
