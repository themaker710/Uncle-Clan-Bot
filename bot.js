'use strict';

<<<<<<< HEAD
// Import the discord.js module
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token } = require('./config.json');
// Create an instance of a Discord client
=======
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token } = require('./config.json');
>>>>>>> First Commit
const client = new Client();
const shell = require('shelljs')
let fs = require('fs')
let logs = fs.createWriteStream('log.txt') //will create log.txt if does not exist
<<<<<<< HEAD
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
logs.write(`Bot initialized\n`)
.then(presence => console.log(`FS write stream successfully created`))
.catch(console.error);

=======
	var raw;
client.on('ready', () => {

	fs.readFile('serverdata.json', (err, data) => {
    if (err) throw err;
    raw = JSON.parse(data);
    console.log(raw);
});



	client.user.setActivity('with kate', { type: 'PLAYING' }) // type options: WATCHING, PLAYING, STREAMING
  .then(presence => console.log(`Activity set to ${presence.activities[0].type} ${presence.activities[0].name}`))
  .catch(console.error);
logs.write(`Bot initialized\n`);
console.log('Initialized');
>>>>>>> First Commit
});

client.on('message', async message => {

 // console.log(config.prefix.length);
<<<<<<< HEAD
 
=======
 	console.log(raw);
>>>>>>> First Commit
 
if (!message.content.startsWith(prefix) || message.author.bot) return;
   
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

if (command.charAt(0) == "") return;	

	
console.log(`Command Entered: ${command} by ${message.author.username} in ${message.guild}`);
logs.write(`${command} by ${message.author.username} in ${message.guild}\n`); // Writes to log.txt with \n = newline

switch(command){
		case 'test': {
		if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		};
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
		message.channel.send(`Argument 2: ${args[1]}`); // returns second arg (from 0)
		break;
		}
		case 'ping':
		const m = await message.channel.send("Ping?"); // Wait for message to be sent
		m.edit(`Pong!\n**API Latency:** \`${Math.round(client.ws.ping)}\`ms\n**Response Time:** \`${m.createdTimestamp - message.createdTimestamp}ms\``); // API Ping is websocket ping.
		break;
		case 'uptime': {
		// client.uptime is in millseconds
		// % is modulo, AKA the remainder of a division
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;

		message.channel.send(`**Uptime:** ${days}d ${hours}h ${minutes}m ${seconds}s`);
		break;
		}
		
		case 'do':{
		const taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			return message.channel.send('You need to tag a user in order to do something to them them!');
		};
		if (message.author.id == "720180397148733500" && taggedUser.id == "710318264932237362") { // if alex tags thea in do command
			return message.channel.send('ALEX STOP BEING WEIRD');
		};
		
		var action = '';
		var i;
		for (i = 1; i < args.length; i++) {
			// Ignore first entry in array (the command), then create string sequentially and add space in between. Variable 'args' retains capitilisation. 
			action = action+args[i]+(' ');
		};
		
		action = action.trim();
		// Remove last space and any initial user entries that are not characters to provide a cleaner look (i.e. no double spaces).
		
		if (!action) {
			return message.channel.send('Please provide an action to do!');
		};
		
		
		if (message.author.id == taggedUser.id) {
			// If the person sending the message is the same as the user tagged
		message.channel.send(`${message.author} ${action} themselves.... Hurrah?`);
		}
		else {
		message.channel.send(`${message.author} ${action} ${taggedUser}! Hurrah!`);
		}
		break;
		}
		
		case 'help': {
		message.channel.send(`Access this site: https://uncle-clan.web.app/ for help.`)
		break;
		}
		
		case 'img': {
<<<<<<< HEAD
		switch(args[0]) {
		case 'abs': {
		message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/Y72hgjD/image0.jpg"]});
		break;
		}
		case 'premium': {
			message.channel.send('With Pleasure:', {files: ["https://i.imgur.com/NOqvMK5.png"]});
		break;
		}
		case 'kate': {
		message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/VYZbBjs/katie.png"]});
		break;
		}
		default: {
			message.channel.reply('The image you entered was not found. Please check your spelling or contact the developer to add your image.');
		}
		};
=======
			
			switch(args[0]) {
			case 'abs': {
				message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/Y72hgjD/image0.jpg"]});
			break;
			}
			case 'premium': {
				message.channel.send('With Pleasure:', {files: ["https://i.imgur.com/NOqvMK5.png"]});
			break;
			}
			case 'kate': {
				message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/VYZbBjs/katie.png"]});
			break;
			}
			default: {
				message.channel.send(`${message.author}, The image you entered was not found. Please check your spelling or contact the developer to add your image.`);
		}
		};
		
>>>>>>> First Commit
		break;
		}
		
		
		
		case 'avatar': {
		const user = message.mentions.users.first() || message.author;
		const url = user.avatarURL({ dynamic:true });
	
		const avatarEmbed = new MessageEmbed()
        .setColor(0x333333)
        .setAuthor(user.username)
        .setImage(url);
		message.channel.send(avatarEmbed); 
		break;
		}
		
		case 'server': {
		 shell.exec('start cmd.exe /c "server.bat"', {async:true}); //opens temp cmd window executing the specified command. Use /k instead for persistent window
		 //shell.exit(1); //this terminates entire bot
		 
		 message.channel.send('The Minecraft server is starting up, please wait up to 3 minutes before running this command again.'); // add commmand cooldown
		 
		break;
		}
		case 'reset':{ 
		 resetBot(message.channel);
		break;
		}
		default:
		message.channel.send(`${message.author}, the command '${command}' is not a valid command! Please contact the developer if this is an unexpected occurrence.`)
};




  });
function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(token));
}
<<<<<<< HEAD
=======
function setPrefix(prefix) {
	
}
>>>>>>> First Commit

client.login(token);