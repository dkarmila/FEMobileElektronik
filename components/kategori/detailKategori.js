import React, { Component } from 'react';
import {
    Text, StyleSheet
} from 'react-native';
import {
    Container, Content, Body, Header, Left, Right, Button, Icon, Footer, FooterTab
} from 'native-base';

export default class DetailKategori extends Component{
    constructor(props){
        super(props)
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
          <Text style={styles.TextHeader}>Detail Kategori</Text>
        </Body>
        <Right>
            <Button transparent>
                <Icon name="cart" style={{fontSize:20}}/>
            </Button>
        </Right>
      </Header>
        )
    });

    render(){
        return(
            <Container>
                <Content>
                    <Text>DetailKategori</Text>
                </Content>
                <Footer>
          <FooterTab>
            <Button full danger>
              <Text style={{fontSize:25, color:'white'}}>Beli</Text>
            </Button>
          </FooterTab>
        </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
		TextHeader:{
			color: 'white',
			fontSize: 23
		}
});