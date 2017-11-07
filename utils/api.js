import { AsyncStorage } from 'react-native'

const KEY = 'STORAGE_KEY'

function getDummyData() {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ],
      correct: 0
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.'
        }
      ],
      correct: 0
    }
  }

  AsyncStorage.setItem(KEY, JSON.stringify(dummyData))

  return dummyData
}

function checkResults(results) {
  // Checks if DB has initial data, if not returns Dummy Data
  if (results === null) {
    return getDummyData()
  }
  return JSON.parse(results)
}

export function getDecks() {
  // returns all Decks, Questions and Answers
  return AsyncStorage.getItem(KEY).then(checkResults)
}

export function saveDeckTitle(title) {
  // Saves new Deck
  return AsyncStorage.mergeItem(
    KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
        success: 0
      }
    })
  )
}

export function addCardToDeck(title, card) {
  // Saves new card to a deck
  // This might be way to complex!!!
  AsyncStorage.getItem(KEY, (err, result) => {
    const res = JSON.parse(result)
    res[title].questions.push(card)
    AsyncStorage.mergeItem(
      KEY,
      JSON.stringify({
        [title]: {
          questions: res[title].questions
        }
      })
    )
  })
}
