import { Pokemons } from "../models/pokemon/pokemon";
import Messenger from "./messenger";
import PokeDex from "./pokedex";

export default class Banner {

    private startMessage =  `Pokemon - Gotta Catch 'Em All (with Tokens :P)!
                            '/level <username>' to see a Pokemon's level.
                            '/identify <username>' uses the Pokedex.
                            '/attack <username>' to attack your foe!
                            '/release' to remove your Pokemon :(...
                            Prices:\n`;

    constructor() {
        cb.setTimeout(() => this.sendBanner(undefined, true), cb.settings.banner_rotate * 1000);
    }

    public sendBanner(user?: string, rotate?: boolean): void {
        const tempPrices = [cb.settings.catch_pokemon, cb.settings.uncommon_tip, cb.settings.rare_tip, cb.settings.legendary_tip, cb.settings.mystic_tip];
        let pricesMessage = "";

        for (const price of tempPrices) {
            const pkmn = Pokemons[PokeDex.GetRandomPokemon(parseInt(price, 10))];
            pricesMessage += `:pkmnball Catch ${pkmn.Rariry.toString()} for ${price} Tokens! ${PokeDex.GetPokemonIcon(pkmn)}\n`;
        }

        Messenger.sendInfoMessage(this.startMessage + pricesMessage + "Let the Battles Begin!", user);

        if (rotate !== undefined && rotate) {
            cb.setTimeout(() => this.sendBanner(user, rotate), cb.settings.banner_rotate * 1000);
        }
    }

    public sendWelcomeAndBannerMessage(user?: string) {
        Messenger.sendWelcomeMessage(user);
        this.sendBanner(user);
    }
}
