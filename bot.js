'use strict';

// Import the discord.js module
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token } = require('./config.json');
// Create an instance of a Discord client
const client = new Client();
const shell = require('shelljs')
let fs = require('fs')
let logs = fs.createWriteStream('log.txt') //will creat log.txt if does not exist
/**
 * The ready event is vital, it means that only after this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
	console.log('Initialized');
	//client.user.setStatus('dnd') // Options: invisible, online, dnd, idle
	//.then(status => console.log(`Status set to ${presence.status}`))
 // .catch(console.error);
	client.user.setActivity('with kate', { type: 'PLAYING' }) // type options: WATCHING, PLAYING, STREAMING
  .then(presence => console.log(`Activity set to ${presence.activities[0].type} ${presence.activities[0].name}`))
  .catch(console.error);
logs.write('Log of commands entered: {command} by {user} in {guild/server name}\n')
});

client.on('message', message => {

 // console.log(config.prefix.length);
 
 
if (!message.content.startsWith(prefix) || message.author.bot) return;
   
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

if (command.charAt(0) == "") return;	

	
console.log(`Command Entered: ${command} by ${message.author.username} in ${message.guild}`);
logs.write(`${command} by ${message.author.username} in ${message.guild}\n`); // Writes to log.txt with \n = newline

switch(command){
		case 'test':
		if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		};
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
		message.channel.send(`Argument 2: ${args[1]}`); // returns second arg (from 0)
		break;
		
		case 'ping':
		
		message.channel.send('pong');
		break;
		
		case 'do':
		const taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			return message.channel.send('You need to tag a user in order to do something to them them!');
		};
		if (message.author.id == "720180397148733500" && taggedUser.id == "710318264932237362") {
			return message.channel.send('ALEX STOP BEING WEIRD');
		};
		 // console.log(args.length);
		
		//if (args && args.length >= 1) {
		//return message.channel.send(`You didn't provide any actions, ${message.author}!`);
		//};
		
		var action = '';
		var i;
		for (i = 1; i < args.length; i++) {
			// Ignore first entry in array, then create string sequentially and add space in between. Variable 'args' retains capitilisation. 
			action = action+args[i]+(' ');
			
		
		};
		
		action = action.trim();
		// Remove last space and any initial user entries that are not characters to provide a cleaner look (i.e. no double spaces).
		
		if (message.author.id == taggedUser.id) {
			// If the person sending the message is the same as the user tagged
		message.channel.send(`${message.author} ${action} themselves.... Hurrah?`);
		}
		else {
		message.channel.send(`${message.author} ${action} ${taggedUser}! Hurrah!`);
		}
		break;
		
		
		case 'help':
		message.channel.send(`Access this site: https://uncleclan.zyrosite.com/ for help.`)
		break;
		case 'abs':
		message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/Y72hgjD/image0.jpg"]});
		break;
		case 'avatar':
		const user = message.mentions.users.first() || message.author;
		const url = user.avatarURL({ dynamic:true });
	
		const avatarEmbed = new MessageEmbed()
        .setColor(0x333333)
        .setAuthor(user.username)
        .setImage(url);
		message.channel.send(avatarEmbed); 
		break;
		case 'kate':
		message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/VYZbBjs/katie.png"]});
		break;
		case 'server':
		 shell.exec('start cmd.exe /c "server.bat"', {async:true}); //opens temp cmd window executing the specified command. Use /k instead for persistent window
		 //shell.exit(1); //this terminates entire bot
		 message.channel.send('The Minecraft server is starting up, please wait up to 3 minutes before running this command again.'); // add commmand cooldown
		break;
		default:
		message.channel.send(`${message.author}, the command '${command}' is not a valid command! Please contact the developer if this is an unexpected occurrence.`)
};




  });


client.login(token);