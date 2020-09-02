module.exports = {
	name: 'bot',
	description: 'Admin commands for the bot',
	usage: '[stop|reload] <command>',
	args: true,
	execute(message, args) {
		let commandName, command;

		switch (args[0]) {
		case 'stop':
			message.channel.send('Attempting to shut down...');
			break;
		case 'reload':
			commandName = args[1].toLowerCase();
			command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
			if (!command) {
				return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
			}

			delete require.cache[require.resolve(`./${command.name}.js`)];

			try {
				const newCommand = require(`./${command.name}.js`);
				message.client.commands.set(newCommand.name, newCommand);
				message.channel.send(`Command \`${command.name}\` was reloaded!`);
			}
			catch (error) {
				console.log(error);
				message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
			}
			break;
		default:
			return message.channel.send('That isn\'t a valid argument! Use `stop` or `reload [command]`.');
		}

	},
};