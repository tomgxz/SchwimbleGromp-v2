const { SlashCommandBuilder } = require("discord.js");
const strings = require("../data/strings.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("ping")
        .setDescription(strings.PING_DESC),

    async execute(ctx) {
        await ctx.editReply({content:"Pong!"})
    },
}
