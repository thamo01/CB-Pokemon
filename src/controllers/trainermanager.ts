import PokemonTrainer from "../models/pokemon-trainer";
import { Pokemon, Pokemons } from "../models/pokemon/pokemon";
import PokemonDTO from "../models/pokemon/pokemonDTO";
import PokemonTrainerDTO from "../models/trainerDTO";
import Messenger from "./messenger";
import PokeDex from "./pokedex";

export default class TrainerManager {
    public PokemonTrainers: Map<string, PokemonTrainer> = new Map<string, PokemonTrainer>();

    public AddPokemonToTrainer(pokeDexID: number, user: string, tipped = 0) {
        const origin = Pokemons[pokeDexID];
        if (origin !== undefined) {
            const pokemon = origin.Clone();
            this.PokemonTrainers.set(user, new PokemonTrainer(user, pokemon, tipped));
        }
    }

    public RemovePokemonFromTrainer(user: string) {
        this.PokemonTrainers.delete(user);
    }

    public LevelUpPokemonOfUser(user: string, numberOfLevels: number) {
        if (this.PokemonTrainers.has(user)) {
            this.PokemonTrainers.get(user)!.Pokemon.LvlUp(numberOfLevels);
            while (this.PokemonTrainers.get(user)!.Pokemon.Evolves !== 0 && this.PokemonTrainers.get(user)!.Pokemon.Level >= this.PokemonTrainers.get(user)!.Pokemon.Evolves) {
                this.EvolvePokemonOfUser(user);
            }
        }
    }

    public EvolvePokemonOfUser(user: string) {
        if (this.PokemonTrainers.has(user)) {
            const oldPokemon = this.PokemonTrainers.get(user)!.Pokemon;
            const newPokemon = this.EvolvePokemon(oldPokemon);
            this.PokemonTrainers.get(user)!.Pokemon = newPokemon;

            Messenger.sendInfoMessage(`Your ${PokeDex.GetPokemonIcon(oldPokemon)} ${oldPokemon.Name} has evolved into a ${PokeDex.GetPokemonIcon(newPokemon)} ${newPokemon.Name}!`, user);
            Messenger.sendInfoMessage(PokeDex.GetEvolutionText(newPokemon), user);
        }
    }

    public EvolvePokemon(pokemon: Pokemon): Pokemon {
        const newPokemon = Pokemons[pokemon.Id + 1].Clone();
        if (newPokemon.Level < pokemon.Level) {
            newPokemon.Level = pokemon.Level;
        }
        newPokemon.Petname = pokemon.Petname;
        newPokemon.updateStats();
        return newPokemon;
    }

    public TradePokemonWithUser(user1: string, user2: string) {
        if (!this.PokemonTrainers.has(user1) || !this.PokemonTrainers.has(user2)) {
            return;
        }

        const pokemon1 = this.PokemonTrainers.get(user1)!.Pokemon;
        const pokemon2 = this.PokemonTrainers.get(user2)!.Pokemon;

        if (pokemon1.TradeEvolve) {
            const newPokemon = this.EvolvePokemon(pokemon1);
            this.PokemonTrainers.get(user2)!.Pokemon = newPokemon;
            Messenger.sendInfoMessage(`Your ${PokeDex.GetPokemonIcon(pokemon1)} ${pokemon1.Name} has evolved into a ${PokeDex.GetPokemonIcon(newPokemon)} ${newPokemon.Name}!`, user2);
            Messenger.sendInfoMessage(PokeDex.GetEvolutionText(newPokemon), user2);
        } else {
            this.PokemonTrainers.get(user2)!.Pokemon = pokemon1;
        }

        if (pokemon2.TradeEvolve) {
            const newPokemon = this.EvolvePokemon(pokemon2);
            this.PokemonTrainers.get(user1)!.Pokemon = newPokemon;
            Messenger.sendInfoMessage(`Your ${PokeDex.GetPokemonIcon(pokemon2)} ${pokemon2.Name} has evolved into a ${PokeDex.GetPokemonIcon(newPokemon)} ${newPokemon.Name}!`, user1);
            Messenger.sendInfoMessage(PokeDex.GetEvolutionText(newPokemon), user1);
        } else {
            this.PokemonTrainers.get(user1)!.Pokemon = pokemon2;
        }

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

    public ExportToDTO(): PokemonTrainerDTO[] {
        const exportdata: PokemonTrainerDTO[] = [];
        this.PokemonTrainers.forEach((trainer) => {
            const pokemonDTO = new PokemonDTO(trainer.Pokemon.Id, trainer.Pokemon.Move.Name, trainer.Pokemon.Level, trainer.Pokemon.Petname);
            exportdata.push(new PokemonTrainerDTO(trainer.User, pokemonDTO, trainer.Tipped, trainer.BuyStoneWarning, trainer.BuyStoneConfirmation, trainer.TradeRequestedAt, trainer.TradeRequestReceivedFrom, trainer.TradeRequestAccepted));
        });

        return exportdata;
    }

    public ImportFromDTO(importdata: PokemonTrainerDTO[]) {
        importdata.forEach((trainer) => {
            const origin = Pokemons[trainer.Pokemon.Id];
            if (origin !== undefined) {
                const pokemon = origin.Clone();
                const move = pokemon.availableMoves.find((m) => m.Name === trainer.Pokemon.Move);
                if (move !== undefined) {
                    pokemon.Move = move;
                }
                pokemon.Level = trainer.Pokemon.Level;
                pokemon.Petname = trainer.Pokemon.Petname;

                const pokemontrainer = new PokemonTrainer(trainer.User, pokemon, trainer.Tipped);
                pokemontrainer.BuyStoneConfirmation = trainer.BuyStoneConfirmation;
                pokemontrainer.BuyStoneWarning = trainer.BuyStoneWarning;
                pokemontrainer.TradeRequestReceivedFrom = trainer.TradeRequestReceivedFrom;
                pokemontrainer.TradeRequestAccepted = trainer.TradeRequestAccepted;
                pokemontrainer.TradeRequestedAt = trainer.TradeRequestedAt;

                this.PokemonTrainers.set(trainer.User, pokemontrainer);
            }
        });
    }
}
