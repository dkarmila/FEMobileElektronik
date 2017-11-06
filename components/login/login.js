import React, { Component } from 'react';
import {
    Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, View,
    TextInput, Image, AsyncStorage, Alert
} from 'react-native';
import {
    Container, Content, Header, Form, Body, Input, Item, Label, Footer
    , Button, Icon
} from 'native-base';
import {StackNavigator} from 'react-navigation';
//import Beranda from '../header/header';

export default class Login extends Component {
    constructor(){
        super()
        this.state={
            Username: '',
            Password: ''
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Container style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../assets/images/logo.png')} />
                </Container>
                <Container style={styles.formContainer}>
                    <Form>
                        <Item floatingLabel>
                        <Label>Username</Label>
                        <Input value={this.state.Username} onChangeText={(text) => this.setState({Username:text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input value={this.state.Password} onChangeText={(text) => this.setState({Password:text})}/>
                        </Item>
                    </Form>
                    <Button block info style={styles.buttonContainer} onPress = {this.LoginFunc}>
                        <Text style={{color:'white'}}>LOGIN</Text>
                    </Button>
                    <Button block success style={styles.buttonContainer} onPress = { () => this.props.navigation.navigate("Registrasi") }>
                        <Text style={{color:'white'}}>REGISTRASI</Text>
                    </Button>
                </Container>
            </KeyboardAvoidingView>

        );
    }

    LoginFunc = () => {
        console.log(this.state.Username)
        console.log('pass'+this.state.Password)
        return fetch("https://elektronik124.herokuapp.com/api/login/pelanggan/auth", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                UsernamePelanggan : this.state.Username,
                PasswordPelanggan : this.state.Password
            })
        })
        .then((response) => response.json())
        .then((webtoken) => {
            console.log(webtoken.token)
            if(webtoken.token == null || webtoken.token == ""){
                Alert.alert('Username atau Password Salah');
            } else {
                AsyncStorage.setItem('token', 'token='+webtoken.token, (err) => {
                    if(err){
                        console.log("an error");
                        throw err;
                    }
                    console.log("success");
                    AsyncStorage.setItem('Username',this.state.Username);
                    Alert.alert(
                        'Login',
                        'Berhasil Masuk!',
                        [
                            {text:'OK', onPress:()=>this.props.navigation.navigate('Home')}
                        ],
                        { cancelable:false }
                    )
                })
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        marginTop: 20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
