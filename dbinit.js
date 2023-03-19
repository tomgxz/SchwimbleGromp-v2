console.log("STARTED dbinit.js")

const Sequelize = require("sequelize")

const sequelize = new Sequelize("database","username","password",{
    host:"localhost",
    dialect:"sqlite",
    logging:false,
    storage:"database.sqlite",
})

const User = require("./models/User.js")(sequelize,Sequelize.DataTypes)
const Guild = require("./models/Guild.js")(sequelize,Sequelize.DataTypes)

User.belongsTo(Guild,{foreignKey:"id",as:"discordguildid"})