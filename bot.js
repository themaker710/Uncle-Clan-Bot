'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const config = require('./config.json');
// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
	console.log('Initialized');
	//client.user.setStatus('idle') // Options: invisible, available/online, dnd, idle
	client.user.setActivity('ur mum', { type: 'WATCHING' }) // type options: WATCHING, PLAYING, STREAMING
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
});

client.on('message', message => {
  // If the message is "ping"
  if (message.content.charAt(0) == '-') {
    // Send "pong" to the same channel
   
  var msg = message.content.substring(1);
console.log(`Command Entered: ${msg}`);
   
switch(msg) {
            // -ping
            case 'ping':
                 message.channel.send('pong');
            break;
			default:
				
				// var str1 = msg.concat(' is not a valid command');
				
				message.channel.send(`The command '${msg}' is not valid. Please contact the developer if this is a unexpected result`);
			break;
};

  }
});

/* client.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `-`
	console.log(message);
	 
    if (message.substring(0, 1) == '-') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // -ping
            case 'ping':
                client.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
}); */

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);