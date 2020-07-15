module.exports = {
	name: 'uptime',
	description: 'Sends the uptime of the bot. **DEPRECATED**',
	guildOnly: false,
	execute(message, args) {
		const Discord = require('discord.js');
		const client = new Discord.Client();
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		message.channel.send(`**Uptime:** ${days}d ${hours}h ${minutes}m ${seconds}s \n**THIS COMMAND IS DEPRECATED**`);
	},
};