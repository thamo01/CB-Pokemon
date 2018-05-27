import { Colors } from "../../misc/colors";
import { EvoStones } from "./evostones";

export class Type {
    public Weakness: Type[];
    public Strength: Type[];
    public Nullifies: Type[];

    public constructor(
        public Id: number,
        public Name: string,
        public Color: Colors,
        public Stone: EvoStones | null = null
    ) {
        this.Weakness = [];
        this.Strength = [];
        this.Nullifies = [];
     }
}

const InternTypes = {
    Normal: new Type(1, "Normal", Colors.LightGrey, EvoStones.Moon),
    Fire: new Type(2, "Fire", Colors.LightGrey, EvoStones.Fire),
    Water: new Type(3, "Water", Colors.LightGrey, EvoStones.Water),
    Electric: new Type(4, "Electric", Colors.LightGrey, EvoStones.Thunder),
    Grass: new Type(5, "Grass", Colors.LightGrey, EvoStones.Leaf),
    Ice: new Type(6, "Ice", Colors.LightGrey),
    Fighting: new Type(7, "Fighting", Colors.LightGrey),
    Poison: new Type(8, "Poison", Colors.LightGrey),
    Ground: new Type(9, "Ground", Colors.LightGrey),
    Flying: new Type(10, "Flying", Colors.LightGrey),
    Psychic: new Type(11, "Psychic", Colors.LightGrey),
    Bug: new Type(12, "Bug", Colors.LightGrey),
    Rock: new Type(13, "Rock", Colors.LightGrey),
    Ghost: new Type(14, "Ghost", Colors.LightGrey),
    Dragon: new Type(15, "Dragon", Colors.LightGrey)
}

InternTypes.Normal.Weakness.push(InternTypes.Fighting);
InternTypes.Normal.Nullifies.push(InternTypes.Ghost);

InternTypes.Fire.Weakness.push(InternTypes.Ground, InternTypes.Rock, InternTypes.Water);
InternTypes.Fire.Strength.push(InternTypes.Bug, InternTypes.Fire, InternTypes.Grass, InternTypes.Ice);

InternTypes.Water.Weakness.push(InternTypes.Grass, InternTypes.Electric);
InternTypes.Water.Strength.push(InternTypes.Fire, InternTypes.Water, InternTypes.Ice);

InternTypes.Electric.Weakness.push(InternTypes.Ground);
InternTypes.Electric.Strength.push(InternTypes.Flying, InternTypes.Electric);

InternTypes.Grass.Weakness.push(InternTypes.Flying, InternTypes.Poison, InternTypes.Bug, InternTypes.Fire, InternTypes.Ice);
InternTypes.Grass.Strength.push(InternTypes.Ground, InternTypes.Water, InternTypes.Grass, InternTypes.Electric);


// TODO finish the rest here....
InternTypes.Ice.Weakness.push();
InternTypes.Ice.Strength.push();
InternTypes.Ice.Nullifies.push();

InternTypes.Fighting.Weakness.push();
InternTypes.Fighting.Strength.push();
InternTypes.Fighting.Nullifies.push();

InternTypes.Poison.Weakness.push();
InternTypes.Poison.Strength.push();
InternTypes.Poison.Nullifies.push();

InternTypes.Ground.Weakness.push();
InternTypes.Ground.Strength.push();
InternTypes.Ground.Nullifies.push();

InternTypes.Flying.Weakness.push();
InternTypes.Flying.Strength.push();
InternTypes.Flying.Nullifies.push();

InternTypes.Psychic.Weakness.push();
InternTypes.Psychic.Strength.push();
InternTypes.Psychic.Nullifies.push();

InternTypes.Bug.Weakness.push();
InternTypes.Bug.Strength.push();
InternTypes.Bug.Nullifies.push();

InternTypes.Rock.Weakness.push();
InternTypes.Rock.Strength.push();
InternTypes.Rock.Nullifies.push();

InternTypes.Ghost.Weakness.push();
InternTypes.Ghost.Strength.push();
InternTypes.Ghost.Nullifies.push();

InternTypes.Dragon.Weakness.push();
InternTypes.Dragon.Strength.push();
InternTypes.Dragon.Nullifies.push();


export { InternTypes as Types };