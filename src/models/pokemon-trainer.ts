import { Pokemon } from "./pokemon/pokemon";

export default class PokemonTrainer {
    public BuyStoneWarning: boolean = false;
    public BuyStoneConfirmation: boolean = false;
    public TradeRequested: boolean = false;
    public TradeRequestedAt?: string;
    public TradeRequestReceived: boolean = false;
    public TradeRequestReceivedFrom?: string;
    constructor(
        public User: string,
        public Pokemon: Pokemon,
        public Tipped: number = 0
    ){}
}