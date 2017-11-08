import React, { Component } from 'react'
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
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notifications'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOver: false,
      showAnswer: false,
      correctAnswers: 0,
      index: 0,
    }
  }

  updateQuizAndNavigate = () => {
    const { decks, navigation } = this.props
    const { title, id } = navigation.state.params
    console.log('id', id)
    console.log('index', this.state.index)
    console.log('correct', this.state.correctAnswers)
    // Count correct Answer and Store this in the Redux Store
    this.props.dispatch(updateSuccess(id, this.state.correctAnswers))
  }

  submitAnswer = value => {
    this.setState((prevState, props) => {
      const { decks, navigation } = this.props
      const { id } = navigation.state.params
      const currentdeck = decks[id]
      const isOver = prevState.index === currentdeck.questions.length - 1

      return {
        isOver,
        index: prevState.index + (isOver ? 0 : 1),
        correctAnswers: prevState.correctAnswers + (value ? 1 : 0),
      }
    }, this.updateQuizAndNavigate)
  }

  showAnswer = () => {
    this.setState(() => ({ showAnswer: true }))
  }

  showQuestion = () => {
    this.setState(() => ({ showAnswer: false }))
  }

  finishQuiz = () => {
    const { decks, navigation } = this.props
    const { id } = navigation.state.params
    navigation.goBack()
    clearLocalNotification().then(setLocalNotification)
  }

  render() {
    const { decks, navigation } = this.props
    const { id } = navigation.state.params
    const currentdeck = decks[id]
    const { correctAnswers, index, isOver } = this.state
    const progress = index / currentdeck.questions.length

    return (
      <GreenLightView>
        {!isOver ? (
          <GreenLightView>
            {Platform.OS === 'ios' ? (
              <ProgressViewIOS
                progress={progress}
                progressTintColor={white}
                trackTintColor={mediumdarkblue}
                progressViewStyle="bar"
                style={{ paddingBottom: 10, marginTop: 20 }}
              />
            ) : (
              <ProgressBarAndroid
                progress={progress}
                color={white}
                trackTintColor={mediumdarkblue}
                styleAttr="Horizontal"
                indeterminate={false}
                style={{ marginTop: 20 }}
              />
            )}

            <SmallBlueText>
              {index + 1}/{currentdeck.questions.length}
            </SmallBlueText>
            {this.state.showAnswer === true ? (
              <GridTop>
                <BlueText>{currentdeck.questions[index].answer}</BlueText>
                <TextLink onPress={() => this.showQuestion()}>
                  <BlueButtonText>Show Question</BlueButtonText>
                </TextLink>
              </GridTop>
            ) : (
              <GridTop>
                <BigBlueText>
                  {currentdeck.questions[index].question}
                </BigBlueText>
                <TextLink onPress={() => this.showAnswer()}>
                  <BlueButtonText>Show Answer</BlueButtonText>
                </TextLink>
              </GridTop>
            )}
            <GridBottom>
              <ButtonGreen onPress={() => this.submitAnswer(true)}>
                <ButtonText>Correct</ButtonText>
              </ButtonGreen>
              <ButtonRed onPress={() => this.submitAnswer(false)}>
                <ButtonText>Incorrect</ButtonText>
              </ButtonRed>
            </GridBottom>
          </GreenLightView>
        ) : (
          <GreenLightView>
            <SmallBlueText>All questions answered!</SmallBlueText>
            <GridTop>
              <SmallBlueText>Correct answers:</SmallBlueText>
              <BigBlueText>
                {Math.round(
                  100 * correctAnswers / currentdeck.questions.length
                )}%
              </BigBlueText>
              <SmallBlueText>
                {`This is ${correctAnswers} out of ${currentdeck.questions
                  .length} questions.`}
              </SmallBlueText>
            </GridTop>
            <GridBottom>
              <ButtonGreen
                onPress={() =>
                  navigation.navigate('Quiz', {
                    title: `${currentdeck.title} Quiz`,
                    id: currentdeck.title,
                  })}
              >
                <ButtonText>Start again</ButtonText>
              </ButtonGreen>
              <Button onPress={() => this.finishQuiz()}>
                <ButtonText>Finish</ButtonText>
              </Button>
            </GridBottom>
          </GreenLightView>
        )}
      </GreenLightView>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(Quiz)
