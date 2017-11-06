import {
  RECEIVE_DECKS,
  CREATE_NEW_DECK,
  CREATE_NEW_CARD,
  UPDATE_SUCCESS,
} from "../actions"
import { getDecks } from "../utils/api"

function decks (state = {}, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return action.decks
    case CREATE_NEW_DECK:
      return ( {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
          correct: 0,
        }
      })
    case CREATE_NEW_CARD:
      state[action.deckName].questions.push({question: action.question, answer: action.answer})
      return state
    case UPDATE_SUCCESS:
      state[action.deckName].correct = action.correct
      return state
    default:
      return state
  }
}

export default decks