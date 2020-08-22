module.exports = {
	name: 'do',
	args: true,
	description: 'Perform actions on other users.',
	usage: '[user] [action]',
	guildOnly: true,
	execute(message, args) {
		const taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			return message.channel.send('You need to tag a user in order to do something to them them!');
		}
		if (message.author.id == '720180397148733500' && taggedUser.id == '710318264932237362') { // if alex tags thea in do command
			return message.channel.send('ALEX STOP BEING WEIRD');
		}

		let action = '';
		let i;
		for (i = 1; i < args.length; i++) {
			// Ignore first entry in array (the command), then create string sequentially and add space in between. Variable 'args' retains capitilisation.
			action = action + args[i] + (' ');
		}

		action = action.trim();
		// Remove last space and any initial user entries that are not characters to provide a cleaner look (i.e. no double spaces).

		if (!action) {
			return message.channel.send('Please provide an action to do!');
		}


		if (message.author.id == taggedUser.id) {
			// If the person sending the message is the same as the user tagged
			message.channel.send(`${message.author} ${action} themselves.... Hurrah?`);
		}
		else {
			message.channel.send(`${message.author} ${action} ${taggedUser}! Hurrah!`);
		}
	},
};