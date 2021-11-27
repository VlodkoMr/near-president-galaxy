import { PersistentVector, PersistentMap } from "near-sdk-as";

/**
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class Candidate {
    id: u32;
    name: string;
    totalVotes: u32;

    constructor(name: string, id: u32) {
        this.id = id;
        this.name = name;
        this.totalVotes = 0;
    }
}

export const candidates = new PersistentVector<Candidate>("cnd");
export const votes = new PersistentMap<string, PersistentVector<u32>>("vt");
