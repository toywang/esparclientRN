/**
 * Created by jiangguisheng on 2018/6/25.
 */


import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Modal,
    AlertIOS,
} from 'react-native';
import { screenHeight, screenWidth } from "../../utils/Utils";
import QuickTimeList from "./QuickTimeList";
import { NativeModules } from 'react-native'
import requestBase from '../../utils/requestBase'
import moment from 'moment'
const calendarManager = NativeModules.CalendarManager
const req = new requestBase()

let sectionData = [
    {
        title: "上次预约项目",
        icon: require('../../../images/上次预约图标.png'),
        subtitle: '没约会搜索',
        showNextIcon: false,
        data: [
            { name: '美白针', content: 'hello' }
        ],
    },
    {
        title: "本次预约项目",
        subtitle: '没约会搜索',
        showNextIcon: false,
        icon: require('../../../images/上次预约图标.png'),
        data: [
            { name: '美白针', content: 'hello' }
        ],
    },
    {
        title: "选择门店",
        subtitle: '没约会搜索',
        showNextIcon: true,
        icon: require('../../../images/选择门店.png'),
        data: [
        ],
    },
    {
        title: "预约时间",
        subtitle: '没约会搜索',
        showNextIcon: true,
        icon: require('../../../images/预约时间.png'),
        data: [
        ],
    },
    {
        title: "选择顾问",
        subtitle: '没约会搜索',
        showNextIcon: true,
        icon: require('../../../images/选择顾问.png'),
        data: [
        ],
    },
    {
        title: "到店支付",
        subtitle: '没约会搜索',
        showNextIcon: false,
        icon: '',
        data: [
            { name: '美白针', content: 'hello' }
        ],
    },

]
async function findEvent() {
    try {
        let event = await calendarManager.findEvent()
        AlertIOS.alert('返回的值是：' + event)
    } catch (error) {
        AlertIOS.alert(error)
    }
}
export default class QuickReserve extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '快速预约'
    })

    constructor(props) {
        super(props);
        this.state = {
            groupDetailData: sectionData,
            selectClinic: "请选择门店",
            selectDoctor:"选择顾问",
            modalVisible: false,
            timeData: [],
            daysData: [],
        }
        // let date = new Date()
        // calendarManager.addEvent('这是一个event', '大哥')
        // calendarManager.addDateEvent('时间', date)
        // calendarManager.addDetailEvent({ 'name': '字典', 'date': date, 'array': ['数组1', '数组2'] })
        // calendarManager.callBackEvent((error, response) => {
        //     AlertIOS.alert(response.toString())

        // })
        // findEvent()
     
    }
    clone(obj) { 
        if(obj === null) return null 
        if(typeof obj !== 'object') return obj;
        if(obj.constructor===Date) return new Date(obj); 
        var newObj = new obj.constructor ();  //保持继承链
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
                var val = obj[key];
                newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
            }
        }  
        return newObj;  
    }; 
    requestReserverTimeData() {
        req.getRequest('http://114.55.72.11:8088/espar_client/api/queryReserveTime.do?clinicid=44')
            .then((res) => {
                for (let i = 0; i < moment().daysInMonth(); i++) {
                    let days = moment().add('days', i).format('YYYY-MM-DD')
                    let obj = {'day':days,'hours':[]}
                    this.state.daysData.push(obj)
                }
                this.state.daysData.forEach((value, key) => {
                    let result = this.clone(res)
                    result.data.forEach((dayValue, dayKey) => {
                        if (value.day == dayValue.reserveday) {
                            dayValue.List.forEach((timeValue, timeKey) => {
                                result.Hours.forEach((hourValue, hourKey) => {
                                    let hourTime = moment(value.day+' '+hourValue.ReserveTime).format('YYYY-MM-DD HH:mm')
                                    if ((moment(timeValue.lt1).isSame(hourTime,'HH:mm')||moment(timeValue.lt1).isBefore(hourTime,'HH:mm'))&&(moment(timeValue.lt2).isSame(hourTime,'HH:mm')||moment(timeValue.lt2).isAfter(hourTime,'HH:mm'))) {
                                        hourValue.MaxCount-=1
                                    } 
                                })
                            })
                        }
                    })
                    result.Hours.forEach((value,key)=>{
                        value['isSelected']=false
                    })
                    value['hours'] = result.Hours
                });
                this.setState({
                    daysData:this.state.daysData
                })
            }).catch(error => console.log(error))
    }
    _itemTitleView = () => {
        return (
            <View style={styles.itemView}>
                <Image></Image>
                <Text></Text>
            </View>
        )
    }

    _sectionHeaderTouch(section) {
        console.log(section)
        const {navigation} = this.props
        if (section.title == '预约时间') {
            this.requestReserverTimeData()
            return this.setModalVisible(true)
        } else if (section.title == '选择顾问') {
            this.props.navigation.navigate('selectDoctor',{
                selectDoctorCallBack:((data)=>{
                    this.setSelectDoctor(data)
                })
            })
        } else if(section.title=='本次预约项目'){
            navigation.navigate('reserveItem',{
                selectReserveItemCallBack:((data)=>{
                    
                })
            })
        } else {
            this.props.navigation.navigate('reserveSelectClinic', {
                callback: ((data) => {
                    this.getUserData(data)
                })
            })
        }

    }
    setSelectDoctor(data){
        let obj = sectionData[4]
        obj.subtitle = data
        let list = []
        list = list.concat(sectionData)
        this.setState({
            selectDoctor:data.title,
            groupDetailData:list
        })

    }
    getUserData(data) {
        console.log('回传的地址' + data);
        let obj = { ...sectionData[0] }
        obj.subtitle = data.title;
        sectionData.splice(0, 0, obj);
        // sectionData.push(obj);
        let list = [];
        list = list.concat(sectionData)
        this.setState({
            selectClinic: data.title,
            groupDetailData: list,
        })
    }
    _selectedTime = ({item}) => {
        AlertIOS.alert(item.ReserveTime)
    }
    _sectionHeaderView = ({ item }) => {
        let extendImage = item.showNextIcon ? <Image style={{ width: 17, height: 17, marginRight: 10 }} source={require('../../../images/大于号-(1).png')} /> : null;

        return (
            <TouchableOpacity style={styles.secion_header} onPress={this._sectionHeaderTouch.bind(this, item)} >
                <Image style={styles.secion_header_image} source={item.icon}></Image>
                <Text style={styles.secion_header_title} >{item.title}</Text>
                <Text style={styles.secion_header_subtitle}>{item.subtitle}</Text>
                {extendImage}
            </TouchableOpacity>
        )
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    showTimeSelectModal() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <QuickTimeList
                        cancelClick={() => {
                            this.setModalVisible(false)
                        }}
                        timeData={this.state.daysData.length>0?this.state.daysData[0].hours:[]}
                        monthDays={this.state.daysData}
                        selectedTime={this._selectedTime}
                    />


                </View>
            </Modal>
        )
    }
    // _sectionHeaderView = (section)=>{
    // 	 	let extendImage = section.section.showNextIcon ? <Image style={{width:17,height:17,marginRight:10}} source={require('../../../images/大于号-(1).png')}/> : null;
    //
    // 		return (
    // 			<TouchableOpacity style={styles.secion_header} onPress={this._sectionHeaderTouch.bind(this,section)} >
    //                <Image style={styles.secion_header_image} source={section.section.icon}></Image>
    // 				<Text style={styles.secion_header_title} >{section.section.title}</Text>
    // 				<Text style={styles.secion_header_subtitle}>{this.state.selectClinic}</Text>
    // 				{extendImage}
    // 			</TouchableOpacity>
    // 		)
    // }


    render() {
        return (

            <SafeAreaView>
                {this.showTimeSelectModal()}
                <FlatList
                    style={styles.main}
                    data={this.state.groupDetailData}
                    renderItem={this._sectionHeaderView}
                />

            </SafeAreaView>



        )

    }
}
const styles = StyleSheet.create({
    main: {
        width: screenWidth(),
        height: screenHeight(),
    },
    secion_header: {
        height: 45,
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
    },
    secion_header_image: {
        height: 17,
        width: 17,
        marginLeft: 5,
    },
    secion_header_title: {
        height: 45,
        width: 100,
        lineHeight: 45,
        textAlign: 'left',
        marginLeft: 5,
    },
    secion_header_subtitle: {
        height: 45,
        width: 200,
        lineHeight: 45,
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    item_view: {
        height: 0
    }

})
