const cli     = require('bagofcli');
const colors  = require('colors');
const fs      = require('fs');
const p       = require('path');
const SwaggyC = require('./swaggyc');

const APP_DIR     = process.cwd();
const SWAGGYC_DIR = p.join(__dirname, '..');

function _exec() {

  var lastArg = arguments[arguments.length - 1];
  var tasks   = [lastArg._name].concat(lastArg.parent.args.slice(0, -1));

  var apiSpec = lastArg.parent.apiSpec;
  var confDir = lastArg.parent.confDir || p.join(APP_DIR, 'conf');
  var outDir  = lastArg.parent.outDir || p.join(APP_DIR, 'generated');
  var logDir  = lastArg.parent.logDir || p.join(APP_DIR, 'log');
  var quiet   = lastArg.parent.quiet;
  
  var swaggerCodegen = 'swagger-codegen';

  var params = {
    apiSpec: apiSpec,
    appDir: APP_DIR,
    confDir: confDir,
    outDir: outDir,
    swaggerCodegen: swaggerCodegen,
  };

  var opts = {
    logDir: logDir,
    swaggycDir: SWAGGYC_DIR,
    quiet: quiet
  };

  function errorCb(err) {
    if (err.code && !isNaN(err.code)) {
      console.error('%s | exit code %d', 'FAILURE'.red, err.code);
      process.exit(err.code);
    } else {
      console.error('%s | %s', 'ERROR'.red, err.message);
    }
  }

  function successCb() {
    console.log('%s | exit code 0', 'SUCCESS'.green);
  }

  var swaggyC = new SwaggyC(params, opts);
  swaggyC.run(tasks, cli.exitCb(errorCb, successCb));
}

/**
 * Execute Swaggy-C CLI.
 */
function exec() {

  var commandFile = p.join(SWAGGYC_DIR, 'conf', 'commands.json');
  var commands    = Object.keys(JSON.parse(fs.readFileSync(commandFile)).commands);

  var actions = { commands: {} };
  commands.forEach(function (command) {
    actions.commands[command] = { action: _exec };
  });

  cli.command(__dirname, actions);
}

exports.exec = exec;
