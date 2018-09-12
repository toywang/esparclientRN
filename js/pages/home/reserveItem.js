import React, { Component } from 'react'
import { FlatList, Text, Image, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import PopView from './PopView';
import { screenWidth, http_url } from '../../utils/Utils';
import requestBase from '../../utils/requestBase'

const req = new requestBase()

export default class reserveItem extends Component {
    static navigationOptions = ({navigation,screenProps})=>({
        headerTitle:'预约项目'
    })

    constructor(props) {
        super(props)
        this.state = {
            dataArray: []
        }

    }
    componentDidMount() {
        this.requestItemData()
    }
    requestItemData() {
        req.getRequest('http://114.55.72.11:8088/espar_client/api/queryGoodsMallList.do?cateid=0&index=0&regionid=0&search=&size=10&sort=0')
            .then((res) => {
                this.setState({
                    dataArray: res.data
                })
            })
    }
    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={()=>{
                this.props.navigation.navigate('itemDetail')
            }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View >
                        <ImageBackground style={styles.itemImage} source={require('../../../images/商城-默认图片.png')}>
                            <Image style={{width:90,height:90,borderRadius: 5,}} source={{ uri: http_url + item.ImageUrl }}></Image>
                        </ImageBackground>
                    </View>
                    <View style={styles.itemTitleView}>
                        <View style={styles.itemTitle}>
                            <Text >{item.GoodsName}</Text>
                        </View>
                        <View style={styles.itemDes}>
                            <Text style={styles.itemDesText} numberOfLines={3} ellipsizeMode='tail'>{item.GoodsInfo}</Text>
                        </View>
                        <View style={styles.itemPriceView}>
                            <Text style={{ fontSize: 11, color: 'rgb(255,0,0)' }}>{item.Label3}</Text>
                            <Text style={{ fontSize: 11, color: '#555' }}>{item.Label1 + item.Label2}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', height: 20, alignItems: 'center' }}>
                        <Image style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#555', marginLeft: 10 }}></Image>
                        <Text style={{ fontSize: 11, color: '#555', marginLeft: 10 }}>此商品已加入安全保险</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', height: 20, alignItems: 'center' }}>
                        <Image style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#555', marginLeft: 10 }}></Image>
                        <Text style={{ fontSize: 11, color: '#555', marginLeft: 10 }}>此商品通过安全质量检验</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white' }} >
                <View style={styles.topTitle}>
                    <PopView
                        leftArray={['上海', '南京', '广州', '杭州']}
                        centerArray={['北京', '天津', '大连']}
                        rightArray={['重庆', '四川']}
                        selectCallBack={(array) => {
                            console.log('选中的index' + array)
                        }}
                    />
                </View>
                <View>
                    <FlatList
                        data={this.state.dataArray}
                        renderItem={this._renderItem} />
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    topTitle: {
        width: screenWidth(),
        height: 40,
        zIndex:300,
    },
    item: {
        width: screenWidth(),
        height: 160,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderBottomWidth: 10,
        borderBottomColor: 'rgb(240,240,240)',
        borderStyle: 'solid',
    },
    itemImage: {
        width: 90,
        height: 90,
        margin: 10,
        backgroundColor: 'white',
    },
    itemTitleView: {
        display: 'flex',
        flexDirection: 'column',
        width: screenWidth() - 115,
        justifyContent: 'space-between'
    },
    itemTitle: {
        paddingTop: 10,
    },

    itemDesText: {
        fontSize: 12,
        color: '#555',
        lineHeight: 16,
    },
    itemPriceView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    }



})