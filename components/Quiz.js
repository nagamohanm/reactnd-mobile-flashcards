import React, {Component} from 'react'
import { ProgressViewIOS, Platform, ProgressBarAndroid } from 'react-native'
import styled from 'styled-components/native'
import { white, mediumdarkblue, mediumdarkred, darkblue } from '../utils/colors'
import { connect } from 'react-redux'
import { 
  TextLink, 
  GridTop, 
  GridBottom, 
  BigBlueText, 
  SmallBlueText, 
  GreenLightView, 
  Button, 
  ButtonGreen, 
  ButtonText, 
  ButtonRed, 
  BlueText, 
  BlueButtonText,
} from './styledComponents'
import { updateSuccess } from '../actions'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

class Quiz extends Component {

  state = {
    showAnswer: false
  }

  answer = (value) => {
    const { decks, navigation } = this.props
    const { title, id, counter } = navigation.state.params
    console.log('id', id)
    console.log('counter', counter)

    const correct = counter === 0 ? value : decks[id].correct + value

    console.log('correct', correct)
    // Count correct Answer and Store this in the Redux Store
    this.props.dispatch(updateSuccess(id, correct))
    // Go to next Question
    navigation.navigate('Quiz', {
      title,
      id,
      counter: counter+1
    })
  }

  showAnswer = () => {
    this.setState(() => ({showAnswer: true}))
  }

  showQuestion = () => {
    this.setState(() => ({showAnswer: false}))
  }

  finishQuiz = () => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Deck'})
      ]
    }))
    clearLocalNotification().
      then(setLocalNotification)
  }

  render(){
    const {decks, navigation} = this.props
    const {id, counter} = navigation.state.params
    const currentdeck = decks[id]
    const progress = counter/currentdeck.questions.length

    return(
      <GreenLightView>
        { counter<currentdeck.questions.length
          ?
            <GreenLightView>
              {Platform.OS === "ios"
                ?
                  <ProgressViewIOS
                    progress={progress}
                    progressTintColor={white}
                    trackTintColor={mediumdarkblue}
                    progressViewStyle='bar'
                    style={{paddingBottom: 10, marginTop: 20}}
                  />
                :
                <ProgressBarAndroid
                  progress={progress}
                  color={white}
                  trackTintColor={mediumdarkblue}
                  styleAttr = 'Horizontal'
                  indeterminate={false}
                  style={{marginTop: 20}}
                />
              }

              <SmallBlueText>{counter+1}/{currentdeck.questions.length}</SmallBlueText>
              { this.state.showAnswer===true
                ?
                  <GridTop>
                    <BlueText>
                      {currentdeck.questions[counter].answer}
                    </BlueText>
                    <TextLink onPress={()=>(this.showQuestion())}>
                      <BlueButtonText>Show Question</BlueButtonText>
                    </TextLink>
                  </GridTop>
                :
                <GridTop>
                  <BigBlueText>
                    {currentdeck.questions[counter].question}
                  </BigBlueText>
                  <TextLink onPress={()=>(this.showAnswer())}>
                    <BlueButtonText>Show Answer</BlueButtonText>
                  </TextLink>
                </GridTop>
              }
              <GridBottom>
                <ButtonGreen onPress={() => this.answer(1)}>
                  <ButtonText>Correct</ButtonText>
                </ButtonGreen>
                <ButtonRed onPress={() => this.answer(0)}>
                  <ButtonText>Incorrect</ButtonText>
                </ButtonRed>
              </GridBottom>
            </GreenLightView>
          :
          <GreenLightView>
            <SmallBlueText>All questions answered!</SmallBlueText>
            <GridTop>
              <SmallBlueText>
                Correct answers:
              </SmallBlueText>
              <BigBlueText>
                {Math.round(100*currentdeck.correct/currentdeck.questions.length)}%
              </BigBlueText>
              <SmallBlueText>
                {`This is ${currentdeck.correct} out of ${currentdeck.questions.length} questions.`}
              </SmallBlueText>
            </GridTop>
            <GridBottom>
              <ButtonGreen onPress={() => navigation.navigate('Quiz', { title: `${currentdeck.title} Quiz`, id: currentdeck.title, counter: 0 }) }>
                <ButtonText>Start again</ButtonText>
              </ButtonGreen>
              <Button onPress={() => navigation.dispatch(NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Decks'})
                    ]
                  }))}>
                <ButtonText>Finish</ButtonText>
              </Button>
            </GridBottom>
          </GreenLightView>
        }
      </GreenLightView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)