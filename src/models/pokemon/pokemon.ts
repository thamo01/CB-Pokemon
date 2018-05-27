import { Type, Types } from "./types";
import { Rarity } from "./rarity";

export class Pokemon {
    public Petname: string | null = null;
    public Atk: number = 25;
    public Life: number = 100;

    public constructor(
        public Id: number,
        public Name: string,
        public Type: Type,
        public Rariry: Rarity = Rarity.Common,
        public Level: number = 1,
        public Stage: number = 1,
        public Evolves: number = 0,
        public Description: string | null = null,
        public TradeEvolve: boolean = false,
        public UsesStone: boolean = false
    ) {}

    public Attack(foe: Pokemon): number {
        foe.Life -= this.Atk;
        return foe.Life;
    }

    public LvlUp(numberOfLevels: number): number {
        this.Level += numberOfLevels;
        return this.Level;
    }

    public Clone(): Pokemon {
        return new Pokemon(this.Id, this.Name, this.Type, this.Rariry, this.Level, this.Stage, this.Evolves, this.Description, this.TradeEvolve, this.UsesStone);
    }
}

const InternPokemon = [
    new Pokemon(0, "MissingNo.", Types.Normal, Rarity.Unobtainable, 1, 1, 0, "コメント さくせいちゅう", false, false),
    new Pokemon(1, "Bulbasaur", Types.Grass, Rarity.Common, 1, 1, 16, "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.", false, false),
    new Pokemon(2, "Ivysaur", Types.Grass, Rarity.Uncommon, 1, 2, 32, "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.", false, false),
    new Pokemon(3, "Venusaur", Types.Grass, Rarity.Rare, 1, 3, 0, "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.", false, false),
    new Pokemon(4, "Charmander", Types.Fire, Rarity.Common, 1, 1, 16, "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.", false, false),
    new Pokemon(5, "Charmeleon", Types.Fire, Rarity.Uncommon, 1, 2, 36, "When it swings its burning tail, it elevates the temperature to unbearably high levels.", false, false),
    new Pokemon(6, "Charizard", Types.Fire, Rarity.Rare, 1, 3, 0, "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.", false, false),
    new Pokemon(7, "Squitrle", Types.Water, Rarity.Common, 1, 1, 16, "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.", false, false),
    new Pokemon(8, "Wartortle", Types.Water, Rarity.Uncommon, 1, 2, 36, "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.", false, false),
    new Pokemon(9, "Blastoise", Types.Water, Rarity.Rare, 1, 3, 0, "A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles.", false, false),
    new Pokemon(10, "Caterpie", Types.Bug, Rarity.Common, 1, 1, 7, "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.", false, false),
    new Pokemon(11, "Metapod", Types.Bug, Rarity.Uncommon, 1, 2, 10, "This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body.", false, false),
    new Pokemon(12, "Butterfree", Types.Bug, Rarity.Rare, 1, 3, 0, "In battle, it flaps its wings at high speed to release highly toxic dust into the air.", false, false),
    new Pokemon(13, "Weedle", Types.Bug, Rarity.Common, 1, 1, 7, "Often found in forests, eating leaves. It has a sharp venomous stinger on its head.", false, false),
    new Pokemon(14, "Kakuna", Types.Bug, Rarity.Uncommon, 1, 2, 10, "Almost incapable of moving, this Pokémon can only harden its shell to protect itself from predators.", false, false),
    new Pokemon(15, "Beedrill", Types.Bug, Rarity.Rare, 1, 3, 0, "Flies at high speed and attacks using its large venomous stingers on its forelegs and tail.", false, false),
    new Pokemon(16, "Pidgey", Types.Flying, Rarity.Common, 1, 1, 18, "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.", false, false),
    new Pokemon(17, "Pidgeotto", Types.Flying, Rarity.Uncommon, 1, 2, 36, "Very protective of its sprawling territorial area, this Pokémon will fiercely peck at any intruder.", false, false),
    new Pokemon(18, "Pidgeot", Types.Flying, Rarity.Rare, 1, 3, 0, "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.", false, false),
    new Pokemon(19, "Rattata", Types.Normal, Rarity.Common, 1, 1, 20, "Bites anything when it attacks. Small and very quick, it is a common sight in many places.", false, false),
    new Pokemon(20, "Raticate", Types.Normal, Rarity.Uncommon, 1, 2, 0, "It uses its whiskers to maintain its balance. It apparently slows down if they are cut off.", false, false),
    new Pokemon(21, "Spearow", Types.Flying, Rarity.Common, 1, 1, 20, "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.", false, false),
    new Pokemon(22, "Fearow", Types.Flying, Rarity.Uncommon, 1, 2, 0, "With its huge and magnificent wings, it can keep aloft without ever having to land for rest.", false, false),
    new Pokemon(23, "Ekans", Types.Poison, Rarity.Common, 1, 1, 22, "Moves silently and stealthily. Eats the eggs of birds, such as Pidgey and Spearow, whole.", false, false),
    new Pokemon(24, "Arbok", Types.Poison, Rarity.Uncommon, 1, 2, 0, "It is rumored that the ferocious warning markings on its belly differ from area to area.", false, false),
    new Pokemon(25, "Pikachu", Types.Electric, Rarity.Common, 1, 1, 0, "When several of these Pokémon gather, their electricity could build and cause lightning storms.", false, true),
    new Pokemon(26, "Raichu", Types.Electric, Rarity.Rare, 1, 2, 0, "Its long tail serves as a ground to protect itself from its own high voltage power.", false, false),
    new Pokemon(27, "Sandshrew", Types.Ground, Rarity.Common, 1, 1, 22, "Burrows deep underground in arid locations far from water. It only emerges to hunt for food.", false, false),
    new Pokemon(28, "Sandslash", Types.Ground, Rarity.Uncommon, 1, 2, 0, "Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape.", false, false),
    new Pokemon(29, "Nidoran♀", Types.Poison, Rarity.Common, 1, 1, 16, "Although small, its venomous barbs render this POKéMON dangerous. The female has smaller horns.", false, false),
    new Pokemon(30, "Nidorina", Types.Poison, Rarity.Uncommon, 1, 2, 0, "The female's horn develops slowly. Prefers physical attacks such as clawing and biting.", false, true),
    new Pokemon(31, "Nidoqueen", Types.Poison, Rarity.Rare, 1, 3, 0, "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.", false, false),
    new Pokemon(32, "Nidoran♂", Types.Poison, Rarity.Common, 1, 1, 16, "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom.", false, false),
    new Pokemon(33, "Nidorino", Types.Poison, Rarity.Uncommon, 1, 2, 0, "An aggressive POKéMON that is quick to attack. The horn on its head secretes a powerful venom.", false, false),
    new Pokemon(34, "Nidoking", Types.Poison, Rarity.Rare, 1, 3, 0, "It uses its powerful tail in battle to smash, constrict, then break the prey's bones.", false, false),
    new Pokemon(35, "Clefairy", Types.Normal, Rarity.Uncommon, 1, 1, 0, "Its magical and cute appeal has many admirers. It is rare and found only in certain areas.", false, true),
    new Pokemon(36, "Clefable", Types.Normal, Rarity.Rare, 1, 2, 0, "A timid fairy POKéMON that is rarely seen. It will run and hide the moment it senses people.", false, false),
    new Pokemon(37, "Vulpix", Types.Fire, Rarity.Uncommon, 1, 1, 0, "At the time of birth, it has just one tail. The tail splits from its tip as it grows older.", false, true),
    new Pokemon(38, "Ninetales", Types.Fire, Rarity.Rare, 1, 2, 0, "Very smart and very vengeful. Grabbing one of its many tails could result in a 1000-year curse.", false, false),
    new Pokemon(39, "Jigglypuff", Types.Normal, Rarity.Common, 1, 1, 0, "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.", false, true),
    new Pokemon(40, "Wigglytuff", Types.Normal, Rarity.Rare, 1, 2, 0, "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.", false, false),
    new Pokemon(41, "Zubat", Types.Poison, Rarity.Common, 1, 1, 22, "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets.", false, false),
    new Pokemon(42, "Golbat", Types.Poison, Rarity.Uncommon, 1, 2, 0, "Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly.", false, false),
    new Pokemon(43, "Oddish", Types.Grass, Rarity.Common, 1, 1, 21, "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.", false, false),
    new Pokemon(44, "Gloom", Types.Grass, Rarity.Uncommon, 1, 2, 0, "The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey.", false, true),
    new Pokemon(45, "Vileplume", Types.Poison, Rarity.Rare, 1, 3, 0, "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.", false, false),
    new Pokemon(46, "Paras", Types.Bug, Rarity.Common, 1, 1, 24, "Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.", false, false),
    new Pokemon(47, "Parasect", Types.Bug, Rarity.Uncommon, 1, 2, 0, "A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places.", false, false),
    new Pokemon(48, "Venonat", Types.Bug, Rarity.Common, 1, 1, 31, "Lives in the shadows of tall trees where it eats insects. It is attracted by light at night.", false, false),
    new Pokemon(49, "Venomoth", Types.Poison, Rarity.Uncommon, 1, 2, 0, "The dust-like scales covering its wings are color coded to indicate the kinds of poison it has.", false, false),
    new Pokemon(50, "Digglet", Types.Ground, Rarity.Common, 1, 1, 26, "Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground.", false, false),
    new Pokemon(51, "Dugtrio", Types.Ground, Rarity.Uncommon, 1, 2, 0, "A team of DIGLETT triplets. It triggers huge earthquakes by burrowing 60 miles underground.", false, false),
    new Pokemon(52, "Meowth", Types.Normal, Rarity.Common, 1, 1, 28, "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.", false, false),
    new Pokemon(53, "Persian", Types.Normal, Rarity.Uncommon, 1, 2, 0, "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.", false, false),
    new Pokemon(54, "Psyduck", Types.Water, Rarity.Common, 1, 1, 33, "While lulling its enemies with its vacant look, this wily POKéMON will use psychokinetic powers.", false, false),
    new Pokemon(55, "Golduck", Types.Water, Rarity.Rare, 1, 2, 0, "Often seen swimming elegantly by lake shores. It is often mistaken for the Japanese monster, Kappa.", false, false),
    new Pokemon(56, "Mankey", Types.Fighting, Rarity.Common, 1, 1, 28, "Extremely quick to anger. It could be docile one moment then thrashing away the next instant.", false, false),
    new Pokemon(57, "Primeape", Types.Fighting, Rarity.Uncommon, 1, 2, 0, "Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught.", false, false),
    new Pokemon(58, "Growlithe", Types.Fire, Rarity.Common, 1, 1, 0, "Very protective of its territory. It will bark and bite to repel intruders from its space.", false, true),
    new Pokemon(59, "Arcanine", Types.Fire, Rarity.Uncommon, 1, 2, 0, "A POKéMON that has been admired since the past for its beauty. It runs agilely as if on wings.", false, false),
    new Pokemon(60, "Poliwag", Types.Water, Rarity.Common, 1, 1, 25, "Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand.", false, false),
    new Pokemon(61, "Poliwhirl", Types.Water, Rarity.Uncommon, 1, 2, 0, "Capable of living in or out of water. When out of water, it sweats to keep its body slimy.", false, true),
    new Pokemon(62, "Poliwrath", Types.Water, Rarity.Rare, 1, 3, 0, "An adept swimmer at both the front crawl and breast stroke. Easily overtakes the best human swimmers.", false, false),
    new Pokemon(63, "Abra", Types.Psychic, Rarity.Common, 1, 1, 16, "Using its ability to read minds, it will identify impending danger and TELEPORT to safety.", false, false),
    new Pokemon(64, "Kadabra", Types.Psychic, Rarity.Uncommon, 1, 2, 0, "It emits special alpha waves from its body that induce headaches just by being close by.", true, false),
    new Pokemon(65, "Alakazam", Types.Psychic, Rarity.Rare, 1, 3, 0, "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.", false, false),
    new Pokemon(66, "Machop", Types.Fighting, Rarity.Common, 1, 1, 28, "Loves to build its muscles. It trains in all styles of martial arts to become even stronger.", false, false),
    new Pokemon(67, "Machoke", Types.Fighting, Rarity.Uncommon, 1, 2, 0, "Its muscular body is so powerful, it must wear a power save belt to be able to regulate its motions.", true, false),
    new Pokemon(68, "Machamp", Types.Fighting, Rarity.Rare, 1, 3, 0, "Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon.", false, false),
    new Pokemon(69, "Bellsprout", Types.Grass, Rarity.Common, 1, 1, 21, "A carnivorous POKéMON that traps and eats bugs. It uses its root feet to soak up needed moisture.", false, false),
    new Pokemon(70, "Weepinbell", Types.Grass, Rarity.Uncommon, 1, 2, 0, "It spits out POISONPOWDER to immobilize the enemy and then finishes it with a spray of ACID.", false, true),
    new Pokemon(71, "Victreebel", Types.Poison, Rarity.Rare, 1, 3, 0, "Said to live in huge colonies deep in jungles, although no one has ever returned from there.", false, false),
    new Pokemon(72, "Tentacool", Types.Water, Rarity.Common, 1, 1, 30, "Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid.", false, false),
    new Pokemon(73, "Tentacruel", Types.Poison, Rarity.Uncommon, 1, 2, 0, "The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey.", false, false),
    new Pokemon(74, "Geodude", Types.Rock, Rarity.Common, 1, 1, 25, "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them.", false, false),
    new Pokemon(75, "Graveler", Types.Rock, Rarity.Uncommon, 1, 2, 0, "Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction.", true, false),
    new Pokemon(76, "Golem", Types.Rock, Rarity.Rare, 1, 3, 0, "Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without damage.", false, false),
    new Pokemon(77, "Ponyta", Types.Fire, Rarity.Common, 1, 1, 40, "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time.", false, false),
    new Pokemon(78, "Rapidash", Types.Fire, Rarity.Uncommon, 1, 2, 0, "Very competitive, this POKéMON will chase anything that moves fast in the hopes of racing it.", false, false),
    new Pokemon(79, "Slowpoke", Types.Psychic, Rarity.Common, 1, 1, 37, "Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack.", false, false),
    new Pokemon(80, "Slowbro", Types.Psychic, Rarity.Uncommon, 1, 2, 0, "The SHELLDER that is latched onto SLOWPOKE's tail is said to feed on the host's left over scraps.", false, false),
    new Pokemon(81, "Magnemite", Types.Electric, Rarity.Common, 1, 1, 30, "Uses anti-gravity to stay suspended. Appears without warning and uses THUNDER WAVE and similar moves.", false, false),
    new Pokemon(82, "Magneton", Types.Electric, Rarity.Uncommon, 1, 2, 0, "Formed by several MAGNEMITEs linked together. They frequently appear when sunspots flare up.", false, false),
    new Pokemon(83, "Farfetch'd", Types.Normal, Rarity.Uncommon, 1, 1, 0, "The sprig of green onions it holds is its weapon. It is used much like a metal sword.", false, false),
    new Pokemon(84, "Doduo", Types.Normal, Rarity.Common, 1, 1, 31, "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints.", false, false),
    new Pokemon(85, "Dodrio", Types.Normal, Rarity.Uncommon, 1, 2, 0, "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake.", false, false),
    new Pokemon(86, "Seel", Types.Water, Rarity.Common, 1, 1, 34, "The protruding horn on its head is very hard. It is used for bashing through thick ice.", false, false),
    new Pokemon(87, "Dewgong", Types.Water, Rarity.Uncommon, 1, 2, 0, "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters.", false, false),
    new Pokemon(88, "Grimer", Types.Poison, Rarity.Common, 1, 1, 38, "Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories.", false, false),
    new Pokemon(89, "Muk", Types.Poison, Rarity.Uncommon, 1, 2, 0, "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison.", false, false),
    new Pokemon(90, "Shellder", Types.Water, Rarity.Common, 1, 1, 0, "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open.", false, true),
    new Pokemon(91, "Cloyster", Types.Ice, Rarity.Uncommon, 1, 2, 0, "When attacked, it launches its horns in quick volleys. Its innards have never been seen.", false, false),
    new Pokemon(92, "Gastly", Types.Ghost, Rarity.Common, 1, 1, 25, "Almost invisible, this gaseous POKéMON cloaks the target and puts it to sleep without notice.", false, false),
    new Pokemon(93, "Haunter", Types.Ghost, Rarity.Uncommon, 1, 2, 0, "Because of its ability to slip through block walls, it is said to be from another dimension.", true, false),
    new Pokemon(94, "Gengar", Types.Ghost, Rarity.Rare, 1, 3, 0, "Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright.", false, false),
    new Pokemon(95, "Onix", Types.Rock, Rarity.Common, 1, 1, 0, "As it grows, the stone portions of its body harden to become similar to a diamond, but colored black.", false, false),
    new Pokemon(96, "Drowzee", Types.Psychic, Rarity.Common, 1, 1, 26, "Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams.", false, false),
    new Pokemon(97, "Hypno", Types.Psychic, Rarity.Uncommon, 1, 2, 0, "When it locks eyes with an enemy, it will use a mix of PSI moves such as HYPNOSIS and CONFUSION.", false, false),
    new Pokemon(98, "Krabby", Types.Water, Rarity.Common, 1, 1, 28, "Its pincers are not only powerful weapons, they are used for balance when walking sideways.", false, false),
    new Pokemon(99, "Kingler", Types.Water, Rarity.Uncommon, 1, 2, 0, "The large pincer has 10000 hp of crushing power. However, its huge size makes it unwieldy to use.", false, false),
    new Pokemon(100, "Voltorb", Types.Electric, Rarity.Common, 1, 1, 30, "Usually found in power plants. Easily mistaken for a Poké Ball, they have zapped many people.", false, false),
    new Pokemon(101, "Electrode", Types.Electric, Rarity.Uncommon, 1, 2, 0, "It stores electric energy under very high pressure. It often explodes with little or no provocation.", false, false),
    new Pokemon(102, "Exeggcute", Types.Grass, Rarity.Common, 1, 1, 0, "Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms.", false, true),
    new Pokemon(103, "Exeggutor", Types.Psychic, Rarity.Uncommon, 1, 2, 0, "Legend has it that on rare occasions, one of its heads will drop off and continue on as an EXEGGCUTE.", false, false),
    new Pokemon(104, "Cubone", Types.Ground, Rarity.Common, 1, 1, 28, "Because it never removes its skull helmet, no one has ever seen this POKéMON's real face.", false, false),
    new Pokemon(105, "Marowak", Types.Ground, Rarity.Uncommon, 1, 2, 0, "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets.", false, false),
    new Pokemon(106, "Hitmonlee", Types.Fighting, Rarity.Rare, 1, 1, 0, "When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides.", false, false),
    new Pokemon(107, "Hitmonchan", Types.Fighting, Rarity.Rare, 1, 1, 0, "While apparently doing nothing, it fires punches in lightning fast volleys that are impossible to see.", false, false),
    new Pokemon(108, "Lickitung", Types.Normal, Rarity.Uncommon, 1, 1, 0, "Its tongue can be extended like a chameleon's. It leaves a tingling sensation when it licks enemies.", false, false),
    new Pokemon(109, "Koffing", Types.Poison, Rarity.Common, 1, 1, 35, "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning.", false, false),
    new Pokemon(110, "Weezing", Types.Poison, Rarity.Uncommon, 1, 2, 0, "Where two kinds of poison gases meet, 2 KOFFINGs can fuse into a WEEZING over many years.", false, false)
];

export { InternPokemon as Pokemons };