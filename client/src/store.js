import {
  ACTION_GET_NEW_GAME, ACTION_GET_NEW_GAME_FAILURE,
  ACTION_GET_NEW_GAME_SUCCESS, ACTION_GO_TO_NEXT_QUESTION, ACTION_START_NEW_GAME,
  ACTION_SUBMIT_ANSWER, ACTION_SUBMIT_SCORE, ACTION_SUBMIT_SCORE_FAILURE, ACTION_SUBMIT_SCORE_SUCCESS,
  ACTION_EMIT_NOTIFICATION, ACTION_GO_TO_LATEST_SCORES, ACTION_FETCH_LATEST_SCORES, ACTION_FETCH_LATEST_SCORES_SUCCESS,
  ACTION_FETCH_LATEST_SCORES_FAILURE, ACTION_TOGGLE_SOUND, ACTION_PLAY_SOUND
} from "./actions";

//Howler.volume(0.5) to change global volume.
import { Howl, Howler } from 'howler';

export const sounds = {
  stamp: new Howl({
    src: [require('./assets/sounds/stamp.wav.mp3')],
    volume: 0.5
  }),

  correct: new Howl({
    src: [require('./assets/sounds/correct.wav.mp3')],
    volume: 0.5
  }),

  wrong: new Howl({
    src: [require('./assets/sounds/wrong.wav.mp3')],
    volume: 0.8
  })
}

// I am not fond of that import right there.
import { myApp } from "./main"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Question {

  constructor(questionData) {
    // We want to initialize the fields that are not typically in our api response.
    this.userAnswer = undefined;
    Object.assign(this, questionData)
  }

  /** This function will return false for unanswered questions. */
  get isCorrect() {
    return this.answer === this.userAnswer;
  }
}

let scoreToMessage = {
  '0': "I'll ask less JavaScript next time.",
  '50': "Not bad!",
  '100': "wat."
}
export function getMessageFromScore(score, nQuestions) {

  function binBy(percentage, binSize) {
    return Math.floor(percentage / binSize) * binSize
  }
  let bin = binBy(Math.floor(100 * score / nQuestions), 50)
  return scoreToMessage[bin]
}


const N_QUESTIONS_IN_QUIZ = 10

export const store = {
  // Note I am not really allowing going back through answers atm.
  currentQuestionIndex: 0,
  nQuestionsInQuiz: N_QUESTIONS_IN_QUIZ,

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex]
  },

  get isOver() {
    return this.currentQuestionIndex === this.nQuestionsInQuiz
  },

  get score() {
    return this.questions.map(q => q.answer === q.userAnswer).reduce((acc, v) => acc + v, 0)
  },
  gameId: 1,
  questions: [],
  loading: {
    // Remember Vue change detection does now work with addition of new elements, so we need to init all the values.
    // This should be automated. If we forget it since will break in a non-obvious way. ANOTHER PROGRAMMER TRAP.
    [ACTION_GET_NEW_GAME]: false,
    [ACTION_SUBMIT_SCORE]: false,
  },
  errors: {
    [ACTION_GET_NEW_GAME]: false,
    [ACTION_SUBMIT_SCORE]: false,
  },

  latestScores: [],
  alreadySavedScore: false,
  soundSettings: {
    isOn: true
  }
}

window.store = store

/**
 * Wait on promise, and dispatch actions passed as arguments on success and on failure.
 *
 * @param promise: For instance an axios object like back.get('/').
 * @param actionSuccess: The action type that will be dispatched on success
 * @param actionFailure: The action type that will be dispatched on failure
 * @param payload: Additional context data to pass to the next action
 */
async function registerActionCallbacks(promise, actionSuccess, actionFailure, payload = {}) {
  if (payload.hasOwnProperty('response')) {
    console.warn('ContextData.response will be overwritten in next dispatch')
  }
  let response
  let responseJson
  try {
    response = await promise
    interceptNetworkErrors(response)
    responseJson = await response.json()
  } catch (error) {
    // TODO: Not sure if we are not catching too many errors here.
    return dispatch({
      payload: { ...payload, response: error || { 'data': 'No response from server' } },
      type: actionFailure
    })
  }
  return dispatch({
    payload: { ...payload, response: responseJson },
    type: actionSuccess
  })
}


