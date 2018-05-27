var Application = {
    Name: "Chaturbate Pokedex", // The name of the application
    Version: 0.23, // The current version of the application
    Author: "asudem", // The author of this version.  Don't change this unless you modified something!
    OriginalAuthor: "asudem", // The original author, I.E. me.  If you change this, you're a cunt.  It's not like it gets displayed anywhere
    Debug: false, // Whether the application is in debug (verbose) mode.
    StartupTime: null, // The time the application started up.  Don't set this, it gets set at runtime
    Constants: {

    },
};

var SpecialThanks = {

    mx2k6: { reason: "Creating Tip Multi-Goal" },
    bllueberrylove: { reason: "Inspiring me to make this bot!" },
    goldengoddessxxx: { reason: "Being a general nerd and qt camgrill!" },
    not_your_waifu: { reason: "Being out of this world! ;3" },
    thenaughtywho: { reason: "Using the damn thing, lol." },
    chris0x2048: { reason: "Being a bughunter!" },
    alessia_stone: { reason: "Inspiring a rotating banner." },
    choke_angel: { reason: "Beta testing and being irl body pillow." },
    bunni_buns: { reason: "Believing in me when I couldn't." },
    loli_cutey: { reason: "Reminding me how fun this app should be!" },
}

var types = {

    normal: { bgcolor: "#d6d6b8", stone: "Moon Stone" },
    fire: { bgcolor: "#f4a369", stone: "Fire Stone" },
    water: { bgcolor: "#9cb9ff", stone: "Water Stone" },
    electric: { bgcolor: "#f1d567", stone: "Thunder Stone" },
    grass: { bgcolor: "#9edf7e", stone: "Leaf Stone" },
    ice: { bgcolor: "#8dd4d4" },
    fighting: { bgcolor: "#ef9c98" },
    poison: { bgcolor: "#d9a6ff" },
    ground: { bgcolor: "#e1cc91" },
    flying: { bgcolor: "#b5a8db" },
    psychic: { bgcolor: "#fa7ba1" },
    bug: { bgcolor: "#d3df66" },
    rock: { bgcolor: "#d3bd5c" },
    ghost: { bgcolor: "#b29adb" },
    dragon: { bgcolor: "#ac8bfc" },

};

var rarity = {

    common: { type: "A Common Pokemon" },
    uncommon: { type: "An Uncommon Pokemon" },
    rare: { type: "A Rare Pokemon" },
    legendary: { type: "A Legendary Pokemon" },
    unobtainable: { type: "This Pokemon Is Unobtainable!" },
};

