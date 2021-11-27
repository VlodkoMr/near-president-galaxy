<template>
  <div class="container">
    <SignIn v-if="!user"></SignIn>
    <NftList v-if="user"></NftList>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn';
import NftList from '@/components/NftList';

export default {
  name: 'App',
  computed: {
    user() {
      return window.currentUser;
    }
  },
  components: {
    SignIn,
    NftList
  }
}
</script>

<style>
html {
  background: #000;
  height: 100%;
}

body {
  background: transparent !important;
}

.star {
  position: absolute;
  width: 1px;
  height: 1px;
  background-color: white;
}

/* Set the animation, color, size and hide the text */
.intro {
  position: absolute;
  text-align: center;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  animation: intro 6s ease-out .5s;
  color: rgb(75, 213, 238);
  font-weight: 400;
  font-size: 320%;
  opacity: 0;
}

@keyframes intro {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Set the animation & hide the logo */
.logo {
  position: absolute;
  top: 20%;
  left: 42%;
  z-index: 1;
  margin: auto;
  animation: logo 4s ease-out 6.5s;
  opacity: 0;
}

.logo img {
  width: inherit;
}

/* Scale the logo down and maintain it centered */
@keyframes logo {
  0% {
    width: 18em;
    transform: scale(2.75);
    opacity: .8;
  }
  50% {
    opacity: 1;
    width: 18em;
  }
  100% {
    opacity: 0;
    transform: scale(0.2);
    width: 18em;
  }
}

p {
  color: #FFFF82;
}

/* Set the font, lean the board, position it */
#board {
  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  transform: perspective(400px) rotateX(25deg);
  transform-origin: 50% 100%;
  text-align: justify;
  position: absolute;
  margin-left: -9em;
  font-weight: bold;
  overflow: hidden;
  font-size: 350%;
  height: 50em;
  width: 18em;
  bottom: 0;
  left: 50%;
}

#board:after {
  position: absolute;
  content: ' ';
  bottom: 60%;
  left: 0;
  right: 0;
  top: 0;
}

/* Set the scrolling animation and position it */
#content {
  animation: scroll 100s linear 9s;
  position: absolute;
  top: 100%;
}

#title, #subtitle {
  text-align: center;
}

@-webkit-keyframes seconds {
  0% {
    opacity: 0;
    left: -9999px;
  }
  100% {
    opacity: 1;
  }

}

@keyframes seconds {
  0% {
    opacity: 0;
    left: -9999px;
  }
  100% {
    opacity: 1;
  }
}

#last-screen {
  -webkit-animation: seconds 1.0s forwards;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-delay: 5s;
  animation: seconds 2.0s forwards;
  animation-iteration-count: 1;
  animation-delay: 20s;
  position: relative;
  opacity: 0;
  width: 500px;
  font-size: 220%;
  text-align: center;
  margin: auto;
  top: 100px;
  z-index: 99;
}

#last-screen p {
  color: rgb(75, 213, 238);
}

@keyframes scroll {
  0% {
    top: 100%;
  }
  100% {
    top: -170%;
  }
}
</style>