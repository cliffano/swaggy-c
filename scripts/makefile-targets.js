const p      = require('path');
const util   = require('util');
const yamljs = require('yamljs');

// Read tasks definition file and generate a Makefile targets that calls
// build function with unskipped tasks as its arguments

const tasksDef = yamljs.load(p.join(__dirname, '..', 'conf', 'tasks.yml'));

var snippet = '';
Object.keys(tasksDef).forEach(function (lang) {
  snippet += util.format('%s:\n\t$(call build,', lang);
  Object.keys(tasksDef[lang]).forEach(function (task) {
    if (task !== 'publish') {
      var command = tasksDef[lang][task];
      if (command.indexOf('skipped...') === -1) {
        snippet += util.format(' %s-%s', lang, task);
      }
    }
  });
  snippet += ')\n';
});
console.log(snippet);
