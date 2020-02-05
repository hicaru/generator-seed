const debug = require('debug')('combinator');

const { sequelize } = require('./models');
const bip39 = require('bip39');

const { fact, permutation } = require('./utils/combinator');

async function combinator() {
  debug('run combinator');

  const array = bip39.generateMnemonic().split(' ');
  const length = fact(array.length)

  for (let i=0; i < length; i++) {
    const phrase = permutation(i, array.slice(0)).join(' ');

    await sequelize.models.Word.create({
      phrase
    });

    debug('generated', i, 'of', length, 'phrase:', phrase);
  }
}

combinator();
