import React, {useReducer} from 'react';
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
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

const AuthState = (props) => {
    const initialState = {
        //we gonna store the token in the local storage, then get it from the local storage
        token : localStorage.getItem('token'),
        isAuthenticated : null, //this tells us user logged in or not
        loading : true,
        user : null, //which user is delaing with
        error : null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //actions

    //Load User => checking which user is logged in
    const loadUser = async () =>{
       //set token into a global header , otherwise we have to implemet headers object for each and every endpoint
       // @todo - load token into global headers
        if(localStorage.token){
            setAuthToken(localStorage.token); //we need to call this method in main App.js =>we want this to load when main component loads
        }
       //make the request
       try {
          const res = await axios.get('/api/auth');
          dispatch({type : USER_LOADED, payload : res.data}); 
       } catch (err) {
           dispatch({type : AUTH_ERROR });
       }
    }

    //Register user
    const register = async (formData) =>{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);
            //if everything goes ok
            dispatch({type : REGISTER_SUCCESS, payload : res.data});

            //after dispatching register success payload call loadUser method
            /* after register => token stored => stored token need to do other protected routes => so loadUser() */
            loadUser();

        } catch (err) {
            //if a user already exists
           dispatch({
               type : REGISTER_FAIL,
               payload : err.response.data.msg
           }) 
        }

    }
    //Login User
    const loginUser = async (formData) =>{
        const config = {
             headers : {
                'Content-Type' : 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type : LOGIN_SUCCESS,
                payload : res.data
            });

            loadUser();

        } catch (err) {
            dispatch({
                type : LOGIN_FAIL,
                payload : err.response.data.msg
            })
        }

    }

    //Logout => destroy the token
    const logoutUser = ()=>{
        dispatch({type : LOGOUT});
    }

    //Clear errors
    const clearErrors = () => dispatch({type : CLEAR_ERRORS });

    return(
        <AuthContext.Provider
        
        value={{
            token : state.token,
            isAuthenticated : state.isAuthenticated,
            loading : state.loading,
            user : state.user,
            error : state.error,
            register,
            loadUser,
            loginUser,
            logoutUser,
            clearErrors
        }}>
            
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;