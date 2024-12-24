const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('../../index');
const { Prefix } = require("../../Json/config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays the bot command categories'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x00AE86)
                .setDescription(`**> \`-\` Oꜰꜰɪᴄᴀʟ Sʏsᴛᴇᴍ Bᴏᴛ Fᴏʀ : (${interaction.guild.name})

> \`-\` Fᴇᴇʟɪɴɢ Lᴏsᴛ / Usᴇ : /help

> \`-\` Tʜɪs Bᴏᴛ Dᴇᴠᴇʟᴏᴘᴇᴅ Bʏ  : [TkShaB7](https://discord.com/users/1213474808050880515)

> \`-\` Sᴇʀᴠᴇʀ Sᴜᴘᴘᴏʀᴛ : [Support Server](https://discord.gg/lans)

Pᴇʀꜰɪx : ( ${Prefix} )**`)
                .setThumbnail(interaction.guild.iconURL())
                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() });

            const devButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel("𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫")
                .setURL("https://discord.com/users/1213474808050880515");

            const supportServerButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel("𝐒𝐮𝐩𝐩𝐨𝐫𝐭 𝐒𝐞𝐫𝐯")
                .setURL("https://discord.gg/lans");

            const buttonRow = new ActionRowBuilder().addComponents(devButton, supportServerButton);

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('help_menu')
                .setPlaceholder('اختر فئة الأوامر')
                .addOptions([
                    { label: 'اوامر الاونر', description: 'عرض اوامر خاصة بالاونر', value: 'owner_commands' },
                    { label: 'اوامر عامة', description: 'عرض الأوامر العامة', value: 'general_commands' },
                ]);

            const row = new ActionRowBuilder().addComponents(selectMenu);

            await interaction.reply({ embeds: [embed], components: [row, buttonRow] });
        } catch (error) {
            console.error("Error sending help embed:", error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: "An error occurred while displaying the help menu.", ephemeral: true }).catch(console.error);
            }
        }
    },
};

client.on('interactionCreate', async(interaction) => {
    if (!interaction.isStringSelectMenu() || interaction.customId !== 'help_menu') return;

    try {
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferUpdate();
        }

        const selectedOption = interaction.values[0];
        let responseContent = '';

        switch (selectedOption) {
            case 'owner_commands':
                responseContent = `**> اوامر الاونر :
\`*\` ${Prefix}set-name [الاسم] لتغيير اسم البوت
\`*\` ${Prefix}set-avatar [رابط الصورة] لتغيير صورة البوت
\`*\` ${Prefix}set-banner لتغير بنر البوت [رابط البنر]
\`*\` ${Prefix}add-owner اضافه شخص في قائمه الاونرات [منشن الشخص]
\`*\` ${Prefix}remove-owner ازالة شخص من قائمه الاونرات [منشن الشخص]
**`;
                break;
            case 'general_commands':
                responseContent = `**> الاوامر العامة :
\`*\` ${Prefix}dev لمعرفه مبرمج البوت
**`;
                break;
        }

        await interaction.followUp({ content: responseContent, ephemeral: true }).catch(console.error);
    } catch (error) {
        console.error("Error handling select menu interaction:", error);
    }
});