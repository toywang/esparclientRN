import {createStore} from 'redux'
import selectTime from './reducers/selectTime-reducer';


const store = createStore(selectTime)
export default store