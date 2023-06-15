const fs = require("fs")

const commandroot = "../data/logger/commands/"

async function logcommand(ctx) {
    var guilddir = `${commandroot}${ctx.guild.id}`

    if (!fs.existsSync(guilddir)) fs.mkdirSync(guilddir,'0777', true);


}

module.exports = {logcommand}