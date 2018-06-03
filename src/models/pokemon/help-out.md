#Help out extending the list of available Pokemon!

###The Format of the Pokemon inside my code:
new Pokemon(PokeDex#, "Name of the Pokemon", [Types.Type1, Types.Type2], Rarity.RariryOfPokemon, BaseLevel, EvolutionStage, EvolvesAtLevel, "PokeDex Description Text", TrueOrFalse:TradeToEvolve?, TrueOrFalse:EvolutionStoneToEvolve?, BaseAtk, BaseDef, BaseHP, [Moves.AvailableMove1, Moves.AvailableMove2])

###Real Example of Pikachu:
        new Pokemon(25, "Pikachu", [Types.Electric,], Rarity.Common, 1, 1, 0, "When several of these Pokémon gather, their electricity could build and cause lightning storms.", false, true, 55, 40, 35, [ Moves.TailWhip, Moves.ThunderShock, Moves.Growl, Moves.PlayNice, Moves.QuickAttack, Moves.ThunderWave, Moves.ElectroBall, Moves.DoubleTeam, Moves.Nuzzle, Moves.Slam, Moves.Thunderbolt, Moves.Feint, Moves.Agility, Moves.Discharge, Moves.LightScreen, Moves.Thunder, Moves.Bestow, Moves.Bide, Moves.Charge, Moves.DisarmingVoice, Moves.DoubleSlap, Moves.Encore, Moves.Endure, Moves.FakeOut, Moves.Flail, Moves.LuckyChant, Moves.Present, Moves.Reversal, Moves.ThunderPunch, Moves.Tickle, Moves.Wish, Moves.VoltTackle ])



For Devs.. Here the class, including the constructor and the functions called in it:

        export class Pokemon {
            public Petname: string | null = null;
            public Move: Move;
            public Atk: number;
            public Def: number;
            public Life: number;

            public constructor(
                public Id: number,
                public Name: string,
                public Types: Type[],
                public Rariry: Rarity = Rarity.Common,
                public Level: number = 1,
                public Stage: number = 1,
                public Evolves: number = 0,
                public Description: string = "The PokeDex doesn't have Data on this strange unknown Pokemon... Have you maybe found a new type of Pokemon?",
                public TradeEvolve: boolean = false,
                public UsesStone: boolean = false,
                public BaseAtk: number = 40,
                public BaseDef: number = 40,
                public BaseLife: number = 40,
                public availableMoves: Move[] = [Moves.Scratch, Moves.Pound]
            ) {
                this.Move = this.availableMoves[Math.floor(Math.random() * this.availableMoves.length)];
                this.Atk = BaseAtk;
                this.Def = BaseDef;
                this.Life = BaseLife;
                this.updateStats();
            }

            public updateStats() {
                this.Life = Math.round(this.BaseLife * 2 * this.Level / 100 + 10 + this.Level);
                this.Atk = Math.round(this.BaseAtk * 2 * this.Level / 100 + 5);
                this.Def = Math.round(this.BaseDef * 2 * this.Level / 100 + 5);
            }
        }