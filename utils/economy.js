const { User,Guild } = require("../utils/dbobjects.js")
const { createUser } = require("../utils/databasecreate.js")
const { getDefaultUserSettings } = require("../utils/defaults.js")

async function openAccount(user,guildid) {
    const users = await User.findAll({where:{discorduserid:user.id,discordguildid:guildid}})
    if (users.length < 1) {
        console.log("Length less than 1")
        await createUser(user.id,guildid,getDefaultUserSettings())
    }
}

async function failrate(guildid,command) {
    if (command=="heist") return 20
    return (await Guild.findAll({attributes:[`failrates_${command}`],where:{discordguildid:guildid.toString()}}))[0][`failrates_${command}`]
}
async function payout(guildid,command) {
    var guild = (await Guild.findAll({attributes:[`payouts_${command}_min`,`payouts_${command}_max`],where:{discordguildid:guildid.toString()}}))[0]
    var min = guild[`payouts_${command}_min`]
    var max = guild[`payouts_${command}_max`]

    return Math.floor(Math.random() * (max-min+1))+min
}

async function fine(guildid,command) {
    var guild = (await Guild.findAll({attributes:[`fines_${command}_min`,`fines_${command}_max`],where:{discordguildid:guildid.toString()}}))[0]
    var min = guild[`fines_${command}_min`]
    var max = guild[`fines_${command}_max`]

    return Math.floor(Math.random() * (max-min+1))+min
}

function reply(command) {
    return "You were successful! You gained %AMOUNT% %COINNAME%"
}

module.exports={openAccount,failrate,payout,fine,reply}