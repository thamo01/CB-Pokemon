import Game from "./controllers/game";

const App = {
    Name: "Pokemon - Gotta Catch 'Em All",
    Version: 0.1,
    Dev: "thmo_",
    OriginalAuthor: "asudem", // Thanks for the idea and everything! Hit me up if you want me to contribute and/or merge or whatever!
    CMDS: {
        ADDUSER: "adduser",
        LEVELUP: "levelup",
        EVOLVE: "evolve",
        CHANGE: "change",
        REMOVE: "remove",
        RELEASE: "release",
        IDENTIFY: "identify",
        SUPPORT: "support",
        BUYSTONE: "buystone",
        TRADE: "trade",
        LEVEL: "level",
        ATTACK: "attack",
    }
};

let game = new Game(App);

cb.onEnter(user => {
    game.sendDevInfo(user);
    game.sendWelcomeMessage(user);
});

cb.onMessage(message => {
    message = game.stripEmoticon(message);
    message = game.handleCommands(message);
    message = game.addFreebiePokemon(message);
    message = game.addPokemonFlair(message);

    return message;
});

cb.onTip(tip => {
    game.purchaseObjects(tip);
    game.levelUp(tip);
});