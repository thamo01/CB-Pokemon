import { customStringify, parseBoolean } from "../misc/helpers";
import { Pokemons } from "../models/pokemon/pokemon";
import PokemonTrainerDTO from "../models/trainerDTO";
import AccessControl from "./accesscontrol";
import Banner from "./banner";
import Messenger from "./messenger";
import PokeDex from "./pokedex";
import TrainerManager from "./trainermanager";

export default class Game {
    public trainerManager: TrainerManager = new TrainerManager();
    public banner: Banner = new Banner();
    private readonly accessControl: AccessControl;

    constructor(public config: any) {
        if (config !== undefined) {
            this.initCBSettings();

            this.accessControl = new AccessControl(cb.settings.allow_mod_superuser_cmd, this.config.Dev, this.config.FairyHelper);

            Messenger.sendSuccessMessage("Pokemon - Gotta Catch 'Em All v" + this.config.Version + " started.");
            Messenger.sendBroadcasterNotice("This Pokemon Bot is in beta. It can not become better if I do not know what is wrong. Please comment on the bot's page any errors or questions. Make sure to check out the original Version (PokeDex) of asudem! Thank you.");

            this.initBroadcaster();
        } else {
            this.accessControl = new AccessControl(cb.settings.allow_mod_superuser_cmd, "", []);
        }
    }

    //#region OnEnter Functions
    public sendDevInfo(user: user) {
        if (this.accessControl.hasPermission(user, "SUPERUSER")) {
            Messenger.sendSuccessMessage("Pokedex v" + this.config.Version + " Support Mode: ON!", this.config.Dev);
        } else {
            Messenger.sendErrorMessage("Pokedex v" + this.config.Version + " Support Mode: OFF!", this.config.Dev);
        }
    }

    public sendWelcomeMessage(user: user) {
        if (!this.trainerManager.PokemonTrainers.has(user.user)) {
            Messenger.sendWelcomeMessage(user.user);
            this.banner.sendBanner(user.user);
        }
    }

    public addFreebiePokemonToFanclub(user: user) {
        if (cb.settings.fanclub_auto_catch && this.accessControl.hasClaim(user, "IN_FANCLUB") && !this.trainerManager.PokemonTrainers.has(user.user)) {
            this.trainerManager.AddPokemonToTrainer(PokeDex.GetRandomPokemon(), user.user, 0);
        }
    }
    //#endregion

    //#region OnMessage Functions
    public stripEmoticon(message: message): message {
        if (message.m.trim().startsWith(":") && message.m.indexOf("/") > -1) {
            const splitMsg = message.m.split(" ");
            if (splitMsg[1].indexOf("/") === 0) {
                message.m = message.m.trim().substring(message.m.indexOf("/"), message.m.length).trim();
            }
        }

        return message;
    }

