const async  = require('async');
const jazz   = require('jazz');
const p      = require('path');
const runner = require('./runner');
const yamljs = require('yamljs');

/**
 * class SwaggyC
 * Stores params and opts, loads tasks definition from tasks.yml config.
 *
 * @param {Object} params: parameters to be merged to command format
 * @param {Object} opts: optional
 *   - inputPath: path to directory containing response files, or path to a single response file
 *   - reporter: an array of reporters, available reporters: console and file
 *   - outFile: path to output file, used when 'file' reporter is set
 */
function SwaggyC(params, opts) {
  this.params   = params;
  this.opts     = opts;
  this.tasksDef = yamljs.load(p.join(opts.swaggycDir, 'conf', 'tasks.yml'));
}

/**
 * Execute the specified tasks in sequence.
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
 * Merge parameters specified in command format and CLI args.
 *
 * @param {Array} tasks: an array of task names
 * @param {Function} cb: standard cb(err, result) callback
 */
SwaggyC.prototype._commands = function (tasks, cb) {
  var self = this;

  var commands = [];
  tasks.forEach(function (task) {
    var delimPos  = task.lastIndexOf('-');
    var language  = task.substring(0, delimPos);
    var type      = task.substring(delimPos + 1, task.length);
    var format    = self.tasksDef[language][type];

    var command = {
      format: format,
      meta: {
        task: task,
        language: language,
        type: type
      }
    };
    commands.push(command);
  });

  var jobs = [];
  commands.forEach(function (command) {
    jobs.push(function (cb) {
      try {
        // merge parameters specified in command format in tasks.yml config
        jazz.compile(command.format).process(self.params, function (command_result) {
          // merge parameters specified in CLI args
          jazz.compile(command_result).process({ lang: command.meta.language }, function (result) {
            command.exec = result;
            delete command.format;
            cb(null, command);
          });
        });
      } catch (err) {
        cb(err);
      }
    });
  });
  async.parallel(jobs, cb);
};

module.exports = SwaggyC;
