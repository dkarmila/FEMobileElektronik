import React,{Component} from 'react';
import { StatusBar, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { 
	Container, Header, Left, Icon, Right, Button, Body 
	, Content, Card, CardItem, List, ListItem, Grid,Col, Item, Input
} from "native-base";
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

export default class HomeScreen extends Component {
	constructor(){
		super()
		this.state={
			dataBarang : []
		}
	}

	componentDidMount(){
		fetch("https://elektronik124.herokuapp.com/api/barang/agregatlimit/6",{
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

	render() {
		return (
		  <Container>
				<Header>
					<Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" style={{fontSize:20}}/>
                        </Button>
					</Left>
					<Body>
						<Text style={styles.TextHeader} >Beranda</Text>
					</Body>
					<Right />

				</Header>
				<ScrollView>
					<Content style={{alignContent: 'center'}}>
						<List >
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
									<Grid>
										<Col style={{ backgroundColor: '#635DB7', height: 200 }}>
											<Image 
											source={{uri: "https://github.com/dkarmila/apiMiniProject/raw/master/assets/images/"+item.GambarBarang}} 
											style={{height: 50, width: null, flex: 1}}/>
										</Col>
									</Grid>
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
						</List>
					</Content>
				</ScrollView>
		  </Container>
		);
	  }
}

const styles = StyleSheet.create({
		TextHeader:{
			color: 'white',
			fontSize: 23
		},
		TextJudul:{
			fontWeight: 'bold',
			fontSize:25, 
			textAlign:'center'
		},
		StyleImage:{
			flex: 1, 
			alignSelf:'center'
		}
});