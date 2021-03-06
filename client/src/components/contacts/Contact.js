import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contact = () => {
    //initialize the context
    //inorder to use the context we need to use useContext hooks
    const contactContext = useContext(ContactContext);
    //now we have access to the any state's actions associated with the context

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    },[]);

    /* It display only this message when initial state an empty array */
    // if(contacts.length === 0){
    //     return <h4>Please add a contact</h4>
    // }

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {
                        filtered !== null ? filtered.map(contact => (
                            <CSSTransition
                                key={contact._id}
                                timeout={500}
                                classNames="item"
                            >
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        )) : contacts.map(contact => (
                            <CSSTransition
                                key={contact._id}
                                timeout={500}
                                classNames="item"
                            >
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
            ) : <Spinner />}

        </Fragment>
    )
}

export default Contact
