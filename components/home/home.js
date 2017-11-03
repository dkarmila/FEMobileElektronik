import React,{Component} from 'react';
import { StatusBar, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { 
	Container, Header, Left, Icon, Right, Button, Body 
	, Content, Card, CardItem, List, ListItem, Grid,Col, Item, Input
} from "native-base";


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
					<Right>
                        <Button transparent>
                            <Icon name="cart" style={{fontSize:20}}/>
                        </Button>
					</Right>

				</Header>
				<ScrollView>
					<Content style={{alignContent: 'center'}} searchBar rounded>
						<List>
							<ListItem searchBar rounded>
								<Item>
									<Icon name="ios-search" />
									<Input placeholder="Search" />
								</Item>
								<Button transparent>
									<Text>Search</Text>
								</Button>
							</ListItem>
						</List>
						<List >
						{
							this.state.dataBarang.map((item, index) => (
								<Card key={item._id}>
								<CardItem>
									<Left>
									<Body>
										<Text>{item.InfoMerkBarang[0].NamaMerkBarang}</Text>
									</Body>
									</Left>
								</CardItem>
								<CardItem cardBody>
									<Grid>
										<Col style={{ backgroundColor: '#635DB7', height: 200 }}>
											<Image 
											source={{uri: "https://github.com/dkarmila/apiMiniProject/raw/master/barang/"+item.GambarBarang}} 
											style={{height: 50, width: null, flex: 1}}/>
										</Col>
									</Grid>
								</CardItem>
								<CardItem>
									<Left>
										<Button rounded success>
											<Icon iconLeft style={{fontSize:20}} name="cart" />
										</Button>
									</Left>
									<Body><Text style={{fontSize:20}}>{item.HargaBarang}</Text></Body>
									<Right>
										<Button rounded info>
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