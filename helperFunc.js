const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Character = sequelize.define('character', {
	id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
		type: Sequelize.STRING,
		unique: true,
	},
	refresh: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
  currentfp: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
}, {
  tableName: 'character'
});


async function createChar(name, refresh, current) {
    const check = await Character.findOne({ where: { name: name } });
    if (check === null) {
        const newChar = await Character.create({ name: name, refresh: refresh, currentfp: current, createdAt: Date.now(), updatedAt: Date.now()});
        console.log(newChar.name, " auto-generated ID:", newChar.id);
        return true;
    } else return false;
};

async function findCharID(name) {
  const charId = await Character.findOne({ where: { name: name } });
  if (charId === null) {
    const errorText = "No character found.";
    console.log(errorText);
    return errorText;
  } else return charId.id;
};
;

async function adjustFatePoint(name, value) {
  const char = await Character.findOne({ where: { name: name } });
  if (char === null) {
    const errorText = "No character found.";
    console.log(errorText);
    return false;
  } else {
      char.setDataValue('currentfp', value);
      return true;
  };
};

async function adjustRefresh(name, value) {
  const char = await Character.findOne({ where: { name: name } });
  if (char === null) {
    const errorText = "No character found.";
    console.log(errorText);
    return false;
  } else {
      char.setDataValue('refresh', value);
      return true;
  };
};

async function viewFatePoints(name){
  const char = await Character.findOne({ where: { name: name } });
  if (char === null) {
    const errorText = "No character found.";
    console.log(errorText);
    return false;
  } else {
    value = char.getDataValue('currentfp')
  };
};

async function refreshChar(name) {
  const char = await Character.findOne({ where: { name: name } });
  if (char === null) {
    const errorText = "No character found.";
    console.log(errorText);
    return false;
  } else {
    refresh = char.getDataValue('refresh');
    if (refresh > char.getDataValue('currentfp')) {
      char.setDataValue('currentfp', refresh);
    }
  };
}

function rollDice(modifier) {
    var total = 0;
    for (let index = 0; index < 4; index++) {
        var roll = Math.round(Math.random() * 2) - 1;
        total += roll
    };

    var result = total + modifier;
    return "Result: " + total + " + " + modifier + " = " + result + ".";
};

module.exports = { 
    createChar, 
    findCharID, 
    adjustFatePoint, 
    adjustRefresh,
    viewFatePoints, 
    rollDice, 
   
}