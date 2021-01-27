/*this is gonna check to see if a token is passed in, if it is we are gonna set it to the main global header
if not delete it from the global header */

import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        /* implementing the global header / the key we used to send te token => x-auth-token */
        axios.defaults.headers.common['x-auth-token'] = token; 
    }else{
      delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
