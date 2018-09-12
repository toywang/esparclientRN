import React, { Component } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Animated, Easing, TouchableOpacity, Modal, ART } from 'react-native'
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { screenWidth, screenHeight } from '../../utils/Utils';
const { Surface, Shape, Path } = ART;
/**防止重复点击执行动画*/
let isAnimaing = false

export default class PopView extends Component {
    static defaultProps = {
        topHeight: 40,
        renderItemHeight: 35,
    }

    constructor(props) {
        super(props)
        this.state = {
            /**背景变化的动画 opacity*/
            fadeView: new Animated.Value(0),
            showMask: false,
            /**flatlist高度变化的动画*/
            rotateHeight: new Animated.Value(0),
            /**flatlist显示的高度（分别计算所得）*/
            flatHeight: 0,
            /**各个按钮的动画*/
            rotations: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
            rotationColors: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
            /**当前Flatlist显示的数据*/
            dataArray: [],
            /**选中的数据 index*/
            dataSelectArray: [0, 0, 0],
            backfaceVisibility: 'none',
        }
        if (this.props.centerArray) {
            this.state.dataArray = this.props.centerArray
        } else if (nextProps.leftArray) {
            this.state.dataArray = this.props.leftArray
        } else if (nextProps.rightArray) {
            this.state.dataArray = this.props.rightArray
        }
        this.calFlagHeight()
    }
    calFlagHeight() {
        /**取数组中length的最大值*/
        let max = Math.max(this.props.leftArray.length, this.props.centerArray.length)
        this.state.flatHeight = Math.max(Math.max(this.props.leftArray.length, this.props.centerArray.length), this.props.rightArray.length) * this.props.renderItemHeight
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.centerArray) {
            this.state.dataArray = nextProps.centerArray
        } else if (nextProps.leftArray) {
            this.state.dataArray = nextProps.leftArray
        } else if (nextProps.rightArray) {
            this.state.dataArray = nextProps.rightArray
        }
        this.calFlagHeight()
    }
    //点击按钮执行动画
    startAnimation(index) {
        if (isAnimaing) {//动画执行中不再执行
            return
        }

        isAnimaing = true //动画执行中
        switch (index) {
            case 0: {
                this.setState({
                    dataArray: this.props.leftArray
                })
            } break
            case 1: {
                this.setState({
                    dataArray: this.props.centerArray
                })
            } break
            case 2: {
                this.setState({
                    dataArray: this.props.rightArray
                })
            } break
            default: {

            }
        }
        this.calFlagHeight()
        if (this.state.showMask) {

            // this.state.rotations[index].setValue(0)
            // this.state.rotateHeight.setValue(0)
            // this.state.rotationColors[index].setValue(0)
            //同时执行的动画
            Animated.parallel([
                //判断旋转和高度该怎么变化
                Animated.timing(this.state.rotations[index], {
                    toValue: this.state.rotations[index].__getValue() == 0 ? 1 : 0,
                    duration: 1000,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.rotationColors[index], {
                    toValue: this.state.rotationColors[index].__getValue() == 0 ? 1 : 0,
                    duration: 1000,
                    easing: Easing.linear
                }),
                Animated.spring(this.state.rotateHeight, {
                    toValue: this.state.rotateHeight.__getValue() == 0 ? 1 : 0,
                    duration: 1500,
                    friction: 40
                })
            ]).start(() => {
                isAnimaing = false
            })
        } else {
            this.state.showMask = true
            this.setState({
                backfaceVisibility: 'flex',
            })
            this.state.fadeView.setValue(0)
            this.state.rotations[index].setValue(0)
            this.state.rotateHeight.setValue(0)
            console.log('fadeview' + this.state.fadeView.Value)
            Animated.parallel([
                Animated.timing(this.state.rotations[index], {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear
                }),
                Animated.timing(this.state.fadeView, {
                    toValue: 0.4,
                    duration: 1000,
                    easing: Easing.linear
                }),
                Animated.spring(this.state.rotateHeight, {
                    toValue: 1,
                    duration: 1500,
                    friction: 40
                })
            ]).start(() => {
                isAnimaing = false//动画执行完了
            })
        }
    }
    //选择项目以后执行的动画（重置）
    clearAnimation() {
        if (this.state.showMask == false || isAnimaing == true) {
            return
        }

        Animated.parallel([
            this.state.rotations.forEach((value, key) => {
                Animated.timing(value, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear
                })
            }),
            Animated.timing(this.state.fadeView, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.spring(this.state.rotateHeight, {
                toValue: 0,
                duration: 1500,
                friction: 40
            })
        ]).start(() => {
            isAnimaing = false
            this.state.showMask = false
            this.setState({
                backfaceVisibility: 'none',
            })
        })

    }
    getFlatListStyle() {
        // const {}
    }
    _renderItemUI = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                if (this.props.selectCallBack) {
                    this.state.dataSelectArray.push(index)
                    this.props.selectCallBack(this.state.dataSelectArray)
                }
                this.clearAnimation()
            }}>
                <View style={{ width: screenWidth(), height: 30 }}>
                    <Text>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    renderTopTitles() {
        let titlesView = []
        for (let i = 0; i < 3; i++) {
            /**注意这里的point怎么算呢，，就是surface的宽高的范围*/ 
            const path = new Path()
            path.moveTo(0,0)
            path.lineTo(4,4)
            path.lineTo(8,0)
            titlesView.push(<View style={{ width: screenWidth() / 3.0, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.topButton} onPress={() => {
                    this.startAnimation(i)
                }}>
                    <Text style={{ width: '70%', height: '100%', textAlign: 'right', textAlignVertical: 'center'}}>全部</Text>
                    {/* <Animated.Image source={require('../../../images/fast24.png')} style={{
                        transform: [
                            {
                                rotateZ: this.state.rotations[i].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                })
                            }
                        ],
                        width: 10,
                        height: 10,
                    }}>
                    </Animated.Image> */}
                    <Animated.View style={{
                        transform: [
                            {
                                rotateZ: this.state.rotations[i].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                })
                            }
                        ],
                        marginLeft:5,
                    }}>
                        <Surface width={8}height={4}>
                            <Shape d={path} stroke="#892265" fill="#FFF" strokeWidth={1}/>
                        </Surface>
                    </Animated.View>
                </TouchableOpacity>

            </View>)
        }
        return titlesView

    }
    renderTopView() {
        return (
            <View >
                <View style={styles.tapTitle}>
                    {this.renderTopTitles()}
                </View>
                <Animated.View style={styles.container} style={[styles.container, {
                    opacity: this.state.fadeView,
                    display: this.state.backfaceVisibility,
                }]}>
                </Animated.View>
                <Animated.View style={[styles.flatlist, {
                    height: this.state.rotateHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, this.state.flatHeight]
                    })
                }]} >
                    <FlatList
                        data={this.state.dataArray}
                        renderItem={this._renderItemUI}
                    />
                </Animated.View>
            </View>
        )
    }
    render() {
        return (
            <View >
                {this.renderTopView()}
            </View>
        )

    }
}
PopView.propTypes = {
    topHeight: PropTypes.number,
    renderItemHeight: PropTypes.number,
    leftArray: PropTypes.array,
    centerArray: PropTypes.array,
    rightArray: PropTypes.array,
    selectCallBack: PropTypes.func,

}
const styles = StyleSheet.create({
    container: {
        width: screenWidth(),
        height: screenHeight() - 40,
        opacity: 0,
        backgroundColor: 'black',
        zIndex: 100,
        display: 'none',
        position: 'absolute',
        left: 0,
        top: 40
    },
    tapTitle: {
        width: screenWidth(),
        height: 40,
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    topButton: {
        color: '#333',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    flatlist: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 45,
        width: screenWidth(),
        backgroundColor: 'orange',
        zIndex: 102,
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 20,
        borderTopColor: 'red'
    }

})
