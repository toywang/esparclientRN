import React, { Component } from "react";
import {
    FlatList,
    Text,
    Image,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { Rating, Icon } from 'react-native-elements'
import PropsTypes from 'prop-types'
import requestBase from "../../utils/requestBase";
import { screenWidth, screenHeight } from "../../utils/Utils";
import { image_ip } from "../../utils/Config";
import { sortNameArray } from '../../utils/letterPinYin'
import StarView from "./StarView";
const req = new requestBase()
export default class SelectDoctorList extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '选择医生'
    })
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
        }
    }
    _renderItem = ({ item }) => {
        return (
            <View>


            </View>
        )
    }
    componentDidMount() {
        this.requestDoctors()
    }
    requestDoctors() {
        req.getRequest('http://114.55.72.11:8088/espar_client/api/queryReserveCounselor.do?clientid=203&clinicid=25')
            .then((respon) => {
                let tempData = []
                let sorts = sortNameArray(respon.data, "UserName")
                sorts.forEach((value, key) => {
                    tempData.push({ 'title': value.title })
                    value.data.forEach((itemValue, itemKey) => {
                        tempData.push(itemValue)
                    })
                })

                this.setState({
                    dataSource: tempData
                })
            }).catch((error) => {

            })
    }
    _renderItem = ({ item }) => {
        const { goBack, navigate, state } = this.props.navigation

        if (item.title != undefined) {
            return (
                <View style={styles.item_section_header}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    if (state.params.selectDoctorCallBack) {
                        state.params.selectDoctorCallBack(item.UserName)
                        goBack()
                    }

                }}>
                    <View style={styles.item_container}>
                        <View>
                            <Image style={styles.item_advar} source={{ uri: image_ip + item.Photo }} ></Image>
                        </View>
                        <View style={styles.item_right}>
                            <View style={styles.item_top}>
                                <View style={styles.item_top_name}><Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.UserName}</Text></View>
                                <View>
                                    <Rating
                                        imageSize={20}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                </View>
                            </View>
                            <View style={styles.item_center}>
                                <View style={styles.item_center_age}><Text style={{ fontSize: 11 }}>工龄:{item.Age}</Text></View>
                                <View style={styles.item_center_age}><Text style={{ fontSize: 11 }}>评分:{item.Score}</Text></View>
                            </View>
                            <View style={styles.item_bottom}>
                                <Text style={{ fontSize: 11, lineHeight: 18 }} numberOfLines={0}>{item.Declaration}</Text>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            )
        }
    }
    _renderSectionHeader({ item }) {
        return (
            <View style={styles.item_section_header}>
                <Text>{item.title}</Text>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                />
                <View>


                </View>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: screenHeight(),
        flex: 1,
    },
    item_container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
    },
    item_section_header: {
        display: 'flex',
        width: screenWidth(),
        height: 30,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    item_advar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 15,
    },
    item_right: {
        display: 'flex',
        flexDirection: 'column',
    },
    item_top: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    item_top_name: {
        width: 50,
        paddingTop: 10,
        paddingBottom: 10,
    },
    item_center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_center_age: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 1,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#e5e5e5',
    },
    item_center_score: {

    },
    item_bottom: {
        display: 'flex',
        width: screenWidth() - 120,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 25,
        flex: 1,
    }



})
