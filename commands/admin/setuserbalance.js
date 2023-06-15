const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,setUserSetting } = require("../../utils/database.js")
const { Guild } = require("../../utils/dbobjects.js")
const strings = require("../../data/strings.js")
const { humanizeNumber } = require("../../utils/formatting.js")
const { ensureuser } = require("../../utils/ensureuser.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("setuserbalance")
        .setDMPermission(false)
        .setDescription(strings.SETUSERBALANCE_DESC)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option=>option
            .setName("user")
            .setDescription("The user to set the balance of")
            .setRequired(true))
        .addIntegerOption(option=>option
            .setName("amount")
            .setDescription("The amount of money to set")
            .setMinValue(0)
            .setRequired(true))
        .addStringOption(option=>option
            .setName("store")
            .setDescription("Wallet or Bank")
            .setRequired(true)
            .addChoices(
                {name:"Wallet",value:"wallet"},
                {name:"Bank",value:"bank"}
            )),

    async execute(ctx) {
        const command = ""
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }
        
        await ctx.deferReply({ephemeral:true})

        if (ctx.user.id != 879801241859915837) {await ctx.editReply({content:strings.LACKING_PERMISSION});return}

        var user = ctx.options.getUser("user")
        var amount = ctx.options.getInteger("amount")
        var store = ctx.options.getString("store")
        
        // If there is no user in the database, create a new user for the current ctx.user
        await ensureuser(user.id,ctx.guild.id)
        
        const coinname=(await getGuildSetting(ctx.guild.id,"coinname"))

        await setUserSetting(user.id,ctx.guild.id,store,amount)

        await ctx.editReply({content:strings.SETUSERBALANCE_SUCCESS.replace("%USER%",user).replace("%STORE%",store).replace("%AMOUNT%",humanizeNumber(amount)).replace("%COINNAME%",coinname)})

    },

}
