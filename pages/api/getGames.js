var steam = require("steam-web");
var s = new steam({
    apiKey: "B7D55D86C23A7C4D2881D1E8BEE6885D",
    format: "json",
});

export default async function (req, res) {
    const steamId = await req.body;
    console.log(steamId);
    const result = await fetch(
        `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=B7D55D86C23A7C4D2881D1E8BEE6885D&steamid=${steamId}&include_appinfo=true`
    );
    const data = await result.json();
    res.status(200).json(data.response.games);
}
