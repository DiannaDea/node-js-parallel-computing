const napa = require('napajs');
const { Console } = require('console');
const { getIndexesFibNumbers, fib, printResultWithWorkers } = require('./shared');

const NUMBER_OF_WORKERS = 4;
const zone = napa.zone.create('zone', { workers: NUMBER_OF_WORKERS} );
const console = new Console({ stdout: process.stdout, stderr: process.stderr });

console.time = function(label) {
  this._times[label] = Date.now();
};

console.timeEnd = function(label) {
  var time = this._times[label];
  if (!time) {
    throw new Error('No such label: ' + label);
  }
  var duration = Date.now() - time;
  this.log('%s: %dms', label, duration / 10);
};

function run(fibIndex) {
  console.time(`Napa.js Fib time (${fibIndex})`);

  return zone.execute(fib, [fibIndex])
      .then( result => {
          printResultWithWorkers(fibIndex, result.value, NUMBER_OF_WORKERS);
          console.timeEnd(`Napa.js Fib time (${fibIndex})`);
          console.log('======================')
          return result.value;
      });
}

function main () {
  const fibIndexes = getIndexesFibNumbers();
  console.time("Runtime");
  
  const fibPromises = fibIndexes.map(fibIndex => {
    return run(fibIndex);
  });

  Promise.all(fibPromises).then(() => {
    console.timeEnd("Runtime");
  });
}

main();


