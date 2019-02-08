import Game from "./controllers/game";

const App = {
    Name: "Pokemon - Gotta Catch 'Em All",
    Version: "0.6.1",
    Dev: "thmo_",
    FairyHelper: ["djdazzydeaf81", "jibleeto"],
    OriginalAuthor: "asudem", // Thanks for the idea and everything! Hit me up if you want me to contribute and/or merge or whatever!
    CMDS: {
        ADDUSER: "adduser",
        LEVELUP: "levelup",
        EVOLVE: "evolve",
        CHANGE: "change",
        REMOVE: "remove",
        RELEASE: "release",
        LISTTRAINERS: "listtrainers",
        LISTELITEFOUR: "listelitefour",
        IDENTIFY: "identify",
        SUPPORT: "support",
        BUYSTONE: "buystone",
        TRADE: "trade",
        LEVEL: "level",
        ATTACK: "attack",
        SENDHELP: "sendhelp",
        EXPORT: "export",
        IMPORT: "import",
        ACCEPT: "$accept",
        DECLINE: "$decline",
    },
};

const game = new Game(App);

cb.onEnter((user) => {
    game.sendDevInfo(user);
    game.sendWelcomeMessage(user);
    game.addFreebiePokemonToFanclub(user);
});

cb.onMessage((message) => {
    message = game.stripEmoticon(message);
    message = game.handleCommands(message);
    message = game.addFreebiePokemon(message);
    message = game.addPokemonFlair(message);

    return message;
});

cb.onTip((tip) => {
    game.purchaseObjects(tip);
    game.levelUp(tip);
});
