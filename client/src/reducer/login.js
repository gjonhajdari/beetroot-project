import C from '../constants'

const defaultState = {
    loading: false
}

export default (state = defaultState, action) => {
    const {type} = action;
    switch(type) {
        case C.USER_LOGIN + C.START_LOAD:
            return {...state, loading: true}

        case C.USER_LOGIN + C.FINISH_LOAD:
        case C.GET_ERRORS:
            return {...state, loading: false}

        default:
            return state;
    }
}