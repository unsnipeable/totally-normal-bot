const {
    SlashCommandBuilder
} = require("discord.js");


const { fetchStats } = require("../api/hypixel");
const { buildEmbed } = require("../utils/embed");

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

        const stats = await fetchStats(username);

        if (!stats) {
            return interaction.editReply("Player not found.");
        }

        const embed = buildEmbed(username, "totallynormal", stats);

        await interaction.editReply({
            embeds: [embed]
        });

    }

};