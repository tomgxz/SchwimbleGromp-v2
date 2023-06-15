const { SlashCommandBuilder } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,updateWalletBalance } = require("../../utils/database.js")
const strings = require("../../data/strings.js")
const { Guild } = require("../../utils/dbobjects.js")
const { checkCooldown,triggerCooldown } = require("../../utils/cooldown.js")
const { humanizeMS } = require("../../utils/formatting.js")
const { ensureuser } = require("../../utils/ensureuser.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("beg")
        .setDescription(strings.BEG_DESC)
        .setDMPermission(false),

    async execute(ctx) {
        const command = "beg"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        // If there is no user in the database, create a new user for the current ctx.user
        await ensureuser(ctx.user.id,ctx.guild.id)

        var output = await checkCooldown(ctx,command)
        if (output[0]) { await ctx.reply({content:strings.COOLDOWN_ACTIVE.replace("%COMMAND%",command).replace("%TIME%",humanizeMS(output[1])),ephemeral:true});return }

        await ctx.deferReply()
        
        coinname=(await getGuildSetting(ctx.guild.id,"coinname"))

        // generate a number with weights where 1 is a higher chance than 2, and so on. Max 16, min 1. 
        const amount = Math.round(16 / (Math.random() * 16 + 1))
        
        updateWalletBalance(ctx.user.id,ctx.guild.id,amount)

        await ctx.editReply({content:strings.BEG_SUCCESS.replace("%AMOUNT%",amount).replace("%COINNAME%",coinname)})

        triggerCooldown(ctx,command)
    },

}
