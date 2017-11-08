import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import {
  MyKeyboardAvoidingView,
  MyTextInput,
  GridTop,
  BigBlueText,
  GreenLightView,
  Button,
  ButtonGreen,
  ButtonText,
} from './styledComponents'
import { createNewDeck } from '../actions'
import { gray, darkred } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class addDeck extends Component {
  state = {
    text: 'Enter your Title',
    color: gray,
  }

  onSubmitForm = () => {
    const title = this.state.text

    if (title === '' || title === 'Enter your Title') {
      this.setState({ text: 'Enter your Title', color: darkred })
    } else {
      this.props.createNewDeck(title)
      saveDeckTitle(title)
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: 'Deck',
          params: {
            deck: {
              title,
              questions: [],
            },
          },
        })
      )
    }
  }

  render() {
    return (
      <GreenLightView>
        <MyKeyboardAvoidingView>
          <GridTop>
            <BigBlueText>Title of Deck</BigBlueText>
            <MyTextInput
              onChangeText={text => this.setState({ text })}
              placeholder={this.state.text}
              placeholderTextColor={this.state.color}
              maxLength={15}
            />
            <View style={{ height: 50 }} />
            <GridTop>
              <ButtonGreen onPress={() => this.onSubmitForm()}>
                <ButtonText>Submit Deck</ButtonText>
              </ButtonGreen>
            </GridTop>
          </GridTop>
        </MyKeyboardAvoidingView>
      </GreenLightView>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps, { createNewDeck })(addDeck)
