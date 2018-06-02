# CB-Pokemon
This started out as a fork of the Pokemon Bot of asudem.
I was bored on a Sunday and decided to take this, completely port it over to Typescript (another programming language) and extend it bit by bit.

Right now, you don't have any features you get beyond the original version on asudem, you might even have more bugs since this one is not tested ^^.
But since this is Typescript I guess it'll be quicker to add features to it and still have a good program over all.

Currently you have the first 110 Pokemon available (until Weezing).

There are Uncommon Pokemon, Uncommon & Rare Pokemon.
But later on there'll only be Common & Legendary Pokemon and the rest will be dealt with how much ATK a pokemon has. The better a Pokeball the better your Pokemon (the higher the ATK).

I included all the moves of all Pokemon since Generation 1 up to Ultra Sun and Ultra Moon in this bot. The Pokemons of the newer generations are still missing (Dex only goes to 110) but I'll try to include 'em as fast as possible for me.

Battles will be available soon. I'd be glad if people had some input in how I should make battles work. How would you like to have it work? Give me feedback :Dex


Current # of Pokemon: 110
Current # of Attacks: 728
Current # of Types: 18     (All current Pokemontypes)

Current functionality:
- Catch Pokemon with different Pokeballs
- Level 'em up
- Release the pokemon and catch more

- Pokemon Icons
- Colored Background according to Pokemon type

________________________________________________
Commands:

    Broadcaster only:
        "/support" - Allows me to help out with commands if I'm in the room

    Broadcaster, Mods or me with the above command set:
        "/adduser XY 25" - Adds pokemon 25 to user XY
        "/evolve XY" - Evolves the pokemon of the user XY
        "/change XY" - Randomly changes pokemon of the user XY
        "/remove XY" - removes pokemon of the user XY

    All users:
        "/release" - Releases current pokemon
        "/identify XY" - Identify the pokemon of user XY
        "/level XY" - Get level of the pokemon of user XY and get information on how to evolve the pokemon