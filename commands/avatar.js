module.exports = {
	name: 'avatar',
	aliases: ['pfp', 'icon'],
	cooldown : 10,
	guildOnly: true,
	description: 'Finds the profile picture of the tagged user, or if no user is tagged then it retrieves the author\'s pfp. ',
	execute(message, args) {
		const user = message.mentions.users.first() || message.author;
		const { MessageEmbed } = require('discord.js');
		const avatarEmbed = new MessageEmbed()
        .setColor(0x333333)
        .setAuthor(user.username)
        .setImage(user.avatarURL({ dynamic:true }));
		message.channel.send(avatarEmbed); 
	},
};