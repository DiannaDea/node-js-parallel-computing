const { Console } = require('console');
const { getIndexesFibNumbers, fib, printResult } = require('./shared');
const console = new Console(process.stdout, process.stderr);

function main() {
  const fibIndexes = getIndexesFibNumbers();
  console.time("Runtime");
  
  fibIndexes.map(fibIndex => {
    console.time("Sync Fib time");

    const fibNumber = fib(fibIndex);
    printResult(fibIndex, fibNumber);
    
    console.timeEnd("Sync Fib time");
    console.log('======================')
  });

  console.timeEnd("Runtime");
}

main();


