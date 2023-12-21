import C from "../constants";

export const setErrors = data => ({
     type: C.GET_ERRORS,
    payload: data
})