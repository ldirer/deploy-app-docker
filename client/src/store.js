import {
  ACTION_GET_QUESTIONS, ACTION_GET_QUESTIONS_FAILURE,
  ACTION_GET_QUESTIONS_START, ACTION_GET_QUESTIONS_SUCCESS, ACTION_GO_TO_NEXT_QUESTION, ACTION_START_NEW_GAME,
  ACTION_SUBMIT_ANSWER
} from "./actions";


const sampleQuestionText = `
What is the output of the following code?
\`\`\`python3
_MyClass__my_string = 'Trick question?'

class MyClass(object):

    def __init__(self):
        pass

    def get_string(self):
        return __my_string

print(MyClass().get_string())
\`\`\``


export const store = {
  // Note I am not really allowing going back through answers atm.
  currentQuestionIndex: 0,
  nQuestionsInQuiz: 3,

  get currentQuestion() {
    console.log('in currentQuestion')
    console.log('this.questions', this.questions)
    console.log('this.questions[this.currentQuestionIndex]', this.questions[this.currentQuestionIndex])
    return this.questions[this.currentQuestionIndex]
  },

  get isOver() {
    return this.currentQuestionIndex === this.nQuestionsInQuiz
  },

  get score() {
    return this.questions.map(q => q.answer === q.userAnswer).reduce((acc, v) => acc + v, 0)
  },

  questions: range(0, 10).map(id => {
      return {
        id,
        text: sampleQuestionText,
        choices: ['Trick question?', 'NameError', 'What the ...?'],
        answer: 'Trick question?',
        userAnswer: undefined,
        /** This function will return false for unanswered questions. */
        get isCorrect() {
          return this.answer === this.userAnswer;
        }
      }
    }
  ),

  loading: {
    // Remember Vue change detection does now work with addition of new elements, so we need to init all the values.
    // TODO: this should be automated. JUST ANOTHER PROGRAMMER TRAP.
    ACTION_GET_QUESTIONS: false,
  }
}

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
  try {
    response = await promise
  } catch (error) {
    // TODO: we are catching errors in **our dispatch code** as well! Not exactly what we want.
    console.log('error', error.response)
    return dispatch({
      payload: { ...payload, response: error.response || { 'data': 'No response from server' } },
      type: actionFailure
    })
  }
  return dispatch({
    payload: { ...payload, response },
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

// window.range = range

export function getCurrentQuestion() {
  console.log('in getCurrentQuestion')
  return store.questions[store.currentQuestionIndex]
}


function questionReducer(action) {
  if (action.type === ACTION_SUBMIT_ANSWER) {
    let { id, userAnswer } = action.payload
    // We could also just use the current question index. Feels more decoupled that way though.
    let question = store.questions.find(q => q.id === id)
    question.userAnswer = userAnswer
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
    store.currentQuestionIndex = 0
    dispatch({ type: ACTION_GET_QUESTIONS })
  }

  if (action.type === ACTION_GET_QUESTIONS) {
    store.loading[ACTION_GET_QUESTIONS] = true
    registerActionCallbacks(getQuestions(), ACTION_GET_QUESTIONS_SUCCESS, ACTION_GET_QUESTIONS_FAILURE)
  }

  if (action.type === ACTION_GET_QUESTIONS_SUCCESS) {
    let { response } = action.payload
    store.loading[ACTION_GET_QUESTIONS] = false
    store.questions = response.data.results
  }

  if (action.type === ACTION_GET_QUESTIONS_FAILURE) {
    // TODO: Error message somewhere!
    store.loading[ACTION_GET_QUESTIONS] = false
  }

}

async function getQuestions() {
  return {
    data: {
      results: range(0, 10).map(id => {
          return {
            id,
            text: sampleQuestionText,
            choices: ['Trick question?', 'NameError', 'What the ...?'],
            answer: 'Trick question?',
            userAnswer: undefined,
            /** This function will return false for unanswered questions. */
            get isCorrect() {
              return this.answer === this.userAnswer;
            }
          }
        }
      )
    }
  }
}

/** redux-like interface */
export function dispatch(action) {
  console.log(`Received action ${action.type}`)

  let reducers = [questionReducer, gameReducer]
  for (let reducer of reducers) {
    reducer(action)
  }
}





