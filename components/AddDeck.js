import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { MyKeyboardAvoidingView, MyTextInput, GridTop, BigBlueText, GreenLightView, Button, ButtonGreen, ButtonText } from './styledComponents'
import { createNewDeck } from '../actions'
import { gray, darkred } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions} from 'react-navigation'

class addDeck extends Component {

  state = {
    text: 'Enter your Title',
    color: gray
  }

  onSubmitForm = () => {
    const resetNavigationAndMoveToMainView = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Decks'})
      ]
    })
    if (this.state.text === '' || this.state.text === 'Enter your Title'){
      this.setState({text: "Enter your Title", color: darkred})
    } else {
      this.props.dispatch(createNewDeck(this.state.text))
      saveDeckTitle(this.state.text)
      this.props.navigation.dispatch(resetNavigationAndMoveToMainView)
    }
  }

  render(){
    return(
        <GreenLightView>
          <MyKeyboardAvoidingView>
            <GridTop>
              <BigBlueText>
                Title of Deck
              </BigBlueText>
              <MyTextInput
                onChangeText = {(text) => this.setState({text})}
                placeholder = {this.state.text}
                placeholderTextColor = {this.state.color}
                maxLength = {15}
              />
              <View style={{height:50}}/>
              <GridTop>
                <ButtonGreen onPress={() => this.onSubmitForm()}>
                    <ButtonText>
                      Submit Deck
                    </ButtonText>
                  </ButtonGreen>
                </GridTop>
                </GridTop>
          </MyKeyboardAvoidingView>
        </GreenLightView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(addDeck)