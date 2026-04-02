const {
    SlashCommandBuilder, EmbedBuilder
} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Show play command")
        .setDMPermission(true),

    async execute(interaction) {

        await interaction.deferReply();
        const embed = new EmbedBuilder().setDescription(`\`\`\`/play bedwars_four_four_totallynormal\`\`\``)

        await interaction.editReply({
            embeds: [embed]
        });

    }

};