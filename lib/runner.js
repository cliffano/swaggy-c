const async  = require('async');
const child  = require('child_process');
const colors = require('colors');
const fs     = require('fs');
const mkdirp = require('mkdirp');
const p      = require('path');
const util   = require('util');

/**
 * Execute a single command.
 *
 * @param {Object} command: the command to execute
 * @param {Object} opts:
 *   - cwd: base directory where the commands should be executed from
 *   - quiet: don't display command output if quiet
 *   - task: Bob task name, used to create output directory
 *   - type: Bob task type name, used to create output directory
 *   - dir: report directory where process output will be written into a file
 * @param {Function} cb: standard cb(err, result) callback
 */
function exec(command, opts, cb) {

  console.log('%s | %s', command.meta.task.cyan, command.exec);

  var logDir  = opts.logDir.replace(/\{lang\}/g, command.meta.language);
  var logFile = p.join(logDir, util.format('%s.log', command.meta.type));
  mkdirp.sync(logDir);

  var cproc   = child.exec(command.exec, opts, cb);
  var wstream = fs.createWriteStream(logFile);

  cproc.stdout.on('data', function (data) {
    if (!opts.quiet) {
      process.stdout.write(data);
    }
    wstream.write(data);
  });

  cproc.stderr.on('data', function (data) {
    if (!opts.quiet) {
      process.stderr.write(data);
    }
    wstream.write(data);
  });
}

/**
 * Execute multiple commands in series.
 *
 * @param {Array} commands: an array of commands, each command contains:
 *   - exec: executable shell command line
 *   - meta: command metadata, language and type
 * @param {Object} opts:
 *   - logDir: directory where log files will be written to
 *   - quiet: don't display command output if quiet is set
 * @param {Function} cb: standard cb(err, result) callback
 */
function execSeries(commands, opts, cb) {

  function _exec(command, cb) {
    var logDir = p.join(opts.logDir, command.meta.language);
    mkdirp(logDir, function (err) {
      if (err) { cb(err); } else {
        exec(command, opts, cb);
      }
    });
  }
  async.eachSeries(commands, _exec, cb);
}

exports.exec = exec;
exports.execSeries = execSeries;
