import {
  RECEIVE_DECKS,
  CREATE_NEW_DECK,
  CREATE_NEW_CARD,
  UPDATE_SUCCESS
} from './types'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function createNewDeck(title) {
  return {
    type: CREATE_NEW_DECK,
    title
  }
}

export function createNewCard(deckName, question, answer) {
  return {
    type: CREATE_NEW_CARD,
    deckName,
    question,
    answer
  }
}

export function updateSuccess(deckName, correct) {
  return {
    type: UPDATE_SUCCESS,
    deckName,
    correct
  }
}
