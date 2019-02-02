import { Type } from "../models/pokemon/types";
import { MsgColors } from "../misc/colors";
import { Groups } from "../misc/groups";
import { Pokemons } from "../models/pokemon/pokemon";

export default class Messenger {

    private static sendMessage(message: string, user?: string, background?: MsgColors, foreground?: MsgColors, weight?: weight, group?: Groups) {
        if (weight === undefined) {
            weight = "bold";
        }
        cb.sendNotice(message, user, background as string, foreground as string, weight, group as group)
    }

    public static sendWelcomeMessage(user?: string) {

        if(user === undefined) {
            user = "Trainer"
        }

        const welcomeMsg = `:pkmnoak Hello there, ${user}! Welcome to the world of Chaturbate!
                            Here you will find ${cb.room_slug}'s room is inhabited by creatures called Pokemon!
                            The number of registered Pokemon in the Pokedex is currently at ${Pokemons.length - 1}
                            There are still more Pokemon are waiting to be discovered.
                            Keep an eye out for them in the future!`;
        this.sendInfoMessage(welcomeMsg, user);
    }

    public static sendMessageToUser(message: string, user: string, background?: MsgColors, foreground?: MsgColors) {
        this.sendMessage(message, user, background, foreground);
    }

    public static sendMessageToGroup(message: string, group: Groups, background?: MsgColors, foreground?: MsgColors) {
        this.sendMessage(message, undefined, background, foreground, undefined, group);
    }

    public static sendBroadcasterNotice(message: string): void {
        this.sendMessageToUser(message, cb.room_slug, MsgColors.Yellow, MsgColors.Purple);
    }

    public static sendErrorMessage(message: string, user?: string, group?: Groups) {
        this.sendMessage(message, user, undefined, MsgColors.Red, undefined, group);
    }

    public static sendWarningMessage(message: string, user?: string, group?: Groups) {
        this.sendMessage(message, user, undefined, MsgColors.Orange, undefined, group);
    }

    public static sendSuccessMessage(message: string, user?: string, group?: Groups) {
        this.sendMessage(message, user, undefined, MsgColors.Green, undefined, group);
    }

    public static sendInfoMessage(message: string, user?: string, group?: Groups) {
        this.sendMessage(message, user, undefined, MsgColors.Black, undefined, group);
    }
}