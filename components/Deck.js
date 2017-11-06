import React, {Component} from 'react'
import { connect } from 'react-redux'
import { GridTop, GridBottom, BigBlueText, SmallBlueText, GreenLightView, Button, ButtonGreen, ButtonText } from './styledComponents'

class Deck extends Component {

  render(){
    const {decks, navigation} = this.props
    const currentdeck = decks[navigation.state.params.title]

    return(
      <GreenLightView>
        <GridTop>
          <BigBlueText>
            {navigation.state.params.title}
          </BigBlueText>
          <SmallBlueText>
            {currentdeck.questions.length} Card(s)
          </SmallBlueText>
        </GridTop>
        <GridBottom>
          <Button onPress={() => navigation.navigate('addCard', {id: currentdeck.title})}>
            <ButtonText>Add Card</ButtonText>
          </Button>
          { currentdeck.questions.length > 0 &&
            <ButtonGreen onPress={() => navigation.navigate('Quiz', { title: `${currentdeck.title} Quiz`, id: currentdeck.title, counter: 0 })} >
              <ButtonText>Start Quiz</ButtonText>
            </ButtonGreen>
          }
        </GridBottom>
      </GreenLightView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Deck)