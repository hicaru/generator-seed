module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    phrase: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  });

  return Word;
};
