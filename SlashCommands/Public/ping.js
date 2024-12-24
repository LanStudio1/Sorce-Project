const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const client = require('../../index');
const { Prefix } = require("../../Json/config.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Displays the bot uptime, ping, CPU and RAM usage'),

    async execute(interaction) {
        let days = Math.floor(interaction.client.uptime / 86400000);
        let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
        let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
        let seconds = Math.floor(interaction.client.uptime / 1000) % 60;
        const uptimeString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

        const ping = Date.now() - interaction.createdTimestamp;

        let color;
        if (ping < 100) {
            color = "#00FF00";
        } else if (ping < 200) {
            color = "#FFFF00";
        } else {
            color = "#FF0000";
        }

        let emoji;
        if (ping < 100) {
            emoji = "🟢";
        } else if (ping < 200) {
            emoji = "🟡";
        } else {
            emoji = "🔴";
        }

        const cpuUsage = process.cpuUsage();
        const cpuUsageString = `${(cpuUsage.user + cpuUsage.system) / 1000} ms`;

        const memoryUsage = process.memoryUsage();
        const ramUsageString = `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`;

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Bot Uptime, Ping, CPU, and RAM Usage")
            .addFields({ name: "Uptime", value: `**${uptimeString}**`, inline: true })
            .addFields({ name: "Ping", value: `**${emoji} ${ping}ms**`, inline: true })
            .addFields({ name: "CPU Usage", value: `**${cpuUsageString}**`, inline: true })
            .addFields({ name: "RAM Usage", value: `**${ramUsageString}**`, inline: true })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};