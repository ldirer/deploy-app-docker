<template>
  <div style="text-align: center">

    <stamp :show="game.currentQuestion !== undefined && game.currentQuestion.userAnswer !== undefined && game.currentQuestion.data.is_wat"/>

    <game-over v-if="game.isOver" :nQuestions="game.nQuestionsInQuiz" :score="game.score"
               :alreadySavedScore="game.alreadySavedScore"/>


    <div v-else-if="isLoadingQuestions" class="qz-alt-content">
      Questions incoming...<br>
      Get ready!
    </div>

    <div v-else-if="errorLoadingQuestions" class="qz-alt-content">
      Sorry, failed to load questions. You can try refreshing the page.
    </div>

    <div v-else>

      <progress v-show="game.currentQuestionIndex > 0" class="progress qz-progress"
                :value="game.currentQuestionIndex + (game.currentQuestion.userAnswer === undefined ? 0 : 1)"
                :max="game.nQuestionsInQuiz">
      </progress>
      <!--Using 'hidden' rather than a v-if so the layout is not offset when this element is shown on next question.-->
      <span :style="{visibility: (game.currentQuestionIndex !== 0 ? 'visible' : 'hidden')}">
        Current score: {{ game.score }} /
        {{ game.currentQuestionIndex + (game.currentQuestion.userAnswer === undefined ? 0 : 1)}}
      </span>

      <quiz-question :question="game.currentQuestion"/>

    </div>


  </div>
</template>

<script>
  import QuizQuestion from './QuizQuestion'
  import GameOver from './GameOver'
  import { store } from '../store'
  import { ACTION_GET_NEW_GAME } from "../actions";
  import Stamp from './Stamp';

  export default {
    name: "game",
    components: {
      QuizQuestion,
      GameOver,
      Stamp
    },
    data: function () {
      return { game: store }
    },
    computed: {
      isLoadingQuestions() {
        return store.loading[ACTION_GET_NEW_GAME]
      },
      errorLoadingQuestions() {
        return store.errors[ACTION_GET_NEW_GAME]
      }
    }
  }

</script>

<style scoped>
  .qz-alt-content {
    margin-top: 10%;
  }

  progress {
    width: 50%;
    height: 8px;
    margin: auto;
    background: green;
  }
</style>
