import React, { Component } from "react";
import {
    Text, H2, StyleSheet, Alert
} from "react-native";
import {
    Container, Content, Header, Footer, Body, Card, Left, Right, 
    CardItem, Form, Item, Label, Input, Button, Icon
} from "native-base";

export default class Registrasi extends Component{
    constructor(){
        super()
        this.state={
            KdPelanggan: 'KP',
            NamaPelanggan: '',
            Alamat: '',
            NoTelp: '',
            NoRmh: '',
            Username: '',
            Password: ''
        }
    }

    render(){
        return(
            <Container>
                <Header>
					<Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name="arrow-back" style={{fontSize:20}}/>
                        </Button>
                    </Left>
					<Body>
						<Text style={styles.TextHeader} >Registrasi</Text>
					</Body>
					<Right />

				</Header>
                <Content padder>
                    <Card>
                        <CardItem>
                        <Form>
                            <Item stackedLabel>
                                <Label>Nama Pelanggan</Label>
                                <Input value= {this.state.NamaPelanggan} onChangeText={(text) => this.setState({NamaPelanggan: text})}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Alamat</Label>
                                <Input value= {this.state.Alamat} onChangeText={(text) => this.setState({Alamat: text})}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>No Telp</Label>
                                <Input value= {this.state.NoTelp} onChangeText={(text) => this.setState({NoTelp: text})}/>
                            </Item>
                            <Item stackedLabel last>
                                <Label>No Rumah</Label>
                                <Input value= {this.state.NoRmh} onChangeText={(text) => this.setState({NoRmh: text})}/>
                            </Item>
                            <Item stackedLabel last>
                                <Label>Username</Label>
                                <Input value= {this.state.Username} onChangeText={(text) => this.setState({Username: text})}/>
                            </Item>
                            <Item stackedLabel last>
                                <Label>Password</Label>
                                <Input value= {this.state.Password} onChangeText={(text) => this.setState({Password: text})}/>
                            </Item>
                        </Form>
                        </CardItem>
                    </Card>
                    <Button block info onPress={this.regPelanggan}>
                        <Text style={{color:'white', fontSize: 20}}>Daftar</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

    regPelanggan= ()=>{
        return fetch("https://elektronik124.herokuapp.com/api/pelanggan", {
            method : "POST",
            headers:{
                //"Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                KdPelanggan: this.state.KdPelanggan+this.state.Username,
                NamaPelanggan: this.state.NamaPelanggan,
                AlamatPelanggan: this.state.AlamatPelanggan,
                NoRmh: this.state.NoRmh,
                NoTelp: this.state.NoTelp,
                UsernamePelanggan: this.state.Username,
                PasswordPelanggan: this.state.Password
            })
        })
        .then((response) => response.json())
        .then(
            Alert.alert(
                'Registrasi',
                'Registrasi Berhasil!',
                [
                  {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                ]
              )
        )
    }
}

const styles = StyleSheet.create({
    TextHeader:{
        color: 'white',
        fontSize: 23
    }
})