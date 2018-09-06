import React,{Component,PureComponent} from 'react'
import {
    FlatList,
    RefreshControl,
    View,
    Button,
    Image,
    ActivityIndicator,
    Text,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import {screenWidth} from "./Utils";


export default class RefreshFlatList extends PureComponent{

    constructor(props){
        super(props)
        this.state={
            refreshState:0,
	        emptyHeight:0,
        }
    }
    static propTypes = {
        refreshState:PropTypes.int,//0 正常状态 1下拉刷新 2上拉加载 3无更多数据
        loadMore:PropTypes.func,
    }
    static defaultProps = {
        refreshState:0,
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.refreshState!==this.state.refreshState){
            this.setState({
                refreshState:nextProps.refreshState,
            })
        }
    }
    _footer=()=>{
        let state = this.state.refreshState;
        switch (state){
            case 0:
                return(
                    <View>
                    </View>
                )
                break;
            case 1:
                return(
                    <View>
                    </View>
                )
                break;
            case 2:
                return(
                    <View style={{width:screenWidth(),height:40,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator animating={true} color='red' size='large'/>
                    </View>
                )
                break;
            case 3:
                return(
                    <View style={{width:screenWidth(),height:40,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'black',}}>无更多数据!</Text>
                    </View>
                )
                break;
            default:
                return (
                    <View style={{width:screenWidth(),height:40,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'black',}}>这是什么？？</Text>
                    </View>
                )
                break;
        }
    }
    _empty=()=>{

        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center',height:this.state.emptyHeight}}>
                <Text>暂无数据!</Text>
            </View>
        )
    }
    render(){



        return(
            <FlatList
                {...this.props}
                ListEmptyComponent={this._empty}
                ListFooterComponent={this._footer}
                onEndReachedThreshold={0.1}
                onLayout={(e)=>{
                    let height = e.nativeEvent.layout.height;
                    if (this.state.emptyHeight<height){
                        this.setState({
                            emptyHeight:height,
                        })
                    }
                }}
            />
        )
    }
}
const styles=StyleSheet.create({




})