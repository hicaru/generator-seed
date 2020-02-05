const { sequelize } = require('./models');
const bip39 = require('bip39');

console.log(bip39.generateMnemonic());

sequelize.models.Word.create({
  phrase: bip39.generateMnemonic()
});