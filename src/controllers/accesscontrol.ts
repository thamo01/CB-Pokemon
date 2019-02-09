type Claim = "IS_DEV" | "IS_BROADCASTER" | "IS_MOD" | "IS_HELPER" | "IN_FANCLUB" | "HAS_TOKEN" | "";
type PermissionLevel = "DEV" | "MOD" | "SUPERUSER" | "USER";

export default class AccessControl {

    constructor(
        public modsAllowed: boolean,
        private dev: string,
        private helpers: string[],
    ) {}

    public hasClaim(origin: message | user, claim: Claim): boolean {
        return this.getClaims(origin).includes(claim);
    }

    public getClaims(origin: message | user): Claim[] {
        const claims: Claim[] = [];

        if (origin.user === this.dev) {
            claims.push("IS_DEV");
        }

        if (origin.user === cb.room_slug) {
            claims.push("IS_BROADCASTER");
        }

        if (this.helpers.includes(origin.user)) {
            claims.push("IS_HELPER");
        }

        if (origin.is_mod) {
            claims.push("IS_MOD");
        }

        if (origin.in_fanclub) {
            claims.push("IN_FANCLUB");
        }

        return claims;
    }

    public hasPermission(origin: message | user, permission: PermissionLevel): boolean {
        if (this.hasClaim(origin, "IS_DEV")) {
            return true;
        }

        const hasAnyClaim = (claims: Claim[]): boolean => {
            if (this.getClaims(origin).some((claim) => (claims.includes(claim)))) {
                return true;
            }
            return false;
        };

        switch (permission) {
            case "MOD":
                if (this.modsAllowed) {
                    return hasAnyClaim(["IS_BROADCASTER", "IS_MOD"]);
                } else {
                    return hasAnyClaim(["IS_BROADCASTER"]);
                }
            case "SUPERUSER":
                if (this.modsAllowed) {
                    return hasAnyClaim(["IS_BROADCASTER", "IS_MOD", "IS_HELPER"]);
                } else {
                    return hasAnyClaim(["IS_BROADCASTER"]);
                }
            case "USER":
                return hasAnyClaim(["IS_BROADCASTER", "IS_MOD", "IS_HELPER", "IN_FANCLUB", "HAS_TOKEN"]);
            default:
                return false;
        }
    }
}
