import { Pokemon, Pokemons } from "../models/pokemon/pokemon";
import PokemonTrainer from "../models/pokemon-trainer";
import { Rarity } from "../models/pokemon/rarity";

export default class PokeDex {
    public static GetPokemonIcon(pokemon: Pokemon): string {
        let s = pokemon.Id + "";
        while (s.length < 3) s = "0" + s;
        return ':pkmn' + s;
    }

    public static IdentifyPokemon(pokemon: Pokemon): string {
        return `PokeDex Entry #${pokemon.Id}: ${this.GetPokemonIcon(pokemon)} ${pokemon.Name} - ${pokemon.Rariry}, ${pokemon.Type.Name} - ${pokemon.Description}`;
    }

    public static GetEvolutionText(pokemon: Pokemon): string {
        if (!pokemon.TradeEvolve && !pokemon.UsesStone && pokemon.Evolves === 0) {
            return `Your ${this.GetPokemonIcon(pokemon)} ${pokemon.Name} doesn't evolve anymore...`;
        }

        if (pokemon.TradeEvolve) {
            return `Your ${this.GetPokemonIcon(pokemon)} ${pokemon.Name} evolves by trading with another user. To trade with someone, use the command /trade {username}`;
        }

        if (pokemon.UsesStone) {
            return `Your ${this.GetPokemonIcon(pokemon)} ${pokemon.Name} evolves by using a ${pokemon.Type.Stone}. To buy a stone, use the command '/buystone' to purchase one!`;
        }

        if (pokemon.Evolves > 0 && pokemon.Evolves > pokemon.Level) {
            return `Your ${this.GetPokemonIcon(pokemon)} ${pokemon.Name} evolves by leveling up. Tip for level ups until your pokemon reaches level ${pokemon.Evolves}.`; 
        }

        return "Evolution is a weird thing, isn't it...";
    }

    public static GetRandomPokemon(tipAmount: number = 0): number {
        let random = 0;
        let rarity = Rarity.Common;

        if (tipAmount >= cb.settings.rare_tip) {
            rarity = Rarity.Rare;
        } else if (tipAmount >= cb.settings.uncommon_tip) {
            rarity = Rarity.Uncommon;
        }

        while (random === 0 || Pokemons[random].Rariry !== rarity) {
            random = Math.floor(Math.random() * Pokemons.length);
        }

        return random;
    }

    public static GetRandomPokemonOfRarity(rarity: Rarity): number {
        throw Error("Not Implemented Yet");
    }
}