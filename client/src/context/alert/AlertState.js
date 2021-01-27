import React, {useReducer} from 'react'
import { uuid } from 'uuidv4';
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = (props) => {
    //within this array we gonna input our errors
    const initialState = [];

    //useReducer hook
    const [state, dispatch] = useReducer(alertReducer, initialState);

    //actions
    //Set Alert
    const setAlert = (msg, type, timeout=5000) =>{
        const id = uuid; //since we gonna have an array of alerts it's good to have an id for each alert
        dispatch({type : SET_ALERT, payload : {msg, type, id}});
        setTimeout(()=>dispatch({type : REMOVE_ALERT, payload : id}), timeout);
    }

    return(
        <AlertContext.Provider value={{
            alerts : state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertState;