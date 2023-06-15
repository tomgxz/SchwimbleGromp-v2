const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,setUserSetting } = require("../../utils/database.js")
const { Guild } = require("../../utils/dbobjects.js")
const strings = require("../../data/strings.js")
const { humanizeNumber } = require("../../utils/formatting.js")
const { ensureuser } = require("../../utils/ensureuser.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("setusercooldown")
        .setDMPermission(false)
        .setDescription(strings.SETUSERBALANCE_DESC)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option=>option
            .setName("user")
            .setDescription("The user to reset the cooldown of")
            .setRequired(true))
        .addStringOption(option=>option
            .setName("command")
            .setDescription("The command to reset the cooldown of")
            .setRequired(true)
            .addChoices(
                {name:"work",value:"work"},
                {name:"crime",value:"crime"},
                {name:"rob",value:"rob"},
                {name:"slut",value:"slut"},
                {name:"beg",value:"beg"},
                {name:"withdraw",value:"withdraw"},
                {name:"deposit",value:"deposit"},
                {name:"send",value:"send"},
            )),

    async execute(ctx) {
        const command = ""
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        await ctx.deferReply({ephemeral:true})

        if (ctx.user.id != 879801241859915837) {await ctx.editReply({content:strings.LACKING_PERMISSION});return}

        var user = ctx.options.getUser("user")
        var _command = ctx.options.getString("command")

        // If there is no user in the database, create a new user for the current ctx.user
        await ensureuser(user.id,ctx.guild.id)

        await setUserSetting(user.id,ctx.guild.id,`commandsUntilCooldownRemaining_${_command}`,await getGuildSetting(ctx.guild.id,`commandsUntilCooldown_${_command}`))
        await setUserSetting(user.id,ctx.guild.id,`cooldowns_${_command}`,-1)

        await ctx.editReply({content:strings.SETUSERCOOLDOWN_SUCCESS.replace("%USER%",user).replace("%COMMAND%",_command)})

    },

}
