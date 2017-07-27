const p      = require('path');
const util   = require('util');
const yamljs = require('yamljs');

// Read tasks definition file and generate a Makefile LANGS variable
// that lists all languages

const tasksDef = yamljs.load(p.join(__dirname, '..', 'conf', 'tasks.yml'));

var snippet = 'LANGS = ';
Object.keys(tasksDef).forEach(function (lang) {
  snippet += util.format('%s ', lang);
});
console.log(snippet);
