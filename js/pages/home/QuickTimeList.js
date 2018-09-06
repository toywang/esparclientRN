import React,{Component} from 'react';
import {
    ScrollView,
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    LayoutAnimation,
} from 'react-native'
import PropTypes from 'prop-types'
import {screenHeight, screenWidth} from "../../utils/Utils";
import { YellowBox } from 'react-native';
import moment from 'moment'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
class DayScrollview extends Component{

    static  propTypes= {
        daySelect:PropTypes.func,
        monthDays:PropTypes.array,
    }
    
    constructor(props) {
        super(props);
        this.state={
            days:[],
            selectid:0,
            scrollBottomBar:0,
            offsetX:0,
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            days:nextProps.monthDays
        })
    }
    scrollBar(key){
        LayoutAnimation.easeInEaseOut()
        this.refs.scrollView.meas
        this.setState({
            scrollBottomBar:key*screenWidth()*0.2-this.state.offsetX
        })
    }
    renderItem(){
        // 数组
        var allChild = [];
        
        // 遍历
        this.state.days.forEach((value,key)=>{
            allChild.push(
                //  循环排列的view中必须有唯一表示
                <TouchableOpacity onPress={()=>{
                    if(this.props.daySelect){
                        this.props.daySelect(key)
                    }
                    this.setState({
                        selectid:key,
                    })
                    this.scrollBar(key)

                }}>
                    <View key={key} style={styles.scrollview_item}>
                        <Text style={key==this.state.selectid?styles.scrollview_text_select_item:''}>{moment(value.day).format('MM-DD')}</Text>
                    </View>
                </TouchableOpacity>
                
            );
        })
        // 返回数组，不然怎么显示出来
        return allChild;
    }
    
    render(){
        return (
            <View style={{width:screenWidth(),height:50}}>
                <ScrollView ref='scrollView' horizontal={true} onScroll={(e)=>{
                    this.setState({
                        offsetX:e.nativeEvent.contentOffset.x
                    })
                }}>
                    {this.renderItem()}
                
                </ScrollView>
                <View ref='scrollBottomBar' style={{height:2,left:this.state.scrollBottomBar,backgroundColor:'#3dccca',width:screenWidth()*0.2}}>
                    
                </View>
            </View>
        )
    }
}

export default class QuickTimeList extends Component{
    static  propTypes= {
        cancelClick:PropTypes.func,
        selectedTime:PropTypes.func,
        timeData:PropTypes.array,
        monthDays:PropTypes.array,
    }
    constructor(props) {
        super(props);
        this.state= {
            hoursData:[],
            currentKey:0
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            hoursData:nextProps.timeData
        })
    }
    selectTimePress(item){
        this._text.setNativeProps({
            style:{
                color:'#3dccca',
                borderColor:'#3dccca',
                borderWidth:1,
                borderStyle:'solid',
                borderRadius:5,
            }
        })
    }
    _renderItem=(item)=>{
        console.log('item'+item.item.ReserveTime);
        let ref = 'item'+item.index
        return (
                <TouchableOpacity style={styles.time_item} onPress={()=>{
                    if(this.props.selectedTime) {
                        this.props.selectedTime(item)
                    }
                    this.state.hoursData.forEach((value,key)=>{
                        value.isSelected = false
                    })
                    item.item.isSelected = true
                    this.setState({
                        hoursData:this.props.monthDays[this.state.currentKey].hours
                    })
                }}>
                    <Text style={item.item.isSelected==true?styles.time_select_text:styles.time_item_text}>{item.item.ReserveTime+'('+item.item.MaxCount+')'}</Text>
                </TouchableOpacity>
        )
    }
    _headerView=()=>{
        return (
            <View>

            </View>
        )

    }
    render(){
        return (
            <View style={styles.main}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>{
                            console.log('cancel'+this.props.cancelClick)
                            if (this.props.cancelClick) {
                                this.props.cancelClick()
                            }
                        }}>
                            <Image source={{uri:"关闭"}} style={{width:20,height:20}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>预约时间</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            if (this.props.cancelClick) {
                                this.props.cancelClick()
                            }
                        }}>
                            <Text ref='confirmText'>确定</Text>
                        </TouchableOpacity>
                    </View>
                    <DayScrollview { ...this.props} style={{width:screenWidth(),backgroundColor:'red',height:40}}
                            daySelect={(key)=> {
                                this.state.currentKey = key
                                this.setState({
                                    hoursData:this.props.monthDays[this.state.currentKey].hours
                                })
                            }}
                    >
                    </DayScrollview>
                    <FlatList
                        style={{backgroundColor:'white',flexWrap:'wrap'}}
                        data={this.state.hoursData}
                        horizontal={false}
                        numColumns={5}
                        renderItem={this._renderItem}
                    />
                </View>
            </View>

        )
    }

}
const styles = StyleSheet.create({
    main: {
        width:screenWidth(),
        height:screenHeight(),
        display:'flex',
        justifyContent:'flex-end'

    },
    container:{
        width:screenWidth(),
        height:screenHeight()*0.6,
        display:'flex',
        backgroundColor:'white',
    },
    header:{
      height:50,
        width:screenWidth()-20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        fontSize:20,
        marginLeft:10,
        marginRight:10,
    },
    header_close:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    main_scrollview:{
        height:40,
        width:screenWidth(),
       
    },
    scrollview_item:{
        color:'#333',
        width:screenWidth()*0.2,
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        borderStyle:'solid',
        borderTopColor: '#e0e0e0',
        borderTopWidth: 1,
        borderStyle:'solid',
        borderRightColor: '#e0e0e0',
        borderRightWidth: 1,
        borderStyle:'solid',

    },
    scrollview_text_select_item:{
        color:'#3dccca',
    },
    time_item:{
        width:screenWidth()*0.2,
        height:45,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    time_item_text:{
        textAlign:'center',
        paddingLeft:5,
        paddingRight:5,
        lineHeight:35,
        display:'flex',
        fontSize:14,
        alignItems:'center',
        justifyContent:'center',
        height:35,
        color:'#333',
        borderColor:'#999',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:5,
    },
    time_select_text:{
        textAlign:'center',
        paddingLeft:5,
        paddingRight:5,
        lineHeight:35,
        display:'flex',
        fontSize:14,
        alignItems:'center',
        justifyContent:'center',
        height:35,
        color:'#3dccca',
        borderColor:'#3dccca',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:5,
    }
})

