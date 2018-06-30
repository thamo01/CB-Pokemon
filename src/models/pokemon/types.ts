import { Colors, MsgColors } from "../../misc/colors";
import { EvoStones } from "./evostones";

export class Type {
    public Weakness: Type[];
    public Strength: Type[];
    public Nullifies: Type[];

    public constructor(
        public Id: number,
        public Name: string,
        public Color: Colors,
        public FontColor: MsgColors =  MsgColors.Black,
        public Stone: EvoStones | null = null
    ) {
        this.Weakness = [];
        this.Strength = [];
        this.Nullifies = [];
     }
}

const InternTypes = {
    Normal: new Type(1, "Normal", Colors.LightGrey, MsgColors.Black, EvoStones.Moon),
    Fire: new Type(2, "Fire", Colors.Orange, MsgColors.Black, EvoStones.Fire),
    Water: new Type(3, "Water", Colors.Blue, MsgColors.Black, EvoStones.Water),
    Electric: new Type(4, "Electric", Colors.Yellow, MsgColors.Black, EvoStones.Thunder),
    Grass: new Type(5, "Grass", Colors.Green, MsgColors.Black, EvoStones.Leaf),
    Ice: new Type(6, "Ice", Colors.IcyBlue),
    Fighting: new Type(7, "Fighting", Colors.LightRed),
    Poison: new Type(8, "Poison", Colors.LightPurple),
    Ground: new Type(9, "Ground", Colors.MudOrange),
    Flying: new Type(10, "Flying", Colors.BluishPurple),
    Psychic: new Type(11, "Psychic", Colors.Pink),
    Bug: new Type(12, "Bug", Colors.GrassGreen),
    Rock: new Type(13, "Rock", Colors.RockYellow),
    Ghost: new Type(14, "Ghost", Colors.GhostyPurple),
    Dragon: new Type(15, "Dragon", Colors.Purple),
    Steel: new Type(16, "Steel", Colors.SteelGrey),
    Dark: new Type(17, "Dark", Colors.Darkness,  MsgColors.GhostWhite),
    Fairy: new Type(18, "Fairy", Colors.FairyPink)
}

InternTypes.Normal.Weakness.push(InternTypes.Fighting);
InternTypes.Normal.Nullifies.push(InternTypes.Ghost);

InternTypes.Fire.Weakness.push(InternTypes.Ground, InternTypes.Rock, InternTypes.Water);
InternTypes.Fire.Strength.push(InternTypes.Bug, InternTypes.Fire, InternTypes.Grass, InternTypes.Ice, InternTypes.Steel, InternTypes.Fairy);

InternTypes.Water.Weakness.push(InternTypes.Grass, InternTypes.Electric);
InternTypes.Water.Strength.push(InternTypes.Fire, InternTypes.Water, InternTypes.Ice, InternTypes.Steel);

InternTypes.Electric.Weakness.push(InternTypes.Ground);
InternTypes.Electric.Strength.push(InternTypes.Flying, InternTypes.Electric, InternTypes.Steel);

InternTypes.Grass.Weakness.push(InternTypes.Flying, InternTypes.Poison, InternTypes.Bug, InternTypes.Fire, InternTypes.Ice);
InternTypes.Grass.Strength.push(InternTypes.Ground, InternTypes.Water, InternTypes.Grass, InternTypes.Electric);

InternTypes.Ice.Weakness.push(InternTypes.Fighting, InternTypes.Rock, InternTypes.Fire, InternTypes.Steel);
InternTypes.Ice.Strength.push(InternTypes.Ice);

InternTypes.Fighting.Weakness.push(InternTypes.Flying, InternTypes.Psychic, InternTypes.Fairy);
InternTypes.Fighting.Strength.push(InternTypes.Rock, InternTypes.Bug, InternTypes.Dark);

InternTypes.Poison.Weakness.push(InternTypes.Ground, InternTypes.Psychic);
InternTypes.Poison.Strength.push(InternTypes.Fighting, InternTypes.Poison, InternTypes.Bug, InternTypes.Grass, InternTypes.Fairy);

InternTypes.Ground.Weakness.push(InternTypes.Water, InternTypes.Grass, InternTypes.Ice);
InternTypes.Ground.Strength.push(InternTypes.Poison, InternTypes.Rock);
InternTypes.Ground.Nullifies.push(InternTypes.Electric);

InternTypes.Flying.Weakness.push(InternTypes.Rock, InternTypes.Electric, InternTypes.Ice);
InternTypes.Flying.Strength.push(InternTypes.Fighting, InternTypes.Bug, InternTypes.Grass);
InternTypes.Flying.Nullifies.push(InternTypes.Ground);

InternTypes.Psychic.Weakness.push(InternTypes.Bug, InternTypes.Ghost, InternTypes.Dark);
InternTypes.Psychic.Strength.push(InternTypes.Fighting, InternTypes.Psychic);

InternTypes.Bug.Weakness.push(InternTypes.Flying, InternTypes.Rock, InternTypes.Fire);
InternTypes.Bug.Strength.push(InternTypes.Fighting, InternTypes.Ground, InternTypes.Grass);

InternTypes.Rock.Weakness.push(InternTypes.Fighting, InternTypes.Ground, InternTypes.Water, InternTypes.Grass, InternTypes.Steel);
InternTypes.Rock.Strength.push(InternTypes.Normal, InternTypes.Flying, InternTypes.Poison, InternTypes.Fire);

InternTypes.Ghost.Weakness.push(InternTypes.Ghost, InternTypes.Dark);
InternTypes.Ghost.Strength.push(InternTypes.Poison, InternTypes.Bug);
InternTypes.Ghost.Nullifies.push(InternTypes.Normal, InternTypes.Fighting);

InternTypes.Dragon.Weakness.push(InternTypes.Ice, InternTypes.Dragon, InternTypes.Fairy);
InternTypes.Dragon.Strength.push(InternTypes.Fire, InternTypes.Water, InternTypes.Grass, InternTypes.Electric);

InternTypes.Steel.Weakness.push(InternTypes.Fighting, InternTypes.Ground, InternTypes.Fire);
InternTypes.Steel.Strength.push(InternTypes.Normal, InternTypes.Flying, InternTypes.Rock, InternTypes.Bug, InternTypes.Steel, InternTypes.Grass, InternTypes.Psychic, InternTypes.Ice, InternTypes.Dragon, InternTypes.Fairy);
InternTypes.Steel.Nullifies.push(InternTypes.Poison);

InternTypes.Dark.Weakness.push(InternTypes.Fighting, InternTypes.Bug, InternTypes.Fairy);
InternTypes.Dark.Strength.push(InternTypes.Ghost, InternTypes.Dark);
InternTypes.Dark.Nullifies.push(InternTypes.Psychic);

InternTypes.Fairy.Weakness.push(InternTypes.Poison, InternTypes.Steel);
InternTypes.Fairy.Strength.push(InternTypes.Fighting, InternTypes.Bug, InternTypes.Dark);
InternTypes.Fairy.Nullifies.push(InternTypes.Dragon);


export { InternTypes as Types };