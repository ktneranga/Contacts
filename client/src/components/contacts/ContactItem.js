import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;
    const { _id, name, email, phone, type } = contact;

    const onDelete = (e) => {
        deleteContact(_id);
        clearCurrent();
    }

    const onUpdate = () => {
        setCurrent(contact);
    }

    return (
        <div className="card bg-light">
            <h3 className="text-left text-primary">{name}{' '}<span style={{ float: 'right' }} className={'badge ' + (type === 'personal' ? 'badge-primary' : 'badge-success')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span></h3>
            <ul className="list">
                {/* check if the email available */}
                {email && (
                    <li>
                        <i className="fas fa-envelope-open"></i> {email}
                    </li>
                )}
                {/* check if the phone available */}
                {phone && (
                    <li>
                        <i className="fas fa-phone"></i> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onUpdate} >Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

export default ContactItem

