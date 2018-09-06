import React,{Component} from 'react'
import {
    WebView,
    Text,
    View,
    Button,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {image_ip} from "../../utils/Config";


export default class Login extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </SafeAreaView>
        );
    }
}
styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    web:{
        width:'100%',
        height:'100%'

    }
})