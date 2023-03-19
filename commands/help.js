const { SlashCommandBuilder } = require("discord.js");
const strings = require("../data/strings.js")
const { createTopLevelHelpMenu } = require("../utils/help.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("help")
        .setDMPermission(true)
        .setDescription(strings.HELP_DESC)
        .addStringOption(option=>option
            .setName("command")
            .setDescription("The command to reset the cooldown of")
            .setRequired(false)),
            /*.addChoices(
                {name:"work",value:"work"},
                {name:"crime",value:"crime"},
                {name:"rob",value:"rob"},
                {name:"slut",value:"slut"},
                {name:"beg",value:"beg"},
                {name:"withdraw",value:"withdraw"},
                {name:"deposit",value:"deposit"},
                {name:"send",value:"send"},
            )),*/

    async execute(ctx) {
        const command = "help"

        const reply = await ctx.deferReply()

        createTopLevelHelpMenu(ctx)

    },

}
