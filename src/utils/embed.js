const { EmbedBuilder } = require("discord.js");

function buildEmbed(username, modeKey, stats) {

    const s = stats["totallynormal"];

    const wlr = s.loss === 0 ? s.win : (s.win / s.loss).toFixed(2);
    const bblr = s.bedlost === 0 ? s.bedbroken : (s.bedbroken / s.bedlost).toFixed(2);

    const kdr = s.deaths === 0 ? s.kills : (s.kills / s.deaths).toFixed(2);
    const fkdr = s.finalDeaths === 0 ? s.finalKills : (s.finalKills / s.finalDeaths).toFixed(2);

    const vkdr = s.vdeaths === 0 ? s.vkills : (s.vkills / s.vdeaths).toFixed(2);
    const vfkdr = s.vfinalDeaths === 0 ? s.vfinalKills : (s.vfinalKills / s.vfinalDeaths).toFixed(2);

    return new EmbedBuilder()
        .setColor(0x000000)
        .setThumbnail("https://skins.mcstats.com/face/" + stats.uuid)
        .setDescription(`## \`\`[${stats.star}✫] ${stats.rank}${stats.name}\`\`'s __Tortally Normal__ Stats`)
        .addFields(

            { name: "Wins", value: `${s.win}`, inline: true },
            { name: "Losses", value: `${s.loss}`, inline: true },
            { name: "<:win:1488742526306357358> | WLR", value: `${wlr}`, inline: true },

            { name: "Kills", value: `${s.kills}`, inline: true },
            { name: "Deaths", value: `${s.deaths}`, inline: true },
            { name: "<:kill:1488742528076353698> | KDR", value: `${kdr}`, inline: true },

            { name: "Final Kills", value: `${s.finalKills}`, inline: true },
            { name: "Final Deaths", value: `${s.finalDeaths}`, inline: true },
            { name: "<:final_kill:1488742529338703912> | FKDR", value: `${fkdr}`, inline: true },

            { name: "Bed Broken", value: `${s.bedbroken}`, inline: true },
            { name: "Bed Lost", value: `${s.bedlost}`, inline: true },
            { name: "<:bed:1488742530966229093> | BBLR", value: `${bblr}`, inline: true },

            { name: "<:void:1488742525006254261> Void Stats <:void:1488742525006254261>", value: `\u200B`, inline: false },

            { name: "Void Kills", value: `${s.vkills}`, inline: true },
            { name: "Void Deaths", value: `${s.vdeaths}`, inline: true },
            { name: "<:kill:1488742528076353698> | Void KDR <:void:1488742525006254261>", value: `${vkdr}`, inline: true },

            { name: "Void Final Kills", value: `${s.vfinalKills}`, inline: true },
            { name: "Void Final Deaths", value: `${s.vfinalDeaths}`, inline: true },
            { name: "<:final_kill:1488742529338703912> | Void FKDR <:void:1488742525006254261>", value: `${vfkdr}`, inline: true }
        )
        .setFooter({
            text:"made by mtnk | @unsnipeable"
        })
        .setTimestamp();
}

module.exports = {
    buildEmbed
};