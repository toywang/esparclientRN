// import React,{Component} from 'react'
// import {
//     Text,
//     View,
//     Image,
//     StyleSheet,
//     DeviceEventEmitter,
//     AsyncStorage,
// } from 'react-native';
// import Onboarding from 'react-native-onboarding-swiper';
// import Home from "../pages/home/Home";
// import Navigator, {createStackNavigator,createSwitchNavigator} from "react-navigation";
//
// export default class Welcome extends Component{
//     constructor(props){
//         super(props)
//     }
//     static navigationOptions={
//         header:null
//     }
//     render(){
//
//         return(
//             <Onboarding
//                 pages={[
//                     {
//                         backgroundColor: '#fff',
//                         image: <Image source={{uri:'darentuijian'}} />,
//                         title: 'Onboarding',
//                         subtitle: 'Done with React Native Onboarding Swiper',
//                     },
//                     {
//                         backgroundColor: '#fe6e58',
//                         image: <Image source={{uri:'jingmeiriji'}} />,
//                         title: 'The Title',
//                         subtitle: 'This is the subtitle that sumplements the title.',
//                     },
//                     {
//                         backgroundColor: '#999',
//                         image: <Image source={{uri:'yimeikepu'}} />,
//                         title: 'Triangle',
//                         subtitle: "Beautiful, isn't it?",
//                     },
//                 ]}
//                 showDone={true}
//                 onDone={()=> {
//                     this.props.navigation.navigate('Main')
//                 }}
//             />
//         )
//     }
// }
//
// export default createStackNavigator(
//     {
//         Auth: Welcome,
//         Main: Home,
//     }
// );
//
// const styles = StyleSheet.create({
//     wrapper: {
//         backgroundColor: '#009688',
//     },
//     slide1: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#e91e63',
//     },
//     slide2: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#673ab7',
//     },
//     slide3: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#3f51b5',
//     },
//     text: {
//         color: '#fff',
//         fontSize: 30,
//         fontWeight: 'bold',
//     },
// });
