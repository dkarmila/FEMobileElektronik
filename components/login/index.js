import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import Login from './login';
import Registrasi from './register';
import Home from '../header/header';

export default (LoginNav = StackNavigator (
    {
        Login : {screen:Login},
        Registrasi : {screen:Registrasi},
        Home : {screen: Home}
    },{
        navigationOptions:{
            header: false
        }
    }
));