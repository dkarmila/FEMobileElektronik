import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { 
  Container, Content, Text, List, ListItem, Left, Icon, Body 
  ,Right, Item
} from "native-base";
const routes = ["Beranda", "Kategori"];
const symbol = ["home", "star"]

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={require("../../assets/images/side.jpg")}
            style={{
              height: 180,
              //alignSelf: "stretch",
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
        </Content>
      </Container>
    );
  }
}
