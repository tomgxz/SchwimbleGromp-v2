const { SlashCommandBuilder } = require("discord.js");
const { openAccount,failrate,fine,payout,reply } = require("../../utils/economy.js")
const { getGuildSetting,updateWalletBalance } = require("../../utils/database.js")
const { humanizeNumber,humanizeMS } = require("../../utils/formatting.js")
const strings = require("../../data/strings.js")
const { Guild } = require("../../utils/dbobjects.js")
const { checkCooldown,triggerCooldown } = require("../../utils/cooldown.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("crime")
        .setDescription(strings.CRIME_DESC)
        .setDMPermission(false),

    async execute(ctx) {
        const command = "crime"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        var output = await checkCooldown(ctx,command)
        if (output[0]) { await ctx.reply({content:strings.COOLDOWN_ACTIVE.replace("%COMMAND%",command).replace("%TIME%",humanizeMS(output[1])),ephemeral:true});return }

        await ctx.deferReply()
        
        const coinname=(await getGuildSetting(ctx.guild.id,"coinname"))
        await openAccount(ctx.user,ctx.guild.id)

        if (Math.floor(Math.random() * 100) >= (await failrate(ctx.guild.id,"crime"))) {
            const amount = (await fine(ctx.guild.id,"crime"))
            updateWalletBalance(ctx.user.id,ctx.guild.id,-amount)
            await ctx.editReply({content:strings.CRIME_FAIL.replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})
        } else {
            const amount = (await payout(ctx.guild.id,"crime"))
            updateWalletBalance(ctx.user.id,ctx.guild.id,amount)
            await ctx.editReply({content:reply("crime").replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})

            triggerCooldown(ctx,command)
        }
    },

}
