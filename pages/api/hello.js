// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var steam = require("steam-web");
var s = new steam({
    apiKey: "B7D55D86C23A7C4D2881D1E8BEE6885D",
    format: "json",
});

// export default async function (req, res) {
//     s.getFriendList({
//         steamid: "76561198142254362",
//         relationship: "all", //'all' or 'friend'
//         callback: function (err, data) {
//             console.log(data.friendslist);
//         },
//     });
// }

export default async function (req, res) {
    s.getPlayerSummaries({
        steamids: ["76561198142254362"],
        callback: function (err, data) {
            console.log(data.response.players);
            res.status(200).json(data.response.players);
        },
    });
}
