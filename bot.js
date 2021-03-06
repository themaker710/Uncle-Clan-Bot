/* eslint-disable no-inline-comments */
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const shell = require('shelljs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const logs = fs.createWriteStream('data/log.txt');
const d = new Date();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`Loading command: ${file}`);
}

client.once('ready', () => {

	client.user.setActivity('with kate', { type: 'PLAYING' }) // type options: WATCHING, PLAYING, STREAMING, LISTENING
		.then(presence => console.log(`Activity set to ${presence.activities[0].type} ${presence.activities[0].name}`))
		.catch(console.error);
	logs.write('\nBot initialized');
	console.log('Initialized');

});
client.on('messageDelete', (messageDelete) => {
	console.log(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} in ${messageDelete.guild.name} was deleted.`);
	const deleted = JSON.parse(fs.readFileSync('./data/deletedmsg.json', 'utf8'));

	const guildid = messageDelete.guild.id;

	deleted[guildid] = {
		deletedmsg: messageDelete.content,
		deletedmsgauthor: messageDelete.author.username,
	};

	fs.writeFile('./data/deletedmsg.json', JSON.stringify(deleted), (err) => {
		if (err) console.log(err);
	});
});

client.on('message', async message => {

	if (message.content == 'Attempting to shut down...' && message.author.bot) return (await shell.exec('start cmd.exe /C "server.bat"').then(console.log('Shutting down'), await message.edit('Shutting down!'), shell.exit(1)));

	const prefixes = JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));

	const guildid = message.guild.id;
	if (!prefixes[guildid]) {
		prefixes[guildid] = {
			prefixes: config.prefix,
		};
	}

	const prefix = prefixes[guildid].prefixes;
	// console.log(prefix);

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return; // here can add error message but not really needed
	// if (command.AtChar[1] == " ") return;

	console.log(`Command Entered: ${commandName} by ${message.author.username} in ${message.guild} on the ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
	logs.write(`\n${commandName} by ${message.author.username} in ${message.guild} on the ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`); // Writes to log.txt with \n = newline

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			let timeLeft = (expirationTime - now) / 1000;
			let timeunit = 'second(s)';
			if (timeLeft > 60) {
				timeLeft = timeLeft / 60;
				timeunit = 'minute(s)';
			}
			return message.reply(`please wait ${timeLeft.toFixed(1)} more ${timeunit} before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (command == 'uptime') {
		const days = Math.floor(client.uptime / 86400000);
		const hours = Math.floor(client.uptime / 3600000) % 24;
		const minutes = Math.floor(client.uptime / 60000) % 60;
		const seconds = Math.floor(client.uptime / 1000) % 60;
		return message.channel.send(`**Uptime:** ${days}d ${hours}h ${minutes}m ${seconds}s \n**THIS COMMAND RUNS UNORGANICALLY**`);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(config.token);