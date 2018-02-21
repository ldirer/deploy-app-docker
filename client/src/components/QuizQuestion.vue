<template>
  <div class="container">

    <div class="content">
      <div class="qz-snippet is-centered" v-html="marked(question.text)">
      </div>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <p class="control" v-for="choice in question.choices">
        <!-- Note we HAVE to use buttons if we want proper disabled behavior! (not a tags like in Bulma examples) -->
        <button class="button is-primary" :disabled="question.userAnswer !== undefined" @click="submitAnswer(choice)">
          {{choice}}
        </button>
      </p>
    </div>


    <div v-if="question.userAnswer !== undefined">
      <div v-if="question.isCorrect">
        Good job!
      </div>
      <div v-else>
        Nope!
      </div>

      <!--TODO: is last question? what should this component receive... Ideally it would not use all the store attributes.-->
      <!--Set display inline-block so it is centered like the rest.-->
      <p class="control" style="display: inline-block;">
        <a class="button is-primary" @click="goToNextQuestion()">Go to next question</a>
      </p>

    </div>

  </div>

</template>

<script>

  import * as marked from 'marked';
  import {dispatch} from '../store'
  import { ACTION_GO_TO_NEXT_QUESTION, ACTION_SUBMIT_ANSWER } from "../actions";

  export default {
    name: "quiz-question",
    props: ['question'],
    data() {
      return { }
    },
    methods: {
      marked,
      submitAnswer: function (userAnswer) {
        console.log(`Answer ${userAnswer} submitted!`)
        dispatch({type: ACTION_SUBMIT_ANSWER, payload: {id: this.question.id, userAnswer}})
      },
      goToNextQuestion: function () {
        dispatch({type: ACTION_GO_TO_NEXT_QUESTION})
      }
    }
  }
</script>

<style scoped>

  .qz-snippet {
    text-align: left;
    width: max-content;
    margin: auto
  }

</style>
