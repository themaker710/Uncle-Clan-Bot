module.exports = {
	name: 'img',
	description: 'A library of custom images for easy access.',
	usage: '[image title]',
	cooldown: 10,
	guildOnly: false,
	execute(message, args) {
		switch(args[0]) {
		case 'abs': {
			message.channel.send('With Pleasure:', { files: ['https://i.ibb.co/Y72hgjD/image0.jpg'] });
			break;
		}
		case 'premium': {
			message.channel.send('With Pleasure:', { files: ['https://i.imgur.com/NOqvMK5.png'] });
			break;
		}
		case 'kate': {
			message.channel.send('With Pleasure:', { files: ['https://i.ibb.co/VYZbBjs/katie.png'] });
			break;
		}
		default: {
			message.channel.send(`${message.author}, The image you entered was not found. Please check your spelling or contact the developer to add your image.`);
		}
		}
	},
};