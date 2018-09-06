/**
 * Created by jiangguisheng on 2018/6/25.
 */

import React,{Component} from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	SafeAreaView,
	Image,
} from 'react-native'
export default class ReserveItems extends Component{

	constructor(props){
		super(props)
	}
	_renderItem=()=>{
		return(
			<View>
				<View></View>
				<View>
					<Image  />

				</View>
			</View>
		)

	}

	render(){
		return (
			<SafeAreaView>
				<FlatList

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
  
	}

})