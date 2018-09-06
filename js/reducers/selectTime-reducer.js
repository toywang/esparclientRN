
import * as TYPES from '../actions/typs'

const initalState={
    'time':'2012-09'
}

export default function selectTime(state=initalState,action){
    switch (action.type) {
        case TYPES.RESERVE_TIEM_TYPE:{
            return {
                ...state,
                'time':action.time
            }
        }
        default :{
            return state
        }


    }
}