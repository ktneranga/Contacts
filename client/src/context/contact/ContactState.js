import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types';

//initial state
const ContactState = props => {
    const initialState = {
        //we need to fill this array from backend data
        //for instance we are going to hardcode
        // contacts : [],
        contacts: null, // if the initial state an empty array it displays the message  please add a contact, not the spinner
        current: null,
        filtered: null, //this is going to be an array of filterd contacts
        error: null,
        loading: true

    };
    //pullout the state and dispatch from the reducer using reducer hook
    //state allows to access the state
    //dispatch allows to dispatch objects to the reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //down here we gonna have all the actions

    //get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    }

    //add contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
                /* we're not going to set the token within the header, we set it globally */
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }

    }
    //delete contact
    const deleteContact = async(id) => {

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

       try {
        const res = await axios.delete(`/api/contacts/${id}`, config);
        dispatch({ type: DELETE_CONTACT, payload: id });
       } catch (err) {
        dispatch({type: CONTACT_ERROR, payload : err.response.msg});
       }
    }

    //clear contact
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    //set current contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }
    //clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    //update contact
    const updateContact = async(contact) => {

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

       try {
        const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
        dispatch({ type: UPDATE_CONTACT, payload: contact });
       } catch (err) {
         dispatch({type : CONTACT_ERROR, payload : err.response.msg})  
       }
    }
    //filter contacts
    const filterContact = (text) => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    }
    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    //return provider => wrap our entire application
    return (
        <ContactContext.Provider
            //these values are able to acces in any component
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
    //inorder to use this we have to wrap our main App.js
};

export default ContactState;