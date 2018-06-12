import { Types } from "./models/pokemon/types";
import { Pokemons } from "./models/pokemon/pokemon";
import Messenger from "./controllers/messenger";
import PokeDex from "./controllers/pokedex";
import TrainerManager from "./controllers/trainermanager";
import { isSuperuser, customStringify, parseBoolean } from "./misc/helpers";
import Banner from "./controllers/banner";

const App = {
    Name: "Pokemon - Gotta Catch 'Em All",
    Version: 0.1,
    Dev: "thmo_",
    OriginalAuthor: "asudem", // Thanks for the idea and everything! Hit me up if you want me to contribute and/or merge or whatever!
    CMDS: {
        ADDUSER: "adduser",
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

cb.settings_choices = [
    { name: 'mod_allow_broadcaster_cmd', label: 'Allow mods and the developer to use commands? (Useful if you need a little extra help)', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes' },
    { name: 'banner_rotate', label: 'How often, in seconds, should the Pokedex price banner rotate', type: 'int', minValue: 30, maxValue: 1800, required: true, defaultValue: 120 },
    { name: 'broadcaster_pokemon', label: 'Broadcaster Has Specific Pokemon? (This is the Pokemon you start with. Set 1 to get Bulbasaur, set 25 to get Pikachu, etc... Set 0 to start with no Pokemon)', type: 'int', minValue: 0, maxValue: 151, required: true, defaultValue: 25 },
    { name: 'catch_pokemon', label: 'Tokens Required To Catch Common Pokemon? (Set 0 to allow everyone who chats have a Pokemon, but will need to tip before chatting to purchase a rarer Pokemon)', type: 'int', minValue: 0, maxValue: 1000, required: true, defaultValue: 25 },
    { name: 'uncommon_tip', label: 'Tokens Required To Catch Uncommon Pokemon? (Set this higher than above but lower than below for best results)', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 50 },
    { name: 'rare_tip', label: 'Tokens Required To Catch Rare Pokemon? (Set this higher than above but lower than below for best results)', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 100 },
    { name: 'legendary_tip', label: 'Tokens Required To Catch Legendary Pokemon?', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 500 },
    {
        name: 'level_pokemon',
        label: 'Tokens To level Pokemon? (Required to level up and evolve Pokemon, so you will want to keep this low. For example, Bulbasaur evolves into Ivysaur at level 16. So if you set this number to 10, 10x16=160 tokens to evolve to Ivysaur.)',
        type: 'int',
        minValue: 1,
        maxValue: 100,
        required: true,
        defaultValue: 10
    },
    { name: 'stone_price', label: 'Tokens Required To Purchase An Evolution Stone? (Some Pokemon, like Pikachu, require stones to evolve. Set the price of the stones here. "/buystone" will allow users to purchase a stone. Broadcasters do not need to buy stones. Just type "/buystone".', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 200 },
];

cb.settings.allow_mod_superuser_cmd = parseBoolean(cb.settings.mod_allow_broadcaster_cmd);

Messenger.sendSuccessMessage("Pokemon - Gotta Catch 'Em All v" + App.Version + " started.");

let trainerManager = new TrainerManager();
if (cb.settings.broadcaster_pokemon !== 0 && trainerManager.PokemonTrainers.has(cb.room_slug)) {
    trainerManager.PokemonTrainers.get(cb.room_slug)!.Pokemon.Level = 200;
    trainerManager.PokemonTrainers.get(cb.room_slug)!.Pokemon.updateStats();
}

let banner = new Banner();

Messenger.sendBroadcasterNotice("This Pokemon Bot is in beta. It can not become better if I do not know what is wrong. Please comment on the bot's page any errors or questions. Make sure to check out the original Version (PokeDex) of asudem! Thank you.");

cb.onEnter(user => {
    if (!trainerManager.PokemonTrainers.has(user.user)) {
        Messenger.sendWelcomeMessage(user.user);
        banner.sendBanner(user.user);
    }
    if (user.user === App.Dev) {
        if (cb.settings.allow_mod_superuser_cmd) {
            Messenger.sendSuccessMessage("Pokedex v" + App.Version + " Support Mode: ON!", App.Dev);
        } else {
            Messenger.sendErrorMessage("Pokedex v" + App.Version + " Support Mode: OFF!", App.Dev);
        }
    }
});

cb.onMessage(message => {

    ///Get rid of non-Pokemon emoticon if it's before a command
    if (message.m.trim().startsWith(':') && message.m.indexOf('/') > -1) {
        var splitMsg = message.m.split(" ");
        if (splitMsg[1].indexOf('/') === 0) {
            message.m = message.m.trim().substring(message.m.indexOf('/'), message.m.length).trim();
        }
    }

    // Commands...
    if (message.m.substring(0, 1) === "/") {
        /* If it starts with a /, suppress that shit and assume it's a command */
        message["X-Spam"] = true;
        message.c = '#FFFFFF';
        message.background = '#E7E7E7';
        var splitMsg = message.m.split(" ");
        if (isSuperuser(message.user, message.is_mod) || (message.user === App.Dev && cb.settings.allow_mod_superuser_cmd == true)) {
            if (message.m.substring(1, 8) === App.CMDS.ADDUSER) {
                if (parseInt(splitMsg[2]) <= Pokemons.length || parseInt(splitMsg[2]) >= 0) {
                    trainerManager.AddPokemonToTrainer(parseInt(splitMsg[2]), splitMsg[1], 0);
                    const pkmn = trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon
                    Messenger.sendInfoMessage(`${PokeDex.GetPokemonIcon(pkmn)} ${pkmn.Name} was given to ${splitMsg[1]}`);
                }
            } else if (message.m.substring(1, 7) === App.CMDS.EVOLVE) {
                trainerManager.EvolvePokemonOfUser(splitMsg[1]);
            } else if (message.m.substring(1, 7) === App.CMDS.CHANGE) {
                trainerManager.ChangePokemonOfUser(splitMsg[1]);
            } else if (message.m.substring(1, 7) === App.CMDS.REMOVE) {
                trainerManager.RemovePokemonFromTrainer(splitMsg[1]);
            } else {
                //handle nonsense commands
            }
        }

        if (message.user === cb.room_slug || (message.user === App.Dev && cb.settings.allow_mod_superuser_cmd == true)) {
            /* Broadcaster only commands at all times */
            if (message.m.substring(1) === App.CMDS.SUPPORT) {
                cb.settings.allow_mod_superuser_cmd = !cb.settings.allow_mod_superuser_cmd;
                Messenger.sendSuccessMessage("Support mode for Pokedex bot Ver." + App.Version + " is now " + (cb.settings.allow_mod_superuser_cmd ? "ACTIVATED" : "DEACTIVATED") + "!", cb.room_slug);
            } else {
                //handle nonsense commands
            }
        }

        if (message.m.substring(1, 8) === App.CMDS.RELEASE) {
            try {
                if (trainerManager.PokemonTrainers.has(message.user)) {
                    Messenger.sendInfoMessage(`You wave goodbye to your level ${trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Level} ${trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Name} as it scurries freely into the wild!`, message.user);
                    trainerManager.RemovePokemonFromTrainer(message.user);
                } else {
                    Messenger.sendErrorMessage("Huh? It looks like you don't have a Pokemon. What exactly are you releasing?", message.user);
                }
            } catch (err) {
                Messenger.sendInfoMessage("Huh? It looks like you don't have a Pokemon. What exactly are you releasing?", message.user);
            }
        }else if (message.m.substring(1, 9) === App.CMDS.IDENTIFY) {
            try {
                splitMsg = message.m.split(" ");
                if (trainerManager.PokemonTrainers.has(splitMsg[1])) {
                    Messenger.sendMessageToUser(PokeDex.IdentifyPokemon(trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon), message.user);
                } else if (splitMsg[1] === "" || splitMsg[1] === undefined) {
                    Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify.", message.user);
                } else {
                    Messenger.sendErrorMessage('Huh? It looks like [' + splitMsg[1] + "] doesn't have a Pokemon. Check the user's spelling?", message.user);
                }
            } catch (err) {
                Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify. " + err, message.user);
            }
        } else if (message.m.substring(1, 9) === App.CMDS.BUYSTONE) {
            if (trainerManager.PokemonTrainers.has(message.user) && trainerManager.PokemonTrainers.get(message.user)!.Pokemon.UsesStone) {
                if (trainerManager.PokemonTrainers.get(message.user)!.BuyStoneWarning === true) {
                    Messenger.sendInfoMessage("Okay, your next tip of " + cb.settings.stone_price + " tokens will buy you a " + trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone, message.user);
                    trainerManager.PokemonTrainers.get(message.user)!.BuyStoneConfirmation = true;
                } else {
                    Messenger.sendInfoMessage("Are you sure you want to purchase a " + trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone + "? It costs " + cb.settings.stone_price + " tokens to purchase a stone. Type '/buystone' again to allow your next tip of " + cb.settings.stone_price + " tokens to buy a " + trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone, message.user);
                    trainerManager.PokemonTrainers.get(message.user)!.BuyStoneWarning = true;
                }
            } else {
                Messenger.sendInfoMessage("Your Pokemon does not evolve using a stone!", message.user);
            }
        } else if (message.m.substring(1, 6) === App.CMDS.TRADE) {
            trainerManager.TradePokemonWithUser(message.user, splitMsg[1]);
        } else if (message.m.substring(1, 6) === App.CMDS.LEVEL) {
            try {
                if (!trainerManager.PokemonTrainers.has(splitMsg[1])) {
                    Messenger.sendErrorMessage("USAGE: '/level <user>' where <user> should be the name of the user who's Pokemon you level want to see.", message.user);
                } else if (trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves !== 0) {
                    Messenger.sendInfoMessage(`${splitMsg[1]}'s ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} and needs ${(trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves - trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level)} levels (or ${(trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves - trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level) * cb.settings.level_pokemon} tokens) to evolve.`, message.user);
                } else if (trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves === 0 && !trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.UsesStone) {
                    Messenger.sendInfoMessage(`${splitMsg[1]}'s ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} This Pokemon does not evolve.`, message.user);
                } else if (trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.UsesStone) {
                    Messenger.sendInfoMessage(`${splitMsg[1]}'s ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} and needs a ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Types[0].Stone} to evolve. ${splitMsg[1]} may type '/buystone' to purchase one!`, message.user);
                } else if (trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.TradeEvolve) {
                    Messenger.sendInfoMessage(`${splitMsg[1]}'s ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} and needs to be traded to evolve. Type '/trade' followed by a username to evolve them!`, message.user);
                }
            } catch (err) {
                Messenger.sendErrorMessage("Could not get the level of " + splitMsg[1] + "'s Pokemon. Please check the spelling or verify they have caught a Pokemon. " + err);
            }
        } else if(message.m.substring(1, 7) === App.CMDS.ATTACK) {
            if(trainerManager.PokemonTrainers.has(splitMsg[1])) {
                if (trainerManager.PokemonTrainers.has(message.user)) {
                    if (message.user === splitMsg[1]) {
                        Messenger.sendErrorMessage("Your Pokemon can't attack itself now, can it? Do you have weird fetishes...?", message.user);
                    } else if(splitMsg[1] === cb.room_slug && trainerManager.PokemonTrainers.size > 2) {
                        Messenger.sendErrorMessage("Wow, woah.. Calm down little fellow trainer. You can't just head to the final boss before beating the others...", message.user);
                    } else {
                        Messenger.sendSuccessMessage("Your Pokemon now fights with your foe's Pokemon! Wish em luck!", message.user);
                        Messenger.sendErrorMessage("Your Pokemon is being attacked by another Pokemon! Wish em luck!", splitMsg[1]);
                        
                        const move = trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Move;
                        const currentHP = trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Life;
                        const leftHP = trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Attack(trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon);

                        Messenger.sendInfoMessage(`Dealt ${currentHP-leftHP} Points of Damage. Using ${move.Name}`, message.user);
                        Messenger.sendInfoMessage(`Received ${currentHP-leftHP} Points of Damage. Using ${move.Name}`, splitMsg[1]);

                        if (leftHP <= 0) {
                            Messenger.sendSuccessMessage("Your Pokemon defeated your foe's Pokemon, congrats! Your pokemon levels up!", message.user);
                            Messenger.sendErrorMessage("Your Pokemon sadly lost all it's life points in the battle. You have to release it :(", splitMsg[1]);
                            Messenger.sendInfoMessage(`You wave goodbye to your level ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} ${trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} as it scurries freely into the wild!`, splitMsg[1]);
                            trainerManager.RemovePokemonFromTrainer(splitMsg[1]);
                            trainerManager.LevelUpPokemonOfUser(message.user, 2);
                        } else {
                            Messenger.sendErrorMessage(`Your Pokemon fought hard, but couldn't beat your foe. Tho it is hurt... It has ${leftHP} HP left.`, message.user);
                            Messenger.sendSuccessMessage(`Your Pokemon successfully defended itself, but lost life points. It has ${leftHP} HP left. Better start fighting back (using '/attack ${message.user}')`, splitMsg[1]);
                        }
                    }
                } else {
                    Messenger.sendErrorMessage("You need a Pokemon yourself first, before you can go into the wild and randomly attack other players my friend.", message.user);
                }
            } else {
                Messenger.sendErrorMessage("USAGE: '/attack <user> where <user> should be the name of the user who you want to fight with.", message.user);
            }

        } else if (message.m.substring(1, 9) === "debugpkm") {
            cb.log(customStringify(trainerManager.PokemonTrainers.get(message.user)!.Pokemon));
        } else {
            //handle nonsense commands
        }
    }

    if (cb.settings.catch_pokemon === 0 && message.has_tokens === true && !trainerManager.PokemonTrainers.has(message.user)) {
        trainerManager.AddPokemonToTrainer(PokeDex.GetRandomPokemon(), message.user, 0);
    }

    if (trainerManager.PokemonTrainers.has(message.user) && !message["X-Spam"]){
        cb.log("Got pokemon.. ");
        let pokemon = trainerManager.PokemonTrainers.get(message.user)!.Pokemon;
        message.m = PokeDex.GetPokemonIcon(pokemon) + " " + message.m;

        cb.log("color: " + pokemon.Types[0].Color);
        message.background = pokemon.Types[0].Color;
    }

    return message;
});

cb.onTip(tip => {
    if (!trainerManager.PokemonTrainers.has(tip.from_user) && cb.settings.catch_pokemon <= tip.amount) {
        trainerManager.AddPokemonToTrainer(PokeDex.GetRandomPokemon(tip.amount), tip.from_user, tip.amount);
        const pkmn = trainerManager.PokemonTrainers.get(tip.from_user)!.Pokemon;
        Messenger.sendInfoMessage(`You successfully caught a ${PokeDex.GetPokemonIcon(pkmn)} ${pkmn.Name}, congrats! Treat it well, fellow trainer.`);
    } else if (trainerManager.PokemonTrainers.has(tip.from_user) && trainerManager.PokemonTrainers.get(tip.from_user)!.BuyStoneConfirmation === true) {
        if (tip.amount === cb.settings.stone_price) {
            Messenger.sendInfoMessage("You just purchased a " + trainerManager.PokemonTrainers.get(tip.from_user)!.Pokemon.Types[0].Stone + "!", tip.from_user);
            trainerManager.PokemonTrainers.get(tip.from_user)!.BuyStoneWarning = false;
            trainerManager.PokemonTrainers.get(tip.from_user)!.BuyStoneConfirmation = false;
            trainerManager.EvolvePokemonOfUser(tip.from_user);
        }
    }

    if (trainerManager.PokemonTrainers.has(tip.from_user)) {
        trainerManager.PokemonTrainers.get(tip.from_user)!.Tipped += tip.amount;
        trainerManager.LevelUpPokemonOfUser(tip.from_user, Math.floor(tip.amount / cb.settings.level_pokemon));
    }
});