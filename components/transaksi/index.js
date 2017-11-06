import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Transaksi from './transaksi';

export default (TransaksiNav = StackNavigator(
    {
        Transaksi : { screen: Transaksi }
    }
));