    public handleCommands(message: message): message {
        if (message.m.indexOf(this.config.Prefix) !== 0) {
            return message;
        }

        /* If it starts with the prefix, suppress that shit and assume it's a command */
        message["X-Spam"] = true;
        message.c = "#FFFFFF";
        message.background = "#E7E7E7";

        const args = message.m.slice(this.config.Prefix.length).trim().split(/ +/g);
        let command = args.shift();
        if (command === undefined) {
            return message;
        }

        command = command.toLowerCase();

        if (this.accessControl.hasPermission(message, "MOD")) {
            /* Broadcaster only commands at all times */
            if (command === this.config.CMDS.SUPPORT) {
                cb.settings.allow_mod_superuser_cmd = !cb.settings.allow_mod_superuser_cmd;
                Messenger.sendSuccessMessage("Support mode for Pokedex bot Ver." + this.config.Version + " is now " + (cb.settings.allow_mod_superuser_cmd ? "ACTIVATED" : "DEACTIVATED") + "!", cb.room_slug);
            }
        }

        if (this.accessControl.hasPermission(message, "SUPERUSER")) {
            switch (command) {
                case this.config.CMDS.ADDUSER: {
                    const [targetUser, pokedexNumberString] = args;
                    const pokedexNumber = parseInt(pokedexNumberString, 10);
                    if (pokedexNumber <= Pokemons.length && pokedexNumber >= 0) {
                        this.trainerManager.AddPokemonToTrainer(pokedexNumber, targetUser, 0);
                        const pkmn = this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon;
                        Messenger.sendInfoMessage(`${PokeDex.GetPokemonIcon(pkmn)} ${pkmn.Name} was given to ${targetUser}`);
                    }
                    break;
                }
                case this.config.CMDS.EVOLVE: {
                    const [targetUser] = args;
                    this.trainerManager.EvolvePokemonOfUser(targetUser);
                    break;
                }
                case this.config.CMDS.CHANGE: {
                    const [targetUser] = args;
                    this.trainerManager.ChangePokemonOfUser(targetUser);
                    break;
                }
                case this.config.CMDS.REMOVE: {
                const [targetUser] = args;
                this.trainerManager.RemovePokemonFromTrainer(targetUser);
                break;
                }
                case this.config.CMDS.LEVELUP: {
                    const [targetUser, levelsString] = args;
                    const levels = parseInt(levelsString, 10);

                    if (this.trainerManager.PokemonTrainers.has(targetUser) && levels > 0) {
                        this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon.Level += levels;
                        if (message.user !== this.config.Dev && this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon.Level > 100) {
                            this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon.Level = 100;
                        }
                        this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon.updateStats();
                    }
                    break;
                }
                case this.config.CMDS.SENDHELP: {
                    const [targetUser] = args;

                    let user: string | undefined;
                    if (targetUser !== undefined && targetUser !== "") {
                        user = targetUser;
                    }

                    this.banner.sendWelcomeAndBannerMessage(user);
                    break;
                }
                case this.config.CMDS.EXPORT: {
                    const exportdata = this.trainerManager.ExportToDTO();
                    Messenger.sendSuccessMessage(JSON.stringify(exportdata), message.user);
                    break;
                }
                case this.config.CMDS.IMPORT: {
                    const json = args.join(" ");
                    const importdata: PokemonTrainerDTO[] = JSON.parse(json);
                    this.trainerManager.ImportFromDTO(importdata);
                    break;
                }
            }
        }

        switch (command) {
            case this.config.CMDS.RELEASE: {
                try {
                    if (this.trainerManager.PokemonTrainers.has(message.user)) {
                        Messenger.sendInfoMessage(`You wave goodbye to your level ${this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Level} ${this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Name} as it scurries freely into the wild!`, message.user);
                        this.trainerManager.RemovePokemonFromTrainer(message.user);
                    } else {
                        Messenger.sendErrorMessage("Huh? It looks like you don't have a Pokemon. What exactly are you releasing?", message.user);
                    }
                } catch (err) {
                    Messenger.sendInfoMessage("Huh? It looks like you don't have a Pokemon. What exactly are you releasing?", message.user);
                }
                break;
            }
            case this.config.CMDS.IDENTIFY: {
                const [targetUser] = args;
                try {
                    if (this.trainerManager.PokemonTrainers.has(targetUser)) {
                        Messenger.sendMessageToUser(PokeDex.IdentifyPokemon(this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon), message.user);
                    } else if (targetUser === "" || targetUser === undefined) {
                        Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify.", message.user);
                    } else {
                        Messenger.sendErrorMessage("Huh? It looks like [" + targetUser + "] doesn't have a Pokemon. Check the user's spelling?", message.user);
                    }
                } catch (err) {
                    Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify. " + err, message.user);
                }
                break;
            }
            case this.config.CMDS.BUYSTONE: {
                if (this.trainerManager.PokemonTrainers.has(message.user) && this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.UsesStone) {
                    if (this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneWarning === true) {
                        if (message.user === cb.room_slug) {
                            this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneWarning = false;
                            this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneConfirmation = false;
                            this.trainerManager.EvolvePokemonOfUser(message.user);
                        } else {
                            Messenger.sendInfoMessage("Okay, your next tip of " + cb.settings.stone_price + " tokens will buy you a " + this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone, message.user);
                            this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneConfirmation = true;
                        }
                    } else {
                        Messenger.sendInfoMessage("Are you sure you want to purchase a " + this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone + "? It costs " + cb.settings.stone_price + " tokens to purchase a stone. Type '/buystone' again to allow your next tip of " + cb.settings.stone_price + " tokens to buy a " + this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone, message.user);
                        this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneWarning = true;
                    }
                } else {
                    Messenger.sendInfoMessage("Your Pokemon does not evolve using a stone!", message.user);
                }
                break;
            }
            case this.config.CMDS.TRADE: {
                const [param1] = args;

                if (param1 === this.config.CMDS.ACCEPT) {
                    // if user who sent the command "trade -accept" has a trade request open, trade it with the requester

                } else if (param1 === this.config.CMDS.DECLINE) {
                    // if user who sent the command "trade -decline" has a trade request open, decline the trade and remove request info

                } else if (this.trainerManager.PokemonTrainers.has(param1)) {
                    // if targetuser has no request open, request trade

                } else {
                    // ?? send help

                }

                break;
            }
            case this.config.CMDS.LEVEL: {
                const [targetUser] = args;
                try {
                    if (!this.trainerManager.PokemonTrainers.has(targetUser)) {
                        Messenger.sendErrorMessage("USAGE: '/level <user>' where <user> should be the name of the user who's Pokemon you level want to see.", message.user);
                        break;
                    }

                    const targetPokemon = this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon;

                    if (targetPokemon.Evolves !== 0) {
                        Messenger.sendInfoMessage(`${targetUser}'s ${targetPokemon.Name} is currently level ${targetPokemon.Level} and needs ${(targetPokemon.Evolves - targetPokemon.Level)} levels (or ${(targetPokemon.Evolves - targetPokemon.Level) * cb.settings.level_pokemon} tokens) to evolve.`, message.user);
                    } else if (targetPokemon.UsesStone) {
                        Messenger.sendInfoMessage(`${targetUser}'s ${targetPokemon.Name} is currently level ${targetPokemon.Level} and needs a ${targetPokemon.Types[0].Stone} to evolve. ${targetUser} may type '/buystone' to purchase one!`, message.user);
                    } else if (targetPokemon.TradeEvolve) {
                        Messenger.sendInfoMessage(`${targetUser}'s ${targetPokemon.Name} is currently level ${targetPokemon.Level} and needs to be traded to evolve. Type '/trade' followed by a username to evolve them!`, message.user);
                    } else {
                        Messenger.sendInfoMessage(`${targetUser}'s ${targetPokemon.Name} is currently level ${targetPokemon.Level} This Pokemon does not evolve.`, message.user);
                    }
                } catch (err) {
                    Messenger.sendErrorMessage("Could not get the level of " + targetUser + "'s Pokemon. Please check the spelling or verify they have caught a Pokemon. " + err);
                }
                break;
            }
            case this.config.CMDS.ATTACK: {
                const [targetUser] = args;
                if (this.trainerManager.PokemonTrainers.has(targetUser)) {
                    if (this.trainerManager.PokemonTrainers.has(message.user)) {
                        if (message.user === targetUser) {
                            Messenger.sendErrorMessage("Your Pokemon can't attack itself now, can it? Do you have weird fetishes...?", message.user);
                        } else if (targetUser === cb.room_slug && this.isEliteFourMember(message.user)) {
                            Messenger.sendErrorMessage("Hey now.. you are a member of the Elite Four, you shouldn't fight against " + cb.room_slug, message.user);
                        } else if (targetUser === cb.room_slug && !this.eliteFourDefeated()) {
                            Messenger.sendErrorMessage("Wow, woah.. Calm down little fellow trainer. You can't just head to the final boss before beating the Elite Four!", message.user);
                        } else {
                            const move = this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Move;
                            const currentHP = this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon.Life;
                            const leftHP = this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Attack(this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon);

                            if (cb.settings.public_fights !== true) {
                                Messenger.sendSuccessMessage("Your Pokemon now fights with your foe's Pokemon! Wish em luck!", message.user);
                                Messenger.sendErrorMessage(`Your Pokemon is being attacked by ${message.user}'s Pokemon! Wish em luck!`, targetUser);
                            }
                            cb.setTimeout(() => true, 50);
                            if (cb.settings.public_fights !== true) {
                                Messenger.sendInfoMessage(`Dealt ${currentHP - leftHP} Points of Damage. Using ${move.Name}`, message.user);
                                Messenger.sendInfoMessage(`Received ${currentHP - leftHP} Points of Damage. Using ${move.Name}`, targetUser);
                            }

                            if (leftHP <= 0) {
                                if (cb.settings.public_fights === true) {
                                    Messenger.sendSuccessMessage(`${message.user} successfully defeated ${targetUser} (dealt ${currentHP - leftHP} damage, using ${move.Name})`);
                                } else {
                                    Messenger.sendSuccessMessage("Your Pokemon defeated your foe's Pokemon, congrats! Your pokemon levels up!", message.user);
                                    Messenger.sendErrorMessage("Your Pokemon sadly lost all it's life points in the battle. You have to release it :(", targetUser);
                                }
                                Messenger.sendInfoMessage(`You wave goodbye to your level ${this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon.Level} ${this.trainerManager.PokemonTrainers.get(targetUser)!.Pokemon.Name} as it scurries freely into the wild!`, targetUser);

                                this.trainerManager.RemovePokemonFromTrainer(targetUser);
                                this.trainerManager.LevelUpPokemonOfUser(message.user, 2);
                            } else {
                                if (cb.settings.public_fights === true) {
                                    Messenger.sendInfoMessage(`${message.user} attacked ${targetUser} (dealt ${currentHP - leftHP} damage, using ${move.Name}, ${leftHP} HP left)`);
                                }

                                Messenger.sendErrorMessage(`Your Pokemon fought hard, but couldn't beat your foe. Tho it is hurt... It has ${leftHP} HP left.`, message.user);
                                Messenger.sendSuccessMessage(`Your Pokemon successfully defended itself, but lost life points. It has ${leftHP} HP left. Better start fighting back (using '/attack ${message.user}')`, targetUser);
                            }
                        }
                    } else {
                        Messenger.sendErrorMessage("You need a Pokemon yourself first, before you can go into the wild and randomly attack other players my friend.", message.user);
                    }
                } else {
                    Messenger.sendErrorMessage("USAGE: '/attack <user> where <user> should be the name of the user who you want to fight with.", message.user);
                }
                break;
            }
            case this.config.CMDS.LISTTRAINERS: {
                this.trainerManager.PokemonTrainers.forEach((trainer) => {
                    Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", message.user);
                });
                break;
            }
            case this.config.CMDS.LISTELITEFOUR: {
                this.listEliteFourMembers(message.user);
                break;
            }
            case "debugpkm": {
                this.trainerManager.PokemonTrainers.forEach((trainer) => Messenger.sendInfoMessage(customStringify(trainer), message.user));
                break;
            }
        }

        return message;
    }

