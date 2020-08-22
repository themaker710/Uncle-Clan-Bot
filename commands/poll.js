module.exports = {
	name: 'poll',
	description: 'A command to create polls',
	usage: '[poll name], [option 1].[option 2].<option ...10>, <timeout>',
	cooldown: 1,
	args: true,
	guildOnly: false,
	execute(message) {
		const pollEmbed = require('discord.js-poll-embed');
		const { prefix } = require('../config.json');

		const args = message.content.slice(prefix.length).trim().split(','); // Needed personalised args seperation, so more processsing done in file.
		const title = args[0];
		const options = args[1].trim().split('.');

		let timeout;
		if (!args[2]) {
			timeout = 30;
		}
		else if (isNaN(args[2])) {
			return message.reply('please enter a valid number!');
		}
		timeout = args[2];

		pollEmbed(message, title, options, timeout);
	},
};