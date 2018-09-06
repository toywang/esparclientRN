import React,{Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    DeviceEventEmitter,
} from 'react-native'
import {StackNavigator} from 'react-navigation'

export default class BaseComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            theme:this.props.theme,
        }
    }
    static navigationOptions={
        header:null,
    }
    componentDidMount(){
        // this.changeTheme=DeviceEventEmitter.addListener('changeTheme',(theme)=>{
        //     alert(theme)
        // })
    }
    componentWillUnmount(){
        // this.changeTheme.remove();
    }

}


