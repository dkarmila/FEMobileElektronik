import React, { Component } from 'react';
import {
    Text, StyleSheet, Image, Alert,AsyncStorage
} from 'react-native';
import {
    Container, Content, Body, Header, Footer, Card, CardItem,
    Left, Right, FooterTab, Button, Icon
} from 'native-base';
import { StackNavigator } from 'react-navigation';

export default class DetailBarang extends Component {

    constructor(props){
        super(props)
        this.state={
          idBar: this.props.navigation.state.params.idBar,
          dataDetail:[],
          KdBarang:""
        }
    }

    componentDidMount(){
      fetch("https://elektronik124.herokuapp.com/api/barang/agregat/"+this.state.idBar,{
        method: "GET"
      })
      .then((response) => response.json())
      .then((data) =>{
        console.log(data)
        this.setState({
          dataDetail:data
        })
        console.log(this.state.dataDetail)
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
                  <Text style={styles.TextHeader}>Detail Produk</Text>
              </Body>
              <Right/>
          </Header>
          )
      });

    render() {
        return (
            <Container>  
            <Content>
              {
                this.state.dataDetail.map((item, index) => (
                  <Card style={{flex: 0}} key={item._id}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{item.InfoKatBarang[0].NamaKategoriBarang} - {item.InfoMerkBarang[0].NamaMerkBarang}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Image 
                          source={{uri: 'https://github.com/dkarmila/apiMiniProject/raw/master/assets/images/'+item.GambarBarang}} 
                          style={{height: 200, width: 320, flex: 1}}/>
                      <Text>
                        {'\n'}
                        Tipe : {item.TypeBarang} {'\n \n'}
                        Harga : IDR {item.HargaBarang} {'\n \n'}
                        Deskripsi : {item.KetBarang}
                      </Text>
                    </Body>
                  </CardItem>
                </Card> 
                ))
              }
              
            </Content>
            <Footer>
                <FooterTab>
                    <Button full danger onPress={this.addCart}>
                    <Text style={{fontSize:25, color:'white'}}>Beli</Text>
                    </Button>
                </FooterTab>
            </Footer>
         </Container> 
        );
    }
    addCart = () => {
      // AsyncStorage.setItem("KdBarang", "");
      // AsyncStorage.setItem("NamaMerkBarang", "");
      // AsyncStorage.setItem("JumlahItem", "");
      // AsyncStorage.setItem("HargaBarang", "");

      AsyncStorage.getItem("KdBarang").then((value) => {
        let kodebarang=[];
        let kategoribarang=[];
        let namamerkbarang=[];
        let jumlahitem=[];
        let hargabarang=[];
        let gambarbarang=[];
        let cek = "";
        if(value != null){
          for (var i = 0; i < JSON.parse(value).length; i++) {
            if(JSON.parse(value)[i] == this.state.dataDetail[0].KdBarang){
              cek = "Barang Sudah Ada di Keranjang";
              break;
            }
          }
        }
        if(cek != ""){
          Alert.alert(
            'Add Cart',
            cek+"!",
            [
                  {text: 'OK', onPress: () => console.log("OKE")}
            ],
            { cancelable:false }
          )
        } else{ 
          if(value == null){
            kodebarang[0]=this.state.dataDetail[0].KdBarang;
            namamerkbarang[0]=this.state.dataDetail[0].InfoMerkBarang[0].NamaMerkBarang;
            jumlahitem[0]=1;
            hargabarang[0]=this.state.dataDetail[0].HargaBarang;
            gambarbarang[0]=this.state.dataDetail[0].GambarBarang;
            kategoribarang[0]=this.state.dataDetail[0].InfoKatBarang[0].NamaKategoriBarang;
            AsyncStorage.setItem("KdBarang", JSON.stringify(kodebarang));
            AsyncStorage.setItem("NamaMerkBarang", JSON.stringify(namamerkbarang));
            AsyncStorage.setItem("JumlahItem", JSON.stringify(jumlahitem));
            AsyncStorage.setItem("HargaBarang", JSON.stringify(hargabarang));
            AsyncStorage.setItem("GambarBarang", JSON.stringify(gambarbarang));
            AsyncStorage.setItem("KategoriBarang", JSON.stringify(kategoribarang));
          } else {
            let jumlahbarang = JSON.parse(value).length;
            kodebarang=JSON.parse(value);
            kodebarang[jumlahbarang]=this.state.dataDetail[0].KdBarang;
            AsyncStorage.setItem("KdBarang", JSON.stringify(kodebarang));
            console.log(value);
            AsyncStorage.getItem("NamaMerkBarang").then((value) => {
              namamerkbarang=JSON.parse(value);
              namamerkbarang[jumlahbarang]=this.state.dataDetail[0].InfoMerkBarang[0].NamaMerkBarang;
              AsyncStorage.setItem("NamaMerkBarang", JSON.stringify(namamerkbarang));
              console.log(value);
            });
            AsyncStorage.getItem("JumlahItem").then((value) => {
              jumlahitem=JSON.parse(value);
              jumlahitem[jumlahbarang]=1;
              AsyncStorage.setItem("JumlahItem", JSON.stringify(jumlahitem));
              console.log(value);
            });
            AsyncStorage.getItem("HargaBarang").then((value) => {
              hargabarang=JSON.parse(value);
              hargabarang[jumlahbarang]=this.state.dataDetail[0].HargaBarang;
              AsyncStorage.setItem("HargaBarang", JSON.stringify(hargabarang));
              console.log(value);
            });
            AsyncStorage.getItem("GambarBarang").then((value) => {
              gambarbarang=JSON.parse(value);
              gambarbarang[jumlahbarang]=this.state.dataDetail[0].GambarBarang;
              AsyncStorage.setItem("GambarBarang", JSON.stringify(gambarbarang));
              console.log(value);
            });
            AsyncStorage.getItem("KategoriBarang").then((value) => {
              kategoribarang=JSON.parse(value);
              kategoribarang[jumlahbarang]=this.state.dataDetail[0].InfoKatBarang[0].NamaKategoriBarang;
              AsyncStorage.setItem("KategoriBarang", JSON.stringify(kategoribarang));
              console.log(value);
            });
          }
          Alert.alert(
            'Add Cart',
            'Barang ditambah pada Keranjang!',
            [
                  {text: 'OK', onPress: () => console.log("OKE")}
            ],
            { cancelable:false }
          )
        }
      });
      // let kodebarang=[];
      // kodebarang[0]="token="+this.state.dataDetail[0].KdBarang;
      // AsyncStorage.setItem("KdBarang", JSON.stringify(kodebarang));
      // var login;
      // AsyncStorage.getItem("KdBarang").then((value) => {
      //       login = value;
      // }).done();
      // alert(login);
      // const receiveLoginDetails = (value) => {
      //   alert(JSON.parse(value)[0].token);
      // }
      // AsyncStorage.getItem("KdBarang").then(receiveLoginDetails);
      // Alert.alert(
      //   'Add Cart',
      //   'Barang ditambah pada Keranjang!',
      //   [
      //         {text: 'OK', onPress: () => console.log("OKE")}
      //   ],
      //   { cancelable:false }
      // )
    }
}

const styles = StyleSheet.create({
  TextHeader:{
      color: 'white',
      fontSize: 19
  }
});