    public addFreebiePokemon(message: message): message {
        if (cb.settings.catch_pokemon === 0 && message.has_tokens === true && !this.trainerManager.PokemonTrainers.has(message.user)) {
            this.trainerManager.AddPokemonToTrainer(PokeDex.GetRandomPokemon(), message.user, 0);
        }
        return message;
    }

    public addPokemonFlair(message: message): message {
        if (this.trainerManager.PokemonTrainers.has(message.user) && !message["X-Spam"]) {
            const pokemon = this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon;
            message.m = PokeDex.GetPokemonIcon(pokemon) + " " + message.m;

            if (cb.settings.colorize_chat === "Font Color Only") {
                message.c = pokemon.Types[0].FontColor;
            }
            if (cb.settings.colorize_chat === "Font Color and Background") {
                message.c = pokemon.Types[0].FontColor;
                message.background = pokemon.Types[0].Color;
            }
        }

        if (message.user === this.config.Dev && !message["X-Spam"]) {
            message.m = ":pkmnoak " + message.m;
        }

        return message;
    }
    //#endregion

    //#region OnTip Functions
    public purchaseObjects(tip: tip) {
        if (!this.trainerManager.PokemonTrainers.has(tip.from_user) && cb.settings.catch_pokemon <= tip.amount) {
            this.trainerManager.AddPokemonToTrainer(PokeDex.GetRandomPokemon(tip.amount), tip.from_user, tip.amount);
            const pkmn = this.trainerManager.PokemonTrainers.get(tip.from_user)!.Pokemon;
            Messenger.sendInfoMessage(`You successfully caught a ${PokeDex.GetPokemonIcon(pkmn)} ${pkmn.Name}, congrats! Treat it well, fellow trainer.`);
        } else if (this.trainerManager.PokemonTrainers.has(tip.from_user) && this.trainerManager.PokemonTrainers.get(tip.from_user)!.BuyStoneConfirmation === true) {
            if (tip.amount === cb.settings.stone_price) {
                Messenger.sendInfoMessage("You just purchased a " + this.trainerManager.PokemonTrainers.get(tip.from_user)!.Pokemon.Types[0].Stone + "!", tip.from_user);
                this.trainerManager.PokemonTrainers.get(tip.from_user)!.BuyStoneWarning = false;
                this.trainerManager.PokemonTrainers.get(tip.from_user)!.BuyStoneConfirmation = false;
                this.trainerManager.EvolvePokemonOfUser(tip.from_user);
            }
        }
    }

