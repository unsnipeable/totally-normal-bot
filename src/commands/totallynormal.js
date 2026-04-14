const {
    SlashCommandBuilder
} = require("discord.js");


const { fetchStats } = require("../api/hypixel");
const { buildEmbed } = require("../utils/embed");
const { cache, CACHE_TIME } = require("../utils/cache");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("totallynormal")
        .setDescription("Show player's totally normal stats")
        .addStringOption(option =>
            option
                .setName("player")
                .setDescription("Minecraft username")
                .setRequired(true)
        )
        .setDMPermission(true),

    async execute(interaction) {

        await interaction.deferReply();

        let username = interaction.options.getString("player");

        const now = Date.now();
        let stats;

        if (cache.has(username)) {
            const cached = cache.get(username);

            if (now - cached.timestamp < CACHE_TIME) {
                stats = cached.data;
            } else {
                cache.delete(username);
            }
        }

        if (!stats) {
            stats = await fetchStats(username);

            if (!stats) {
                return interaction.editReply("Player not found.");
            }

            cache.set(username, {
                data: stats,
                timestamp: now
            });
        }

        const embed = buildEmbed(username, "totallynormal", stats);

        await interaction.editReply({
            embeds: [embed]
        });

    }

};