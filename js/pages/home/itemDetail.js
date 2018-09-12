import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StyleSheet, ImageBackground, WebView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { screenWidth, screenHeight, http_url } from '../../utils/Utils';
import requestBase from '../../utils/requestBase'

const req = new requestBase()
const BaseScript =
    `
(function () {
    var height = null;
    function changeHeight() {
      if (document.body.scrollHeight != height) {
        height = document.body.scrollHeight;
        if (window.postMessage) {
          window.postMessage(JSON.stringify({
            type: 'setHeight',
            height: height,
          }))
        }
      }
    }
    setInterval(changeHeight, 100);
} ())
`
export default class itemDetail extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        header: null
    })

    constructor(props) {
        super(props)
        this.state = {
            itemDetailData: null,
            webViewHeight: 30,
        }
    }
    navigationBar() {
        return (
            <View ref="navigationBar" style={styles.navigationBar}>
                <TouchableOpacity ref="navigationBarBg1" style={styles.navigationBarBackBG1} onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <Image style={{ width: 15, height: 13 }} source={require('../../../images/Back.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity ref="navigationBarBg2" style={styles.navigationBarBackBG2} onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <Image style={{ width: 15, height: 13 }} source={require('../../../images/Back.png')}></Image>
                </TouchableOpacity>
                <Text ref="navigationTitle" style={{ marginTop: 22, color: 'rgba(0,0,0,0)', }}>项目详情</Text>
            </View>
        )
    }
    componentDidMount() {
        this.requestData()
    }
    onMessage(event) {
        console.log(event.nativeEvent.data);
        try {
            const action = JSON.parse(event.nativeEvent.data)
            if (action.type === 'setHeight' && action.height > 0) {
                this.setState({ webViewHeight: action.height })
                // alert(action.height);
            }
        } catch (error) {
            // pass
            // alert('action.height');
        }
    }
    requestData() {
        req.getRequest('http://114.55.72.11:8088/espar_client/api/queryGoodsMallInfo.do?goodsid=21&latitude=0&longitude=0')
            .then((res) => {
                if (res.success) {
                    this.setState({
                        itemDetailData: res.data
                    })
                }
            })
    }
    _scroll = (event) => {
        let y = event.nativeEvent.contentOffset.y
        let opacity = y / 164.0
        console.log('滑动距离' + y)
        if (y < 164 && y > 0) {
            this.refs.navigationBar.setNativeProps({
                style: {
                    opacity: opacity,
                    backgroundColor: 'rgba(255,255,255,1)',
                }
            })
            this.refs.navigationTitle.setNativeProps({
                style: {
                    opacity: opacity,
                    color: 'rgba(0,0,0,1)',
                }
            })
            this.refs.navigationBarBg1.setNativeProps({
                style: { opacity: 1 - opacity }
            })
            this.refs.navigationBarBg2.setNativeProps({
                style: { opacity: opacity }
            })
        } else if (y <= 0) {
            this.refs.navigationBar.setNativeProps({
                style: {
                    opacity: 1,
                    backgroundColor: 'rgba(255,255,255,0)',
                }
            })
            this.refs.navigationTitle.setNativeProps({
                style: {
                    opacity: 0,
                    color: 'rgba(0,0,0,1)',
                }
            })
            this.refs.navigationBarBg1.setNativeProps({
                style: { opacity: 1 }
            })
            this.refs.navigationBarBg2.setNativeProps({
                style: { opacity: 0 }
            })
        } else {
            this.refs.navigationBar.setNativeProps({
                style: {
                    opacity: 1,
                    backgroundColor: 'rgba(255,255,255,1)',
                }
            })
            this.refs.navigationTitle.setNativeProps({
                style: {
                    opacity: 1,
                    color: 'rgba(0,0,0,1)',
                }
            })
            this.refs.navigationBarBg1.setNativeProps({
                style: { opacity: 0 }
            })
            this.refs.navigationBarBg2.setNativeProps({
                style: { opacity: 1 }
            })
        }

    }
    renderProcessList() {
        let views = []
        this.state.itemDetailData.OperProcessList.forEach((value, key) => {
            views.push(
                <View style={{ display: 'flex', backgroundColor: 'white' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <ImageBackground style={{ width: 40, height: 40, marginLeft: 30, marginRight: 10 }} source={require('../../../images/操作流程图标.png')}>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: http_url + value.IconPath }}></Image>
                        </ImageBackground>
                        <Text>{value.OperationUnitName}</Text>
                    </View>
                    <View style={{ width: 40, marginLeft: 30, display: 'flex', alignItems: 'center' }}>
                        <Image style={{ width: 2, height: 15, backgroundColor: '#ccc' }}></Image>
                    </View>

                </View>
            )
            if (key == (this.state.itemDetailData.OperProcessList.length - 1)) {
                views.push(
                    <View style={{ display: 'flex', backgroundColor: 'white' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <ImageBackground style={{ width: 40, height: 40, marginLeft: 30, marginRight: 10 }} source={require('../../../images/操作流程图标.png')}>
                                <Image style={{ width: 50, height: 50 }} source={{ uri: http_url + value.IconPath }}></Image>
                            </ImageBackground>
                            <Text>{value.OperationUnitName}</Text>
                        </View>
                    </View>
                )
            }

        });
        return views
    }
    render() {
        if (this.state.itemDetailData) {
            return (
                <View style={{ width: screenWidth(), height: screenHeight() }}>
                    {this.navigationBar()}
                    <View style={{width:screenWidth(),height:screenHeight()-49}}>
                        <ScrollView style={styles.container} scrollEventThrottle={20} onScroll={this._scroll}>
                            <Image style={styles.contentImage} source={{ uri: http_url + this.state.itemDetailData.photoList[0] }}></Image>
                            <View style={{ width: screenWidth() }}>
                                <View style={styles.desView}>
                                    <Text style={styles.desViewName}>{this.state.itemDetailData.Name}</Text>
                                    <Text style={styles.desViewInfo}>{this.state.itemDetailData.Product_Info}</Text>
                                    <View style={styles.desViewPriceView}>
                                        <Text style={styles.desViewPriceViewPrice}>￥{this.state.itemDetailData.Price}</Text>
                                        <Text style={styles.desViewPriceViewCount}>已售:{this.state.itemDetailData.Sales_Count}</Text>
                                    </View>
                                </View>
                                <View style={{ borderStyle: 'solid', borderTopColor: '#e5e5e5', borderTopWidth: 5 }}>
                                    <Text style={{ marginLeft: 15, fontSize: 16, marginVertical: 10 }}>操作流程</Text>
                                    {this.renderProcessList()}
                                </View>
                                <Text style={{ marginLeft: 15, fontSize: 16, marginVertical: 10 }}>产品详情</Text>
                                <WebView
                                    style={{
                                        width: screenWidth(),
                                        height: this.state.webViewHeight
                                    }}
                                    injectedJavaScript={BaseScript}
                                    scalesPageToFit={true}
                                    javaScriptEnabled={true}
                                    decelerationRate='normal'
                                    startInLoadingState={true}
                                    bounces={false}
                                    scrollEnabled={false}
                                    automaticallyAdjustContentInsets={true}
                                    contentInset={{ top: 0, left: 0 }}
                                    onMessage={this.onMessage.bind(this)}
                                    source={{ uri: http_url + this.state.itemDetailData.Product_Details_Url }}
                                ></WebView>
                            </View>
                        </ScrollView>

                    </View>

                    <View style={styles.tabBottom}>
                        <TouchableOpacity style={{ width: 0, flexGrow: 1, height: '100%', backgroundColor: '#23daaf', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../../images/电话-图标.png')}></Image>
                            <Text style={{ color: 'white' }} >电话</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 0, flexGrow: 2, height: '100%', backgroundColor: '#afda32', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>在线预约</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 0, flexGrow: 2, height: '100%', backgroundColor: '#da32af', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>在线咨询</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <SafeAreaView></SafeAreaView>
            )
        }

    }
}
const styles = StyleSheet.create({
    container: {
        width: screenWidth(),
        backgroundColor: 'white'
    },
    navigationBar: {
        width: screenWidth(),
        height: 64,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(255,255,255,0)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    navigationBarBackBG1: {
        position: 'absolute',
        left: 12,
        top: 32,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#777',
        opacity: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationBarBackBG2: {
        position: 'absolute',
        left: 12,
        top: 32,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'white',
        opacity: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: screenWidth(),
    },
    contentImage: {
        width: screenWidth(),
        height: 230,
    },
    desView: {
        display: 'flex',
        width: screenWidth(),
    },
    desViewName: {
        fontSize: 14,
        marginHorizontal: 7,
        marginVertical: 10,
    },
    desViewInfo: {
        fontSize: 13,
        color: '#999',
        lineHeight: 16,
        marginHorizontal: 7,
    },
    desViewPriceView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 12,
        marginHorizontal: 7,
        marginVertical: 7,
    },
    desViewPriceViewPrice: {
        color: 'red',
    },
    desViewPriceViewCount: {
        color: '#999',
        fontSize: 12
    },
    tabBottom: {
        width: screenWidth(),
        height: 49,
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})