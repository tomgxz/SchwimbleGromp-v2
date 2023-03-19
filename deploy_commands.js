console.log("STARTED deploy_commands.js")

const {REST,Routes}=require("discord.js");
const {clientId,token}=require("./config.json");
const fs=require("node:fs");
const path = require("node:path");

const commands=[];
const commandsPath=path.join(__dirname,"commands\\");

const folders = fs.readdirSync(commandsPath, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => commandsPath+item.name+"\\");

folders.push(commandsPath)

for (const folder of folders) {
    commandFiles = fs.readdirSync(folder).filter(file => file.endsWith(".js"));

    // generate commands
    for (const file of commandFiles) {
        const filepath=path.join(folder,file);
        console.log("Deploying command: "+filepath.replace(commandsPath,"").replace(".js",""))
        const command=require(filepath);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({version:"10"}).setToken(token);

(async () => {
    try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
            Routes.applicationCommands(clientId),
            {body:commands},
        );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {console.error(error)}
})();

console.log("FINISHED depoly_commands.js")

module.exports={}