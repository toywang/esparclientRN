
import {
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native'

const X_WIDTH=375;
const X_HEIGHT=812;

export function screenWidth() {

    return Dimensions.get('window').width
}

export function screenHeight() {

    return Dimensions.get('window').height
}
export function isIphoneX() {
    return(
        Platform.OS==='ios'&&((screenWidth()===X_WIDTH&&screenHeight()===X_HEIGHT)||
            (screenWidth()===X_HEIGHT&&screenHeight()===X_WIDTH))
    )
}
export function ifIphoneX(iphonexStyle,regularStyle) {
    if (isIphoneX()){
        return iphonexStyle;
    }
    return regularStyle;
}
export function isEmpty(obj) {
    if (obj==null||obj==undefined){
        return true
    }
    return false
}
