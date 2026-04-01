const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, PermissionsBitField } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// 🔥 YOUR ROLE LIST (EDIT HERE IF NEEDED)
const roles = [
    // Admin
    { name: "👑 | Server Administration", color: "#ff0000", perms: ["Administrator"] },

    // LASD
    { name: "🚓 LASD High Command", color: "#1f8b4c" },
    { name: "👑 | Sheriff", color: "#145a32", perms: ["Administrator"] },
    { name: "🎖️ | Undersheriff", color: "#196f3d", perms: ["ManageRoles","ManageChannels","KickMembers","BanMembers"] },
    { name: "🏅 | Assistant Sheriff", color: "#1e8449", perms: ["ManageChannels","KickMembers","ManageMessages"] },
    { name: "🧭 | Division Chief", color: "#229954", perms: ["ManageChannels","ManageMessages"] },
    { name: "🚔 | Captain", color: "#27ae60", perms: ["ManageMessages"] },
    { name: "🚨 | Lieutenant", color: "#52be80", perms: ["ManageMessages"] },
    { name: "🔰 | Sergeant", color: "#7dcea0", perms: ["ManageMessages"] },
    { name: "👮 | Deputy Sheriff", color: "#a9dfbf" },
    { name: "📝 | Deputy Sheriff Trainee", color: "#d5f5e3" },

    // LAPD
    { name: "🚔 LAPD High Command", color: "#1a5276" },
    { name: "👑 | Chief of Police", color: "#154360", perms: ["Administrator"] },
    { name: "🎖️ | Assistant Chief", color: "#1b4f72", perms: ["ManageRoles","ManageChannels","KickMembers"] },
    { name: "🏅 | Deputy Chief", color: "#21618c", perms: ["ManageChannels","ManageMessages"] },
    { name: "🧭 | Commander", color: "#2874a6", perms: ["ManageChannels"] },
    { name: "🚔 | Captain", color: "#2e86c1", perms: ["ManageMessages"] },
    { name: "🚨 | Lieutenant", color: "#5dade2", perms: ["ManageMessages"] },
    { name: "🔰 | Sergeant", color: "#85c1e9", perms: ["ManageMessages"] },
    { name: "🕵️ | Detective", color: "#aed6f1" },
    { name: "👮 | Police Officer", color: "#d6eaf8" },

    // CHP
    { name: "🛣️ CHP High Command", color: "#b7950b" },
    { name: "👑 | Commissioner", color: "#9a7d0a", perms: ["Administrator"] },
    { name: "🎖️ | Deputy Commissioner", color: "#b7950b", perms: ["ManageRoles","KickMembers"] },
    { name: "🏅 | Assistant Commissioner", color: "#d4ac0d", perms: ["ManageChannels"] },
    { name: "🧭 | Chief", color: "#f1c40f", perms: ["ManageChannels"] },
    { name: "🚔 | Captain", color: "#f4d03f", perms: ["ManageMessages"] },
    { name: "🚨 | Lieutenant", color: "#f7dc6f", perms: ["ManageMessages"] },
    { name: "🔰 | Sergeant", color: "#f9e79f", perms: ["ManageMessages"] },
    { name: "🚓 | Officer", color: "#fcf3cf" },

    // LAFD
    { name: "🚒 LAFD High Command", color: "#922b21" },
    { name: "👑 | Fire Chief", color: "#7b241c", perms: ["Administrator"] },
    { name: "🎖️ | Assistant Chief", color: "#922b21", perms: ["ManageRoles","ManageChannels"] },
    { name: "🏅 | Deputy Chief", color: "#a93226", perms: ["ManageChannels"] },
    { name: "🧭 | Battalion Chief", color: "#c0392b", perms: ["ManageChannels"] },
    { name: "🚒 | Captain", color: "#cd6155", perms: ["ManageMessages"] },
    { name: "🛠️ | Apparatus Operator", color: "#e6b0aa" },
    { name: "🚑 | Firefighter/Paramedic", color: "#f5b7b1" },
    { name: "🔥 | Firefighter", color: "#fadbd8" },

    // SWAT
    { name: "🛡️ SWAT Division", color: "#2c3e50" },
    { name: "👑 | SWAT Commander", color: "#1b2631", perms: ["Administrator"] },
    { name: "🎖️ | SWAT Team Leader", color: "#212f3d", perms: ["ManageChannels","KickMembers"] },
    { name: "🏅 | Assistant Team Leader", color: "#283747", perms: ["ManageMessages"] },
    { name: "🛡️ | Senior SWAT Officer", color: "#34495e" },
    { name: "⚔️ | SWAT Officer", color: "#5d6d7e" },
    { name: "🧪 | SWAT Trainee", color: "#aeb6bf" },

    // Civilian
    { name: "👤 | Civilian", color: "#95a5a6" },
    { name: "🎮 | Member", color: "#7f8c8d" }
];

// 🔧 Convert permission names
function getPermissions(perms) {
    if (!perms) return [];
    return perms.map(p => PermissionsBitField.Flags[p]);
}

// 🚀 Slash Command
const commands = [
    new SlashCommandBuilder()
        .setName('importroles')
        .setDescription('Create all server roles')
];

const rest = new REST({ version: '10' }).setToken('YOUR_BOT_TOKEN');

// Register command
(async () => {
    await rest.put(
        Routes.applicationGuildCommands('YOUR_CLIENT_ID', 'YOUR_GUILD_ID'),
        { body: commands }
    );
})();

// Bot Ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Command Handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'importroles') {
        await interaction.reply("⚙️ Creating roles...");

        for (const role of roles) {
            await interaction.guild.roles.create({
                name: role.name,
                color: role.color,
                permissions: getPermissions(role.perms)
            });
        }

        interaction.followUp("✅ All roles created successfully!");
    }
});

client.login('YOUR_BOT_TOKEN');
