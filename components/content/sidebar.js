import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage, Alert } from "react-native";
import { 
  Container, Content, Text, List, ListItem, Left, Icon, Body 
  ,Right, Item
} from "native-base";
const routes = ["Beranda", "Kategori"];

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={require("../../assets/images/side.jpg")}
            style={{
              height: 180,
              justifyContent: "center",
              alignItems: "center"
            }}> 
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                      <Icon name="cog" style={{color:'gray'}}/><Text>{"\t"}</Text>
                      <Text style={{fontSize:18}}>{data}</Text>
                  <Right />
                </ListItem>
              );
            }}
          />
            <ListItem
                button
                onPress={this.Logout}>
                <Icon name="cog" style={{color:'gray'}}/><Text>{"\t"}</Text>
                <Text style={{fontSize:18}}>Log Out</Text>
            </ListItem>
        </Content>
      </Container>
    );
  }

  Logout = () =>{
    //Alert.alert("hai")
    AsyncStorage.removeItem('token', (error, result) => {
      Alert.alert(
        "Logout",
        "Berhasil Keluar!",
        [
          { text: "OK", onPress: () => this.props.navigation.navigate('Login')}
        ]
      )
    })
  }
}
