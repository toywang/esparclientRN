/**
 * Created by jiangguisheng on 2018/6/25.
 */


import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import QuickTimeList from "./QuickTimeList";
import requestBase from '../../utils/requestBase'

const req = new requestBase()

export default class SelectClick extends Component {
    state = {
        modalVisible: false
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.3)'}}>
                        <QuickTimeList
                            cancelClick={()=>{
                                this.setModalVisible(false)
                            }}
                        />
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

/*
import React,{Component} from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native'
import {screenWidth} from "../../utils/Utils";


let dataSource=[
    {
        title:"上次预约项目",
        icon:require('../../../images/上次预约图标.png'),
        subtitle:'没约会搜索',
        showNextIcon:false,
        data:[
            {name:'美白针',content:'hello'}
        ],
    },
    {
        title:"本次预约项目",
        subtitle:'没约会搜索',
        showNextIcon:false,
        icon:require('../../../images/上次预约图标.png'),
        data:[
            {name:'美白针',content:'hello'}
        ],
    },
    {
        title:"选择门店",
        subtitle:'没约会搜索',
        showNextIcon:true,
        icon:require('../../../images/选择门店.png'),
        data:[
        ],
    },
    {
        title:"预约时间",
        subtitle:'没约会搜索',
        showNextIcon:true,
        icon:require('../../../images/预约时间.png'),
        data:[
        ],
    },
    {
        title:"选择顾问",
        subtitle:'没约会搜索',
        showNextIcon:true,
        icon:require('../../../images/选择顾问.png'),
        data:[
        ],
    },
    {
        title:"到店支付",
        subtitle:'没约会搜索',
        showNextIcon:false,
        icon:'',
        data:[
            {name:'美白针',content:'hello'}
        ],
    },

]
class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
            >
                <Text>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}
export default class SelectClick extends Component{

    static  navigationOptions = ({navigations,screenProps})=>({
        headerTitle:"选择门店"
    })


    constructor(props){
        super(props)
    }
    _pressItem=({item})=>{
        if (this.props.navigation.state.params.callback){
            this.props.navigation.state.params.callback(item);
            this.props.navigation.goBack();
        }
    }
    _renderItem=(item)=>{
        return(
            <MyListItem
                style={styles.myListItem_text}
                name={item.item.title}
                onPressItem={this._pressItem.bind(this,item)}
            />
        )

    }

    render(){
        return (
            <SafeAreaView>
                <FlatList
                    data={dataSource}
                    renderItem={this._renderItem}

                />
            </SafeAreaView>
        )
    }






}
const styles=StyleSheet.create({
    container:{

    },
    item:{

    },
    item_image:{
        width:100,
        height:100,
    },
    myListItem_text:{
        width:screenWidth(),
        height:40,
    }
})
*/