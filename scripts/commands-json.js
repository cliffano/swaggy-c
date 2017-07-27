const p      = require('path');
const util   = require('util');
const yamljs = require('yamljs');

const descs = {
  clean:   'Clean up generated %s client',
  gen:     'Generate %s API client code',
  deps:    'Download %s dependencies',
  test:    'Run generated %s tests',
  package: 'Create %s package artifact',
  install: 'Install %s package on host machine',
  doc:     'Generate documentation for %s API client',
  publish: 'Publish %s package',
}

// Read tasks definition file and generate a bagofcli commands.json snippet

const tasksDef = yamljs.load(p.join(__dirname, '..', 'conf', 'tasks.yml'));

var snippet = '';
Object.keys(tasksDef).forEach(function (lang) {
  Object.keys(tasksDef[lang]).forEach(function (task) {
    var desc = util.format(descs[task], lang);
    snippet += util.format('"%s-%s": {\n  "desc": "%s"\n},\n', lang, task, desc);
  });
});
console.log(snippet);
