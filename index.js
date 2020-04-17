const worker = require('./utils/worker');
// const bip39 = require('bip39');
const { toChecksumAddress, fromBech32Address } = require('@zilliqa-js/crypto');
const { validation } = require('@zilliqa-js/util');
const { fact } = require('./utils/combinator');

const AMOUNT_OF_THREADS = 6;

async function run() {
  let isFound = false;
  let needFind = '';
  const seed = '';

  if (validation.isBech32(needFind)) {
    needFind = fromBech32Address(needFind);
    needFind = toChecksumAddress(needFind);
  }

  const array = seed.split(' ');
  const length = fact(array.length);

  let queue = [];
  let point0 = 0;
  let point1 = length;

  while (point0 !== point1) {
    if (isFound) {
      break;
    }

    if (queue.length > AMOUNT_OF_THREADS) {
      await Promise.all(queue);

      queue = [];
    }

    queue.push(
      worker(`${__dirname}/utils/get-address.js`, {
        array,
        index: point0,
        address: needFind
      })
        .then((data) => {
          console.log(data);

          isFound = true;
        })
        .catch(() => console.log('NEXT', point0, 'of', length))
    );
    queue.push(
      worker(`${__dirname}/utils/get-address.js`, {
        array,
        index: point1,
        address: needFind
      })
        .then((data) => {
          console.log(data);

          isFound = true;
        })
        .catch(() => console.log('NEXT', point1, 'of', length))
    );

    point0++;
    point1--;
  }
}

run();
