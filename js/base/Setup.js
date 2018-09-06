// import React,{Component} from 'react'
// import {createStackNavigator} from 'react-navigation'
// import Welcome from "./Welcome";
// import Home from "../pages/home/Home";
// import {AsyncStorage,Image,Dimensions,View,Text} from "react-native";
//
//
// const {width,height}=Dimensions.get('window')
//
// class Setup extends Component{
//     static navigationOptions={
//         header:null
//     }
//     constructor(props){
//         super(props)
//     }
//     _renderLachView=()=>{
//
//         AsyncStorage.getItem('isFirst',(error,result)=>{
//
//             if (result==='false'){
//                 console.log('is not first lanch');
//                 this.props.navigation.navigate('Main')
//             } else {
//                 console.log('first lanch');
//                 AsyncStorage.setItem('isFirst','false',(error)=>{
//                     alert(error)
//                 });
//                 this.props.navigation.navigate('Auth')
//             }
//         })
//     }
//     componentDidMount(){
//         setTimeout(this._renderLachView,2000)
//     }
//     render(){
//         return(
//            <Image source={{uri:'app启动页1242x2208'}} style={{width:width,height:height}}/>
//         )
//     }
// }



// export default class Setup extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//
//     _renderScene(route, navigator) {
//         let Component = route.component;
//         return (
//             <Component {...route.params} navigator={navigator}/>
//         );
//     }
//     componentDidMount(){
//         setInterval(this._renderScene())
//     }
//
//     render() {
//         return(
//             <Image source={require('../../images/拾光蓝色.png')} style={{width:width,height:height}}/>
//         );
//     }
// }





// class Setup extends Component {
//     constructor(props){
//         super(props)
//     }
//     // 渲染场景
//     _renderScene(route, navigator){
//         return (
//             <route.component navigator={navigator} {...route} />
//         )
//     }
//     render() {
//         return (
//             <Navigator  initialRoute={{
//                 name:'lanchview',
//                 component: LanchView
//             }}
//                         renderScene={this._renderScene.bind(this)}
//
//                         style={{flex:1}}
//             />
//         );
//
//
//     }
//
// }
// export default createStackNavigator(
//     {
//         First:Setup,
//         Auth: Welcome,
//         Main: Home,
//     }
// );
