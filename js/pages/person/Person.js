import React,{Component} from 'react'
import {AsyncStorage,Image,Dimensions,View,Text,Button} from "react-native";
import BaseComponent from "../../base/BaseComponent";


export default class Person extends BaseComponent{

    static navigationOptions={
        headerTitle:'个人',
        headerColor:'#eeaa44',
    }

    render(){
        return(
            <View>
                <Button onPress={()=>this.props.navigation.push('assistant')} title="hello"/>
            </View>
        )
    }
}