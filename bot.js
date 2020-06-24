'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token } = require('./config.json');
// Create an instance of a Discord client
const client = new Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
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
});

client.on('message', message => {

 // console.log(config.prefix.length);
 
 
if (!message.content.startsWith(prefix) || message.author.bot) return;
   
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
console.log(`Command Entered: ${command} by ${message.author.username}`);
console.log(`${command}`); // temp


switch(command){
		case 'test':
		if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		};
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
		message.channel.send(`Argument 2: ${args[1]}`);
		break;
		
		
		case 'do':
		if (!message.mentions.users.size) {
			return message.channel.send('You need to tag a user in order to do something to them them!');
		}
		//if () {
		//return message.channel.send(`You didn't provide any actions, ${message.author}!`);
		//};
		const taggedUser = message.mentions.users.first();
		//const args = command.shift();
		
		
		var action = '';
		var i;
		for (i = 1; i < args.length; i++) {
			
			action = action+args[i]+(' ');
			
		
		};
		
		action = action.trim();
		
		
		if (message.author.id == taggedUser.id) {
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
		default:
		message.channel.send(`${message.author}, the command '${command}' is not a valid command! Please contact the developer if this is an unexpected occurrence.`)
};





  });


client.login(token);