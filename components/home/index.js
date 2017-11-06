import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './home';
import DetailBarang from '../barang/detailbarang';
//import Transaksi from '../transaksi/transaksi';

export default (BarangNav = StackNavigator(
    {
        Beranda : { screen: Home },
        DetailBarang : { screen: DetailBarang },
        //Transaksi : { screen: Transaksi }
    }
));