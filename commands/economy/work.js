const { SlashCommandBuilder } = require("discord.js");
const { openAccount,payout,reply } = require("../../utils/economy.js")
const strings = require("../../data/strings.js")
const { checkCooldown,triggerCooldown } = require("../../utils/cooldown.js")
const { getGuildSetting,updateWalletBalance } = require("../../utils/database.js")
const { humanizeNumber,humanizeMS } = require("../../utils/formatting.js")
const { Guild } = require("../../utils/dbobjects.js")
const { ensureuser } = require("../../utils/ensureuser.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("work")
        .setDescription(strings.WORK_DESC)
        .setDMPermission(false),

    async execute(ctx) {
        const command = "work"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        // If there is no user in the database, create a new user for the current ctx.user
        await ensureuser(ctx.user.id,ctx.guild.id)

        var output = await checkCooldown(ctx,command)
        if (output[0]) { await ctx.reply({content:strings.COOLDOWN_ACTIVE.replace("%COMMAND%",command).replace("%TIME%",humanizeMS(output[1])),ephemeral:true});return }

        await ctx.deferReply()

        const coinname=(await getGuildSetting(ctx.guild.id,"coinname"))
        await openAccount(ctx.user,ctx.guild.id)
    
        const amount = (await payout(ctx.guild.id,"work"))
        updateWalletBalance(ctx.user.id,ctx.guild.id,amount)
        await ctx.editReply({content:reply("work").replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})

        triggerCooldown(ctx,command)
    },

}
