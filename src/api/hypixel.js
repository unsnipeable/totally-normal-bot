const axios = require("axios");
let key = process.env.HYPIXEL_KEY;
async function fetchStats(username) {

    const mojang = await axios.get(
        `https://api.mojang.com/users/profiles/minecraft/${username}`
    );

    const uuid = mojang.data.id;

    const hypixel = await axios.get(
        `https://api.hypixel.net/player?key=${key}&uuid=${uuid}`
    );

    const player = hypixel.data.player;
    if (!player) return null;

    const bw = player?.stats?.Bedwars ?? {};

    const name = player?.displayname ?? "";

    let rank = (player?.newPackageRank ?? "").replace(/_PLUS/g, "+");
    if (rank === "MVP+" && player?.monthlyPackageRank === "SUPERSTAR") rank = "MVP++";
    if (rank !== "") rank = `[${rank}] `;

    const star = player?.achievements?.bedwars_level ?? 0;

    const stats = {
        name,
        star,
        rank,
        uuid
    };

    stats.totallynormal = {
        win: bw.four_four_totallynormal_wins_bedwars ?? 0,
        loss: bw.four_four_totallynormal_losses_bedwars ?? 0,
        bedbroken: bw.four_four_totallynormal_beds_broken_bedwars ?? 0,
        bedlost: bw.four_four_totallynormal_beds_lost_bedwars ?? 0,
        kills: bw.four_four_totallynormal_kills_bedwars ?? 0,
        deaths: bw.four_four_totallynormal_deaths_bedwars ?? 0,
        finalKills: bw.four_four_totallynormal_final_kills_bedwars ?? 0,
        finalDeaths: bw.four_four_totallynormal_final_deaths_bedwars ?? 0,
        vkills: bw.four_four_totallynormal_void_kills_bedwars ?? 0,
        vdeaths: bw.four_four_totallynormal_void_deaths_bedwars ?? 0,
        vfinalKills: bw.four_four_totallynormal_void_final_kills_bedwars ?? 0,
        vfinalDeaths: bw.four_four_totallynormal_void_final_deaths_bedwars ?? 0
    };

    return stats;
}

module.exports = {
    setKey: (newKey) => key = newKey,
    fetchStats
};