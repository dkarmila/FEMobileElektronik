import React, { Component } from 'react';
import {
    Text, StyleSheet, ScrollView, Image
} from 'react-native';
import {
    Container, Content, Body, Header, Left, Right, Button, Icon, Footer, FooterTab,
    Card, CardItem, List, ListItem, Grid, Col, Item, Input
} from 'native-base';

export default class DetailKategori extends Component{
    constructor(props){
        super(props)
        this.state={
            dataBarang:[],
            idKat:this.props.navigation.state.params.idKat
        }
    }

    componentDidMount(){
        console.log(this.state.idKat);
        fetch("https://elektronik124.herokuapp.com/api/barang/agregat/kat/"+this.state.idKat,{
			method:"GET"
		})
		.then((response) => response.json())
		.then((data) =>{
			console.log(data)
			this.setState({
				dataBarang:data
			})
			
		})
		.catch((error)=>{
			console.log(error)
		})
    }

    static navigationOptions = ({ navigation }) => ({
    header: (
        <Header>
            <Left>
            <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
            </Button>
            </Left>
            <Body>
                <Text style={styles.TextHeader}>Produk Kategori</Text>
            </Body>
            <Right/>
        </Header>
        )
    });

    render(){
        return(
            <Container>
                <ScrollView>
					<Content style={{alignContent: 'center'}}>
					{
						this.state.dataBarang.map((item, index) => (
							<Card key={item._id}>
							<CardItem>
								<Left>
									<Body>
										<Text>{item.InfoKatBarang[0].NamaKategoriBarang} - {item.InfoMerkBarang[0].NamaMerkBarang}</Text>
									</Body>
								</Left>
							</CardItem>
							<CardItem cardBody>
								<Body>
								<Grid>
									<Col style={{ backgroundColor: '#635DB7', height: 200 }}>
										<Image 
										source={{uri: "https://github.com/dkarmila/apiMiniProject/raw/master/assets/images/"+item.GambarBarang}} 
										style={{height: 50, width: null, flex: 1}}/>
									</Col>
								</Grid>
								</Body>
							</CardItem>
							<CardItem>
								<Left>
									<Text style={{fontSize:20}}>IDR {item.HargaBarang}</Text>
								</Left>
								<Body/>
								<Right>
									<Button 
										rounded info 
										onPress={() => this.props.navigation.navigate("DetailBarang", {idBar:item.KdBarang})}>
										<Icon style={{fontSize:20}} name="paper" />
									</Button>
								</Right>
							</CardItem>
						</Card>
						))
					}
					</Content>
				</ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    TextHeader:{
        color: 'white',
        fontSize: 19
    }
});