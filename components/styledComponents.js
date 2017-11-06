import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { 
  gray, 
  white,
  black, 
  mediumdarkgreen, 
  lightgreen, 
  mediumdarkblue,
  darkblue,
  mediumdarkred,
} from '../utils/colors'

export const GreenView = styled.View`
  background-color: ${mediumdarkgreen};
  flex:1;
  justify-content: flex-start;
`

function borderRadiusByPlatform() {
  return Platform.OS === 'ios' ? 16 : 2;
}

export const DeckView = styled.TouchableOpacity`
  flex:1;
  max-height: 120px;
  justify-content: center;
  align-items: center;
  background-color: ${white};
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 17px;
  border-radius: ${borderRadiusByPlatform()}px;
`
export const DeckTitleText = styled.Text`
  font-family: 'roboto-light';
  font-size: 25px;
  color: ${black};
`
export const DeckSubTitleText = styled.Text`
  font-family: 'roboto-light';
  font-size: 15px;
  color: ${black};
`
export const ButtonText = styled.Text`
  font-family: "roboto-light";
  color: ${white};
  font-size: 20px
`
export const GridTop = styled.View`
  align-content: flex-start;
  justify-content: flex-start;
  flex:1;
`
export const GridBottom = styled.View`
  align-items: center;
  flex:1;
  align-content: flex-end;
  justify-content: flex-end;
  padding-bottom:60px;
`
export const BigBlueText = styled.Text`
  color: ${white};
  font-family: "roboto-light";
  font-size: 40px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
`
export const SmallBlueText = styled.Text`
  color: ${white};
  font-family: "roboto-light";
  font-size: 15px;
  text-align: center;
`
export const GreenLightView = GreenView.extend`
  background-color: ${lightgreen}
`
export const Button = styled.TouchableOpacity`
  min-width: 50%;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin-bottom:15px;
  border-radius:5px;
  border-width:1px;
  border-color:${white};
  background-color: ${mediumdarkblue};
`

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

export const ButtonGreen = Button.extend`
  background-color: ${darkblue};
  margin-bottom: 50px;
`

export const GridFooter = styled.View`
align-items: center;
align-content: flex-end;
justify-content: flex-end;
  min-height: 110px;
  padding-bottom:10px;
`

export const MyTextInput = styled.TextInput.attrs({
    placeholderTextColor: gray,
    autoCorrect: false,
    underlineColorAndroid: white,
  })`
  height: 50px;
  width: 300px;
  background-color: ${white};
  color: ${black};
  font-size: 20px;
  font-family: "roboto-light";
  text-align: center;
  align-items: center;
`

export const MyKeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  flex:1;
  justify-content: center;
  align-items: center;
`

export const ButtonRed = Button.extend`
  background-color: ${mediumdarkred};
`

export const BlueText = BigBlueText.extend`
  font-size: 30px;
`

export const BlueButtonText = ButtonText.extend`
  color: ${darkblue};
`