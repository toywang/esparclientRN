import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import Assistant from "./js/pages/assistant/Assistant";
import Experience from "./js/pages/experience/Experience";
import Wallet from "./js/pages/wallet/Wallet";
import Person from "./js/pages/person/Person";
import Home from "./js/pages/home/Home";
import BrandClinicInfo from "./js/pages/home/BrandClinicInfo";
import Login from "./js/pages/home/Login";
import DiaryList from "./js/pages/home/DiaryList";
import DaRenList from "./js/pages/home/DaRenList";
import QuickReserve from "./js/pages/home/QuickReserve";
import SelectClick from "./js/pages/home/SelectClick";

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { createStore } from "redux";
import { combineReducers } from 'redux';
import doctorList from './js/pages/home/doctorList';
import SelectDoctorList from './js/pages/home/selectDoctorList';
import reserveItem from './js/pages/home/reserveItem';
import itemDetail from './js/pages/home/itemDetail';

const productsReducer = function(state=[], action) {
  return state;
}

const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ]
}

const ADD_TO_CART = 'ADD_TO_CART';

const cartReducer = function(state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }

    default:
      return state;
  }
}

function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity,
      unitCost
    }
  }
}

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers);

let store = createStore(rootReducer);

console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

unsubscribe();
// const {width,height}=Dimensions('window')
// 通过TabNavigator做路由映射
const MainScreentNavigator=TabNavigator({
    home:{
        screen:Home,
        navigationOptions:{
            tabBarIcon:({tintColor,focused})=>(
                <Image source={focused?require('./images/拾光蓝色.png'):require('./images/拾光-灰色.png')}/>
            )
        }
    },
    assistant:{
        screen:Assistant,
        navigationOptions:{
            tabBarIcon:({tintColor,focused})=>(
                <Image source={focused?require('./images/助理-蓝色.png'):require('./images/助理-灰色.png')}/>
            )
        }
    },
    experience:{
        screen:Experience,
        navigationOptions:{
            tabBarIcon:({tintColor,focused})=>(
                <Image source={focused?require('./images/体验-蓝色.png'):require('./images/体验-灰色.png')}/>
            )
        }

    },
    wallet:{
        screen:Wallet,
        navigationOptions:{
            tabBarIcon:({tintColor,focused})=>(
                <Image source={focused?require('./images/钱包-蓝色.png'):require('./images/钱包-灰色.png')}/>
            )
        }

    },
    person:{
        screen:Person,
        navigationOptions:{
            tabBarIcon:({tintColor,focused})=>(
                <Image source={focused?require('./images/我的-蓝色.png'):require('./images/我的-灰色.png')}/>
            )
        }

    },
},
    {
        tabBarOptions:{
            activeTintColor:'#3DCCCA',
            showIcon:'true',
        },
        tabBarPosition:'bottom',

    }

    );
//引入要用到的跳转页面
const  MyNavigatior = StackNavigator(
    {
     Main:{
         screen:MainScreentNavigator
     },
        BrandDetail:{
            screen:BrandClinicInfo,
        },
        diarylist:{
         screen:DiaryList,
        },
	    quickReserve:{
		    screen:QuickReserve,
        },
        selectDoctor:{
            screen:SelectDoctorList,
        },
        reserveItem:{
            screen:reserveItem,
        },
        itemDetail:{
            screen:itemDetail
        },
        reserveSelectClinic:{
         screen:SelectClick,
        }
    },
    {
        initialRouteName:'Main',
        navigationOptions:{
            headerTintColor:'#333',
            headerTitleStyle:{
                fontWeight:'bold',
                fontSize:20
            },
            headerBackImage:require('./images/Back.png'),
            headerBackTitle:null,
        },
    }
    );
const LoginModal = StackNavigator(
    {
        Main:{
            screen:MyNavigatior
        },
        MyModal:{
            screen:Login
        }
    },
    {
        mode: 'modal',
        headerMode:'none'
    }
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tabIcon:{
        width:24,
        height:24,
    }
});


AppRegistry.registerComponent('esparclientRN', () => LoginModal);

