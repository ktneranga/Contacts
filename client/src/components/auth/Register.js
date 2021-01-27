import React, { useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} = alertContext;
    const {register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=>{
        //redirect to the home page
        if(isAuthenticated){
            props.history.push('/')
        }

        if(error === 'User already exists'){
            setAlert(error, 'danger');
            clearErrors();
        }
    },[error, isAuthenticated, props.history, clearErrors, setAlert]/* when an error comes to the state this should be run / dependency is error  */) 

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    //pullout fields from the user state
    const { name, email, password, password2 } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Two Passwords do not match', 'danger');
        }else{
            register({
                name : name,
                email : email,
                password : password
            })
        }
        
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} />
                </div>
                <div>
                    <input className="btn btn-block btn-primary" type="submit" value="Register" />
                </div>
            </form>
        </div>

    )
}

export default Register
