<template>

  <div>

    <github-corner :url="'https://github.com/ldirer/deploy-app-docker'" :title="'See source code'"
                   :theme="'dark'"/>

    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
        <div class="navbar-item">
          <div @click="toggleSound">
            <img v-if="soundSettings.isOn" src="./assets/sound_on.svg" alt="" class="logo">
            <img v-if="!soundSettings.isOn" src="./assets/sound_off.svg" alt="" class="logo">
          </div>
        </div>
        <div class="navbar-item" style="padding-left: 0">
          Programming &nbsp
          <router-link to="watiswat" title="What does this even mean?">WATs</router-link>
        </div>
      </div>
    </nav>


    <div class="section">
      <notifications/>
      <router-view/>

    </div>

    <footer class="footer">
        <div class="content has-text-left">
          <div title="A programming quiz built with Vuejs, Flask and Docker." style="display: inline-block">
            <img class="logo-footer" src="./assets/vue.png">
            <img class="logo-footer" src="./assets/flask.png">
            <img class="logo-footer" src="./assets/docker.png">
          </div>
          &nbsp
          Built by <a href="http://ldirer.com">Laurent Direr</a>
        </div>
    </footer>
  </div>
</template>

<script>
  import QuizQuestion from './components/QuizQuestion'
  import GameOver from './components/GameOver'
  import GithubCorner from './components/GithubCorner'
  import { dispatch } from './store'
  import { ACTION_TOGGLE_SOUND } from "./actions";

  export default {
    name: 'App',
    components: {
      QuizQuestion,
      GameOver,
      GithubCorner
    },
    data: function () {
      return { soundSettings: store.soundSettings }
    },
    methods: {
      toggleSound() {
        dispatch({ type: ACTION_TOGGLE_SOUND })
      }
    }
  }
</script>

<style>
  /* hardcoding bulma mobile breakpoint. This could all go in the scss customization file. */
  @media (max-width: 768px) {

    .github-corner svg {
      display: none
    }

    .footer {
      display: none
    }

    .section {
      /*default 3rem 1.5rem padding*/
      padding: 1.7rem 0.85rem;
    }
  }

  .logo {
    /*width: 48px;*/
    height: 48px;
  }

  .logo-footer {
    height: 24px;
  }

  /* Use all the space on the screen. */
  html, body {
    height: 100%;
    overflow-y: auto;
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: grey;
    padding: 0;
    background: white;

  }

  .footer a {
    text-decoration: none;
    color: grey;
  }

  .footer a:hover {
    color: darkblue;
  }

</style>
