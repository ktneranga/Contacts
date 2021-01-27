import React, {useContext, useEffect} from 'react'
import Contacts from '../contacts/Contact'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

function Home() {

    const authContext = useContext(AuthContext);

    /* 
    when redirect to the home page first there token will be stored,
    But after refreshing token will be stored only,( isAuthenticated : null, user : null => in authState)
    So that we need to call loadUser() method when as soon as Home.js component loads
    then after =>( isAuthenticated : true, user : action.payload => in authState) use will be set in state
    */

    useEffect(()=>{
        //this will look at the token, and hit the backend validated it and put the user into state
       authContext.loadUser();
       //eslint-disable-next-line
    },[]/* when the components load*/, )

    return (
        <div className="grid-2">
            <div>
                <ContactForm/>
            </div>
            <div>
               <ContactFilter/>
               <Contacts/>
            </div>
        </div>
    )
}

export default Home
