import React from 'react';
import { StackNavigator } from 'react-navigation';
import { white, darkgreen } from './utils/colors'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import addDeck from './components/AddDeck'
import addCard from './components/AddCard'

export const Stack = StackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'All Decks',
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
    }),
  },
  addDeck: {
    screen: addDeck,
    navigationOptions: {
      title: 'Add Deck',
    },
  },
  addCard: {
    screen: addCard,
    navigationOptions: {
      title: 'Add Card',
    },
  },
},{
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkgreen,
      },
    }
  }
)