    public levelUp(tip: tip) {
        if (this.trainerManager.PokemonTrainers.has(tip.from_user)) {
            this.trainerManager.PokemonTrainers.get(tip.from_user)!.Tipped += tip.amount;
            this.trainerManager.LevelUpPokemonOfUser(tip.from_user, Math.floor(tip.amount / cb.settings.level_pokemon));
        }
    }

    private initCBSettings() {
        cb.settings_choices = [
            { name: "mod_allow_broadcaster_cmd", label: "Allow mods and the developer to use commands? (Useful if you need a little extra help)", type: "choice", choice1: "Yes", choice2: "No", defaultValue: "Yes" },
            { name: "banner_rotate", label: "How often, in seconds, should the Pokedex price banner rotate", type: "int", minValue: 20, maxValue: 1800, required: true, defaultValue: 240 },
            { name: "broadcaster_pokemon", label: "Broadcaster Has Specific Pokemon? (This is the Pokemon you start with. Set 1 to get Bulbasaur, set 25 to get Pikachu, etc... Set 0 to start with no Pokemon)", type: "int", minValue: 0, maxValue: (Pokemons.length - 1), required: true, defaultValue: 25 },
            { name: "catch_pokemon", label: "Tokens Required To Catch Common Pokemon? (Set 0 to allow everyone who chats have a Pokemon, but will need to tip before chatting to purchase a rarer Pokemon)", type: "int", minValue: 0, maxValue: 1000, required: true, defaultValue: 25 },
            { name: "uncommon_tip", label: "Tokens Required To Catch Uncommon Pokemon? (Set this higher than above but lower than below for best results)", type: "int", minValue: 1, maxValue: 1000, required: true, defaultValue: 50 },
            { name: "rare_tip", label: "Tokens Required To Catch Rare Pokemon? (Set this higher than above but lower than below for best results)", type: "int", minValue: 1, maxValue: 1000, required: true, defaultValue: 100 },
            { name: "legendary_tip", label: "Tokens Required To Catch Legendary Pokemon?", type: "int", minValue: 1, maxValue: 1000, required: true, defaultValue: 500 },
            { name: "mystic_tip", label: "Tokens Required To Catch Mystic Pokemon?", type: "int", minValue: 1, maxValue: 1500, required: true, defaultValue: 1000 },
            {
                name: "level_pokemon",
                label: "Tokens To level Pokemon? (Required to level up and evolve Pokemon, so you will want to keep this low. For example, Bulbasaur evolves into Ivysaur at level 16. So if you set this number to 10, 10x16=160 tokens to evolve to Ivysaur.)",
                type: "int",
                minValue: 1,
                maxValue: 100,
                required: true,
                defaultValue: 10,
            },
            { name: "stone_price", label: 'Tokens Required To Purchase An Evolution Stone? (Some Pokemon, like Pikachu, require stones to evolve. Set the price of the stones here. "/buystone" will allow users to purchase a stone. Broadcasters do not need to buy stones. Just type "/buystone".', type: "int", minValue: 1, maxValue: 1000, required: true, defaultValue: 200 },
            { name: "fanclub_auto_catch", label: "Give your fanclub members a free common pokemon as they enter the chatroom?", type: "choice", choice1: "Yes", choice2: "No", defaultValue: "Yes" },
            { name: "elite_four_1", label: "Choose your first member of your personal elite four! Insert the username of the one you choose as elite four member. (your mods for example, or the developer of this bot)", type: "str", required: false, defaultValue: "" },
            { name: "elite_four_1_pokemon", label: "Choose your first elite four members pokemon. Choose wisely. (Maybe one of the legendary birds, 144, 145, 146?)", type: "int", minValue: 0, maxValue: (Pokemons.length - 1), required: true, defaultValue: 144 },
            { name: "elite_four_2", label: "Choose your second member of your personal elite four!", type: "str", required: false, defaultValue: "" },
            { name: "elite_four_2_pokemon", label: "Choose your second elite four members pokemon.", type: "int", minValue: 0, maxValue: (Pokemons.length - 1), required: true, defaultValue: 145 },
            { name: "elite_four_3", label: "Choose your third member of your personal elite four!", type: "str", required: false, defaultValue: "" },
            { name: "elite_four_3_pokemon", label: "Choose your third elite four members pokemon.", type: "int", minValue: 0, maxValue: (Pokemons.length - 1), required: true, defaultValue: 146 },
            { name: "elite_four_4", label: "Choose your fourth member of your personal elite four and complete the list!", type: "str", required: false, defaultValue: "" },
            { name: "elite_four_4_pokemon", label: "Choose your fourth elite four members pokemon.", type: "int", minValue: 0, maxValue: (Pokemons.length - 1), required: true, defaultValue: 150 },
            { name: "public_fights", label: "Make fights public? (this might clutter your chat with a lot of notices about the battle)", type: "choice", choice1: "Yes", choice2: "No", defaultValue: "No" },
            { name: "colorize_chat", label: "Do you want to color the chat according to the pokemon type?", type: "choice", choice1: "Font Color and Background", choice2: "No", defaultValue: "Font Color and Background" },
        ];
        cb.settings.allow_mod_superuser_cmd = parseBoolean(cb.settings.mod_allow_broadcaster_cmd);
        cb.settings.fanclub_auto_catch = parseBoolean(cb.settings.fanclub_auto_catch);
        cb.settings.public_fights = parseBoolean(cb.settings.public_fights);
    }

