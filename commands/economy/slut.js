const { SlashCommandBuilder } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,getUserBalances } = require("../../utils/database.js")
const strings = require("../../data/strings.js")
const { Guild } = require("../../utils/dbobjects.js")
const { checkCooldown,triggerCooldown } = require("../../utils/cooldown.js")
const { humanizeMS } = require("../../utils/formatting.js")
const { ensureuser } = require("../../utils/ensureuser.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("slut")
        .setDescription(strings.SLUT_DESC)
        .setDMPermission(false),

    async execute(ctx) {
        const command = "slut"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        // If there is no user in the database, create a new user for the current ctx.user
        await ensureuser(ctx.user.id,ctx.guild.id)
        
        var output = await checkCooldown(ctx,command)
        if (output[0]) { await ctx.reply({content:strings.COOLDOWN_ACTIVE.replace("%COMMAND%",command).replace("%TIME%",humanizeMS(output[1])),ephemeral:true});return }

        await ctx.deferReply()
        
        const coinname=(await getGuildSetting(ctx.guild.id,"coinname"))

        if (Math.floor(Math.random() * 100) >= (await failrate(ctx.guild.id,"slut"))) {
            const amount = (await fine(ctx.guild.id,"slut"))
            updateWalletBalance(ctx.user.id,ctx.guild.id,-amount)
            await ctx.editReply({content:strings.CRIME_FAIL.replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})
        } else {
            const amount = (await payout(ctx.guild.id,"slut"))
            updateWalletBalance(ctx.user.id,ctx.guild.id,amount)
            await ctx.editReply({content:reply("slut").replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})
        }

        triggerCooldown(ctx,command)
    },

}
