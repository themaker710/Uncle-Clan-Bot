module.exports = {
	name: 'prefix',
	description: 'A command to change the servers prefix',
	usage: '[prefix]',
	cooldown: 140,
	args: true,
	guildOnly: true,
	execute(message, args) {
		const fs = require('fs');
		const prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));

		const guildid = message.guild.id;
		prefixes[guildid] = {
			prefixes: args[0],
		};

		fs.writeFile('./prefixes.json', JSON.stringify(prefixes), (err) => {
			if (err) console.log(err);
		});
		message.channel.send('Prefix set to ' + args[0]);

	},
};