    private initBroadcaster() {
        if (cb.settings.broadcaster_pokemon !== 0) {
            this.trainerManager.AddPokemonToTrainer(cb.settings.broadcaster_pokemon, cb.room_slug, 0);
            if (this.trainerManager.PokemonTrainers.has(cb.room_slug)) {
                this.trainerManager.PokemonTrainers.get(cb.room_slug)!.Pokemon.Level = 200;
                this.trainerManager.PokemonTrainers.get(cb.room_slug)!.Pokemon.updateStats();
            }
        }

        if (cb.settings.elite_four_1 !== undefined && cb.settings.elite_four_1.length > 0 && cb.settings.elite_four_1_pokemon !== 0) {
            this.trainerManager.AddPokemonToTrainer(cb.settings.elite_four_1_pokemon, cb.settings.elite_four_1, 0);
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_1)!.Pokemon.Level = 100;
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_1)!.Pokemon.updateStats();
        }
        if (cb.settings.elite_four_2 !== undefined && cb.settings.elite_four_2.length > 0 && cb.settings.elite_four_2_pokemon !== 0) {
            this.trainerManager.AddPokemonToTrainer(cb.settings.elite_four_2_pokemon, cb.settings.elite_four_2, 0);
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_2)!.Pokemon.Level = 100;
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_2)!.Pokemon.updateStats();
        }
        if (cb.settings.elite_four_3 !== undefined && cb.settings.elite_four_3.length > 0 && cb.settings.elite_four_3_pokemon !== 0) {
            this.trainerManager.AddPokemonToTrainer(cb.settings.elite_four_3_pokemon, cb.settings.elite_four_3, 0);
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_3)!.Pokemon.Level = 100;
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_3)!.Pokemon.updateStats();
        }
        if (cb.settings.elite_four_4 !== undefined && cb.settings.elite_four_4.length > 0 && cb.settings.elite_four_4_pokemon !== 0) {
            this.trainerManager.AddPokemonToTrainer(cb.settings.elite_four_4_pokemon, cb.settings.elite_four_4, 0);
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_4)!.Pokemon.Level = 100;
            this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_4)!.Pokemon.updateStats();
        }
    }
    //#endregion

    private eliteFourDefeated(): boolean {
        let defeated = true;

        if (cb.settings.elite_four_1.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_1)) {
            defeated = false;
        }
        if (cb.settings.elite_four_2.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_2)) {
            defeated = false;
        }
        if (cb.settings.elite_four_3.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_3)) {
            defeated = false;
        }
        if (cb.settings.elite_four_4.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_4)) {
            defeated = false;
        }

        return defeated;
    }

    private isEliteFourMember(user: string): boolean {
        if (cb.settings.elite_four_1 !== undefined && cb.settings.elite_four_1.length > 0 && user === cb.settings.elite_four_1) {
            return true;
        } else if (cb.settings.elite_four_2 !== undefined && cb.settings.elite_four_2.length > 0 && user === cb.settings.elite_four_2) {
            return true;
        } else if (cb.settings.elite_four_3 !== undefined && cb.settings.elite_four_3.length > 0 && user === cb.settings.elite_four_3) {
            return true;
        } else if (cb.settings.elite_four_4 !== undefined && cb.settings.elite_four_4.length > 0 && user === cb.settings.elite_four_4) {
            return true;
        } else {
            return false;
        }
    }

    private listEliteFourMembers(user: string) {
        if (cb.settings.elite_four_1 !== undefined && cb.settings.elite_four_1.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_1)) {
            const trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_1)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
        if (cb.settings.elite_four_2 !== undefined && cb.settings.elite_four_2.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_2)) {
            const trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_2)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
        if (cb.settings.elite_four_3 !== undefined && cb.settings.elite_four_3.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_3)) {
            const trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_3)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
        if (cb.settings.elite_four_4 !== undefined && cb.settings.elite_four_4.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_4)) {
            const trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_4)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
    }
}
