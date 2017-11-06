import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Container } from 'native-base';
import { StackNavigator } from 'react-navigation';
import Home from './components/header/header';
//import AppHeader from './components/header/header';
import Login from './components/login/index';

const AppLogin = StackNavigator(
  {
  Login : { screen:Login }
  },
  {
    navigationOptions: { header:false }
  }
)

const AppHeader = StackNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login }
  },
  {
    navigationOptions: { header:false }
  }
)

export default class App extends React.Component {

  constructor(){
    super()

  }

  state = {
    webtoken : ''
  }

  componentDidMount(){
    //console.log(this.state.webtoken);
    AsyncStorage.getItem('token', (error,result) => {
      console.log('cek'+result)
      if (result) {
          this.setState({
              webtoken:result
          });
      }
    })
  }

  render() {
    if(this.state.webtoken == null ||  this.state.webtoken == undefined || this.state.webtoken == ''){
      return (
        <Container style={{marginTop:25}}>
          <Login/>
        </Container>
      );
    }else if(this.state.webtoken != null ||  this.state.webtoken != undefined){
      return (
        <Container style={{marginTop:25}}>
          <AppHeader/>
        </Container>
      );
    }
  }
}