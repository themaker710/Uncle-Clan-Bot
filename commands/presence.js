module.exports = {
	name: 'presence',
	aliases: ['status'],
	cooldown : 60,
	args: true,
	usage: '[activity type] <activity name>',
	guildOnly: true,
	description: 'Changes the bot\'s presence.',
	execute(msg, args) {
		const activities = [
			'PLAYING',
			'STREAMING',
			'LISTENING',
			'WATCHING',
			'CUSTOM_STATUS',
			'CLEAR',
		];
		const { client } = msg;

		const activityType = args[0].toUpperCase();
		let activityName = [...args].slice(1).join(' ');

		// Check activity type
		if (!activities.includes(activityType)) {
			return msg.reply(`wrong activity type. Allowed activities: \`${activities.join('` ,`')}\`.`);
		}
		// Clear presence
		if (activityType === 'CLEAR') activityName = '';
		if (!activityType === 'CLEAR' && !activityName) return msg.reply('please enter a activity name!');

		const presenceOptions = {
			activity: {
				type: activityType,
				name: activityName,
			},
		};

		client.user.setPresence(presenceOptions).then((presence) => {
			msg.channel.send('✅ Presence successfully changed.');
			console.log(`Presence set to ${presenceOptions.activity.type} ${presenceOptions.activity.name}`);
		});
	},
};