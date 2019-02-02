import PokemonDTO from "./pokemon/pokemonDTO";

export default class PokemonTrainerDTO {

    constructor(
        public User: string,
        public Pokemon: PokemonDTO,
        public Tipped: number = 0,
        public BuyStoneWarning: boolean = false,
        public BuyStoneConfirmation: boolean = false,
        public TradeRequested: boolean = false,
        public TradeRequestedAt?: string,
        public TradeRequestReceived: boolean = false,
        public TradeRequestReceivedFrom?: string,
    ) { }
}