const { SlashCommandBuilder } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,getUserBalances } = require("../../utils/database.js")
const strings = require("../../data/strings.js")
const { Guild } = require("../../utils/dbobjects.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("balance")
        .setDescription(strings.BALANCE_DESC)
        .setDMPermission(false)
        .addUserOption(option=>option
            .setName("user")
            .setDescription("Optional, the user's balance to view")),

    async execute(ctx) {
        const command = "balance"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        await ctx.deferReply()
        
        const coinname=await getGuildSetting(ctx.guild.id,"coinname")
        var user = ctx.options.getUser("user") ?? null;

        if (user == null) user=ctx.user
        await openAccount(user,ctx.guild.id)

        balances=await getUserBalances(user.id,ctx.guild.id)

        console.log(user)
        
        _ = user + "'s"
        if (user==ctx.user) _="Your"

        await ctx.editReply({content:strings.BALANCE_WALLET.replace("%USER%",_).replace("%BALANCE%",balances.wallet).replace("%COINNAME%",coinname)+"\n"+strings.BALANCE_BANK.replace("%USER%",_).replace("%BALANCE%",balances.bank).replace("%COINNAME%",coinname)})
    },

}
