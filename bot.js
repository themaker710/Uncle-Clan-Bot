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
  // If the message is "ping"
 // console.log(config.prefix.length);
 
 
if (!message.content.startsWith(prefix) || message.author.bot) return;
   
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

console.log(`Command Entered: ${command} by ${message.author.username}`);
 // if (message.content.charAt(0) == '-') {
    // Send "pong" to the same channel
    if (command === 'args') {
		if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		};
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	} else if (command === 'anal') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to anal them!');
		}
		const taggedUser = message.mentions.users.first();
		
		if (message.author.id == taggedUser.id) {
			message.channel.send(`${message.author} analed themselves.... Hurrah?`);
		}
		else {

		message.channel.send(`${message.author} analed ${taggedUser}! Hurrah!`);
		}
	} else if (command === 'abs') {
		
		message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/Y72hgjD/image0.jpg"]});
	} else if (command === 'kate') {
	
		message.channel.send('With Pleasure:', {files: ["https://i.ibb.co/VYZbBjs/katie.png"]});
	} else if (command === 'avatar') {
    const user = message.mentions.users.first() || message.author;
	const url = user.avatarURL({ dynamic:true });
	
    const avatarEmbed = new MessageEmbed()
        .setColor(0x333333)
        .setAuthor(user.username)
        .setImage(url);
    message.channel.send(avatarEmbed); 
};
	
 // var msg = message.content.substring(1);



  });


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);