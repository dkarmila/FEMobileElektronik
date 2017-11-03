import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import {
    Container, Content, Header, Body
} from 'native-base';
import { StackNavigator } from 'react-navigation';
import Kategori from './kategori';
import DetailKategori from './detailKategori';

export default (KategoriNav = StackNavigator(
    {
        Kategori : { screen: Kategori },
        DetailKategori : { screen: DetailKategori }
    }
));