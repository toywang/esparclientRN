import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { TabNavigator } from 'react-navigation'
import {
    Text,
    StyleSheet,
    Image,
    View,
    Button,
    FlatList,
    AsyncStorage,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    RefreshControl,
} from 'react-native'
import BaseComponent from "../../base/BaseComponent";
import Assistant from "../assistant/Assistant";
import Experience from "../experience/Experience";
import Wallet from "../wallet/Wallet";
import Person from "../person/Person";
import ImageOverlay from 'react-native-image-overlay'
import { ifIphoneX, screenWidth } from "../../utils/Utils";
import Swiper from 'react-native-swiper';
import { base_url, image_ip } from '../../utils/Config';
import PropTypes from 'prop-types';
import BrandClinicInfo from "./BrandClinicInfo";
import { NativeModules, InteractionManager } from 'react-native'
const calendarManager = NativeModules.CalendarManager

var GeoLocation = require('Geolocation')

const imagePath = '../../../images/'

class SwiperView extends Component {
    static propTypes = {
        data: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data
            })
        }
    }
    //  _itemImageView(items){
    //     var itemArry = [];
    //     items.map((item)=>{
    //         itemArry.push(
    //             <View style={styles.slide1}>
    //                 <Image style={styles.image} source={{uri:base_url+item.image_url}}/>
    //             </View>
    //         )
    //     })
    //      return itemArry;
    // }
    // 渲染
    renderSwiper() {
        var itemArr = [];
        for (var i = 0; i < this.state.data.length; i++) {
            let data = this.state.data[i];
            let url = image_ip + data.image_url;
            itemArr.push(
                <View style={styles.slide1} key={i}>
                    <TouchableOpacity >
                        <Image source={{ uri: url }} style={styles.image} />
                    </TouchableOpacity>
                </View>
            );
        }
        return itemArr;
    }
    render() {
        let list = this.state.data;

        if (list !== null) {
            return (
                <Swiper style={styles.wrapper} showsButtons={false}>
                    {this.renderSwiper()}
                </Swiper>
            )
        } else {
            return (
                <Swiper style={styles.wrapper} showsButtons={false}>
                    <Image style={styles.image} />
                </Swiper>
            )

        }
    }
}
class CategoryView extends Component {
    static propTypes = {
        data: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            types: null
        }
    }
    componentDidMount() {
        // this._requestGoodsTypesData()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                types: nextProps.data
            })
        }
    }


    _goodsTypesItem = (item) => {
        var typename = item.item.typeName;
        var imageurl = image_ip + item.item.bigIcon;
        return (
            <View style={styles.goodsTypeView}>
                <Image style={styles.goodsItemIcon} source={{ uri: imageurl }} />
                <Text style={styles.goodsItemText}>{typename}</Text>
            </View>
        )

    }
    _moduleView() {

        let data = this.state.types;
        if (data) {
            return (
                <View>
                    <View style={styles.moduleView}>
                        <TouchableOpacity style={styles.appointView} onPress={() => (this.props.navigation.navigate('quickReserve'))}>
                            <Image style={styles.goodsItemIcon} source={require(imagePath + '快速预约.png')} />
                            <Text style={styles.goodsItemText}>快速预约</Text>
                        </TouchableOpacity>
                        <View style={styles.zixunView}>
                            <TouchableOpacity onPress={() => {
                                InteractionManager.runAfterInteractions(() => {
                                    // RNOpenOneVC这个也是写在原生里面的再PushNative中哦~
                                });
                                calendarManager.toPushChatRoom('跳转到chatVC')

                            }}>

                                <Image style={styles.goodsItemIcon} source={require(imagePath + '在线咨询.png')} />
                                <Text style={styles.goodsItemText}>在线咨询</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.nearclinic}>
                            <TouchableOpacity>

                                <Image style={styles.goodsItemIcon} source={require(imagePath + '附近门店.png')} />
                                <Text style={styles.goodsItemText}>附近门店</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={{ height: 6, width: screenWidth(), backgroundColor: '#f3f3f3' }}>
                        <Text></Text>
                    </View>
                    <View >
                        <FlatList
                            data={data}
                            horziontal={true}
                            renderItem={this._goodsTypesItem}
                            numColumns={5}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }
    render() {
        return (
            this._moduleView()
        )
    }
}
class DiaryView extends Component {

    static propTypes = {
        data: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            brandData: [],
        }
    }
    _renderHeaderItem = (item) => {
        let image = item.item.image
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('diarylist')}>
                <ImageBackground style={styles.diaryHeaderItem} source={image}>
                    <ImageBackground style={styles.diaryHeaderItemLine} source={require('../../../images/白色透明背景.png')}>
                        <Text style={styles.diaryHeaderItemText}
                            numberOfLines={0}>
                            {item.item.name}
                        </Text>
                    </ImageBackground>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    _header = () => {
        let data = [
            { name: '达人推荐\n秒变迷人小仙女', image: require('../../../images/达人推荐.png'), key: 0 },
            { name: '医学科普\n专业科普科学变美', image: require('../../../images/医美科普.png'), key: 1 },
            { name: '精美日记\n听听大神怎么说', image: require('../../../images/精美日记.png'), key: 2 }
        ]
        return (
            <FlatList
                data={data}
                renderItem={this._renderHeaderItem}
                horizontal={true}
            />
        )
    }
    _itemPress(item) {
        this.props.navigation.navigate('BrandDetail', { info: item.item })
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BrandDetail', { info: item.item })}>
                <View style={{ height: 150, width: screenWidth(), justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 140, width: screenWidth() - 20, resizeMode: 'cover', borderRadius: 5, overflow: 'hidden' }} source={{ uri: image_ip + item.item.imageUrl }} />
                </View>
            </TouchableOpacity>
        )
    }
    componentDidMount() {
        // this.requestBrandData()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                brandData: nextProps.data
            })
        }
    }
    render() {
        let data = this.state.brandData
        return (
            <FlatList
                ListHeaderComponent={this._header}
                data={data}
                renderItem={this._renderItem}
            />
        )
    }
}

