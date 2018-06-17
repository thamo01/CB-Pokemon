import PokemonTrainer from "../models/pokemon-trainer";
import { Pokemon, Pokemons } from "../models/pokemon/pokemon";
import PokeDex from "./pokedex";
import Messenger from "./messenger";

export default class TrainerManager {
    public PokemonTrainers: Map<string, PokemonTrainer> = new Map<string, PokemonTrainer>();

    public AddPokemonToTrainer(pokeDexID: number, user: string, tipped: number = 0) {
        let origin = Pokemons[pokeDexID];
        if (origin !== undefined) {
            let pokemon = origin.Clone();
            this.PokemonTrainers.set(user, new PokemonTrainer(user, pokemon, tipped));
        }
    }

    public RemovePokemonFromTrainer(user: string) {
        this.PokemonTrainers.delete(user);
    }

    public LevelUpPokemonOfUser(user: string, numberOfLevels: number) {
        if (this.PokemonTrainers.has(user)) {
            const lvlNow = this.PokemonTrainers.get(user)!.Pokemon.LvlUp(numberOfLevels);
            while (this.PokemonTrainers.get(user)!.Pokemon.Evolves != 0 && this.PokemonTrainers.get(user)!.Pokemon.Level >= this.PokemonTrainers.get(user)!.Pokemon.Evolves) {
                this.EvolvePokemonOfUser(user);
            }
        }
    }

    public EvolvePokemonOfUser(user: string) {
        const oldPokemon = this.PokemonTrainers.get(user)!.Pokemon;
        const newPokemon = Pokemons[oldPokemon.Id+1].Clone();
        if (newPokemon.Level < oldPokemon.Level) {
            newPokemon.Level = oldPokemon.Level;
        }
        newPokemon.Petname = oldPokemon.Petname;
        newPokemon.updateStats();

        Messenger.sendInfoMessage(`Your ${PokeDex.GetPokemonIcon(oldPokemon)} ${oldPokemon.Name} has evolved into a ${PokeDex.GetPokemonIcon(newPokemon)} ${newPokemon.Name}!`, user);
        this.PokemonTrainers.get(user)!.Pokemon = newPokemon;
        Messenger.sendInfoMessage(PokeDex.GetEvolutionText(newPokemon), user);
    }

    public TradePokemonWithUser(user1: string, user2: string) {
        throw Error("Not Implemented Yet");
    }

    public ChangePokemonOfUser(user: string) {
        if (this.PokemonTrainers.has(user)) {
            const oldPkmn = this.PokemonTrainers.get(user)!.Pokemon;
            const newId = PokeDex.GetRandomPokemon(this.PokemonTrainers.get(user)!.Tipped);
            const origin = Pokemons[newId];
            if (origin !== undefined) {
                this.PokemonTrainers.get(user)!.Pokemon = origin.Clone();
            }
            Messenger.sendInfoMessage("Your " + oldPkmn.Name + " has been swapped for a " + this.PokemonTrainers.get(user)!.Pokemon.Name + ".", user);
        }
    }
}