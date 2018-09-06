import React,{Component} from 'react'
import {
    WebView,
    Text,
    View,
    Button,
    StyleSheet,
    SafeAreaView,
    Image,
    ActivityIndicator,
    MaskedViewIOS,
} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {image_ip} from "../../utils/Config";

export default class BrandClinicInfo extends Component{
    constructor(props){
        super(props)
    }
    static navigationOptions = ({navigation,screenProps})=> ({
        headerTitle:navigation.state.params.info.title

    })
    render(){
        const { params } = this.props.navigation.state;
        const linkUrl = params ? params.info.linkUrl : null;
        return(
            <SafeAreaView style={styles.container}>
                <WebView
                    style={styles.web}
                    scalesPageToFit={true}
                    source={{uri:'https://www.baidu.com'}}
                    renderLoading={() => {
                        return <View><Text style={{color:'red'}}>这是自定义Loading...</Text></View>
                    }}
                />
            </SafeAreaView>

        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    web:{
        flex:1,
        width:'100%',
        height:'100%',
    }
})