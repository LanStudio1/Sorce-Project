const Discord = require("discord.js");
const fs = require("fs");


const { ChannelType } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');
const {
    Client,
    Intents,
    GatewayIntentBits,
    Collection,
    Partials,
    EmbedBuilder,
    ButtonBuilder,
    Colors,
    ButtonStyle,
    ActionRowBuilder,
    MessageActionRow,
    MessageSelectMenu,
    PermissionsBitField,
    userMention,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ModalSubmitInteraction,
    SelectMenuBuilder,
    StringSelectMenuBuilder,
    AttachmentBuilder,

} = require("discord.js");
const {
    Token,
    Prefix,
    owner,
} = require("./Json/config.json");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const { spawn } = require('child_process');
const client = new Client({
    intents: 130815,
    partials: [Discord.Partials.Channel, Discord.Partials.User]
})
require("events").EventEmitter.defaultMaxListeners = 99999999999;
const m = require("ansi-colors");

module.exports = client;
client.Cmd = new Collection();
client.commands = new Collection();

fs.readdirSync("./Handlers").forEach((h) => {
    require(`./Handlers/${h}`)(client);
});

client.login(Token).catch((err) => {
    console.log(
        m.red.bold.underline.bgBlack("Error in Token  " + `\n\n` + err + `\n\n`),
    );
});

// <=============== Bot ===============>\\

client.on("messageCreate", async(message) => {
    if (!message.content.startsWith(Prefix)) return;
    const args = message.content.slice(Prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

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

    if (command === "dev") {
        const embed = new EmbedBuilder()
            .setColor(0x00AE86)
            .setDescription(`**> \`-\` Oꜰꜰɪᴄᴀʟ Sʏsᴛᴇᴍ  Bᴏᴛ Fᴏʀ : ( ${message.guild.name} )

> \`-\` Fᴇᴇʟɪɴɢ Lᴏsᴛ / Usᴇ : /help

> \`-\` Tʜɪs Bᴏᴛ Dᴇᴠᴇʟᴏᴘᴇᴅ Bʏ  : [TkShaB7](https://discord.com/users/1213474808050880515)

> \`-\` Sᴇʀᴠᴇʀ Sᴜᴘᴘᴏʀᴛ  : [Support Server](https://discord.gg/lans)

 Pᴇʀꜰɪx  : ( ${Prefix} )**`)
            .setThumbnail(message.guild.iconURL())
            .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() });

        message.channel.send({ embeds: [embed], components: [buttonRow] });
    }
});
client.on('messageCreate', async(message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(Prefix)) return;

    const args = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!owner.includes(message.author.id)) {
        return;
    }

    if (command === 'set-avatar') {
        let avatarURL;

        if (message.attachments.size > 0) {
            avatarURL = message.attachments.first().url;
        } else if (args[0]) {
            avatarURL = args[0];
        } else {
            return message.reply('**اخترع انا يعني ؟**');
        }

        try {
            await client.user.setAvatar(avatarURL);
            message.reply('**غيرتلك صورة البوت يصحبي**');
        } catch (error) {
            console.error(error);
            message.reply('**في مشكلة يصحبي شوف الملف او الرابط فيهم مشكله **');
        }
    } else if (command === 'set-name') {
        if (!args[0]) return message.reply('**اخترع انا يعني ؟**');
        const newName = args.join(' ');

        try {
            await client.user.setUsername(newName);
            message.reply(`**غيرتك اسم البوت يصحبي**`);
        } catch (error) {
            console.error(error);
            message.reply('**في مشكلة يصحبي اتاكد ان الاسم مش مستخدم**');
        }
    } else if (command === 'set-banner') {
        let bannerURL;

        if (message.attachments.size > 0) {
            bannerURL = message.attachments.first().url;
        } else if (args[0]) {
            bannerURL = args[0];
        } else {
            return message.reply('**اخترع انا يعني ؟**');
        }

        const rest = new REST({ version: '10' }).setToken(Token);
        try {
            await rest.patch(Routes.user(clientid), {
                body: {
                    banner: bannerURL,
                },
            });
            message.reply('**غيرتلك بنر البوت يصحبي*');
        } catch (error) {
            console.error(error);
            message.reply('**في مشكلة يصحبي شوف الملف او الرابط فيهم مشكله **');
        }
    }
});
client.on('messageCreate', async(message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(Prefix)) return;

    const args = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!owner.includes(message.author.id)) {
        return;
    }
    if (command === 'add-owner') {
        const newOwner = args[0];
        if (!newOwner || isNaN(newOwner)) return message.reply('**دخل حد عدل يصحبي**');

        if (owner.includes(newOwner)) {
            return message.reply('**الواد ده موجود في قائمه الاونرات يصحبي متقدرش تضيفة ثاني**');
        }

        owner.push(newOwner);
        fs.writeFileSync('./Json/config.json', JSON.stringify(config, null, 2));
        message.reply(`**ضفتلك الاونر ده يصحبي <@${newOwner}> **`);
    } else if (command === 'remove-owner') {
        const ownerToRemove = args[0];
        if (!ownerToRemove || isNaN(ownerToRemove)) return message.reply('**دخل حد عدل يصحبي**');

        if (!owner.includes(ownerToRemove)) {
            return message.reply('**الواد ده مش موجود في قائمة الاونرات يصحبي دخل حد عدل**');
        }

        config.owner = owner.filter((id) => id !== ownerToRemove);
        fs.writeFileSync('./Json/config.json', JSON.stringify(config, null, 2));
        message.reply(`**شلتلك الاونر ده يصحبي <@${ownerToRemove}>**`);
    }
});

// <=============== Codes ===============>\\