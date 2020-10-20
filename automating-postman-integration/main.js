var fs = require('fs');
var path = require('path');
const readline = require('readline');
const basePath = "src/app/pet";

fs.readdir(basePath, (err, files) => {
    files.forEach(file => {
      if (file.endsWith('resource.ts')) {
        parseFile(file);
      }
    });
  });

const myCollection = [];

function parseFile(fileName) {
    // var fileObj = fs.readFileSync(path.join(basePath, fileName), { encoding: 'utf8', flag: 'r' });
    var stream = fs.createReadStream(path.join(basePath, fileName));
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
      });
      let newItem = {};
      rl.on('line', function(line) {
        const endOfFunction = line.match(/}$/);
        const startMatch = line.match(/(\w+)\((.+)?\): Observable\<(.+)\> {/);
        const bodyMatch = line.match(/return this\.http\.(\w+)(\<.+\>)?\((.+)\)/);
        if(endOfFunction) {
            newItem = {};
            return;
        }
        if(startMatch) {
            console.log(startMatch);
            newItem.name = startMatch[1];
            newItem.parameters = startMatch[2];
            newItem.parameterType = startMatch[3].indexOf('[]') > -1 ? 'array' : 'object';
            newItem.schema = startMatch[3].replace('[]', '');
            return;
        }
        if(bodyMatch) {
            newItem.method = bodyMatch[1];
            newItem.url = bodyMatch[3];
            myCollection.push(newItem);
        }
    });
    rl.on('close', function() {
        console.log(myCollection);
    })
}