import React, { Component } from 'react';
import {
    Text, StyleSheet, ScrollView
} from 'react-native';
import {
    Container, Content, Header, Left, Button, Icon,
    Body, Right, Card, CardItem
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator } from 'react-navigation';
import DetailKategori from './detailKategori';
//import Home from '../home/home';

export default class Kategori extends Component{
    constructor(){
        super()
        this.state={
            dataKategori:[]
        }
    }
    componentDidMount(){
		fetch("https://elektronik124.herokuapp.com/api/katbarang",{
			method:"GET"
		})
		.then((response) => response.json())
		.then((data) =>{
			console.log(data)
			this.setState({
				dataKategori:data
			})
			
		})
		.catch((error)=>{
			console.log(error)
		})
	}
    render(){
        return(
            <Container>
                <Content>
                    <ScrollView>
                        <Card>
                        {
                            this.state.dataKategori.map((item,index) => (
                                <CardItem key={item._id}>
                                    <Body>
                                        <Button block info onPress={() => this.props.navigation.navigate("DetailKategori", {idKat:item.KdKatBarang})}>
                                            <Text>{item.NamaKategoriBarang}</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            ))
                        }
                        </Card>
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}

Kategori.navigationOptions = ({ navigation }) => ({
  header: (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.navigate("Beranda")}>
                <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
            <Text style={styles.TextHeader}>Kategori Barang</Text>
        </Body>
        <Right>
            <Button transparent>
                <Icon name="cart" style={{fontSize:20}}/>
            </Button>
        </Right>
    </Header>
  )
});

const styles = StyleSheet.create({
		TextHeader:{
			color: 'white',
			fontSize: 23
		}
});