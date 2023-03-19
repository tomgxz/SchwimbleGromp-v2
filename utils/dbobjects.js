console.log("STARTED dbobjects.js")

const Sequelize = require("sequelize")

const { sequelize } = require("../index.js")

const User = require("../models/User.js")(sequelize,Sequelize.DataTypes)
const Guild = require("../models/Guild.js")(sequelize,Sequelize.DataTypes)

// {foreignKey:"guildid",as:"discordguildid"}
// {foreignKey:"discordguildid",as:"guildid"}
Guild.hasMany(User,{foreignKey:"discordguildid"})
User.belongsTo(Guild)

// ONLY UNCOMMENT IF DATABASE IS EMPTY - WILL CLEAR ALL DATA
// sequelize.sync({ force: true });

module.exports={ User, Guild }

console.log("FINISHED dbobjects.js")