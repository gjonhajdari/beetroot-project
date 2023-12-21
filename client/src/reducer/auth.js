import C from '../constants'
import isEmpty from '../utils/isEmpty'

const defaultState = {
    user: {},
    isAuth: false,
    loading: false
}

export default (state = defaultState, action) => {
    const {type, payload} = action;
    switch(type) {
        case C.USER_LOGIN + C.FINISH_LOAD:
            return {
                ...state,
                isAuth: !isEmpty(payload),
                user: payload
            }

        case C.USER_REGISTER + C.START_LOAD:
            return {...state, loading: true}

        case C.USER_REGISTER + C.FINISH_LOAD:
        case C.GET_ERRORS:
            return {...state, loading: false}

        default:
            return state;
    }
}