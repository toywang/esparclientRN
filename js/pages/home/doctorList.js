import React, { Component } from 'react'
import {
    SectionList,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import { min } from 'moment';
import { screenWidth, screenHeight } from '../../utils/Utils';

const ITEM_HEIGHT = 50
const HEADER_HEIGHT = 24
const SEPLINE = 0


const returnTrue = () => { }

export default class doctorList extends Component {

    // static  propTypes= {
    //     sections: PropTypes.array
    // }
    async getCityInfos (){
        let jsonData = await require('../../../images/city.json')
        let citys = jsonData.data
        let secions = []
        let titls = []
        let tempCitys = []//用于计算index滚动的值
        citys.forEach((value,key)=>{
            secions.push({'title':value.title})
            titls.push({'title':value.title})
            value.city.forEach((cityValue,cityKey)=>{
                secions.push(cityValue)
            })
            tempCitys.push({'citys':value.city})
        })
        this.setState({
            sectionDatas:secions,
            secionTitls:titls,
            tempCitys:tempCitys
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            sectionHeight: 0,
            sectionY: 0,
            sectionDatas:[],
            secionTitls:[],
            tempCitys:[]
        }
        this.getCityInfos()
    }
    componentDidMount() {

    }
    _headerSection  ()  {
        let that = this
        let views = []
        this.state.secionTitls.forEach((value, key) => {
            views.push(
                <TouchableOpacity onPress={()=>{
                    let index = 0
                    for (let i=0;i<key;i++) {
                        index += 1
                        index += this.state.tempCitys[i].citys.length
                    }
                    this.refs.sectionlistview.scrollToIndex({animated:true,index:index})
                }}>
                    <View
                        ref={'sectionItem' + key}
                        onLayout={(e) => {
                            let { x, y, width, height } = e.nativeEvent.layout
                            this.setState({
                                sectionHeight: height,
                                sectionY: y,
                            })
                        }}
                    >
                        <Text>{value.title}</Text>
                    </View>
                </TouchableOpacity>

            )
        });
        return views
    }
    _renderItem=({item})=>{
        // return (
        //     <View style={{display:'flex',alignItems:'center'}}>
        //         <Text style={styles.item_header_text}>{item.city_child}</Text>
        //     </View>
        // )
        if (item.title!=undefined) {
            return (
                <View style={{display:'flex',alignItems:'center'}}>
                    <Text style={styles.item_header_text}>{item.title}</Text>
                </View>
            )
        } else {
            return (
                <View style={{display:'flex',alignItems:'center'}}>
                    <Text style={styles.item_header_text}>{item.city_child}</Text>
                </View>
            )
        }
       
    }
    _renderItemHeader=({item})=>{
        return (
            <View style={{display:'flex',alignItems:'center'}}>
                <Text style={styles.item_header_text}>{item.title}</Text>
            </View>
        )
    }
    _scrollViewSectionHeader = (key) => {
        var ev = e.nativeEvent.touches[0];
        // 手指按下的时候需要修改颜色
        this.refs.sectionview.setNativeProps({
            style: {
                backgroundColor: 'rgba(0,0,0,0.3)'
            }
        })
        let targetY = ev.pageY;
        const {y, height} = this.measure;
        if (!y || targetY < y) {
            return;
        }
        let index = Math.floor((targetY - y) / height);
        index = Math.min(index, this.props.sections.length - 1);
        
    }
    _getItemLayout = (data,index)=>{
        let [length, separator, header] = [ITEM_HEIGHT, SEPLINE, HEADER_HEIGHT];
        return {length, offset: (length + separator) * index, index};
    }
    render() {
        return (
            <SafeAreaView>
                <FlatList 
                    ref='sectionlistview'
                    data={this.state.sectionDatas}
                    renderItem={this._renderItem}
                    getItemLayout={this._getItemLayout}
                    initialNumToRender={20}
                />
                 <View style={styles.left_view} ref='view'>
                    {this._headerSection()}
                </View>
                {/* <View
                    style={styles.left_view}
                    ref='sectionview'
                    onStartShouldSetResponder={returnTrue}
                    onMoveShouldSetResponder={returnTrue}
                    onResponderGrant={this._scrollViewSectionHeader}
                    onResponderMove={this._scrollViewSectionHeader}
                    onResponderRelease={this._scrollViewSectionHeader}
                >
                    {this._headerSection()}
                </View> */}
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    main:{
        width:screenWidth(),
    },
    left_view:{
        width:30,
        height:screenHeight()*0.8,
        position:'absolute',
        top:screenHeight()*0.1,
        right:0,
        backgroundColor:'#fff222',
    },
    item_header_text:{
        width:screenWidth(),
        height:50,
        lineHeight:50,
        backgroundColor:'white',
    },
    

})