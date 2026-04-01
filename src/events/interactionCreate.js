const fs = require("fs");
const path = require("path");

const { fetchStats } = require("../api/hypixel");

const {
    buildLBEmbed,
    buildEmbed
} = require("../utils/embed");

const {
    cooldown,
    COOLDOWN
} = require("../utils/cooldown");
const {
    cache,
    CACHE_TIME,
} = require("../utils/cache");

const {
    getGuildMembers
} = require("../utils/guildMembers");

module.exports = (client) => {

    client.on("interactionCreate", async interaction => {

        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, {
                    fetchStats,
                    buildEmbed,
                    buildLBEmbed,
                    cache,
                    CACHE_TIME,
                    cooldown,
                    COOLDOWN,
                    getGuildMembers,
                    fs,
                    path
                });
            } catch (err) {
                console.error(err);

                if (interaction.deferred || interaction.replied) {
                    await interaction.followUp({
                        content: "Error occurred",
                        ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        content: "Error occurred",
                        ephemeral: true
                    });
                }
            }

            return;
        }

    });

};