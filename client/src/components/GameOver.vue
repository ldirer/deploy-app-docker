<template>
  <div class="container">


    <div class="title is-4">

      You scored {{score}} out of {{nQuestions}} questions.
      <br>
      {{getMessageFromScore(score, nQuestions)}}
      <br>
      <img v-if="score === nQuestions" src="../assets/watman.jpg" alt="watman">
    </div>

    <p v-if="!alreadySavedScore">Enter a name to be featured on the latest scores:
    </p>
    <p v-else>
      Congrats! Wat now?
    </p>

    <!--again I could use v-if but it would offset the layout when disappearing.-->
    <div class="field has-addons has-addons-centered" :style="{visibility: alreadySavedScore ? 'hidden' : 'visible'}">
      <div class="control">
        <input type="text" class="input" placeholder="Some bad ass name" v-model.trim="userName">
      </div>
      <div class="control" @click="submitScore()">
        <!-- tabindex: 0 - makes our button tab-reachable (if we use link-buttons, lets the document decide on the order-->
        <button class="button is-primary">Go</button>
      </div>
    </div>


    <div class="field is-grouped is-grouped-centered">

      <p class="control">
        <button class="button is-success" @click="startNewGame()">New game</button>
      </p>
      <p class="control">
        <button class="button is-info" @click="goToScoreBoard()">See latest scores</button>
      </p>
    </div>

    <div style="text-align: center;">

      <div class="qz-tweet-button-wrap">
        <a class="qz-tweet-button is-twitter" :href="tweetUrl" title="You're actually going to click that. Wat.">
          <span class="qz-icon"></span>
          <span class="qz-after-icon">Tweet your score</span>
        </a>
      </div>

    </div>
  </div>

</template>

<script>
  import { getMessageFromScore, dispatch } from '../store'
  import { ACTION_GO_TO_LATEST_SCORES, ACTION_START_NEW_GAME, ACTION_SUBMIT_SCORE } from "../actions";

  export default {
    name: "game-over",
    props: ['score', 'nQuestions', 'alreadySavedScore'],
    data() {
      return { userName: '' }
    },
    methods: {
      startNewGame() {
        dispatch({ type: ACTION_START_NEW_GAME })
      },
      submitScore() {
        dispatch({ type: ACTION_SUBMIT_SCORE, payload: { userName: this.userName } })

      },
      goToScoreBoard() {
        console.log('in gotoscoreboard')
        dispatch({ type: ACTION_GO_TO_LATEST_SCORES })
      },
      getMessageFromScore
    },
    computed: {
      tweetUrl() {
        let text = `Do you know your Python and JS quirks? I scored ${this.score} out of ${this.nQuestions}. Take the quiz! http://quiz.wat.ldirer.com`
        return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text)
      }
    }
  }
</script>

<style scoped>
  div.title {
    margin-top: 5%;
  }

  .is-twitter {
    background-color: #00aced;
    color: whitesmoke;
  }

  .is-twitter .qz-icon {
    position: absolute;
    width: 16px;
    height: 13px;
    top: 50%;
    left: 3px;
    margin-top: -6px;
    background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'><path fill='none' d='M0 0h72v72H0z'/><path class='icon' fill='%23fff' d='M68.812 15.14a26.189 26.189 0 0 1-7.52 2.06 13.125 13.125 0 0 0 5.757-7.243 26.133 26.133 0 0 1-8.314 3.176A13.066 13.066 0 0 0 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396a13.057 13.057 0 0 0-1.77 6.58c0 4.543 2.312 8.552 5.824 10.9a13.05 13.05 0 0 1-5.93-1.64c-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09a26.29 26.29 0 0 1-16.26 5.605c-1.055 0-2.096-.06-3.122-.184a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693a26.61 26.61 0 0 0 6.532-6.774z'/></svg>") 1px no-repeat;
  }

  .qz-tweet-button .qz-after-icon {
    /*Need to compensate for width of icon that is absolutely positioned. */
    padding-left: 16px;
  }

  .qz-tweet-button {
    padding: 5px;
    border: 2px;
    border-radius: 4px;
    font-size: smaller;
    font-weight: bolder;
  }

  .qz-tweet-button-wrap {
    /* Will be reference for positioning icon */
    position: relative;
    display: inline-block;
    margin: auto;
  }

</style>
