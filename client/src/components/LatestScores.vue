<template>
  <div class="container">

    <div class="title is-4">
      Latest scores:
    </div>
    <div v-for="score in store.latestScores">
      <div class="level">
        <div class="level-left">
          <div class="level-item">

            <p class="subtitle is-5">
              {{ relativeDate(score.datetime) }}
            </p>
          </div>
          <div class="level-item">
            <p class="subtitle is-4">
              {{score.userName }}
            </p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <p class="subtitle is-4">
              {{score.score.nCorrect }} / {{ score.score.nQuestions }}
            </p>
          </div>
        </div>

      </div>
    </div>


    <!-- There's only one button but without is-grouped it wont center (is-centered did not do it)-->
    <div id="new-game" class="field is-grouped is-grouped-centered">
      <p class="control">
        <button class="button is-primary" @click="startNewGame()">Play again</button>
      </p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  import { ACTION_FETCH_LATEST_SCORES, ACTION_START_NEW_GAME } from "../actions";
  import { dispatch, store } from "../store";

  export default {
    name: "latest-scores",
    props: [],
    beforeCreate() {
      dispatch({ type: ACTION_FETCH_LATEST_SCORES })
    },
    data() {
      // I would do scores: store.latestScores but the watchers would not be right. Sort-of fragile setup.
      return { store }
    },
    methods: {
      startNewGame() {
        dispatch({ type: ACTION_START_NEW_GAME })
      },
      relativeDate(dateStr) {
        let m = moment.parseZone(dateStr)
        return m.fromNow()
      }
    }
  }
</script>

<style scoped>
  div.title {
    margin-top: 5%;
  }
  #new-game {
    margin-top:2em;
  }
</style>
