import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';

export default class AppFooter extends Component{
	constructor(){
		super()
		this.state={
			Berita: "Copyright 2017 Footer"
		};
	}
	render(){
		return(
			<Footer>
				<FooterTab>
                    <Button active>
                        <Icon name="egg"/>
                        <Text>Feed</Text>
                    </Button>
                    <Button>
                        <Icon name="camera"/>
                        <Text >Camera</Text >
                    </Button>
                    <Button >
                        <Icon active name="person"/>
                        <Text >About</Text >
                    </Button>
                </FooterTab>
			</Footer>
		)
	}
}

const styles = StyleSheet.create({
	container:{
	  position: 'absolute',
	  bottom: 0
	}
});