/** python-like range, returns an array with integers [start...end[
 */
function range(start, end) {
  let i = start
  let arr = []
  while (i < end) {
    arr.push(i)
    i++
  }
  return arr
}


function questionReducer(action) {
  if (action.type === ACTION_SUBMIT_ANSWER) {
    let { id, userAnswer } = action.payload
    // We could also just use the current question index. Feels more decoupled that way though.
    let question = store.questions.find(q => q.id === id)
    question.userAnswer = userAnswer
    if(question.isCorrect) {
      dispatch({type: ACTION_PLAY_SOUND, payload: {sound: sounds.correct}})
    } else {
      dispatch({type: ACTION_PLAY_SOUND, payload: {sound: sounds.wrong}})
    }
  }


  if (action.type === ACTION_GO_TO_NEXT_QUESTION) {
    if (store.currentQuestionIndex < store.nQuestionsInQuiz) {
      // We allow currentQuestionIndex to go '1 out-of-bounds' so we know its game over (no more questions)
      store.currentQuestionIndex += 1
    } else {
      console.error('store.currentQuestionIndex, store.nQuestionsInQuiz inconsistency (there is no next question)',
        store.currentQuestionIndex, store.nQuestionsInQuiz)
    }
  }
}



function gameReducer(action) {
  if (action.type === ACTION_START_NEW_GAME) {
    // We want to get fresh questions.
    store.questions = []
    store.currentQuestionIndex = 0
    store.alreadySavedScore = false
    dispatch({ type: ACTION_GET_NEW_GAME })

    // When first loading the page myApp is not yet instantiated!
    // This action should redirect to the game if we're not on the right route already.
    if (myApp !== undefined) {
      myApp.$router.push('/')
    }

  }

  if (action.type === ACTION_GET_NEW_GAME) {
    store.loading[ACTION_GET_NEW_GAME] = true
    registerActionCallbacks(getNewGame(), ACTION_GET_NEW_GAME_SUCCESS, ACTION_GET_NEW_GAME_FAILURE)
  }

  if (action.type === ACTION_GET_NEW_GAME_SUCCESS) {
    let { response } = action.payload
    store.errors[ACTION_GET_NEW_GAME] = false
    store.loading[ACTION_GET_NEW_GAME] = false
    store.questions = response.questions.map(questionData => new Question(questionData))
    store.gameId = response.id
  }

  if (action.type === ACTION_GET_NEW_GAME_FAILURE) {
    let { response } = action.payload
    store.loading[ACTION_GET_NEW_GAME] = false
    store.errors[ACTION_GET_NEW_GAME] = true

    let params = {
      title: `WAT.`,
      text: `This app was unable to fetch questions for a new game.<br>I'd blame the developer.`,
      type: 'error',
      duration: -1,  // notif will stay up until clicked.
    }
    dispatch({ type: ACTION_EMIT_NOTIFICATION, payload: { params } })
  }


  if (action.type === ACTION_SUBMIT_SCORE) {
    let { userName } = action.payload
    store.loading[ACTION_SUBMIT_SCORE] = true
    store.errors[ACTION_SUBMIT_SCORE] = ''
    store.userName = userName

    registerActionCallbacks(postScore(), ACTION_SUBMIT_SCORE_SUCCESS, ACTION_SUBMIT_SCORE_FAILURE)
  }

  if (action.type === ACTION_SUBMIT_SCORE_SUCCESS) {
    store.loading[ACTION_SUBMIT_SCORE] = false
    store.alreadySavedScore = true
    let params = {
      title: 'Great success!',
      text: 'Your score has been submitted. Successfully.',
      duration: 3000,
      type: 'success'
    }
    dispatch({ type: ACTION_EMIT_NOTIFICATION, payload: { params } })
  }
  if (action.type === ACTION_SUBMIT_SCORE_FAILURE) {
    store.loading[ACTION_SUBMIT_SCORE] = false
    let params = {
      title: 'Uuuh',
      text: 'Something went wrong and your score could not be submitted!',
      duration: -1,
      type: 'error'
    }
    dispatch({ type: ACTION_EMIT_NOTIFICATION, payload: { params } })

  }


  if (action.type === ACTION_GO_TO_LATEST_SCORES) {
    myApp.$router.push('scores')
    dispatch({ type: ACTION_FETCH_LATEST_SCORES })

  }

  if (action.type === ACTION_FETCH_LATEST_SCORES) {
    if (!store.loading[ACTION_FETCH_LATEST_SCORES]) {
      store.loading[ACTION_FETCH_LATEST_SCORES] = true
      registerActionCallbacks(fetchLatestScores(), ACTION_FETCH_LATEST_SCORES_SUCCESS, ACTION_FETCH_LATEST_SCORES_FAILURE)
    } else {
      // console.log(`action ${ACTION_FETCH_LATEST_SCORES} already loading. Not making a new request.`)
    }
  }

  if (action.type === ACTION_FETCH_LATEST_SCORES_SUCCESS) {
    let { response } = action.payload
    store.loading[ACTION_FETCH_LATEST_SCORES] = false
    store.latestScores = response.results
  }

  if (action.type === ACTION_FETCH_LATEST_SCORES_FAILURE) {
    store.loading[ACTION_FETCH_LATEST_SCORES] = false

    let params = {
      title: `WAT.`,
      text: `Could not get the latest scores from some server.<br>Sorry!`,
      type: 'error',
      duration: -1,  // notif will stay up until clicked.
    }
    dispatch({ type: ACTION_EMIT_NOTIFICATION, payload: { params } })
  }
}

