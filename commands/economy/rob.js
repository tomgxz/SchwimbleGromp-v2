const { SlashCommandBuilder } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
//const { failrate,fine } = require("../../utils/economy.js")
const { getGuildSetting,getUserBalances } = require("../../utils/database.js")
const strings = require("../../data/strings.js")
const { Guild } = require("../../utils/dbobjects.js")
const { checkCooldown,triggerCooldown } = require("../../utils/cooldown.js")
const { humanizeMS } = require("../../utils/formatting.js")
const { ensureuser } = require("../../utils/ensureuser.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("rob")
        .setDescription(strings.ROB_DESC)
        .setDMPermission(false)
        .addUserOption(option=>option
            .setName("user")
            .setDescription("The user to rob")
            .setRequired(true)),

    async execute(ctx) {
        const command = "rob"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        // If there is no user in the database, create a new user for the current ctx.user
        await ensureuser(ctx.user.id,ctx.guild.id)
        
        var output = await checkCooldown(ctx,command)
        if (output[0]) { await ctx.reply({content:strings.COOLDOWN_ACTIVE.replace("%COMMAND%",command).replace("%TIME%",humanizeMS(output[1])),ephemeral:true});return }

        await ctx.deferReply()
        
        const coinname=(await getGuildSetting(ctx.guild.id,"coinname"))

        var user = ctx.options.getUser("user")
        if (user == ctx.user) { await ctx.editReply({content:strings.ROB_NOT_SELF});return }

        await ensureuser(user.id,ctx.guild.id)        

        var amount = (await getUserBalances(user.id,ctx.guild.id)).wallet

        if (amount <=0) { await ctx.editReply({content:strings.ROB_NO_MONEY.replace("%USER%",user)});return }

        if (false) { // (Math.floor(Math.random() * 100) >= (await failrate(ctx.guild.id,"rob")))
            amount = (await fine(ctx.guild.id,"crime"))
            updateWalletBalance(ctx.user.id,ctx.guild.id,-amount)
            await ctx.editReply({content:strings.ROB_FAIL.replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})
            return
        }

        amount = Math.floor(Math.random() * Math.floor(amount/2)+1)+Math.floor(amount/2)

        await updateWalletBalance(user.id,ctx.guild.id,-amount)
        await updateWalletBalance(ctx.user.id,ctx.guild.id,amount)

        await ctx.editReply({content:strings.ROB_SUCCESS.replace("%USER%",user).replace("%AMOUNT%",amount).replace("%COINNAME%",coinname)})

        triggerCooldown(ctx,command)
    },

}
