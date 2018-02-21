<template>

  <div class="section">
    <div class="container" style="text-align: center">
        <img src="./assets/vue.png">
        <img src="./assets/flask.png">
        <img src="./assets/docker.png">



      <game-over v-if="game.isOver" :nQuestions="game.nQuestionsInQuiz" :score="game.score"/>

      <div v-else>
      <span v-if="game.currentQuestionIndex !== 0">
        Current score: {{ game.score }} /
        {{ game.currentQuestionIndex + (game.currentQuestion.userAnswer === undefined ? 0 : 1)}}
      </span>

        <quiz-question :question="game.currentQuestion"/>

      </div>


    </div>
  </div>
</template>

<script>
import QuizQuestion from './components/QuizQuestion'
import GameOver from './components/GameOver'
import { store } from './store'

export default {
  name: 'App',
  components: {
    QuizQuestion,
    GameOver
  },
  data: function() {
    return { game: store }
  }
}
</script>

<style>
  img {
    width: 48px;
    height: 48px;
  }
</style>