async function fetchLatestScores() {
  return await fetch('/api/scores')
}

async function postScore() {
  return await fetch('/api/scores', {
    body: JSON.stringify({
      userName: store.userName,
      gameId: store.gameId,
      // We might have fetched more questions than we used in the quiz.
      questions: store.questions.slice(0, store.nQuestionsInQuiz)
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'post'
  })
}

async function getNewGame() {
  return await fetch('/api/new_game')
}

function interceptNetworkErrors(response) {
  if (parseInt(response.status / 100) === 2) {
    return Promise.resolve(response)
  }
  // Do something with response error. The request was on our backend so we want to say things might be broken.
  // While we could handle all error codes here, the messages won't be very specific.
  // So we throw an error and handle it elsewhere in the code.
  // Throwing makes sure we break the promise chain.

  // timeout
  if (response.status === 504) {
    let params = {
      title: `Woops`,
      type: 'error',
      text: `Looks like we cant reach some server. <br>The application may not be functioning correctly.`,
      duration: -1,  // notif will stay up until clicked.
    }
    dispatch({ type: ACTION_EMIT_NOTIFICATION, payload: { params } })
  }

  throw new Error('Non-success status code different from 504.')
}

function utilsReducer(action) {
  if (action.type === ACTION_EMIT_NOTIFICATION) {
    let { params } = action.payload
    myApp.$notify(params)
  }

  if (action.type === ACTION_TOGGLE_SOUND) {
    store.soundSettings.isOn = !store.soundSettings.isOn
  }

  if (action.type === ACTION_PLAY_SOUND) {
    let {payload} = action
    if (store.soundSettings.isOn) {
      payload.sound.play()
    }
  }
}


/** redux-like interface */
export function dispatch(action) {

  // Would be nice to have some way to register reducers automagically.
  let reducers = [questionReducer, gameReducer, utilsReducer]
  for (let reducer of reducers) {
    reducer(action)
  }
}


function initState() {
  dispatch({ type: ACTION_START_NEW_GAME })
}

initState()
