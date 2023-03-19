const { SlashCommandBuilder } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,getUserBalances,updateBankBalance } = require("../../utils/database.js")
const strings = require("../../data/strings.js")
const { Guild } = require("../../utils/dbobjects.js")
const { checkCooldown,triggerCooldown } = require("../../utils/cooldown.js")
const { humanizeMS } = require("../../utils/formatting.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("send")
        .setDescription(strings.SEND_DESC)
        .setDMPermission(false)
        .addUserOption(option=>option
            .setName("user")
            .setDescription("The user to send money to")
            .setRequired(true))
        .addIntegerOption(option=>option
            .setName("amount")
            .setDescription("The amount of money to send")
            .setMinValue(100)
            .setRequired(true)),

    async execute(ctx) {
        const command = "send"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        var output = await checkCooldown(ctx,command)
        if (output[0]) { await ctx.reply({content:strings.COOLDOWN_ACTIVE.replace("%COMMAND%",command).replace("%TIME%",humanizeMS(output[1])),ephemeral:true});return }

        await ctx.deferReply()
        
        const coinname=await getGuildSetting(ctx.guild.id,"coinname")
        var user = ctx.options.getUser("user");
        var amount = ctx.options.getInteger("amount");

        if (user == ctx.user) { await ctx.editReply({content:strings.SEND_NOT_SELF});return }

        await openAccount(ctx.user,ctx.guild.id)

        var balance = (await getUserBalances(ctx.user.id,ctx.guild.id)).bank

        if (balance < 0) { await ctx.editReply({content:strings.SEND_DEBT});return }
        if (balance == 0) { await ctx.editReply({content:strings.SEND_NO_MONEY});return }
        if (balance < amount) { await ctx.editReply({content:strings.SEND_OVER});return }

        await openAccount(user,ctx.guild.id)

        await updateBankBalance(ctx.user.id,ctx.guild.id,-amount)
        await updateBankBalance(user.id,ctx.guild.id,amount)

        await ctx.editReply({content:strings.SEND_SUCCESS.replace("%USER%",user).replace("%AMOUNT%",amount).replace("%COINNAME%",coinname)})

        triggerCooldown(ctx,command)
    },

}
