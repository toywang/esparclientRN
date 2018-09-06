import React,{Component} from 'react'
import {AsyncStorage} from 'react-native'


const esparASEKEY='espar_ase'
export default class AstorgeSave extends Component{
    constructor(props){
        super(props)
    }
    saveItem(data){
        AsyncStorage.setItem(esparASEKEY,data)
    }
    getVersionItem(){
        AsyncStorage.getItem(esparASEKEY)
    }


}
