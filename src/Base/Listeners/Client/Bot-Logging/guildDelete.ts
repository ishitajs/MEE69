import { Listener } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { Guild } from 'discord.js';
import config from '../../../../Data/config';

export default class extends Listener {
	public constructor() {
		super('listener_client_bot-logging_guildDelete', {
			emitter: 'Bot',
			event: 'guildDelete',
		});
	}
	public async exec(guild: Guild) {
		let owner = guild.owner || (await guild.members.fetch(guild.ownerID));
		let channels = guild.channels.cache;
		let roles = guild.roles.cache;
		let emojis = guild.emojis.cache;
		let members = guild.members.cache;

		let embed = this.client.util
			.embed()
			.setTitle(`Left a Server`)
			.setColor(0xff0000)
			.setDescription(
				`\`\`\`md\n* Name => ${guild.name}\n* Id => ${guild.id}\`\`\``,
			)
			.addField(
				'Owner',
				`**Tag** - \`${owner.user.tag}\`\n\n**ID** - \`${owner.id}\``,
			)
			.addField(
				'Channels',
				`**Size** -\`[ ${
					channels.size
				} ]\`\n\n**Random** - ${channels.random()}\n\n`,
				true,
			)
			.addField(
				'Roles',
				`**Size** -\`[ ${roles.size} ]\`\n\n**Random** - ${
					roles.random().name
				}\n\n`,
				true,
			)
			.addField(
				'Emojis',
				`**Size** -\`[ ${
					emojis.size
				} ]\`\n\n**Random** - ${emojis.random()}\n\n`,
				true,
			)
			.addField(
				'Members',
				`**Size** -\`[ ${members.size} ]\`\n\n**Random** - ${
					members.random().user.tag
				}\n\n`,
				true,
			)
			.setImage(
				guild.iconURL({ dynamic: true }) || 'https://domain.invalid',
			);

		let chn = this.client.channels.cache.get(
			config.bot.logchannels.other,
		) as TextChannel;
		if (!chn)
			try {
				chn = (await this.client.channels.fetch(
					config.bot.logchannels.other,
				)) as TextChannel;
			} catch (err) {}

		if (!chn) return;
		return chn.send(embed);
	}
}
