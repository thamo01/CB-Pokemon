import { Pokemon } from "./pokemon/pokemon";

export default class PokemonTrainer {
    public BuyStoneWarning = false;
    public BuyStoneConfirmation = false;
    public TradeRequestedAt?: string;
    public TradeRequestReceivedFrom?: string;
    public TradeRequestAccepted = false;
    constructor(
        public User: string,
        // tslint:disable-next-line:no-shadowed-variable
        public Pokemon: Pokemon,
        public Tipped = 0,
    ) {}
}
