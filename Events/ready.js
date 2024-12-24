const { Events, ActivityType } = require("discord.js");
const client = require("../index");
const allevents = require('../Handlers/events');
const { Activity, Status, Stream } = require('../Json/config.json');

client.on(Events.ClientReady, async (c) => {
  client.user.setStatus(Status);
  setInterval(() => {
    let Ac = Activity[Math.floor(Math.random() * Activity.length)];
    client.user.setActivity(Ac, { type: ActivityType.Streaming, url: Stream.url });
  }, 5000);

  console.log('\n');
  console.log(client.user.username + "  ->  Is Ready");
  console.log('\n');
  console.log('Status  (' + Status + ')');
  console.log('\n');
  console.log('ApplicationCommands  (' + client.commands.size + `) Loaded`);
  console.log('\n');
  console.log('Events  ' + allevents.length + '  Loaded');
  console.log('\n');
  console.log('Bot is in ' + client.guilds.cache.size + ' servers.');

  client.user.setPresence({
    status: Status,
    activities: [{
      name: `Watching ${client.guilds.cache.size} servers`,
      type: Stream.type,
      url: Stream.url
    }]
  });
});
