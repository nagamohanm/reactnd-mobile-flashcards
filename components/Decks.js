import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { Asset, AppLoading, Font } from 'expo'
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import styled from 'styled-components/native'

import {
  GreenView,
  DeckView,
  DeckTitleText,
  DeckSubTitleText,
  ButtonGreen,
  ButtonText,
  GridTop,
  GridFooter
} from './styledComponents'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { white } from '../utils/colors'

class Decks extends Component {
  state = {
    isReady: false
  }

  async _getDataAndCacheResourcesAsync(dispatch) {
    await getDecks().then(decks => dispatch(receiveDecks(decks)))
    await Font.loadAsync({
      'roboto-light': require('../assets/fonts/Roboto-Light.ttf')
    })
  }

  componentWillUpdate() {
    getDecks().then(decks => this.props.dispatch(receiveDecks(decks)))
  }

  loadingApp = () => {
    return (
      <AppLoading
        startAsync={() =>
          this._getDataAndCacheResourcesAsync(this.props.dispatch)}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.warn}
      />
    )
  }

  decksListView = () => {
    const { decks, navigation } = this.props
    return (
      <GreenView>
        <GridTop>
          {Object.keys(decks).map(deckname => (
            <DeckView
              key={deckname}
              onPress={() =>
                navigation.navigate('Deck', { title: decks[deckname].title })}
            >
              <DeckTitleText>{decks[deckname].title}</DeckTitleText>
              <DeckSubTitleText>
                {decks[deckname].questions.length} Card(s)
              </DeckSubTitleText>
            </DeckView>
          ))}
        </GridTop>
        <GridFooter>
          <ButtonGreen onPress={() => navigation.navigate('addDeck')}>
            <ButtonText>Add Deck</ButtonText>
          </ButtonGreen>
        </GridFooter>
      </GreenView>
    )
  }

  render() {
    let DecksView = null

    if (!this.state.isReady) {
      DecksView = this.loadingApp
    } else {
      DecksView = this.decksListView
    }

    return <DecksView />
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
