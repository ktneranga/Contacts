import React,{useRef, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {filterContact, clearFilter, filtered} = contactContext;

    const text = useRef('');


    useEffect(()=>{
        if(filtered === null){
            text.current.value = '';
        }
    },[filtered]);

    const onChange = (e) =>{
        // text.current.value => this gives the actual value in the input
        if(text.current.value !== ''){
            filterContact(e.target.value);
        }else{
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter by Name or Email" onChange={onChange}/>
        </form>
    )
}

export default ContactFilter
