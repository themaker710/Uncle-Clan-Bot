module.exports = {
	name: 'poll',
	description: 'A command to create polls',
	usage: '[poll name], [option 1].[option 2].[option ...10], [timeout]',
	cooldown: 1,
	args: true,
	guildOnly: false,
	execute(message) {
		const pollEmbed = require('discord.js-poll-embed');
		const { prefix } = require('../config.json');

		const args = message.content.slice(prefix.length).trim().split(','); // Needed personalised args seperation, so more processsing done in file.
		console.log(args);
		const options = args[1].trim().split('.');
		const title = args[0];
		if (!args[2].isNumber) {
			return message.reply('that isn\'t a valid length of time! Please enter a numeric value.');
		}
		const timeout = args[2] || 30; // arg 3 or if that doesn't exist 30
		pollEmbed(message, title, options, timeout);
	},
};