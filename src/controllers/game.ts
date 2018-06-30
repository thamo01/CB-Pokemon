import { parseBoolean, customStringify, isSuperuser } from "../misc/helpers";
import TrainerManager from "./trainermanager";
import Banner from "./banner";
import Messenger from "./messenger";
import { Pokemons } from "../models/pokemon/pokemon";
import PokeDex from "./pokedex";

export default class Game {
    public trainerManager: TrainerManager = new TrainerManager();
    public banner: Banner = new Banner();

    public constructor(public config: any) {
        if (config !== undefined) {
            this.initCBSettings();
    
            Messenger.sendSuccessMessage("Pokemon - Gotta Catch 'Em All v" + this.config.Version + " started.");
            Messenger.sendBroadcasterNotice("This Pokemon Bot is in beta. It can not become better if I do not know what is wrong. Please comment on the bot's page any errors or questions. Make sure to check out the original Version (PokeDex) of asudem! Thank you.");
    
            this.initBroadcaster();
        }
    }

    private initCBSettings() {
        cb.settings_choices = [
            { name: 'mod_allow_broadcaster_cmd', label: 'Allow mods and the developer to use commands? (Useful if you need a little extra help)', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes' },
            { name: 'banner_rotate', label: 'How often, in seconds, should the Pokedex price banner rotate', type: 'int', minValue: 20, maxValue: 1800, required: true, defaultValue: 120 },
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
            { name: 'elite_four_1', label: 'Choose your first member of your personal elite four! Insert the username of the one you choose as elite four member. (your mods for example, or the developer of this bot)', type: 'str', required: false, defaultValue: ""},
            { name: 'elite_four_1_pokemon', label: 'Choose your first elite four members pokemon. Choose wisely. (Maybe one of the legendary birds, 144, 145, 146?)', type: 'int', minValue: 0, maxValue: 151, required: true, defaultValue: 144 },
            { name: 'elite_four_2', label: 'Choose your second member of your personal elite four!', type: 'str', required: false, defaultValue: "" },
            { name: 'elite_four_2_pokemon', label: 'Choose your second elite four members pokemon.', type: 'int', minValue: 0, maxValue: 151, required: true, defaultValue: 145 },
            { name: 'elite_four_3', label: 'Choose your third member of your personal elite four!', type: 'str', required: false, defaultValue: "" },
            { name: 'elite_four_3_pokemon', label: 'Choose your third elite four members pokemon.', type: 'int', minValue: 0, maxValue: 151, required: true, defaultValue: 146 },
            { name: 'elite_four_4', label: 'Choose your fourth member of your personal elite four and complete the list!', type: 'str', required: false, defaultValue: "" },
            { name: 'elite_four_4_pokemon', label: 'Choose your fourth elite four members pokemon.', type: 'int', minValue: 0, maxValue: 151, required: true, defaultValue: 150 },
        ];
        cb.settings.allow_mod_superuser_cmd = parseBoolean(cb.settings.mod_allow_broadcaster_cmd);
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

    //#region OnEnter Functions
    public sendDevInfo(user: user) {
        if (user.user === this.config.Dev) {
            if (cb.settings.allow_mod_superuser_cmd) {
                Messenger.sendSuccessMessage("Pokedex v" + this.config.Version + " Support Mode: ON!", this.config.Dev);
            } else {
                Messenger.sendErrorMessage("Pokedex v" + this.config.Version + " Support Mode: OFF!", this.config.Dev);
            }
        }
    }

    public sendWelcomeMessage(user: user) {
        if (!this.trainerManager.PokemonTrainers.has(user.user)) {
            Messenger.sendWelcomeMessage(user.user);
            this.banner.sendBanner(user.user);
        }
    }
    //#endregion

    //#region OnMessage Functions
    public stripEmoticon(message: message): message {
        if (message.m.trim().startsWith(':') && message.m.indexOf('/') > -1) {
            var splitMsg = message.m.split(" ");
            if (splitMsg[1].indexOf('/') === 0) {
                message.m = message.m.trim().substring(message.m.indexOf('/'), message.m.length).trim();
            }
        }

        return message;
    }

    public handleCommands(message: message): message {
        if (message.m.substring(0, 1) === "/") {
            /* If it starts with a /, suppress that shit and assume it's a command */
            message["X-Spam"] = true;
            message.c = '#FFFFFF';
            message.background = '#E7E7E7';
            var splitMsg = message.m.split(" ");
            if (isSuperuser(message.user, message.is_mod) || (message.user === this.config.Dev && cb.settings.allow_mod_superuser_cmd == true)) {
                if (message.m.substring(1, 8) === this.config.CMDS.ADDUSER) {
                    if (parseInt(splitMsg[2]) <= Pokemons.length || parseInt(splitMsg[2]) >= 0) {
                        this.trainerManager.AddPokemonToTrainer(parseInt(splitMsg[2]), splitMsg[1], 0);
                        const pkmn = this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon
                        Messenger.sendInfoMessage(`${PokeDex.GetPokemonIcon(pkmn)} ${pkmn.Name} was given to ${splitMsg[1]}`);
                    }
                } else if (message.m.substring(1, 7) === this.config.CMDS.EVOLVE) {
                    this.trainerManager.EvolvePokemonOfUser(splitMsg[1]);
                } else if (message.m.substring(1, 7) === this.config.CMDS.CHANGE) {
                    this.trainerManager.ChangePokemonOfUser(splitMsg[1]);
                } else if (message.m.substring(1, 7) === this.config.CMDS.REMOVE) {
                    this.trainerManager.RemovePokemonFromTrainer(splitMsg[1]);
                } else if (message.m.substring(1, 8) === this.config.CMDS.LEVELUP) {
                    if (this.trainerManager.PokemonTrainers.has(splitMsg[1]) && parseInt(splitMsg[2]) > 0) {
                        this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level += parseInt(splitMsg[2]);
                        if(this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level < 100) {
                            this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level = 100;
                        }
                        this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.updateStats();
                    }
                } else {
                    //handle nonsense commands
                }
            }
    
            if (message.user === cb.room_slug || (message.user === this.config.Dev && cb.settings.allow_mod_superuser_cmd == true)) {
                /* Broadcaster only commands at all times */
                if (message.m.substring(1) === this.config.CMDS.SUPPORT) {
                    cb.settings.allow_mod_superuser_cmd = !cb.settings.allow_mod_superuser_cmd;
                    Messenger.sendSuccessMessage("Support mode for Pokedex bot Ver." + this.config.Version + " is now " + (cb.settings.allow_mod_superuser_cmd ? "ACTIVATED" : "DEACTIVATED") + "!", cb.room_slug);
                } else {
                    //handle nonsense commands
                }
            }
    
            if (message.m.substring(1, 8) === this.config.CMDS.RELEASE) {
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
            }else if (message.m.substring(1, 9) === this.config.CMDS.IDENTIFY) {
                try {
                    splitMsg = message.m.split(" ");
                    if (this.trainerManager.PokemonTrainers.has(splitMsg[1])) {
                        Messenger.sendMessageToUser(PokeDex.IdentifyPokemon(this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon), message.user);
                    } else if (splitMsg[1] === "" || splitMsg[1] === undefined) {
                        Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify.", message.user);
                    } else {
                        Messenger.sendErrorMessage('Huh? It looks like [' + splitMsg[1] + "] doesn't have a Pokemon. Check the user's spelling?", message.user);
                    }
                } catch (err) {
                    Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify. " + err, message.user);
                }
            } else if (message.m.substring(1, 9) === this.config.CMDS.BUYSTONE) {
                if (this.trainerManager.PokemonTrainers.has(message.user) && this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.UsesStone) {
                    if (this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneWarning === true) {
                        Messenger.sendInfoMessage("Okay, your next tip of " + cb.settings.stone_price + " tokens will buy you a " + this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone, message.user);
                        this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneConfirmation = true;
                    } else {
                        Messenger.sendInfoMessage("Are you sure you want to purchase a " + this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone + "? It costs " + cb.settings.stone_price + " tokens to purchase a stone. Type '/buystone' again to allow your next tip of " + cb.settings.stone_price + " tokens to buy a " + this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Types[0].Stone, message.user);
                        this.trainerManager.PokemonTrainers.get(message.user)!.BuyStoneWarning = true;
                    }
                } else {
                    Messenger.sendInfoMessage("Your Pokemon does not evolve using a stone!", message.user);
                }
            } else if (message.m.substring(1, 6) === this.config.CMDS.TRADE) {
                this.trainerManager.TradePokemonWithUser(message.user, splitMsg[1]);
            } else if (message.m.substring(1, 6) === this.config.CMDS.LEVEL) {
                try {
                    if (!this.trainerManager.PokemonTrainers.has(splitMsg[1])) {
                        Messenger.sendErrorMessage("USAGE: '/level <user>' where <user> should be the name of the user who's Pokemon you level want to see.", message.user);
                    } else if (this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves !== 0) {
                        Messenger.sendInfoMessage(`${splitMsg[1]}'s ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} and needs ${(this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves - this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level)} levels (or ${(this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves - this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level) * cb.settings.level_pokemon} tokens) to evolve.`, message.user);
                    } else if (this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Evolves === 0 && !this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.UsesStone) {
                        Messenger.sendInfoMessage(`${splitMsg[1]}'s ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} This Pokemon does not evolve.`, message.user);
                    } else if (this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.UsesStone) {
                        Messenger.sendInfoMessage(`${splitMsg[1]}'s ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} and needs a ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Types[0].Stone} to evolve. ${splitMsg[1]} may type '/buystone' to purchase one!`, message.user);
                    } else if (this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.TradeEvolve) {
                        Messenger.sendInfoMessage(`${splitMsg[1]}'s ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} is currently level ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} and needs to be traded to evolve. Type '/trade' followed by a username to evolve them!`, message.user);
                    }
                } catch (err) {
                    Messenger.sendErrorMessage("Could not get the level of " + splitMsg[1] + "'s Pokemon. Please check the spelling or verify they have caught a Pokemon. " + err);
                }
            } else if(message.m.substring(1, 7) === this.config.CMDS.ATTACK) {
                if(this.trainerManager.PokemonTrainers.has(splitMsg[1])) {
                    if (this.trainerManager.PokemonTrainers.has(message.user)) {
                        if (message.user === splitMsg[1]) {
                            Messenger.sendErrorMessage("Your Pokemon can't attack itself now, can it? Do you have weird fetishes...?", message.user);
                        } else if(splitMsg[1] === cb.room_slug && this.isEliteFourMember(message.user)) {
                            Messenger.sendErrorMessage("Hey now.. you are a member of the Elite Four, you shouldn't fight against " + cb.room_slug, message.user);
                        } else if(splitMsg[1] === cb.room_slug && !this.eliteFourDefeated()) {
                            Messenger.sendErrorMessage("Wow, woah.. Calm down little fellow trainer. You can't just head to the final boss before beating the Elite Four!", message.user);
                        } else {
                            Messenger.sendSuccessMessage("Your Pokemon now fights with your foe's Pokemon! Wish em luck!", message.user);
                            Messenger.sendErrorMessage("Your Pokemon is being attacked by another Pokemon! Wish em luck!", splitMsg[1]);
                            
                            const move = this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Move;
                            const currentHP = this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Life;
                            const leftHP = this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon.Attack(this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon);
    
                            Messenger.sendInfoMessage(`Dealt ${currentHP-leftHP} Points of Damage. Using ${move.Name}`, message.user);
                            Messenger.sendInfoMessage(`Received ${currentHP-leftHP} Points of Damage. Using ${move.Name}`, splitMsg[1]);
    
                            if (leftHP <= 0) {
                                Messenger.sendSuccessMessage("Your Pokemon defeated your foe's Pokemon, congrats! Your pokemon levels up!", message.user);
                                Messenger.sendErrorMessage("Your Pokemon sadly lost all it's life points in the battle. You have to release it :(", splitMsg[1]);
                                Messenger.sendInfoMessage(`You wave goodbye to your level ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Level} ${this.trainerManager.PokemonTrainers.get(splitMsg[1])!.Pokemon.Name} as it scurries freely into the wild!`, splitMsg[1]);
                                this.trainerManager.RemovePokemonFromTrainer(splitMsg[1]);
                                this.trainerManager.LevelUpPokemonOfUser(message.user, 2);
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
    
            } else if(message.m.substring(1, 13) === this.config.CMDS.LISTTRAINERS) {
                this.trainerManager.PokemonTrainers.forEach((trainer) => {
                    Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", message.user);
                });
            } else if(message.m.substring(1, 14) === this.config.CMDS.LISTELITEFOUR) {
                this.listEliteFourMembers(message.user);
            } else if (message.m.substring(1, 9) === "debugpkm") {
                cb.log(customStringify(this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon));
            } else {
                //handle nonsense commands
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
        if (this.trainerManager.PokemonTrainers.has(message.user) && !message["X-Spam"]){
            let pokemon = this.trainerManager.PokemonTrainers.get(message.user)!.Pokemon;
            message.m = PokeDex.GetPokemonIcon(pokemon) + " " + message.m;
            message.background = pokemon.Types[0].Color;
            message.c = pokemon.Types[0].FontColor;
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
    //#endregion

    private eliteFourDefeated(): boolean {
        var defeated = true;
        
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
        }else if (cb.settings.elite_four_2 !== undefined && cb.settings.elite_four_2.length > 0 && user === cb.settings.elite_four_2) {
            return true;
        } else if (cb.settings.elite_four_3 !== undefined && cb.settings.elite_four_3.length > 0 && user === cb.settings.elite_four_3) {
            return true;
        } else if (cb.settings.elite_four_4 !== undefined && cb.settings.elite_four_4.length > 0 && user === cb.settings.elite_four_4) {
            return true;
        } else {
            return false;
        }
    }

    private listEliteFourMembers(user: string){
        if (cb.settings.elite_four_1 !== undefined && cb.settings.elite_four_1.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_1)) {
            var trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_1)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
        if (cb.settings.elite_four_2 !== undefined && cb.settings.elite_four_2.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_2)) {
            var trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_2)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
        if (cb.settings.elite_four_3 !== undefined && cb.settings.elite_four_3.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_3)) {
            var trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_3)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
        if (cb.settings.elite_four_4 !== undefined && cb.settings.elite_four_4.length > 0 && this.trainerManager.PokemonTrainers.has(cb.settings.elite_four_4)) {
            var trainer = this.trainerManager.PokemonTrainers.get(cb.settings.elite_four_4)!;
            Messenger.sendInfoMessage(trainer.User + " has " + trainer.Pokemon.Name + " on Level " + trainer.Pokemon.Level + " and it as " + trainer.Pokemon.Life + " HP left.", user);
        }
    }
}