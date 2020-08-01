module.exports = {
	name: 'snipe',
	description: 'A command that retrieves the last deleted message in the server.',
	usage: '',
	cooldown: 5,
	args: false,
	guildOnly: true,
	execute(message) {
		const fs = require('fs');
		const deleted = JSON.parse(fs.readFileSync('./deletedmsg.json', 'utf8'));

		const guildid = message.guild.id;

		if (!deleted[guildid]) return message.channel.send('There has been no recently deleted messages!');
		console.log(deleted[guildid].deletedmsg);

		message.channel.send('The most recently deleted message in this server was:\n\n``` ' + deleted[guildid].deletedmsg + '```\nSent by ' + deleted[guildid].deletedmsgauthor);

	},
};