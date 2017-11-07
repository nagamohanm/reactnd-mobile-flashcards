import React from 'react'
import { View, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/notifications'
import { darkestgreen } from './utils/colors'
import { Stack } from './routes';

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