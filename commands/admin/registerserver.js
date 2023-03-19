const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");
const { createGuild } = require("../../utils/databasecreate.js")
const { getDefaultGuildSettings } = require("../../utils/defaults.js")
const { Guild } = require("../../utils/dbobjects.js")
const strings = require("../../data/strings.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("registerserver")
        .setDescription(strings.REGISTERSERVER_DESC)
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(ctx) {
        await ctx.deferReply({ephemeral:true})

        try {
            const guilds = await Guild.findAll({where:{discordguildid:ctx.guild.id.toString()}})
            if (guilds.length > 0) {
                await ctx.editReply({content:strings.SERVER_ALREADY_REGISTERED})
                return
            }
            createGuild(ctx.guild.id,getDefaultGuildSettings())
            await ctx.editReply({content:strings.SERVER_REGISTERED_SUCCESS})
        } catch (e) {
            await ctx.editReply({content:strings.SERVER_REGISTERED_FAILED})
        }
    },

}
