import React, {useContext} from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alerts = () => {

    const alertContext = useContext(AlertContext);

    // const {alerts} = alertContext;

    return (
        //check if there are any errors in the state
        //it's gonna look in the state 
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert=>( 
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        ))
    );
};

export default Alerts
