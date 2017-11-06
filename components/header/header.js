import React, {Component} from 'react';
import {
    Text,
	Image,
	StyleSheet
} from 'react-native';
import { Header, Body, Container, Left, Right, Icon, Button } from 'native-base';
import { DrawerNavigator } from 'react-navigation';
import Home from '../home/home';
import Kategori from '../kategori/index';
import SideBar from '../content/sidebar';

const MainNav = DrawerNavigator(
	{
		Beranda: { screen: Home },
		Kategori: { screen: Kategori }
	},
	{
		contentComponent: props => <SideBar {...props} />
	}
);

export default MainNav;

