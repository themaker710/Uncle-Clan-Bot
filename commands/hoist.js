module.exports = {
	name: 'hoist',
	aliases: ['role'],
	cooldown : 10,
	guildOnly: true,
	args: true,
	usage: '<@role>',
	description: 'Hoists the selected role to the top.',
	execute(message, args) {
		message.guild.roles.fetch();
		const matches = args[0].match(/(\d+)/);
		const roleselected = message.guild.roles.cache.find(role2 => role2.id === matches[0]);
		const position = message.guild.roles.cache.size - 2;
		if (!message.member.roles.cache.find(r => r.id === roleselected.id)) return message.channel.send('You have to have the role to be able to hoist it!');

		roleselected.setPosition(position)
			.then(updated => console.log(`Role position: ${updated.position}`))
			.catch(console.error);
		message.channel.send(`${args[0]} has been hoisted to the top of the stack.`);
	},
};