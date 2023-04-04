import React from 'react'

export default function Alert(props) {
    return (
    
          
            props.typeAlert && <div className={`alert alert-${props.typeAlert.alert} alert-dismissible fade show role=alert`}>
                <strong>{props.typeAlert.message}</strong>
            </div>
        
    )
}
