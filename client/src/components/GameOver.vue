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
    }
  }
</script>

<style scoped>
  div.title {
    margin-top: 5%;
  }

</style>