export default class Home extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            bannerData: null,
            typeData: null,
            brandData: null,
            city: '重新定位',
            isLoading: false,
        }
    }


    static navigationOptions = {
        title: '首页',
        header: null,
    };

    _resetlocation = () => {
        this.getLocation()
    }
    _refreshing = () => {
        this.setState({
            isLoading: true
        })
        this._requestBannerData()
        this._requestGoodsTypesData()
        this.requestBrandData()
    }
    _requestBannerData() {
        let formData = new FormData();
        formData.append('flag', '1')
        fetch(base_url + '/getRollingPics.do', {
            method: 'POST',
            body: formData,
        }).then(
            (response) => response.json()
        ).then(
            (responseJson) => {
                let list = responseJson['data']
                this.setState({
                    bannerData: list,
                    isLoading: false,
                })
            }
        ).catch(
            (error) => {

            })
    }
    requestBrandData() {
        const url = base_url + '/getBrandsInfo.do'
        fetch(url, {
            method: 'POST'
        }).then((response) =>
            response.json()
        ).then((responseJson) => {
            this.setState({
                brandData: responseJson.data,
                isLoading: false,
            })
        }
        ).catch((error) => alert(error.description))
    }
    _requestGoodsTypesData() {
        const url = base_url + '/queryGoodsCate.do';
        fetch(url, {
            method: 'POST',
        }).then(
            (response) => response.json()
        ).then(
            (responseJson) => {
                let goodslist = responseJson.data.goodsList;
                if (goodslist.count > 9) {
                    let map = { 'cateId': '0', 'typeName': '全部', 'bigIcon': '更多' }
                    goodslist.push(map)
                }
                this.setState({
                    typeData: goodslist,
                    isLoading: false,
                })
            }
        ).catch((error) => alert(error.description))
    }
    componentDidMount() {
        this._refreshing();
    }
    getLocation() {
        GeoLocation.getCurrentPosition(
            location => {
                location.coords
                this.setState({
                    city: '北京市'
                })
                this.getLocationCity(location)
            },
            error => {
                alert(error)
            }

        );
    }
    getLocationCity(location) {
        const url = 'http://api.map.baidu.com/geoconv/v1/?coords='
            + location.coords.longitude + ',' + location.coords.latitude + '&from=1&to=5&ak='
            + 'gLk1exFHqUbd1Gj84C6sMWZ0'
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            response.json()
        }).then((responseJson) => {
            alert(responseJson)
            setState({
                city: '北京市'
            })
        }).catch((error) => setState({ city: '北京市' }))

    }


    render() {
        const { navigate, headerTitle } = this.props.navigation;
        let bannerData = this.state.bannerData;
        let typeData = this.state.typeData;
        let brandData = this.state.brandData;
        console.log('bannerdata' + bannerData);
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this._refreshing}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }

                >
                    <View style={styles.headerView}>
                        <TouchableOpacity onPress={this._resetlocation}>
                            <View style={styles.headerLocation}>
                                <Text ref='locationText' style={{ textAlign: 'center', fontSize: 13, color: '#9e9e9e' }}>重新定位</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerSearch} onPress={() => { this.props.navigation.navigate('MyModal') }}>
                            <Image style={{ width: 12, height: 12, margin: 5 }} source={require('../../../images/搜索.png')} />
                            <Text style={{ color: '#999', fontSize: 11 }}>大家都在搜</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.headermsg}>
                                <Image style={styles.msgicon} source={require('../../../images/消息.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.banner}>
                        <SwiperView data={bannerData} />
                    </View>
                    <View >
                        <CategoryView {...this.props} data={typeData} />
                    </View>
                    <View style={{ height: 6, width: screenWidth(), backgroundColor: '#f3f3f3' }}>
                        <Text></Text>
                    </View>
                    <View>
                        <DiaryView {...this.props} data={brandData} />
                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerView: {
        flexDirection: 'row',
        height: 44,
        width: screenWidth(),
        alignItems: 'center',
    },
    headerLocation: {
        flex: 1.5,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 5,
    },
    headerSearch: {
        flex: 4,
        height: 28,
        borderRadius: 13,
        backgroundColor: 'rgb(241,241,241)',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    headermsg: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 10,
    },
    msgicon: {
        width: 20,
        height: 20,
    },
    banner: {
        height: 200,
        width: screenWidth(),

    },
    wrapper: {

    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: screenWidth(),
        height: 200,
    },
    moduleView: {
        width: screenWidth(),
        flexDirection: 'row',
        height: 100,
    },
    appointView: {
        flex: 1,
        alignItems: 'center',
    },
    zixunView: {
        flex: 1,
        alignItems: 'center',
    },
    nearclinic: {
        flex: 1,
        alignItems: 'center',
    },
    goodsTypeView: {
        width: screenWidth() / 5.0,
        height: 100,
        alignItems: 'center'
    },
    goodsItemIcon: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
    },
    goodsItemText: {
        fontSize: 15,
        color: '#333'
    },
    diaryHeaderItem: {
        width: 150,
        height: 150,
        borderRadius: 5,
        justifyContent: 'flex-end',
        margin: 10,
        resizeMode: 'contain',
        overflow: 'hidden',
    },
    diaryHeaderItemLine: {
        width: 150,
        height: 50,
        justifyContent: 'center',
    },
    diaryHeaderItemText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#333'
    }


});


