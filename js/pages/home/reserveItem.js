import React,{Component} from 'react'
import {FlatList,Text,Image,View,StyleSheet} from 'react-native'
import PopView from './PopView';
import { screenWidth } from '../../utils/Utils';


export default class reserveItem extends Component {

    render(){
        return (
            <View style={styles.topTitle}>
                <PopView
                    leftArray={['上海','南京','广州','杭州']}
                    centerArray={['北京','天津','大连']}
                    rightArray={['重庆','四川']}
                    selectCallBack={(array)=>{
                        console.log('选中的index'+array)
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    topTitle:{
        width:screenWidth(),
        height:50,
    }
})