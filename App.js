import React from 'react'
import { View, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { Constants } from 'expo'
import { StackNavigator } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { white, darkestgreen, darkgreen } from './utils/colors'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import addDeck from './components/AddDeck'
import addCard from './components/AddCard'
import { setLocalNotification } from './utils/notifications'

const Stack = StackNavigator({
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

const StatusBarView = styled.View`
  height: ${Constants.statusBarHeight};
  background: ${ darkestgreen };
`

export default class App extends React.Component {

  componentDidMount (){
    setLocalNotification()
  }

  render(){
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <StatusBarView>
            <StatusBar
              translucent
              backgroundColor={darkestgreen}
              barStyle="light-content"
            />
          </StatusBarView>
          <Stack/>
        </View>
      </Provider>
    )
  }
}