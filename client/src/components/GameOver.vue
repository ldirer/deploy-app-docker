<template>
  <div class="container">

    You scored {{score}} out of {{nQuestions}} questions.

    Not bad!

    Enter a name to be featured on the latest scores:
    <div class="field has-addons">
      <div class="control">
        <input type="text" class="input" placeholder="Some bad ass name" v-model.trim="userName">
      </div>
      <div class="control" @click="submitScore()">
        <!-- tabindex: 0 - makes our button tab-reachable, lets the document decide on the order-->
        <a tabindex="0" class="button is-primary">Go</a>
      </div>
    </div>



    <p class="control">
      <a tabindex="0" class="button is-primary" @click="startNewGame()">New game</a>
    </p>

  </div>

</template>

<script>
  import {dispatch} from '../store'
  import { ACTION_START_NEW_GAME, ACTION_SUBMIT_SCORE } from "../actions";

  export default {
    name: "game-over",
    props: ['score', 'nQuestions'],
    data() {
      return { userName: ''}
    },
    methods: {
      startNewGame() {
        dispatch({type: ACTION_START_NEW_GAME})
      },
      submitScore() {
        dispatch({type: ACTION_SUBMIT_SCORE, payload: {userName: this.userName}})

      }
    }
  }
</script>
