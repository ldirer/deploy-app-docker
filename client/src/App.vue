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
        <div class="content">
          <div title="A programming quiz built with Vuejs, Flask and Docker." style="display: inline-block; float: left">
            <img class="logo-footer" src="./assets/vue.png">
            <img class="logo-footer" src="./assets/flask.png">
            <img class="logo-footer" src="./assets/docker.png">
          </div>
          &nbsp
          Built by <a href="http://ldirer.com">Laurent Direr</a>

<div class="rc-text" style="float: right; padding-right: 15px;">
<a href="http://www.recurse.com" title="Made with love at the Recurse Center"><span>Made with </span><i class="icon-svg">
<svg viewBox="0 0 511.626 511.627"><g><path d="M475.366,71.951c-24.175-23.606-57.575-35.404-100.215-35.404c-11.8,0-23.843,2.046-36.117,6.136 c-12.279,4.093-23.702,9.615-34.256,16.562c-10.568,6.945-19.65,13.467-27.269,19.556c-7.61,6.091-14.845,12.564-21.696,19.414 c-6.854-6.85-14.087-13.323-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556c-10.564-6.95-21.985-12.468-34.261-16.562 c-12.275-4.089-24.316-6.136-36.116-6.136c-42.637,0-76.039,11.801-100.211,35.404C12.087,95.552,0,128.288,0,170.162 c0,12.753,2.24,25.889,6.711,39.398c4.471,13.514,9.566,25.031,15.275,34.546c5.708,9.514,12.181,18.796,19.414,27.837 c7.233,9.042,12.519,15.27,15.846,18.699c3.33,3.422,5.948,5.899,7.851,7.419L243.25,469.937c3.427,3.429,7.614,5.144,12.562,5.144 s9.138-1.715,12.563-5.137l177.87-171.307c43.588-43.583,65.38-86.41,65.38-128.475C511.626,128.288,499.537,95.552,475.366,71.951 z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
</i><span> at the </span><span class="green">Recurse Center</span>
</a>
</div>
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
<style>
/* https://swag.recurse.com/ */
@font-face {  font-family: 'Open Sans';  font-style: normal;  font-weight: 400;  src: local('Open Sans'), local('OpenSans'), url('data:font/woff2;base64,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') format('woff2');}@font-face {  font-family: 'Open Sans';  font-style: normal;  font-weight: 700;  src: local('Open Sans Bold'), local('OpenSans-Bold'), url('data:font/woff2;base64,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') format('woff2');}.rc-text {  font-family: 'Open Sans', sans-serif;  font-size: 0.85em;  cursor: pointer;  display: inline-block;  position: relative;  overflow: hidden;  white-space: nowrap;}.rc-text strong {  font-weight: bold;}.rc-text a {  color: black;}.rc-text i.icon-svg svg {  width: 1em;  display: inline-block;  -webkit-transform: translateY(2px);      -ms-transform: translateY(2px);          transform: translateY(2px);}.rc-text i.icon-svg svg path {  fill: red;}.rc-text .green,.rc-text:hover a,.rc-text:focus a {  color: #61ae24;  text-decoration: none;}</style>
