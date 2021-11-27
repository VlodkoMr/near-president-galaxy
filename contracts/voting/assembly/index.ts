import { Context, logging, PersistentMap, PersistentVector } from "near-sdk-as";
import { Candidate, candidates, votes } from './model';

// near call $CONTRACT_NAME addCandidate '{"name":"New Man"}' --accountId vlodkow.testnet
// near call $CONTRACT_NAME addCandidate '{"name":"Donald Trump"}' --accountId vlodkow.testnet
export function addCandidate(name: string): void {
    assert(name.length > 1, "Please provide full candidate name!");
    assert(name != 'Joe Biden', "Sorry Joe, no more chances :)");
    assert(name != 'Donald Trump', "Nooooo!!! Sorry, you tried :)");
    let isCandidate: boolean = false;
    for (let i = 0; i < candidates.length; i++) {
        if (name == candidates[i].name) {
            isCandidate = true;
        }
    }
    assert(!isCandidate, "Candidate already exists.");

    const id = candidates.length + 1;
    const newCandidate = new Candidate(name, id);
    candidates.push(newCandidate);
}

// near view $CONTRACT_NAME allCandidates ''
export function allCandidates(): Array<Candidate> | null {
    const result = new Array<Candidate>();
    logging.log(`candidates.length: ${candidates.length}`);
    for (let i = 0; i < candidates.length; i++) {
        result.push(candidates[i]);
    }
    return result;
}

// near call $CONTRACT_NAME vote '{"id":1}' --accountId vlodkow.testnet
export function vote(id: u32): void {
    let candidateIndex: u32;
    let isCandidate: boolean = false;
    for (let i = 0; i < candidates.length; i++) {
        if (id == candidates[i].id) {
            candidateIndex = i;
            isCandidate = true;
        }
    }
    assert(isCandidate, "Candidate not found, please check ID.");

    let myVotes = new PersistentVector<u32>("mv");
    if (votes.contains(Context.sender)) {
        myVotes = votes.getSome(Context.sender);
        if (myVotes) {
            for (let i = 0; i < myVotes.length; i++) {
                assert(id != myVotes[i], "You already voted for this Candidate!");
            }
        }
    }

    myVotes.push(id);
    votes.set(Context.sender, myVotes);

    const oneCandidate = candidates[candidateIndex];
    oneCandidate.totalVotes += 1;
    candidates[candidateIndex] = oneCandidate;
}
