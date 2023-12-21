import C from '../constants'

const defaultState = {
    profile: null,
    profiles: [],
    loading: false
}

export default  (state = defaultState, action) => {
    const {type, payload} = action;
    switch(type) {
        case C.GET_CURRENT_PROFILE + C.START_LOAD:
        case C.CREATE_PROFILE + C.START_LOAD:
            return {...state, loading: true}

        case C.GET_CURRENT_PROFILE + C.FINISH_LOAD:
            return {...state, loading: false, profile: payload}

        case C.GET_ERRORS:
        case C.CREATE_PROFILE + C.FINISH_LOAD:

            return {...state, loading: false}

        case C.CLEAR_PROFILE:
                return {...state, profile: null}
        default:
            return state;
    }
}