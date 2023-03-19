console.log("STARTED index.js")

const {Client,codeBlock,Collection,Events,Formatters,GatewayIntentBits} = require("discord.js");
const {token} = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

// Import Sequelize module
const Sequelize=require("sequelize")

// create the discord client and currency collection
const client=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages]})
const currency=new Collection()

// create the sequelize connection
const sequelize = new Sequelize({
    dialect:"sqlite",
    storage:"./db.sqlite",
    logging: false, 
});

// authenticate sequelize connection
try {
  sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// set the databse connection and discord client as an import so that other files can access it
module.exports={sequelize,client}

// deploy commands if necessary
// require("./deploy_commands.js")

// create commands collection
client.commands=new Collection();
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
        console.log("Registering command: "+filepath.replace(commandsPath,"").replace(".js",""))
        var command=require(filepath);
        command.directory=folder.replace(__dirname,"")
        client.commands.set(command.data.name,command);
    }
}

// generate event listeners
const eventsPath=path.join(__dirname,"events");
const eventFiles=fs.readdirSync(eventsPath).filter(file=>file.endsWith(".js"));
for (const file of eventFiles) {
    const filepath=path.join(eventsPath,file);
    const event=require(filepath);
    if (event.once) client.once(event.name,(...args)=>event.execute(...args));
    else client.on(event.name,(...args)=>event.execute(...args));
}

console.log("Starting bot...")

// start bot
client.login(token);

// https://www.discord.com/api/oauth2/authorize?client_id=1038866848206307338&permissions=8&scope=bot%20applications.commands