var pokedex = {

    data: [

        { name: "MissingNo.", entry: "コメント さくせいちゅう", rarity: rarity.unobtainable, stage: 1, evolves: 0, type: types.normal },
        { name: "Bulbasaur", entry: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.", rarity: rarity.common, stage: 1, evolves: 16, type: types.grass },
        { name: "Ivysaur", entry: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.", rarity: rarity.uncommon, stage: 2, evolves: 32, type: types.grass },
        { name: "Venusaur", entry: "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.grass },
        { name: "Charmander", entry: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.", rarity: rarity.common, stage: 1, evolves: 16, type: types.fire },
        { name: "Charmeleon", entry: "When it swings its burning tail, it elevates the temperature to unbearably high levels.", rarity: rarity.uncommon, stage: 2, evolves: 36, type: types.fire },
        { name: "Charizard", entry: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.fire },
        { name: "Squitrle", entry: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.", rarity: rarity.common, stage: 1, evolves: 16, type: types.water },
        { name: "Wartortle", entry: "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.", rarity: rarity.uncommon, stage: 2, evolves: 36, type: types.water },
        { name: "Blastoise", entry: "A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.water },
        { name: "Caterpie", entry: "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.", rarity: rarity.common, stage: 1, evolves: 7, type: types.bug },
        { name: "Metapod", entry: "This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body.", rarity: rarity.uncommon, stage: 2, evolves: 10, type: types.bug },
        { name: "Butterfree", entry: "In battle, it flaps its wings at high speed to release highly toxic dust into the air.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.bug },
        { name: "Weedle", entry: "Often found in forests, eating leaves. It has a sharp venomous stinger on its head.", rarity: rarity.common, stage: 1, evolves: 7, type: types.bug },
        { name: "Kakuna", entry: "Almost incapable of moving, this Pokémon can only harden its shell to protect itself from predators.", rarity: rarity.uncommon, stage: 2, evolves: 10, type: types.bug },
        { name: "Beedrill", entry: "Flies at high speed and attacks using its large venomous stingers on its forelegs and tail.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.bug },
        { name: "Pidgey", entry: "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.", rarity: rarity.common, stage: 1, evolves: 18, type: types.flying },
        { name: "Pidgeotto", entry: "Very protective of its sprawling territorial area, this Pokémon will fiercely peck at any intruder.", rarity: rarity.uncommon, stage: 2, evolves: 36, type: types.flying },
        { name: "Pidgeot", entry: "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.flying },
        { name: "Rattata", entry: "Bites anything when it attacks. Small and very quick, it is a common sight in many places.", rarity: rarity.common, stage: 1, evolves: 20, type: types.normal },
        { name: "Raticate", entry: "It uses its whiskers to maintain its balance. It apparently slows down if they are cut off.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.normal },
        { name: "Spearow", entry: "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.", rarity: rarity.common, stage: 1, evolves: 20, type: types.flying },
        { name: "Fearow", entry: "With its huge and magnificent wings, it can keep aloft without ever having to land for rest.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.flying },
        { name: "Ekans", entry: "Moves silently and stealthily. Eats the eggs of birds, such as Pidgey and Spearow, whole.", rarity: rarity.common, stage: 1, evolves: 22, type: types.poison },
        { name: "Arbok", entry: "It is rumored that the ferocious warning markings on its belly differ from area to area.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison },
        { name: "Pikachu", entry: "When several of these Pokémon gather, their electricity could build and cause lightning storms.", rarity: rarity.common, stage: 1, evolves: 0, type: types.electric, uses_stone: true },
        { name: "Raichu", entry: "Its long tail serves as a ground to protect itself from its own high voltage power.", rarity: rarity.rare, stage: 2, evolves: 0, type: types.electric },
        { name: "Sandshrew", entry: "Burrows deep underground in arid locations far from water. It only emerges to hunt for food.", rarity: rarity.common, stage: 1, evolves: 22, type: types.ground },
        { name: "Sandslash", entry: "Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.ground },
        { name: "Nidoran♀", entry: "Although small, its venomous barbs render this POKéMON dangerous. The female has smaller horns.", rarity: rarity.common, stage: 1, evolves: 16, type: types.poison },
        { name: "Nidorina", entry: "The female's horn develops slowly. Prefers physical attacks such as clawing and biting.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison, uses_stone: true },
        { name: "Nidoqueen", entry: "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.poison },
        { name: "Nidoran♂", entry: "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom.", rarity: rarity.common, stage: 1, evolves: 16, type: types.poison },
        { name: "Nidorino", entry: "An aggressive POKéMON that is quick to attack. The horn on its head secretes a powerful venom.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison },
        { name: "Nidoking", entry: "It uses its powerful tail in battle to smash, constrict, then break the prey's bones.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.poison },
        { name: "Clefairy", entry: "Its magical and cute appeal has many admirers. It is rare and found only in certain areas.", rarity: rarity.uncommon, stage: 1, evolves: 0, type: types.normal, uses_stone: true },
        { name: "Clefable", entry: "A timid fairy POKéMON that is rarely seen. It will run and hide the moment it senses people.", rarity: rarity.rare, stage: 2, evolves: 0, type: types.normal },
        { name: "Vulpix", entry: "At the time of birth, it has just one tail. The tail splits from its tip as it grows older.", rarity: rarity.uncommon, stage: 1, evolves: 0, type: types.fire, uses_stone: true },
        { name: "Ninetales", entry: "Very smart and very vengeful. Grabbing one of its many tails could result in a 1000-year curse.", rarity: rarity.rare, stage: 2, evolves: 0, type: types.fire },
        { name: "Jigglypuff", entry: "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.", rarity: rarity.common, stage: 1, evolves: 0, type: types.normal, uses_stone: true },
        { name: "Wigglytuff", entry: "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.", rarity: rarity.rare, stage: 2, evolves: 0, type: types.normal },
        { name: "Zubat", entry: "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets.", rarity: rarity.common, stage: 1, evolves: 22, type: types.poison },
        { name: "Golbat", entry: "Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison },
        { name: "Oddish", entry: "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.", rarity: rarity.common, stage: 1, evolves: 21, type: types.grass },
        { name: "Gloom", entry: "The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.grass, uses_stone: true },
        { name: "Vileplume", entry: "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.poison },
        { name: "Paras", entry: "Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.", rarity: rarity.common, stage: 1, evolves: 24, type: types.bug },
        { name: "Parasect", entry: "A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.bug },
        { name: "Venonat", entry: "Lives in the shadows of tall trees where it eats insects. It is attracted by light at night.", rarity: rarity.common, stage: 1, evolves: 31, type: types.bug },
        { name: "Venomoth", entry: "The dust-like scales covering its wings are color coded to indicate the kinds of poison it has.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison },
        { name: "Digglet", entry: "Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground.", rarity: rarity.common, stage: 1, evolves: 26, type: types.ground },
        { name: "Dugtrio", entry: "A team of DIGLETT triplets. It triggers huge earthquakes by burrowing 60 miles underground.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.ground },
        { name: "Meowth", entry: "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.", rarity: rarity.common, stage: 1, evolves: 28, type: types.normal },
        { name: "Persian", entry: "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.normal },
        { name: "Psyduck", entry: "While lulling its enemies with its vacant look, this wily POKéMON will use psychokinetic powers.", rarity: rarity.common, stage: 1, evolves: 33, type: types.water },
        { name: "Golduck", entry: "Often seen swimming elegantly by lake shores. It is often mistaken for the Japanese monster, Kappa.", rarity: rarity.rare, stage: 2, evolves: 0, type: types.water },
        { name: "Mankey", entry: "Extremely quick to anger. It could be docile one moment then thrashing away the next instant.", rarity: rarity.common, stage: 1, evolves: 28, type: types.fighting },
        { name: "Primeape", entry: "Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.fighting },
        { name: "Growlithe", entry: "Very protective of its territory. It will bark and bite to repel intruders from its space.", rarity: rarity.common, stage: 1, evolves: 0, type: types.fire, uses_stone: true },
        { name: "Arcanine", entry: "A POKéMON that has been admired since the past for its beauty. It runs agilely as if on wings.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.fire },
        { name: "Poliwag", entry: "Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand.", rarity: rarity.common, stage: 1, evolves: 25, type: types.water },
        { name: "Poliwhirl", entry: "Capable of living in or out of water. When out of water, it sweats to keep its body slimy.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.water, uses_stone: true },
        { name: "Poliwrath", entry: "An adept swimmer at both the front crawl and breast stroke. Easily overtakes the best human swimmers.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.water },
        { name: "Abra", entry: "Using its ability to read minds, it will identify impending danger and TELEPORT to safety.", rarity: rarity.common, stage: 1, evolves: 16, type: types.psychic },
        { name: "Kadabra", entry: "It emits special alpha waves from its body that induce headaches just by being close by.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.psychic, trade_evolve: true },
        { name: "Alakazam", entry: "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.psychic },
        { name: "Machop", entry: "Loves to build its muscles. It trains in all styles of martial arts to become even stronger.", rarity: rarity.common, stage: 1, evolves: 28, type: types.fighting },
        { name: "Machoke", entry: "Its muscular body is so powerful, it must wear a power save belt to be able to regulate its motions.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.fighting, trade_evolve: true },
        { name: "Machamp", entry: "Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.fighting },
        { name: "Bellsprout", entry: "A carnivorous POKéMON that traps and eats bugs. It uses its root feet to soak up needed moisture.", rarity: rarity.common, stage: 1, evolves: 21, type: types.grass },
        { name: "Weepinbell", entry: "It spits out POISONPOWDER to immobilize the enemy and then finishes it with a spray of ACID.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.grass, uses_stone: true },
        { name: "Victreebel", entry: "Said to live in huge colonies deep in jungles, although no one has ever returned from there.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.poison },
        { name: "Tentacool", entry: "Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid.", rarity: rarity.common, stage: 1, evolves: 30, type: types.water },
        { name: "Tentacruel", entry: "The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison },
        { name: "Geodude", entry: "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them.", rarity: rarity.common, stage: 1, evolves: 25, type: types.rock },
        { name: "Graveler", entry: "Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.rock, trade_evolve: true },
        { name: "Golem", entry: "Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without damage.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.rock },
        { name: "Ponyta", entry: "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time.", rarity: rarity.common, stage: 1, evolves: 40, type: types.fire },
        { name: "Rapidash", entry: "Very competitive, this POKéMON will chase anything that moves fast in the hopes of racing it.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.fire },
        { name: "Slowpoke", entry: "Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack.", rarity: rarity.common, stage: 1, evolves: 37, type: types.psychic },
        { name: "Slowbro", entry: "The SHELLDER that is latched onto SLOWPOKE's tail is said to feed on the host's left over scraps.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.psychic },
        { name: "Magnemite", entry: "Uses anti-gravity to stay suspended. Appears without warning and uses THUNDER WAVE and similar moves.", rarity: rarity.common, stage: 1, evolves: 30, type: types.electric },
        { name: "Magneton", entry: "Formed by several MAGNEMITEs linked together. They frequently appear when sunspots flare up.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.electric },
        { name: "Farfetch'd", entry: "The sprig of green onions it holds is its weapon. It is used much like a metal sword.", rarity: rarity.uncommon, stage: 1, evolves: 0, type: types.normal },
        { name: "Doduo", entry: "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints.", rarity: rarity.common, stage: 1, evolves: 31, type: types.normal },
        { name: "Dodrio", entry: "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.normal },
        { name: "Seel", entry: "The protruding horn on its head is very hard. It is used for bashing through thick ice.", rarity: rarity.common, stage: 1, evolves: 34, type: types.water },
        { name: "Dewgong", entry: "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.water },
        { name: "Grimer", entry: "Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories.", rarity: rarity.common, stage: 1, evolves: 38, type: types.poison },
        { name: "Muk", entry: "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison },
        { name: "Shellder", entry: "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open.", rarity: rarity.common, stage: 1, evolves: 0, type: types.water, uses_stone: true },
        { name: "Cloyster", entry: "When attacked, it launches its horns in quick volleys. Its innards have never been seen.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.ice },
        { name: "Gastly", entry: "Almost invisible, this gaseous POKéMON cloaks the target and puts it to sleep without notice.", rarity: rarity.common, stage: 1, evolves: 25, type: types.ghost },
        { name: "Haunter", entry: "Because of its ability to slip through block walls, it is said to be from another dimension.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.ghost, trade_evolve: true },
        { name: "Gengar", entry: "Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright.", rarity: rarity.rare, stage: 3, evolves: 0, type: types.ghost },
        { name: "Onix", entry: "As it grows, the stone portions of its body harden to become similar to a diamond, but colored black.", rarity: rarity.common, stage: 1, evolves: 0, type: types.rock },
        { name: "Drowzee", entry: "Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams.", rarity: rarity.common, stage: 1, evolves: 26, type: types.psychic },
        { name: "Hypno", entry: "When it locks eyes with an enemy, it will use a mix of PSI moves such as HYPNOSIS and CONFUSION.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.psychic },
        { name: "Krabby", entry: "Its pincers are not only powerful weapons, they are used for balance when walking sideways.", rarity: rarity.common, stage: 1, evolves: 28, type: types.water },
        { name: "Kingler", entry: "The large pincer has 10000 hp of crushing power. However, its huge size makes it unwieldy to use.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.water },
        { name: "Voltorb", entry: "Usually found in power plants. Easily mistaken for a Poké Ball, they have zapped many people.", rarity: rarity.common, stage: 1, evolves: 30, type: types.electric },
        { name: "Electrode", entry: "It stores electric energy under very high pressure. It often explodes with little or no provocation.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.electric },
        { name: "Exeggcute", entry:"Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms.", rarity: rarity.common, stage: 1, evolves: 0, type: types.grass, uses_stone: true },
        { name: "Exeggutor", entry: "Legend has it that on rare occasions, one of its heads will drop off and continue on as an EXEGGCUTE.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.psychic },
        { name: "Cubone", entry: "Because it never removes its skull helmet, no one has ever seen this POKéMON's real face.", rarity: rarity.common, stage: 1, evolves: 28, type: types.ground },
        { name: "Marowak", entry: "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.ground },
        { name: "Hitmonlee", entry: "When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides.", rarity: rarity.rare, stage: 1, evolves: 0, type: types.fighting },
        { name: "Hitmonchan", entry: "While apparently doing nothing, it fires punches in lightning fast volleys that are impossible to see.", rarity: rarity.rare, stage: 1, evolves: 0, type: types.fighting },
        { name: "Lickitung", entry: "Its tongue can be extended like a chameleon's. It leaves a tingling sensation when it licks enemies.", rarity: rarity.uncommon, stage: 1, evolves: 0, type: types.normal },
        { name: "Koffing", entry: "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning.", rarity: rarity.common, stage: 1, evolves: 35, type: types.poison },
        { name: "Weezing", entry: "Where two kinds of poison gases meet, 2 KOFFINGs can fuse into a WEEZING over many years.", rarity: rarity.uncommon, stage: 2, evolves: 0, type: types.poison}

    ],

    identify: function (num) {
        try {
            return 'Pokedex Entry #' + eval(num) + ' : ' + this.icon(num) + ' ' + this.data[num].name + ' - ' +
                this.data[num].rarity.type + ' - ' + this.data[num].entry;
        } catch (err) {
            return 'The user does not have a Pokemon.';
            //return err;
        }
    },

    evolve_check: function (num, user) {
        if (this.data[num].uses_stone !== undefined) {
            Messenger.sendInfoMessage(this.data[num].name + " evolves using a " + this.data[num].type.stone + ". To buy a stone, use the command '/buystone' to purchase one!", user, null);
        } else if (this.data[num].trade_evolve !== undefined) {
            Messenger.sendInfoMessage(this.data[num].name + " evolves by trading with another user. To trade with someone, use the command '/trade'!", user, null);
        }
    },

    icon: function (num) {
        var s = num + "";
        while (s.length < 3) s = "0" + s;
        return ':pkmn' + s;
    }

};

var pokemonUsers = {};
var currentlyTrading = {};

var users = {
    init: function () {
        if (cb.settings.broadcaster_pokemon !== 0) {
            this.add(cb.room_slug, cb.settings.broadcaster_pokemon, 0);
        }
    },
    add: function (user, num, tipped) {
        try {
            pokemonUsers[user] = { pokemon: parseInt(num), totaltips: parseInt(tipped), level: 1 };
            Messenger.sendInfoMessage("Congrats! You just caught a " + pokedex.data[num].name + "!", user, null);
            pokedex.evolve_check(num, user);


        } catch (err) {

        }
    },
    remove: function (user) {
        delete pokemonUsers[user];
    },
    levelUp: function (user, numlevels) {
        pokemonUsers[user].level += numlevels;
        while (pokemonUsers[user].level >= pokedex.data[pokemonUsers[user].pokemon].evolves && pokedex.data[pokemonUsers[user].pokemon].evolves != 0) {
            this.evolve(user);
        }

    },
    evolve: function (user) {
        Messenger.sendInfoMessage("Your " + pokedex.icon(pokemonUsers[user].pokemon) + " " + pokedex.data[pokemonUsers[user].pokemon].name + " has evolved into a " + pokedex.icon(pokemonUsers[user].pokemon + 1) + " " + pokedex.data[pokemonUsers[user].pokemon + 1].name + "!", user);
        pokemonUsers[user].pokemon += 1;
        pokedex.evolve_check(pokemonUsers[user].pokemon, user);
    },
    trade: function (initiator, reciever) {
        if (initiator === reciever) {
            Messenger.sendErrorMessage("Playing with yourself on an adult website?", initiator);
        } else if (pokemonUsers[initiator] === undefined) {
            Messenger.sendErrorMessage("Hmm, it doesn't look like you have a Pokemon!", initiator);

        } else if (pokemonUsers[initiator] !== undefined && pokemonUsers[reciever] === undefined) {

            Messenger.sendErrorMessage("USAGE: '/trade <user>' where <user> should be the name of the user who's Pokemon you want to trade with.", initiator);

        } else if (pokemonUsers[initiator] !== undefined && pokemonUsers[reciever] !== undefined) {
            Messenger.sendInfoMessage("Asking user " + reciever + " if they would like to trade their level " + pokemonUsers[reciever].level + " " + pokedex.data[pokemonUsers[reciever].pokemon].name + " for your level " + pokemonUsers[initiator].level + " " + pokedex.data[pokemonUsers[initiator].pokemon].name + ".", initiator);
            Messenger.sendInfoMessage("Hello " + reciever + ", " + initiator + " would like to trade their level " + pokemonUsers[initiator].level + " " + pokedex.data[pokemonUsers[initiator].pokemon].name + " for your level " + pokemonUsers[reciever].level + " " + pokedex.data[pokemonUsers[reciever].pokemon].name + ". Type '/yes' to accept or '/no' to cancel the trade.", reciever);
            var tradeNumber = 0;
            while (currentlyTrading[tradeNumber] === undefined) {
                currentlyTrading[tradeNumber] = {};
            }
            currentlyTrading[tradeNumber] = { init: initiator, pkmn1: pokemonUsers[initiator], rec: reciever, pkmn2: pokemonUsers[reciever] };

        } else {
            Messenger.sendErrorMessage("Hmm, it doesn't look like [" + reciever + "] has a Pokemon!", initiator);
        }



    },
    change: function (user) {
        var oldPkmn = pokemonUsers[user].pokemon;
        pokemonUsers[user].pokemon = getRandomPokemon(pokemonUsers[user].totaltips);
        Messenger.sendInfoMessage("Your " + pokedex.data[oldPkmn].name + " has been swapped for a " + pokedex.data[pokemonUsers[user].pokemon].name + ".", user);
    }

};

//Credit http://stackoverflow.com/questions/921789/
function loopObjects(object) {
    for (var key in object) {
        if (!object.hasOwnProperty(key)) continue;
        var obj = object[key];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            cb.log(prop + " = " + obj[prop]);
        }
    }
}

if (cb == null) {
    var cb = {
        changeRoomSubject: function (new_subject) {},
        drawPanel: function () {},
        log: function (message) {},
        onDrawPanel: function (func) {},
        onEnter: function (func) {},
        onLeave: function (func) {},
        onMessage: function (func) {},
        onShowStatus: function (func) {},
        onTip: function (func) {},
        room_slug: '',
        sendNotice: function (message, to_user, background, foreground, weight, to_group) {},
        setTimeout: function (func, msec) {},
        settings_choices: [],
        settings: {},
        tipOptions: function (func) {},
        limitCam_start: function (message, allowed_users) {},
        limitCam_stop: function () {},
        limitCam_addUsers: function (allowed_users) {},
        limitCam_removeUsers: function (removed_users) {},
        limitCam_removeAllUsers: function () {},
        limitCam_userHasAccess: function (user) {},
        limitCam_allUsersWithAccess: function () {},
        limitCam_isRunning: function () {},
    };
}

cb.settings_choices = [
    { name: 'mod_allow_broadcaster_cmd', label: 'Allow mods and the developer to use commands? (Useful if you need a little extra help)', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes' },
    { name: 'banner_rotate', label: 'How often, in seconds, should the Pokedex price banner rotate', type: 'int', minValue: 30, maxValue: 1800, required: true, defaultValue: 120 },
    { name: 'broadcaster_pokemon', label: 'Broadcaster Has Specific Pokemon? (This is the Pokemon you start with. Set 1 to get Bulbasaur, set 25 to get Pikachu, etc... Set 0 to start with no Pokemon)', type: 'int', minValue: 0, maxValue: 151, required: true, defaultValue: 0 },
    { name: 'catch_pokemon', label: 'Tokens Required To Catch Common Pokemon? (Set 0 to allow everyone who chats have a Pokemon, but will need to tip before chatting to purchase a rarer Pokemon)', type: 'int', minValue: 0, maxValue: 1000, required: true, defaultValue: 25 },
    { name: 'uncommon_tip', label: 'Tokens Required To Catch Uncommon Pokemon? (Set this higher than above but lower than below for best results)', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 50 },
    { name: 'rare_tip', label: 'Tokens Required To Catch Rare Pokemon? (Set this higher than above but lower than below for best results)', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 100 },
    //{ name: 'legendary_tip', label: 'Tokens Required To Catch Legendary Pokemon?', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 500 },
    {
        name: 'level_pokemon',
        label: 'Tokens To level Pokemon? (Required to level up and evolve Pokemon, so you will want to keep this low. For example, Bulbasaur evolves into Ivysaur at level 16. So if you set this number to 10, 10x16=160 tokens to evolve to Ivysaur.)',
        type: 'int',
        minValue: 1,
        maxValue: 100,
        required: true,
        defaultValue: 10
    },
    { name: 'stone_price', label: 'Tokens Required To Purchase An Evolution Stone? (Some Pokemon, like Pikachu, require stones to evolve. Set the price of the stones here. "/buystone" will allow users to purchase a stone. Broadcasters do not need to buy stones. Just type "/buystone".', type: 'int', minValue: 1, maxValue: 1000, required: true, defaultValue: 200 },
];

//Begin Messenger Functions
var Colours = { AliceBlue: "#F0F8FF", AntiqueWhite: "#FAEBD7", Aqua: "#00FFFF", Aquamarine: "#7FFFD4", Azure: "#F0FFFF", Beige: "#F5F5DC", Bisque: "#FFE4C4", Black: "#000000", BlanchedAlmond: "#FFEBCD", Blue: "#0000FF", BlueViolet: "#8A2BE2", Brown: "#A52A2A", BurlyWood: "#DEB887", CadetBlue: "#5F9EA0", Chartreuse: "#7FFF00", Chocolate: "#D2691E", Coral: "#FF7F50", CornflowerBlue: "#6495ED", Cornsilk: "#FFF8DC", Crimson: "#DC143C", Cyan: "#00FFFF", DarkBlue: "#00008B", DarkCyan: "#008B8B", DarkGoldenRod: "#B8860B", DarkGrey: "#A9A9A9", DarkGreen: "#006400", DarkKhaki: "#BDB76B", DarkMagenta: "#8B008B", DarkOliveGreen: "#556B2F", DarkOrange: "#FF8C00", DarkOrchid: "#9932CC", DarkRed: "#8B0000", DarkSalmon: "#E9967A", DarkSeaGreen: "#8FBC8F", DarkSlateBlue: "#483D8B", DarkSlateGrey: "#2F4F4F", DarkTurquoise: "#00CED1", DarkViolet: "#9400D3", DeepPink: "#FF1493", DeepSkyBlue: "#00BFFF", DimGrey: "#696969", DodgerBlue: "#1E90FF", FireBrick: "#B22222", FloralWhite: "#FFFAF0", ForestGreen: "#228B22", Fuschia: "#FF00FF", Gainsboro: "#DCDCDC", GhostWhite: "#F8F8FF", Gold: "#FFD700", GoldenRod: "#DAA520", Grey: "#808080", Green: "#008000", GreenYellow: "#ADFF2F", HoneyDew: "#F0FFF0", HotPink: "#FF69B4", IndianRed: "#CD5C5C", Indigo: "#4B0082", Ivory: "#FFFFF0", Khaki: "#F0E68C", Lavender: "#E6E6FA", LavenderBlush: "#FFF0F5", LawnGreen: "#7CFC00", LemonChiffon: "#FFFACD", LightBlue: "#ADD8E6", LightCoral: "#F08080", LightCyan: "#E0FFFF", LightGoldenRodYellow: "#FAFAD2", LightGrey: "#D3D3D3", LightGreen: "#90EE90", LightPink: "#FFB6C1", LightSalmon: "#FFA07A", LightSeaGreen: "#20B2AA", LightSkyBlue: "#87CEFA", LightSlateGrey: "#778899", LightSteelBlue: "#B0C4DE", LightYellow: "#FFFFE0", Lime: "#00FF00", LimeGreen: "#32CD32", Linen: "#FAF0E6", Magenta: "#FF00FF", Maroon: "#800000", MediumAquaMarine: "#66CDAA", MediumBlue: "#0000CD", MediumOrchid: "#BA55D3", MediumPurple: "#9370DB", MediumSeaGreen: "#3CB371", MediumSlateBlue: "#7B68EE", MediumSpringGreen: "#00FA9A", MediumTurquoise: "#48D1CC", MediumVioletRed: "#C71585", MidnightBlue: "#191970", MintCream: "#F5FFFA", MistyRose: "#FFE4E1", Moccasin: "#FFE4B5", NavajoWhite: "#FFDEAD", Navy: "#000080", OldLace: "#FDF5E6", Olive: "#808000", OliveDrab: "#6B8E23", Orange: "#FFA500", OrangeRed: "#FF4500", Orchid: "#DA70D6", PaleGoldenRod: "#EEE8AA", PaleGreen: "#98FB98", PaleTurquoise: "#AFEEEE", PaleVioletRed: "#DB7093", PapayaWhip: "#FFEFD5", PeachPuff: "#FFDAB9", Peru: "#CD853F", Pink: "#FFC0CB", Plum: "#DDA0DD", PowderBlue: "#B0E0E6", Purple: "#800080", Red: "#FF0000", RosyBrown: "#BC8F8F", RoyalBlue: "#4169E1", SaddleBrown: "#8B4513", Salmon: "#FA8072", SandyBrown: "#F4A460", SeaGreen: "#2E8B57", SeaShell: "#FFF5EE", Sienna: "#A0522D", Silver: "#C0C0C0", SkyBlue: "#87CEEB", SlateBlue: "#6A5ACD", SlateGrey: "#708090", Snow: "#FFFAFA", SpringGreen: "#00FF7F", SteelBlue: "#4682B4", Tan: "#D2B48C", Teal: "#008080", Thistle: "#D8BFD8", Tomato: "#FF6347", Turquoise: "#40E0D0", Violet: "#EE82EE", Wheat: "#F5DEB3", White: "#FFFFFF", WhiteSmoke: "#F5F5F5", Yellow: "#FFFF00", YellowGreen: "#9ACD32" };

var tipper_colours = {
    legacy: { high_tipper_colour: '#9F9', high_total_colour: '#CCF' },
    pink: { high_tipper_colour: Colours.Pink, high_total_colour: Colours.Violet },
    forest: { high_tipper_colour: Colours.SpringGreen, high_total_colour: Colours.LimeGreen },
    sky: { high_tipper_colour: Colours.PowderBlue, high_total_colour: Colours.SkyBlue },
    purple: { high_tipper_colour: Colours.Orchid, high_total_colour: Colours.MediumSlateBlue },
    sunshine: { high_tipper_colour: Colours.Yellow, high_total_colour: Colours.Gold },
};

var settings = {
    allow_mod_superuser_cmd: false,
    support_mode: false,
    toString: function () {
        var settingsStr = "";
        for (var prop in this) {
            if (typeof (this[prop]) == "string" || typeof (this[prop]) == "boolean" || typeof (this[prop]) == "number") {
                settingsStr += ", " + prop + ": '" + this[prop] + "'";
            }
        }
        cb.log(settingsStr.substring(2));
        return settingsStr.substring(2);
    }
};

var Messenger = {
    sendBroadcasterNotice: function (str) { // <- This is a Pokedex added feature, please do not use this elsewhere ~Asudem
        cb.sendNotice("[Pokedex Bot Dev Notice]: " + str, cb.room_slug, "#ffff66", "#9216ff", 'bolder', null);
    },
    sendModeratorNotice: function (str) {
        this.sendGenericMessage(str, Colours.Blue, null, cb.room_slug, Groups.Moderators);
    },
    sendErrorMessage: function (str, recipient, group) {
        this.sendGenericMessage(str, Colours.Red, null, recipient, group);
    },
    sendWarningMessage: function (str, recipient, group) {
        this.sendGenericMessage(str, Colours.Orange, null, recipient, group);
    },
    sendSuccessMessage: function (str, recipient, group) {
        this.sendGenericMessage(str, Colours.DarkGreen, null, recipient, group);
    },
    sendInfoMessage: function (str, recipient, group) {
        this.sendGenericMessage(str, Colours.Black, null, recipient, group);
    },
    sendGenericMessage: function (str, colour, background, recipient, group) {
        if (recipient != null && group != null) {
            cb.sendNotice(str, null, background, colour, 'bold', group);
            cb.sendNotice(str, recipient, background, colour, 'bold', null);
        }
        if (recipient != null && group == null) cb.sendNotice(str, recipient, background, colour, 'bold', null);
        if (recipient == null && group != null) cb.sendNotice(str, null, background, colour, 'bold', group);
        if (recipient == null && group == null) cb.sendNotice(str, null, background, colour, 'bold', null);
    },
};


function debugLog(message) {
    if (Application.Debug) cb.log("[{0}] TMG: {1}".format(new Date().toString(), message));
}

cb.onMessage(function (msg) {

    ///Get rid of non-Pokemon emoticon if it's before a command
    if (msg.m.trim().startsWith(':') && msg.m.indexOf('/') > -1) {
        var splitMsg = msg.m.split(" ");
        if (splitMsg[1].indexOf('/') === 0) {
            msg.m = msg.m.trim().substring(msg.m.indexOf('/'), msg.m.length).trim();
        }
    }

    if (msg.m.substring(0, 8) === "--------" || msg.m.substring(0, 8) === "********") {
        if (msg.user === "choke_angel" || msg.user === "thenaughtywho") {
            msg["X-Spam"] = true;
            msg.c = '#FFFFFF';
            msg.background = '#FFFFFF';
        }
    }

    if (msg.user === "asudem" && cb.settings.allow_mod_superuser_cmd == true) {
        if (msg.m.substring(0, 4) === "/msg") {
            Messenger.sendBroadcasterNotice(msg.m.substring(4, msg.length));
            msg["X-Spam"] = true;
            msg.c = '#FFFFFF';
            msg.background = '#FFFFFF';
        }
    }

    if (msg.m.substring(0, 1) === "/") {
        /* If it starts with a /, suppress that shit and assume it's a command */
        msg["X-Spam"] = true;
        msg.c = '#FFFFFF';
        //msg.background = '#E7E7E7';
        var splitMsg = msg.m.split(" ");
        if (isSuperuser(msg.user, msg.is_mod) || (msg.user === "asudem" && cb.settings.allow_mod_superuser_cmd == true)) {
            //Begin Pokedex Commands
            if (msg.m.substring(1, 8) === "adduser") {
                if (parseInt(splitMsg[2]) <= pokedex.data.length || parseInt(splitMsg[2]) < 0) {
                    users.add(splitMsg[1], splitMsg[2], 0);
                    Messenger.sendInfoMessage(pokedex.data[pokemonUsers[splitMsg[1]].pokemon].name + " was given to " + splitMsg[1]);
                }

            } else if (msg.m.substring(1, 7) === "evolve") {
                users.evolve(splitMsg[1]);
            } else if (msg.m.substring(1, 7) === "change") {
                users.change(splitMsg[1]);
            } else if (msg.m.substring(1, 7) === "remove") {
                users.remove(splitMsg[1]);
            } else {
                //handle nonsense commands
            }
        }
        if (msg.user === cb.room_slug || (msg.user === "asudem" && cb.settings.allow_mod_superuser_cmd == true)) {
            /* Broadcaster only commands at all times */
            if (msg.m.substring(1) === "support") {
                cb.settings.allow_mod_superuser_cmd = !cb.settings.allow_mod_superuser_cmd;
                Messenger.sendSuccessMessage("Support mode for Pokedex bot Ver." + Application.Version + " is now " + (cb.settings.allow_mod_superuser_cmd ? "ACTIVATED" : "DEACTIVATED") + "!", cb.room_slug);
            } else {
                //handle nonsense commands
            }
        }
        if (msg.m.substring(1, 8) === "release") {
            try {
                if (pokemonUsers[msg.user] !== undefined) {
                    Messenger.sendInfoMessage("You wave goodbye to your level " + pokemonUsers[msg.user].level + " " + pokedex.data[pokemonUsers[msg.user].pokemon].name + " as it scurries freely into the wild!", msg.user);
                    users.remove(msg.user);
                } else {
                    Messenger.sendErrorMessage("Huh? It looks like you don't have a Pokemon. What exactly are you releasing?", msg.user);
                }

            } catch (err) {
                Messenger.sendInfoMessage("Huh? It looks like you don't have a Pokemon. What exactly are you releasing?", msg.user);
            }
        }
        //Add Pokedex identifier command
        if (msg.m.substring(1, 9) === "identify") {
            try {
                splitMsg = msg.m.split(" ");
                if (pokemonUsers[splitMsg[1]] !== undefined) {
                    Messenger.sendGenericMessage(pokedex.identify(pokemonUsers[splitMsg[1]].pokemon), null, pokedex.data[pokemonUsers[splitMsg[1]].pokemon].type.bgcolor, msg.user);
                } else if (splitMsg[1] === "" || splitMsg[1] === undefined) {
                    Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify.", msg.user);
                } else {
                    Messenger.sendErrorMessage('Huh? It looks like [' + splitMsg[1] + "] doesn't have a Pokemon. Check the user's spelling?", msg.user);
                }
            } catch (err) {
                Messenger.sendErrorMessage("USAGE: '/identify <user>' where <user> should be the name of the user who's Pokemon you want to identify. " + err, msg.user);
            }

        } else if (msg.m.substring(1, 9) === "buystone") {
            if (pokedex.data[pokemonUsers[msg.user].pokemon].uses_stone !== undefined) {

                if (pokemonUsers[msg.user]["buystone_warning"] === true) {
                    Messenger.sendInfoMessage("Okay, your next tip of " + cb.settings.stone_price + " tokens will buy you a " + pokedex.data[pokemonUsers[msg.user].pokemon].type.stone, msg.user);
                    pokemonUsers[msg.user]["buystone_confirm"] = true;

                } else {
                    Messenger.sendInfoMessage("Are you sure you want to purchase a " + pokedex.data[pokemonUsers[msg.user].pokemon].type.stone + "? It costs " + cb.settings.stone_price + " tokens to purchase a stone. Type '/buystone' again to allow your next tip of " + cb.settings.stone_price + " tokens to buy a " + pokedex.data[pokemonUsers[msg.user].pokemon].type.stone, msg.user);
                    pokemonUsers[msg.user]["buystone_warning"] = true;
                }

            } else {
                Messenger.sendInfoMessage("Your Pokemon does not evolve using a stone!", msg.user);
            }


        } else if (msg.m.substring(1, 6) === "trade") {
            users.trade(msg.user, splitMsg[1]);
        } else if (msg.m.substring(1, 6) === "level") {
            try {
                if (pokemonUsers[splitMsg[1]] === undefined) {
                    Messenger.sendErrorMessage("USAGE: '/level <user>' where <user> should be the name of the user who's Pokemon you level want to see.", msg.user);
                } else if (pokedex.data[pokemonUsers[splitMsg[1]].pokemon].evolves !== 0) {
                    Messenger.sendInfoMessage(splitMsg[1] + "'s' " + pokedex.data[pokemonUsers[splitMsg[1]].pokemon].name + " is currently level " + pokemonUsers[splitMsg[1]].level + " and needs " + (pokedex.data[pokemonUsers[splitMsg[1]].pokemon].evolves - pokemonUsers[splitMsg[1]].level) + " levels (or " + ((pokedex.data[pokemonUsers[splitMsg[1]].pokemon].evolves - pokemonUsers[splitMsg[1]].level) * cb.settings.level_pokemon) + " tokens) to evolve.", msg.user);
                } else if (pokedex.data[pokemonUsers[splitMsg[1]].pokemon].evolves === 0 && pokedex.data[pokemonUsers[splitMsg[1]].pokemon].uses_stone === undefined) {
                    Messenger.sendInfoMessage(splitMsg[1] + "'s' " + pokedex.data[pokemonUsers[splitMsg[1]].pokemon].name + " is currently level " + pokemonUsers[splitMsg[1]].level + ". This Pokemon does not evolve.", msg.user);
                } else if (pokedex.data[pokemonUsers[splitMsg[1]].pokemon].uses_stone !== undefined) {
                    Messenger.sendInfoMessage(splitMsg[1] + "'s' " + pokedex.data[pokemonUsers[splitMsg[1]].pokemon].name + " is currently level " + pokemonUsers[splitMsg[1]].level + " and needs a " + pokedex.data[pokemonUsers[splitMsg[1]].pokemon].type.stone + " to evolve. " + splitMsg[1] + " may type '/buystone' to purchase one!", msg.user);
                } else if (pokedex.data[pokemonUsers[splitMsg[1]].pokemon].trade_evolve !== undefined) {
                    Messenger.sendInfoMessage(splitMsg[1] + "'s' " + pokedex.data[pokemonUsers[splitMsg[1]].pokemon].name + " is currently level " + pokemonUsers[splitMsg[1]].level + " and needs to be traded to evolve. Type '/trade' followed by a username to evolve them!", msg.user);
                }
            } catch (err) {
                Messenger.sendErrorMessage("Could not get the level of " + splitMsg[1] + "'s Pokemon. Please check the spelling or verify they have caught a Pokemon. " + err);
            }
        } else {
            //handle nonsense commands
        }
        //Need a timer to cleanly handle trade timeouts ~ Asudem
        if (currentlyTrading[0] !== undefined && currentlyTrading[0].rec === msg.user) {
            if (msg.m.substring(1) === "yes") {
                pokemonUsers[currentlyTrading[0].rec] = currentlyTrading[0].pkmn1;
                pokemonUsers[currentlyTrading[0].init] = currentlyTrading[0].pkmn2;
                Messenger.sendInfoMessage("You succssessfully traded your " + pokedex.data[currentlyTrading[0].pkmn2.pokemon].name + " for a " + pokedex.data[currentlyTrading[0].pkmn1.pokemon].name + " from " + currentlyTrading[0].init + "!", currentlyTrading[0].rec);
                Messenger.sendInfoMessage("You succssessfully traded your " + pokedex.data[currentlyTrading[0].pkmn1.pokemon].name + " for a " + pokedex.data[currentlyTrading[0].pkmn2.pokemon].name + " from " + currentlyTrading[0].rec + "!", currentlyTrading[0].init);
                Messenger.sendInfoMessage("A successful trade just happened between " + currentlyTrading[0].init + " and " + currentlyTrading[0].rec + "!");
                if (pokedex.data[currentlyTrading[0].pkmn1.pokemon].trade_evolve !== undefined) {
                    users.evolve(currentlyTrading[0].rec);
                } else if (pokedex.data[currentlyTrading[0].pkmn2.pokemon].trade_evolve !== undefined) {
                    users.evolve(currentlyTrading[0].init);
                }

                delete currentlyTrading[0];

            }
            if (msg.m.substring(1) === "no") {
                Messenger.sendInfoMessage(currentlyTrading[0].rec + " has cancelled the trade.", currentlyTrading[0].init);
                Messenger.sendInfoMessage("You have cancelled the trade.", currentlyTrading[0].rec);
                delete currentlyTrading[0];
            }
        } else {
            //handle nonsense commands
        }

    } else if (cb.settings.catch_pokemon === 0 && msg.has_tokens === true && pokemonUsers[msg.user] === undefined) {
        users.add(msg.user, getRandomPokemon(0), 0);
    }

    if (pokemonUsers[msg.user] !== undefined) {
        msg.m = pokedex.icon(pokemonUsers[msg.user].pokemon) + " " + msg.m;
        msg.background = pokedex.data[pokemonUsers[msg.user].pokemon].type.bgcolor;
    }

    return msg;
});



function getRandomPokemon(amount?: number) {
    var rnd = 0;
    var assignRarity = rarity.common;

    if (amount >= cb.settings.uncommon_tip) {
        assignRarity = rarity.uncommon;
    }

    if (amount >= cb.settings.rare_tip) {
        assignRarity = rarity.rare;
    }
    /*
    if (amount >= cb.settings.legendary_tip)
    {
        assignRarity = rarity.legendary;
    }
    */
    //while (rnd === 0 || pokedex.data[rnd].stage !== 1 || pokedex.data[rnd].rarity !== assignRarity) { //use this once pokedex is complete
    while (rnd === 0 || pokedex.data[rnd].rarity !== assignRarity) {
        rnd = Math.floor(Math.random() * pokedex.data.length);
    }
    return rnd;
}

function recordTip(user, amount) {
    if (pokemonUsers[user] === undefined && cb.settings.catch_pokemon <= amount) {
        users.add(user, getRandomPokemon(amount), amount);
    } else if (pokemonUsers[user] !== undefined && pokemonUsers[user]["buystone_confirm"] === true) {
        if (amount === cb.settings.stone_price) {
            Messenger.sendInfoMessage("You just purchased a " + pokedex.data[pokemonUsers[user].pokemon].type.stone + "!", user);
            pokemonUsers[user]["buystone_warning"] = false;
            pokemonUsers[user]["buystone_confirm"] = false;
            users.evolve(user);
        }

    }
    if (pokemonUsers[user] !== undefined) {

        pokemonUsers[user].totaltips += amount;
        users.levelUp(user, Math.floor(amount / cb.settings.level_pokemon));

    }
}

function isSuperuser(username, isMod) {
    return (username == cb.room_slug || isMod && cb.settings.allow_mod_superuser_cmd == true);
}

cb.onTip(function (tip) {
    recordTip(tip.from_user, tip.amount);
});



cb.onEnter(function (user) {


    var welcome = {

        data: [
            { entry: ":pkmnoak Hello there, " + user['user'] + "! Welcome to the world of Chaturbate!" },
            { entry: "Here you will find " + cb.room_slug + "'s room is inhabited by creatures called Pokemon!" },
            { entry: "The number of registered Pokemon in the Pokedex is currently at " + eval(pokedex.data.length - 1) },
            { entry: "There are still more Pokemon are waiting to be discovered" },
            { entry: "Keep an eye out for them in the future!" }
        ],
        show: function () {
            var tempStr = "";
            var tempChr = "  \uD834\uDD4F\n"
            for (num = 0; num < this.data.length; num++) {
                tempStr += this.data[num].entry
                if (eval(this.data.length - 1) != num) {
                    tempStr += tempChr;
                } else {
                    tempStr += "  \u25CF";
                }

            }
            return tempStr;
        }

    };

    if (pokemonUsers[user['user']] === undefined) {
        Messenger.sendInfoMessage(welcome.show(), user['user'], null);
    }
    if (user['user'] === Application.OriginalAuthor) { //Lets me if I can help out or not. ~Asudem
        if (cb.settings.allow_mod_superuser_cmd) {
            Messenger.sendSuccessMessage("Pokedex v" + Application.Version + " Support Mode: ON!", Application.OriginalAuthor, null);
        } else {
            Messenger.sendErrorMessage("Pokedex v" + Application.Version + " Support Mode: OFF!", Application.OriginalAuthor, null);
        }
    }

});

var banner = {
    data: [
        { entry: "Pokemon! Catch 'em all with tokens!" },
        { entry: "'/level' to see a Pokemon's level!" },
        { entry: "'/identify' uses the Pokedex!" },
        { entry: "'/trade' to trade!" },
        { entry: "'/release' to remove your Pokemon" },
        { entry: "Prices:" }
    ],
    start: function () {
        var tempStr = "";
        var tempChr = " :pkmnball ";
        for (num = 0; num < banner.data.length; num++) {
            tempStr += banner.data[num].entry;
            if (eval(banner.data.length - 1) != num) {
                tempStr += tempChr;
            }
        }
        var tempRarity = [rarity.common, rarity.uncommon, rarity.rare];
        var tempPrices = [cb.settings.catch_pokemon, cb.settings.uncommon_tip, cb.settings.rare_tip];

        for (num = 0; num < tempRarity.length; num++) {
            var tempPkmn = 0;
            while (tempPkmn === 0 || pokedex.data[tempPkmn].rarity !== tempRarity[num]) {
                tempPkmn = Math.floor(Math.random() * pokedex.data.length);
            }

            tempStr += " " + tempRarity[num].type + " - " + tempPrices[num] + " Tokens - " +
                pokedex.icon(tempPkmn) + " " + tempChr;
        }
        Messenger.sendGenericMessage(tempStr, null, null);
        cb.setTimeout(banner.start, cb.settings.banner_rotate * 1000)
    }

};

var settingsHelper = {
    parseBoolean: function (str) {
        return (str == "Yes");
    }
};

function parseOptions() {
    cb.settings.allow_mod_superuser_cmd = settingsHelper.parseBoolean(cb.settings.mod_allow_broadcaster_cmd);
}

var Groups = {
    TokenHolders: 'cyan',
    Tippers: 'blue',
    Fans: 'green',
    Moderators: 'red',
};

function init() {
    Application.StartupTime = new Date();
    parseOptions();

    Messenger.sendSuccessMessage("Pokedex v" + Application.Version + " started.", null);
    users.init();
    if (SpecialThanks[cb.room_slug] !== undefined) {

        Messenger.sendBroadcasterNotice("Hello " + cb.room_slug +
            "! Asudem, the Pokedex bot developer, has a special message for you: Thank you for " +
            SpecialThanks[cb.room_slug].reason);
    }
    Messenger.sendBroadcasterNotice("This Pokedex bot is in beta. It can not become better if I do not know what is wrong. Please comment on the bot's page any errors or questions. Thank you.");
    //Banner disabled for now
    cb.setTimeout(banner.start, cb.settings.banner_rotate * 1000)
}

//Change conditional if statement if required
if (true) {
    init();
}