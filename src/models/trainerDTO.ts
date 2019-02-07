import PokemonDTO from "./pokemon/pokemonDTO";

export default class PokemonTrainerDTO {

    constructor(
        public User: string,
        public Pokemon: PokemonDTO,
        public Tipped = 0,
        public BuyStoneWarning = false,
        public BuyStoneConfirmation = false,
        public TradeRequested = false,
        public TradeRequestedAt?: string,
        public TradeRequestReceived = false,
        public TradeRequestReceivedFrom?: string,
    ) { }
}
