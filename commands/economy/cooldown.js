const { SlashCommandBuilder } = require("discord.js");
const { openAccount } = require("../../utils/economy.js")
const { getGuildSetting,getUserBalances } = require("../../utils/database.js")
const strings = require("../../data/strings.js")
const { Guild } = require("../../utils/dbobjects.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("cooldown")
        .setDescription(strings.COOLDOWN_DESC)
        .setDMPermission(false),

    async execute(ctx) {
        const command = "cooldown"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        await ctx.deferReply()
        
        await ctx.editReply({content:"Hello o/"})
    },

}
