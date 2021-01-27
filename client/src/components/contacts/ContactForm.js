import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    //inorder to use contactContext we need to use useContext hooks
    const contactContext = useContext(ContactContext);

    const { addContact, current, clearCurrent, updateContact } = contactContext;
    //fill the form if there are some values in the 

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal' //by default
    });


    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current])


    const { name, email, phone, type } = contact;

    const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            //this is adding a new contact
            addContact(contact);
        } else {
            //if the current has set, this is updating a contact
            updateContact(contact);
        }
        onClick();
    };

    const onClick = (e) => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
            <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
            <input type="text" name="phone" placeholder="Phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" onChange={onChange} checked={type === 'personal'} />Personal {' '}
            <input type="radio" name="type" value="professional" onChange={onChange} checked={type === 'professional'} />Professional
            <div>
                <input type="submit" value={current ? 'Edit Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
                {
                    current && (<input type="submit" value="Clear" className="btn btn-dark btn-block" onClick={onClick} />)
                }
            </div>
        </form>
    )
}

export default ContactForm
