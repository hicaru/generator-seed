const { sequelize } = require('./models');
const bip39 = require('bip39');

const { fact, permutation } = require('./utils/combinator');

async function combinator() {
  const array = bip39.generateMnemonic().split(' ');

  for (let i=0; i < fact(array.length); i++) {
    await sequelize.models.Word.create({
      phrase: permutation(i, array.slice(0)).join(' ')
    })
  }
}

combinator();
