import { Pokemon } from "./pokemon/pokemon";

export default class PokemonTrainer {
    public BuyStoneWarning = false;
    public BuyStoneConfirmation = false;
    public TradeRequested = false;
    public TradeRequestedAt?: string;
    public TradeRequestReceived = false;
    public TradeRequestReceivedFrom?: string;
    constructor(
        public User: string,
        // tslint:disable-next-line:no-shadowed-variable
        public Pokemon: Pokemon,
        public Tipped = 0,
    ) {}
}
