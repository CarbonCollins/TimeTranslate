const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

//const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})


// Register an event to handle incoming messages
client.on('messageCreate', async msg => {
  // This block will prevent the bot from responding to itself and other bots
  if(msg.author.bot) {
	return
  }

  // Check if the message starts with '!hello' and respond with 'world!' if it does.
  if(msg.content.startsWith("!hello")) {
	msg.reply("world!")
  }

  // Return a local time from a supplied Date/Time
  if(msg.content.includes("%%")) {
	  let msgContent = msg.content;
	  msgContent = msgContent.replace('%%', '');
	  let epoch=Date.parse(msgContent);
	  msg.channel.send('<t:' + epoch.toString().slice(0,10) + '>');
  }
  
  //Return Unix epoch from specified date/time
  if(msg.content.includes("&&")) {
	  let msgContent = msg.content;
	  msgContent = msgContent.replace('%%', '');
	  let epoch=Date.parse(msgContent);
	  msg.channel.send(epoch.toString().slice(0,10));
  }  

  //future use
  if(msg.content.startsWith("!dm")) {
	  let messageContent = msg.content.replace("!dm", "You Rang")
	  msg.member.send(messageContent)
  }

  //Help prompt
  if(msg.content.startsWith("!tthelp")) {
        let messageContent = msg.content.replace("!tthelp", 'Use %%DD, MM YYYY HH:MM:SS TZ to receive your local time from a specified time in another timezone\n E.G. %%28, AUG 2022 11:00:00 CST' + '\n\n' +
                                                  'Use &&DD, MM YYYY HH:MM:SS TZ to recieve to specified dat/time as Unix Epoch time. Use this number with <t:epoch> in a message to automatically send a time/date that translate to the recipients local time');
        msg.member.send(messageContent);
  }

})

client.login(token);


