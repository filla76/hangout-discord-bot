const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "whois",
        description: "memberitahu info member",
        alias: ["memberinfo"],
        category: "misc",
        usage: "[Mention Member]",
        accessableby: "Member"
    },
    run: async (bot, msg, args) => {
        const member = getMember(msg, args.join(" "));

        const joined = member.joinedAt;
        const role =
            member.roles.cache
                .filter(r => r.id !== msg.guild.id)
                .map(r => r)
                .join(",") || "none";
        const created = member.user.createdAt;

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(
                `${member.nickname || member.user.username}#${
                    member.user.discriminator
                }`,
                member.user.avatarURL()
            )
            .setDescription(
                `**${member.user.username || member.nickname} INFO**`
            )
            .setThumbnail(member.user.displayAvatarURL())
            .addField("Joined", joined, true)
            .addField("Resgistered", created, true)
            .addField("Role", role)
            .addField("Member Id", member.user.id, true);

        msg.channel.send(embed);
    }
};