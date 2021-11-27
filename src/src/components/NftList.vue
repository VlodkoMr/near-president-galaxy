<template>
  <div class="main-window">
    <h1 class="mb-3 text-center">Space Ranger <b style="color: rgb(75, 213, 238)">{{ user.accountId }}</b></h1>
    <hr>

    <section v-if="!addCandidate">
      <h3 class="mt-3 mb-4 text-center" style="color: #FFFF82">Select your Galaxy Emperor:</h3>
      <div v-if="!candidates.length" class="text-center">
        <i>*No Candidates</i>
      </div>
      <div v-if="candidates.length" class="text-center">
        <div v-for="candidate in candidates" :key="candidate.id" class="one-candidate">
          <div class="text-right">{{ candidate.name }}</div>
          <div>
            <button class="btn btn-outline-light"
                    :class="{selected: isSelected(candidate.id)}"
                    @click="vote(candidate.id)">VOTE
            </button>
          </div>
          <div class="text-right">
            <small class="text-secondary">Total Votes: {{ candidate.totalVotes }}</small>
          </div>
        </div>
      </div>
    </section>

    <section v-if="addCandidate">
      <div style="width: 442px; margin: auto">
        <div v-if="!candidateAdded">
          <div class="btn-group mt-4 mb-4">
            <input type="text" class="form-control"
                   placeholder="Candidate Name"
                   maxlength="30" v-model="candidateName" style="width: 300px; padding: 10px;"/>
            <button class="btn btn-primary" style="width: 142px;" @click="addRun()">Add Candidate</button>
          </div>
          <button @click="addCandidate = false" class="btn btn-link">&laquo; back</button>
        </div>

        <div class="mt-4 mb-4 text-center" v-if="candidateAdded">
          <b>Candidate Successfully Added!</b>
        </div>
      </div>
    </section>

  </div>
  <div class="text-center">
    <button class="btn btn-outline-primary" style="margin-right: 30px;"
            v-if="!addCandidate"
            @click="addCandidateShow()">ADD MY CANDIDATE
    </button>
    <button class="btn btn-outline-secondary sign-out" v-if="user" @click="signOut()">SIGN OUT</button>
  </div>
</template>

<script>
export default {
  name: 'NftList',
  computed: {
    user() {
      return window.currentUser;
    }
  },
  data() {
    return {
      candidates: [],
      ready: false,
      addCandidate: false,
      candidateAdded: false,
      selected: [],
      candidateName: '',
    }
  },
  created() {
    this.loadCandidates();
    const key = `selected-${window.currentUser.accountId}`;
    if (localStorage.getItem(key)) {
      this.selected = JSON.parse(localStorage.getItem(key));
    }
  },
  methods: {
    signOut() {
      window.wallet.signOut();
      window.location.replace(window.location.origin + window.location.pathname);
    },
    isSelected(id) {
      if (this.selected.length) {
        return this.selected.indexOf(id) != -1;
      }
    },
    addCandidateShow() {
      this.addCandidate = true;
    },
    addRun() {
      window.contract.addCandidate({
        name: this.candidateName,
      }).then(() => {
        this.candidateAdded = true;
        this.loadCandidates();

        setTimeout(() => {
          this.candidateAdded = false;
          this.addCandidate = false;
        }, 3000);
      }).catch(err => {
        let text = err.kind.ExecutionError.split(', filename');
        alert(text[0]);
      });
    },
    loadCandidates() {
      window.contract.allCandidates({
        account_id: window.currentUser.accountId,
        from_index: "0",
        limit: 20
      }).then((result) => {
        this.candidates = [];
        Object.keys(result).forEach(key => {
          this.candidates.push(result[key]);
        });
        this.ready = true;
      });
    },
    async vote(id) {
      this.selected.push(id);
      localStorage.setItem(`selected-${window.currentUser.accountId}`, JSON.stringify(this.selected));

      window.contract.vote({
        id: id,
      }).then(result => {
        console.log(result);
        this.loadCandidates();
      }).catch(err => {
        let text = err.kind.ExecutionError.split(', filename');
        alert(text[0]);
      });
    },
  }
}
</script>

<style>
.main-window {
  position: relative;
  width: 65%;
  margin: 50px auto;
  border: 1px solid rgba(255, 255, 255, .5);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .5);
  background: inherit;
  overflow: hidden;
  padding: 30px;
  border-radius: 10px;
  color: #FFF;
}

.main-window:after {
  box-shadow: inset 0 0 1000px rgba(255, 255, 255, .3);
  filter: blur(10px);
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.one-candidate {
  padding: 16px;
  font-size: 20px;
  text-align: left;
  z-index: 3;
  display: grid;
  grid-template-columns: 50% 20% auto;
  grid-column-gap: 30px;
}

.text-right {
  text-align: right;
}

.one-candidate:not(:last-child) {
  border-bottom: 1px dashed rgba(255, 255, 255, .3);
}

.selected {
  background: rgb(255, 255, 130) !important;
  border-color: yellow !important;
  color: #000 !important;
}

</style>
