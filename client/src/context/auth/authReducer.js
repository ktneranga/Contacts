import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export default (state, action)=>{
    switch(action.type){

        case USER_LOADED :
        return{
            ...state,
            isAuthenticated : true,
            loading : false,
            user : action.payload
        }

        case REGISTER_SUCCESS :
        case LOGIN_SUCCESS : //same effect as the register     
        //if register success, need couple of thing to do
        //1. get the token and store it in the local storage
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated : true,
            loading : false
        }

        case REGISTER_FAIL :
        case AUTH_ERROR :
        case LOGIN_FAIL : //same effect as the register fail
        case LOGOUT :         
        //remove the token
        localStorage.removeItem('token');
        return {
            ...state,
            token : null,
            isAuthenticated : false,
            loading : false,
            user : null,
            error : action.payload
        }

        case CLEAR_ERRORS :
        return {
            ...state,
            error : null,
        }

        default :
        return  state;
    }
}