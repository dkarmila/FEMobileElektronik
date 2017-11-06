import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Kategori from './kategori';
import DetailKategori from './detailKategori';
import DetailBarang from '../barang/detailbarang';

export default (KategoriNav = StackNavigator(
    {
        Kategori : { screen: Kategori },
        DetailKategori : { screen: DetailKategori },
        DetailBarang : { screen: DetailBarang }
    }
));