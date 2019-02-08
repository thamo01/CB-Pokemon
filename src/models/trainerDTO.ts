import PokemonDTO from "./pokemon/pokemonDTO";

export default class PokemonTrainerDTO {

    constructor(
        public User: string,
        public Pokemon: PokemonDTO,
        public Tipped = 0,
        public BuyStoneWarning = false,
        public BuyStoneConfirmation = false,
        public TradeRequestedAt?: string,
        public TradeRequestReceivedFrom?: string,
        public TradeRequestAccepted = false,
    ) { }
}
