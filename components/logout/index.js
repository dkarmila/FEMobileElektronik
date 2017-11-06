import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '../login/index';
import Logout from './logout';
//import Home from '../header/header';

export default (LogoutNav = StackNavigator (
    {
        Logout : { screen : Logout },
        Login : { screen : Login }
        //Home : { screen : Home }
    }
))