import React,{Component} from 'react'
import {StackNavigator} from 'react-navigation'
import {TabNavigator} from  'react-navigation'
import {
    Text,
    StyleSheet,
    Image,
    Button,
    View,
} from 'react-native'
import BaseComponent from "../../base/BaseComponent";
import FlatListExample from "../../utils/FlatListExample";
export default class Assistant extends BaseComponent{



    static navigationOptions = {
        tabBarLabel: 'Assistant',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../images/拾光蓝色.png')}
                style={[styles.tabIcon, {tintColor: tintColor}]}
            />
        ),
    };
    render(){
        return(
            <FlatListExample/>
        )
    }
}
const styles=StyleSheet.create({
    tabIcon:{
        width:26,
        height:26,
    },
})
