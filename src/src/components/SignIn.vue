<template>
  <div>
    <section class="intro">
      Welcome, Space Ranger! <br>
      <p style="color: #FFF; font-size: 70%;">Today, you can choose a new Emperor of the Galaxy!</p>
    </section>
    <section class="logo">
      <img src="logo.png" alt="">
    </section>
    <div id="board">
      <div id="content">
        <p id="title">More than 5000 years ago</p>
        <p id="subtitle">Near Protocol become a part of our infrastructure, governance and financial system.</p>
        <br>
        <p style="text-align: center">
          Today YOU, as part of the Aurora spaceship can choose a new emperor for you and your nation!
          Make your choice by connecting your own account in Near Protocol.
        </p>
      </div>
    </div>
    <div id="last-screen">
      <p>Sign In using your Near Account:</p>
      <button @click="signIn()" class="btn btn-primary btn-lg" style="padding: 10px 50px;">Sign In</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  methods: {
    signIn() {
      window.wallet.requestSignIn(
          window.nearConfig.contractName,
          'NEAR Galaxy President'
      );
    }
  }
}
</script>
