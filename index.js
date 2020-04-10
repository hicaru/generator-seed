// const { sequelize } = require('./models');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
// const bip39 = require('bip39');

const { fact, permutation } = require('./utils/combinator');

async function combinator() {
  const needFind = 'paste your address';
  const seed = 'paste your seed phrase';

  const array = seed.split(' ');
  const length = fact(array.length);

  for (let i = 0; i < length; i++) {
    const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
    const phrase = permutation(i, array.slice(0)).join(' ');

    try {
      if (!zilliqa.wallet.isValidMnemonic(phrase)) {
        continue;
      }

      zilliqa.wallet.addByMnemonic(phrase);

      const { bech32Address } = zilliqa.wallet.defaultAccount;

      if (needFind == bech32Address) {
        console.log('FOUND', phrase);

        return null;
      }

      console.log('generated', i, 'of', length, 'phrase:', phrase, bech32Address);
    } catch (err) {
      console.log('generated', i, 'of', length, 'skip');
    }
  }
}

combinator();
