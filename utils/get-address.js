const { workerData, parentPort } = require('worker_threads');
const { Wallet } = require('@zilliqa-js/account');
const { permutation } = require('./combinator');

const AMOUNT_OF_ACCOUNTS = 5;

function main() {
  const wallet = new Wallet('https://dev-api.zilliqa.com');
  const address = workerData.address;
  const phrase = permutation(workerData.index, workerData.array.slice(0)).join(' ');

  if (!wallet.isValidMnemonic(phrase)) {
    throw new Error('invalid phrase');
  }

  for (let index = 0; index < AMOUNT_OF_ACCOUNTS; index++) {
    wallet.addByMnemonic(phrase, index); 
  }

  if (wallet.accounts[address]) {
    return parentPort.postMessage({
      ...workerData,
      phrase,
      status: 'Done',
      accounts: wallet.accounts
    });
  }

  throw new Error('no found');
}

main();
