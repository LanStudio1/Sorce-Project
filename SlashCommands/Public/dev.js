const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const client = require('../../index');
const { Prefix } = require("../../Json/config.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dev')
        .setDescription('Provides information about the bot developer and support server'),

    async execute(interaction) {
        const devButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫")
            .setURL("https://discord.com/users/1213474808050880515");

        const supportServerButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("𝐒𝐮𝐩𝐩𝐨𝐫𝐭 𝐒𝐞𝐫𝐯")
            .setURL("https://discord.gg/lans");

        const buttonRow = new ActionRowBuilder()
            .addComponents(devButton, supportServerButton);

        const embed = new EmbedBuilder()
            .setColor(0x00AE86)
            .setDescription(`**> \`-\` Oꜰꜰɪᴄᴀʟ Sʏsᴛᴇᴍ  Bᴏᴛ Fᴏʀ : ( ${interaction.guild.name} )

> \`-\` Fᴇᴇʟɪɴɢ Lᴏsᴛ / Usᴇ : /help

> \`-\` Tʜɪs Bᴏᴛ Dᴇᴠᴇʟᴏᴘᴇᴅ Bʏ  : [TkShaB7](https://discord.com/users/1213474808050880515)

> \`-\` Sᴇʀᴠᴇʀ Sᴜᴘᴘᴏʀᴛ  : [Support Server](https://discord.gg/lans)

 Pᴇʀꜰɪx  : ( ${Prefix} )**`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() });

        await interaction.reply({ embeds: [embed], components: [buttonRow] });
    }
};