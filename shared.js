function getIndexesFibNumbers() {
  try {
    return process.argv
    .slice(2)
    .map(num => parseInt(num));
  } catch (error) {
    console.log('Invalid params');
  }
}

function fib(n) {
  const fibArr = [0, 1];
  for (let i = 2; i < n + 1; i++){
    fibArr.push(fibArr[i - 2] + fibArr[i -1]);
  }
  return fibArr[n];
}

function printResultWithWorkers(nth, fibonacci, numberWorkers) {
  console.log(`FIBARR[${nth}] = ${fibonacci}, workers = ${numberWorkers}`)
}

function printResult(nth, fibonacci) {
  console.log(`FIBARR[${nth}] = ${fibonacci}`);
}

module.exports = {
  getIndexesFibNumbers,
  fib,
  printResult,
  printResultWithWorkers,
}
