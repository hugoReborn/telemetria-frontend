import React from 'react';
import {useLocation} from "react-router-dom";



const PerfilBusLink = (props) => {
    let {state} = useLocation();
    console.log(state);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>This is your empty page{state.bus_name} tezxczxczxczxmplate to start building beautiful applications.</p>
                    <p>{state.soc}</p>
                </div>
            </div>
        </div>
    );
};

export default PerfilBusLink
