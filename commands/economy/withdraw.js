const { SlashCommandBuilder } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,getUserBalances,updateWalletBalance,updateBankBalance } = require("../../utils/database.js")
const strings = require("../../data/strings.js");
const { humanizeNumber,humanizeMS } = require("../../utils/formatting.js")
const { Guild } = require("../../utils/dbobjects.js")
const { checkCooldown,triggerCooldown } = require("../../utils/cooldown.js")
const { ensureuser } = require("../../utils/ensureuser.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("withdraw")
        .setDescription(strings.WITHDRAW_DESC)
        .setDMPermission(false)
        .addIntegerOption(option=>option
            .setName("amount")
            .setDescription("Optional, the amount of money to withdraw. Leave blank to deposit all money.")
            .setMinValue(100)),

    async execute(ctx) {
        const command = "withdraw"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        // If there is no user in the database, create a new user for the current ctx.user
        await ensureuser(ctx.user.id,ctx.guild.id)
        
        var output = await checkCooldown(ctx,command)
        if (output[0]) { await ctx.reply({content:strings.COOLDOWN_ACTIVE.replace("%COMMAND%",command).replace("%TIME%",humanizeMS(output[1])),ephemeral:true});return }

        await ctx.deferReply()
        
        coinname=(await getGuildSetting(ctx.guild.id,"coinname"))

        var amount = ctx.options.getInteger("amount") ?? null;

        const balances = (await getUserBalances(ctx.user.id,ctx.guild.id))
        if (amount == null) amount = balances.bank

        if (balances.wallet < 0) { await ctx.editReply({content:strings.WITHDRAW_DEBT});return }
        if (amount>balances.bank) { await ctx.editReply({content:strings.WITHDRAW_OVER});return }

        await updateBankBalance(ctx.user.id,ctx.guild.id,-amount)
        await updateWalletBalance(ctx.user.id,ctx.guild.id,amount)

        await ctx.editReply({content:strings.WITHDRAW_SUCCESS.replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})

        triggerCooldown(ctx,command)
    },

}
