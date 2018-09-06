import React,{Component} from 'react'
import {Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Button,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import {base_url, image_ip} from "../../utils/Config";
import {screenWidth,screenHeight} from "../../utils/Utils";
import RefreshFlatList from "../../utils/RefreshFlatList";
import FlatListExample from "../../utils/FlatListExample";
import Com from "../../utils/Com";
import RefreshableFlatList from 'react-native-refreshable-flatlist';

let index=0
let number=10
let list


export default class DiaryList extends Component{

	static navigationOptions=({navigation,screenProps})=>({
		headerTitle:'日记'
	})


    constructor(props){
        super(props)
        this.state={
            data:[],
            isLoading:false,
            isRefreshing:false,
            showFoot:0,
        }
    }
    requestData(){
        var url=base_url+'/queryDiary.do?index='+index+'&size='+number
        fetch(url,{
            method:'GET'
        }).then((response)=>response.json())
            .then((responseJson)=>{
                if (Boolean(responseJson.success)){
                    list = responseJson.data
	                if (index==0){
                        this.setState({
                            data:list,
                            showFoot:0,
                        })
                    } else {
                        this.setState({
                            data:this.state.data.concat(list),
                        })
                    }
                    this.setState({
                        isRefreshing:false,
                        isLoading:false,
                    })
                    if (list.length<number){
                         this.setState({
                             showFoot:3,
                         })
                    }
                    list=null
                }
            }).catch((error)=>alert('接口:'+url+'错误'+error.description))
            .done();

    }
    componentDidMount(){
        this.requestData()
    }
    _renderItem=(item)=>{
        return(
            <View style={styles.item}>
                <View style={styles.itemTopView}>
                    <Image source={{uri:image_ip+item.item.HeadPortrait}} defaultSource={require('../../../images/默认头像.png')} style={styles.itemTopViewImage} />
                    <Text>{item.item.EmployeeName}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image style={styles.itemImage} source={{uri:image_ip+item.item.imageUrl}}/>
                </View>
                <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
                    <Text>{item.item.Title}</Text>
                </View>
            </View>
        )
    }
    _onRefresh=()=>{
        this.setState({
            isRefreshing:true,
            showFoot:1,
        })
        index=0;
        this.requestData();

    }
	_onEndReached(){
		this.setState({
			isLoading:true,
			showFoot:2,
		})
		index++;
		this.requestData();
		console.log('');
	}

    render() {
	    return (
		    <SafeAreaView style={styles.container}>
			    <RefreshFlatList
				    data={this.state.data}
				    renderItem={this._renderItem}
				    refreshState={this.state.showFoot}
				    onEndReached={this._onEndReached.bind(this)}
			    />

		    </SafeAreaView>
	    )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
	    height:screenHeight(),
	    backgroundColor: 'white',
    },
    item:{
        flex:1,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white'
    },
    itemTopView:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        marginTop:10,
        marginLeft:10,
    },
    itemTopViewImage:{
        width:30,
        height:30,
        overflow:'hidden',
        borderRadius:15,
        marginRight:7,
    },
    itemTopViewText:{
        height:30,
        width:100,
        color:'#333',
        fontSize:15,
    },
    itemImage:{
        width:screenWidth()-20,
        height:130,
    },
    itemTitle:{
        color:'black',
        fontSize:20,
        textAlign:'center',

    }

})