import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Container } from 'native-base';
import AppHeader from './components/header/header';
//import AppBody from './components/content/content';
import AppFooter from './components/footer/footer';

export default class App extends React.Component {

  constructor(){
    super()

  }

  render() {
    return (
        <Container style={{marginTop:25}}>
          <AppHeader/>
        </Container>
      );
  }
}


