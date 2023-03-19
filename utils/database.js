const { QueryTypes } = require("sequelize");
const { User,Guild } = require("./dbobjects.js");
const sequelize = require("../index.js")

async function dbExecute(command,commit=false) {
    try{const result = await sequelize.query(command)}
    catch(e){}
}

async function dbSelect(command) {
    try{const result = await sequelize.query(command,{type:QueryTypes.SELECT});return result}
    catch(e){}
}

async function getGuildList() { return await Guild.findAll() }

function getDiscordUserList() {
    out=[]
    for (x in dbSelect("SELECT * FROM User")) {out.append(x[0])}
    return out
}

async function getUserBalances(discorduid,guildid) { return (await User.findAll({attributes:["wallet","bank"],where:{discorduserid:discorduid,discordguildid:guildid.toString()}}))[0].dataValues }


function getUserIds(guildid) {
    out=[]
    for (x in dbSelect(`SELECT * FROM User WHERE guildid=${guildid}`)) {out.append(x[1])}
    return out
}

async function getGuildSetting(guildid,key) { return (await Guild.findAll({attributes:[key],where:{discordguildid:guildid.toString()}}))[0].dataValues[key] }

async function getUserSetting(discorduid,guildid,key) { return (await User.findAll({attributes:[key],where:{discorduserid:discorduid,discordguildid:guildid.toString()}}))[0].dataValues[key] }

async function setUserSetting(discorduid,guildid,key,value) {
    var user = await(User.findAll({where:{discorduserid:discorduid,discordguildid:guildid.toString()}}))
    user=user[0]
    user[key] = value
    await user.save()
}

async function updateWalletBalance(discorduid,guildid,amount) {
    if (isNaN(amount)) throw Error(
        "Amount given is not a number. Expected: number, Given: "+amount)
    await setUserSetting(discorduid,guildid,"wallet",(await getUserBalances(discorduid,guildid)).wallet+amount)
}

async function updateBankBalance(discorduid,guildid,amount) {
    if (isNaN(amount)) throw Error(
        "Amount given is not a number. Expected: number, Given: "+amount)
    await setUserSetting(discorduid,guildid,"bank",(await getUserBalances(discorduid,guildid)).bank+amount)
}

module.exports={dbExecute,dbSelect,getGuildList,getDiscordUserList,getUserBalances,getUserIds,getGuildSetting,getUserSetting,setUserSetting,updateWalletBalance,updateBankBalance}