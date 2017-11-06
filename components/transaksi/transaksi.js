import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView
} from "react-native";
import { StackNavigator } from 'react-navigation';

export default class Transaksi extends Component{
    constructor(){
        super()
        this.state = {
            pasienheader : "Ini Adalah Halaman Pasien"
        }
    }

    render(){
        return(
            <View>
                <Text>{this.state.pasienheader}</Text>
            </View>
        );
    }
}