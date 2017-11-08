import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  GridTop,
  GridBottom,
  BigBlueText,
  SmallBlueText,
  GreenLightView,
  Button,
  ButtonGreen,
  ButtonText,
} from './styledComponents'

const Deck = props => {
  const { navigation } = props
  const { deck } = navigation.state.params

  return (
    <GreenLightView>
      <GridTop>
        <BigBlueText>{deck.title}</BigBlueText>
        <SmallBlueText>{deck.questions.length} Card(s)</SmallBlueText>
      </GridTop>
      <GridBottom>
        <Button
          onPress={() => navigation.navigate('addCard', { id: deck.title })}
        >
          <ButtonText>Add Card</ButtonText>
        </Button>
        {deck.questions.length > 0 && (
          <ButtonGreen
            onPress={() =>
              navigation.navigate('Quiz', {
                title: `${deck.title} Quiz`,
                id: deck.title,
              })}
          >
            <ButtonText>Start Quiz</ButtonText>
          </ButtonGreen>
        )}
      </GridBottom>
    </GreenLightView>
  )
}

Deck.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function mapStateToProps({ decks }, { navigation }) {
  const { deck } = navigation.state.params

  return { deck }
}

export default connect(mapStateToProps)(Deck)
