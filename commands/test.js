const { SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");
const strings = require("../data/strings.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("test")
        .setDescription(strings.TEST_DESC)
        .setDMPermission(false),

    async execute(ctx) {
        await ctx.deferReply({ephemeral:true})

        try {
            await ctx.editReply({content:strings.TEST_SUCCESS})
        } catch (e) {
            await ctx.editReply({content:strings.TEST_FAILED})
        }
    },

}
