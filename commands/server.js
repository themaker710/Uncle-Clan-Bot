module.exports = {
	name: 'server',
	description: 'Starts Minecraft Server',
	aliases: ['mc', 'minecraft'],
	guildOnly: true,
	cooldown: 180,
	execute(message) {
		const shell = require('shelljs');
		shell.exec('start cmd.exe /c "server.bat"', { async:true }); // opens temp cmd window executing the specified command. Use /k instead for persistent window
		// shell.exit(1); //this terminates current thread

		message.channel.send('The Minecraft server is starting up, please wait up to 3 minutes before running this command again.');

	},
};