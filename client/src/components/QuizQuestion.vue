<template>
  <div class="container">

    <img class="logo" v-if="logoSrc" v-bind:src="logoSrc">

    <div class="content">
      <div class="qz-snippet is-centered" v-html="marked(question.text)">
      </div>
    </div>


    <div class="field is-grouped is-grouped-centered">
      <!--Columns are only from tablet onwards so they'll stack on mobile-->
      <!-- is-multiline to get several rows. Finally!... -->
      <div class="columns is-centered is-multiline" style="margin: auto">
        <div class="column is-6" v-for="choice in question.choices">
          <!--<p class="control">-->
            <!-- Note we HAVE to use buttons if we want proper disabled behavior! (not a tags like in Bulma examples) -->
            <button class="button is-primary qz-choice-button"
                    :disabled="question.userAnswer !== undefined" @click="submitAnswer(choice)">
              {{choice}}
            </button>
          <!--</p>-->

        </div>

      </div>
    </div>


    <div v-if="question.userAnswer !== undefined" style="text-align: center;">
      <div v-if="question.isCorrect">
        Good job!
      </div>
      <div v-else>
        Nope! The answer was: {{question.answer}}
      </div>

      <!--Set display inline-block so it is centered like the rest.-->
      <p class="control" style="display: inline-block; margin: 1em 0 1em 0">
        <button class="button is-primary" @click="goToNextQuestion()">Go to next question</button>
      </p>

      <p style="font-style: italic">
        {{ question.data.comment || ''}}
      </p>
    </div>

  </div>

</template>

<script>

  import * as marked from 'marked';

  import {dispatch} from '../store'
  import { ACTION_GO_TO_NEXT_QUESTION, ACTION_SUBMIT_ANSWER } from "../actions";


  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })


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
    },
    computed: {
      logoSrc() {
        let fileMap = {
          'javascript': 'js.jpg',
          'js': 'js.jpg',
          'python': 'python.png'
        }
        let file = fileMap[this.question.data.language]
        if (file === undefined) {
          return undefined
        }
        // Note the quotes!!
        return require(`../assets/${file}`)
      }
    }
  }
</script>

<style scoped>

  .qz-choice-button {
    /* 100% width means all buttons have the size of the biggest one.*/
    width: 100%;
    /* Overriding bulma height 2.25em. Combined with white-space it allows multi-line buttons.*/
    height: 100%;
    white-space: normal;
  }

  .column {
    padding: 0.5rem; /*from 0.75rem default*/
  }

</style>

<style>

  /*NOT SCOPED. Does not work with vue-html*/
  .qz-snippet {
    text-align: left;
    /*That's bad on mobile, max-content means we overflow the device width.*/
    /*width: max-content;*/
    /*margin: auto;*/
    /*overflow-wrap: break-word;*/
    /*word-break: break-all;*/

    display: flex;
    flex-direction: column;
    align-items: center;

  }


  .qz-snippet pre {
    overflow-x: auto;
    /* max-width because we want it 100% on mobile but not on desktop. (we want width: 100% but not enforced) */
    max-width: 100%;
  }
</style>

