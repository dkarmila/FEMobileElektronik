import React, { Component } from 'react';
import {
    Text, StyleSheet, ScrollView, Image,  AsyncStorage, Alert
} from 'react-native';
import {
    Container, Content, Header, Left, Button, Icon,
    Body, Right, Card, CardItem, Footer,FooterTab
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StackNavigator } from 'react-navigation';
import DetailKategori from './detailKategori';
import DetailBarang from '../barang/detailbarang';
//import Home from '../home/home';

export default class Kategori extends Component{
    constructor(){
        super()
        this.state={
            dataKategori:[],
            dataPenjualan:[]
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
        let kodebarang = [];
        let namamerkbarang=[];
        let jumlahitem=[];
        let hargabarang=[];
        let gambarbarang=[];
        let kategoribarang=[];
        let dataArray=[];

        AsyncStorage.getItem("KdBarang").then((value) => {
            kodebarang = JSON.parse(value);
            AsyncStorage.getItem("NamaMerkBarang").then((value) => {
                namamerkbarang = JSON.parse(value);
                AsyncStorage.getItem("JumlahItem").then((value) => {
                    jumlahitem = JSON.parse(value);
                    AsyncStorage.getItem("HargaBarang").then((value) => {
                        hargabarang = JSON.parse(value);
                        AsyncStorage.getItem("GambarBarang").then((value) => {
                            gambarbarang = JSON.parse(value);
                            AsyncStorage.getItem("KategoriBarang").then((value) => {
                                kategoribarang = JSON.parse(value);
                                for (var i = 0; i < kodebarang.length; i++) {
                                    dataArray[i] = [
                                        kodebarang[i],
                                        namamerkbarang[i],
                                        jumlahitem[i],
                                        hargabarang[i],
                                        gambarbarang[i],
                                        kategoribarang[i]
                                    ]
                                    this.setState({
                                        dataPenjualan:dataArray
                                    })
                                    console.log(this.state.dataPenjualan);
                                }
                            });
                        });
                    });
                });
            });
        });
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
                                        <Button block info onPress={() => this.props.navigation.navigate("DetailKategori", {idKat:item.KdKategoriBarang})}>
                                            <Text style={styles.TextCard}>{item.NamaKategoriBarang}</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            ))
                        }
                        </Card>
                        {
                            this.state.dataPenjualan.map((item, index) => (
                                <Card key={item[0]}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>{item[5]} - {item[1]}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Button rounded danger onPress={ () => this.hapus(item[0])}>
                                            <Icon iconLeft style={{fontSize:15}} name="trash" />
                                        </Button>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Body>
                                    <Grid>
                                        <Col style={{ backgroundColor: '#635DB7', height: 200 }}>
                                            <Image 
                                            source={{uri: "https://github.com/dkarmila/apiMiniProject/raw/master/assets/images/"+item[4]}} 
                                            style={{height: 50, width: null, flex: 1}}/>
                                        </Col>
                                    </Grid>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text style={{fontSize:15}}>Harga IDR {item[3]}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Body>
                                            <Text style={{fontSize:15}}>Jumlah Beli {item[2]}</Text>
                                        </Body>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                    <Text>      </Text>
                                        <Button info onPress={() => this.kurang(item[0])}>
                                            <Text>      -      </Text>
                                        </Button>
                                        <Text>  </Text>
                                        <Button info onPress={() => this.tambah(item[0])}>
                                            <Text>      +      </Text>
                                        </Button>
                                    </Left>
                                    <Right>
                                        <Text style={{fontSize:15}}>Total Harga {Number(item[2]*Number(item[3]))}</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                            ))
	    				}
                    </ScrollView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full danger onPress={this.pickup}>
                        <Text style={{fontSize:25, color:'white'}}>Pick Up</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
    tambah(kodebarang){
        let cek="";
        fetch("https://elektronik124.herokuapp.com/api/barang/brg/"+kodebarang, {
            method:"GET"
        })
        .then((response) => response.json())
        .then((data) =>{
            AsyncStorage.getItem('KdBarang').then((value) => {
                let KdBarang = JSON.parse(value);
                AsyncStorage.getItem('JumlahItem').then((value) => {
                    let jmlitm = JSON.parse(value);
                    for (var i = 0; i < KdBarang.length; i++) {
                        if(kodebarang == KdBarang[i]){
                            jmlitm[i] = jmlitm[i]+1;
                            if(jmlitm[i]>data[0].StokAkhir){
                                cek = "Stok Tidak Mencukupi";
                            }
                        }
                    }
                    if(cek==""){
                        AsyncStorage.setItem("JumlahItem",JSON.stringify(jmlitm));
                        Alert.alert(
                            'Tambah Jumlah Beli',
                            'Tertambah !',
                            [
                                {text: 'OK', onPress: () => this.props.navigation.navigate("Kategori")}
                            ],
                            { cancelable:false }
                        )
                    } else {
                        Alert.alert(
                            'Info!!',
                            cek,
                            [
                                {text: 'OK', onPress: () => this.props.navigation.navigate("Kategori")}
                            ],
                            { cancelable:false }
                        )
                    }
                });
            })
        })
    }
    kurang(kodebarang){
        AsyncStorage.getItem('KdBarang').then((value) => {
            let KdBarang = JSON.parse(value);
            AsyncStorage.getItem('JumlahItem').then((value) => {
                let jmlitm = JSON.parse(value);
                for (var i = 0; i < KdBarang.length; i++) {
                    if(kodebarang == KdBarang[i]){
                        jmlitm[i] = jmlitm[i]-1;
                        if(jmlitm[i] <= 0){
                            jmlitm[i] = jmlitm[i]+1;
                            Alert.alert("Jangan Beli Kosong Bos");
                            break;
                        }
                    }
                }
                AsyncStorage.setItem("JumlahItem",JSON.stringify(jmlitm));
                console.log(KdBarang);
                console.log(jmlitm);
            });
            Alert.alert(
                'Tambah Jumlah Beli',
                'Berkurang !',
                [
                      {text: 'OK', onPress: () => this.props.navigation.navigate("Kategori")}
                ],
                { cancelable:false }
            )
        })
    }

    hapus(kode){
        let kodebarang = [];
        let merkbarang=[];
        let jumlah=[];
        let harga=[];
        let gambar=[];
        let kategori=[];
        AsyncStorage.getItem('KdBarang').then((value) => {
            let KdBarang = JSON.parse(value);
            AsyncStorage.getItem("NamaMerkBarang").then((value) => {
                let namamerkbarang = JSON.parse(value);
                AsyncStorage.getItem("JumlahItem").then((value) => {
                    let jumlahitem = JSON.parse(value);
                    AsyncStorage.getItem("HargaBarang").then((value) => {
                        let hargabarang = JSON.parse(value);
                        AsyncStorage.getItem("GambarBarang").then((value) => {
                            let gambarbarang = JSON.parse(value);
                            AsyncStorage.getItem("KategoriBarang").then((value) => {
                                let kategoribarang = JSON.parse(value);
                                    let i = 0;
                                    for (var a = 0; a < KdBarang.length; a++) {
                                        if(kode != KdBarang[i]){
                                            kodebarang[i] = KdBarang[i];
                                            merkbarang[i]=namamerkbarang[i];
                                            jumlah[i]=jumlahitem[i];
                                            harga[i]=hargabarang[i];
                                            gambar[i]=gambarbarang[i];
                                            kategori[i]=kategoribarang[i];
                                            i++;
                                        }
                                    }
                                    AsyncStorage.setItem("KdBarang", JSON.stringify(kodebarang));
                                    AsyncStorage.setItem("NamaMerkBarang", JSON.stringify(merkbarang));
                                    AsyncStorage.setItem("JumlahItem", JSON.stringify(jumlah));
                                    AsyncStorage.setItem("HargaBarang", JSON.stringify(harga));
                                    AsyncStorage.setItem("GambarBarang", JSON.stringify(gambar));
                                    AsyncStorage.setItem("KategoriBarang", JSON.stringify(kategori));
                            });
                        });
                    });
                });
            });
        })
    }



    pickup = () => {
        AsyncStorage.getItem("KdBarang").then((value) => {
            kodebarang = JSON.parse(value);
            AsyncStorage.getItem("NamaMerkBarang").then((value) => {
                namamerkbarang = JSON.parse(value);
                AsyncStorage.getItem("JumlahItem").then((value) => {
                    jumlahitem = JSON.parse(value);
                    AsyncStorage.getItem("HargaBarang").then((value) => {
                        hargabarang = JSON.parse(value);
                        AsyncStorage.getItem("KategoriBarang").then((value) => {
                            kategoribarang = JSON.parse(value);
                            AsyncStorage.getItem("Username").then((value) => {
                                fetch("https://elektronik124.herokuapp.com/api/penjualan/kdpelanggan/KP"+value, {
                                    method:"GET"
                                })
                                .then((response) => response.json())
                                .then((data) =>{
                                    let jumlahtransaksi = data.length+1;
                                    let totalhargajual = 0;
                                    for (var i = 0; i < kodebarang.length; i++) {
                                        fetch("https://elektronik124.herokuapp.com/api/penjualandetail", {
                                            method: "POST",
                                            headers: {
                                                'Accept': 'application/json',
                                                "Content-Type":"application/json",
                                            },
                                            body: JSON.stringify({
                                                KdBarang: kodebarang[i],
                                                KdPenjualan:"KJKP"+value+""+jumlahtransaksi,
                                                JmlBarang:jumlahitem[i],
                                                NamaBang:namamerkbarang[i],
                                                HargaBarang:hargabarang[i],
                                                KategoriBarang: kategoribarang[i]
                                            })
                                        })
                                        totalhargajual += hargabarang[i];
                                    }
                                    fetch("https://elektronik124.herokuapp.com/api/penjualan", {
                                        method: "POST",
                                        headers: {
                                            'Accept': 'application/json',
                                            "Content-Type":"application/json",
                                        },
                                        body: JSON.stringify({
                                            KdPenjualan:"KJKP"+value+""+jumlahtransaksi,
                                            KdPelanggan:"KP"+value,
                                            TglPenjualan:new Date(),
                                            JmlItem:jumlahitem.length,
                                            TotalHargaJual:totalhargajual 
                                        })
                                    });
                                    this.pickupstok();
                                })
                            });
                        });
                    });
                });
            });
        });
    }
    pickupstok(){
        AsyncStorage.getItem("KdBarang").then((value) => {
            kodebarang = JSON.parse(value);
                AsyncStorage.getItem("JumlahItem").then((value) => {
                    jumlahitem = JSON.parse(value);
                    for (var i = 0; i < jumlahitem.length; i++) {
                        fetch("https://elektronik124.herokuapp.com/api/barang/brg/"+kodebarang[i], {
                            method:"GET"
                        })
                        .then((response) => response.json())
                        .then((data) =>{
                            for (var k = 0; k < i; k++) {
                                if(data[0].KdBarang == kodebarang[k]){
                                    data[0].StokAkhir-=jumlahitem[k];
                                    console.log(data);
                                    fetch("https://elektronik124.herokuapp.com/api/barang/"+data[0]._id,{
                                        method:"PUT",
                                        headers: {
                                            'Accept': 'application/json',
                                            "Content-Type":"application/json",
                                        },
                                        body: JSON.stringify(data[0])
                                    })
                                }
                            }
                        });
                    }
                });
        })
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
        <Right/>
    </Header>
  )
});

const styles = StyleSheet.create({
    TextHeader:{
        color: 'white',
        fontSize: 19
    },
    TextCard:{
        color: 'white',
        fontSize: 20
    }
});