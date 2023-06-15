const { userInGuild } = require("./database.js")
const { createUser } = require("./databasecreate.js")
const { getDefaultUserSettings } = require("./defaults.js")

async function ensureuser(discorduserid,discordguildid) {
    if (!(await userInGuild(discorduserid,discordguildid))) { 
        await createUser(discorduserid,discordguildid,getDefaultUserSettings()) 
    }
}

module.exports = {ensureuser}