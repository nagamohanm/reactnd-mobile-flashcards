export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_NEW_DECK = 'CREATE_NEW_DECK'
export const CREATE_NEW_CARD = 'CREATE_NEW_CARD'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function createNewDeck (title) {
  return {
    type: CREATE_NEW_DECK,
    title,
  }
}

export function createNewCard (deckName, question, answer) {
  return {
    type: CREATE_NEW_CARD,
    deckName,
    question,
    answer,
  }
}

export function updateSuccess (deckName, correct){
  return{
    type: UPDATE_SUCCESS,
    deckName,
    correct,
  }
}