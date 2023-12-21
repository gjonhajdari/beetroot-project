import C from '../constants';

export default (state = {}, action) => {
    const {type, payload} = action;
  
    switch(type) {
        case C.GET_ERRORS:
            return payload;
        default:
            return state;
    }
}