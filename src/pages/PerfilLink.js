import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {Button} from "primereact/button";
import { Chart } from 'primereact/chart';
import {Card} from "primereact/card";
import axios from "axios";



const PerfilBusLink = (props) => {

    const [busdetail, setBusdetail] = React.useState({});
    const [isolationvalues, setIsolationvalues] = React.useState({});
    const [socvalues, setSocvalues] = React.useState({});
    const [batt24, setBatt24] = React.useState({});
    const [lastbattvolt24, setLastbattvolt24] = React.useState({});
    const [lastenginetemp, setLastenginetemp] = React.useState({});
    const [historialfusicode, setHistorialfusicode] = React.useState({});


    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/bus/bus/' + state.id).then(response =>{
            setBusdetail(response.data);

        })

        axios.get('http://127.0.0.1:8000/status/fusicode_bus/' + state.id).then(response =>{
            const pieOptions = {
                labels:Object.values(response.data.labels),
                datasets: [{
                    data: Object.values(response.data.valores),
                    backgroundColor: ["#974ae8", "#35e2e8", "#1428db", "#570b87","#9807f2","#07abad"]
                }]
            }
            setHistorialfusicode(pieOptions);
        })

        axios.get('http://127.0.0.1:8000/temperature/lastenginetemperature_bus/' + state.id).then(response =>{
            setLastenginetemp(response.data);
            console.log(response.data)
        })

        axios.get('http://127.0.0.1:8000/electric/lastbattvolt24_bus/' + state.id).then(response =>{
            setLastbattvolt24(response.data);

        })


        axios.get('http://127.0.0.1:8000/electric/isolationvalues_bus/' + state.id).then(response =>{
            const linechartoptions = {
                labels: Object.values(response.data.fechas),
                datasets: [
                    {
                        label: 'Isolation Values',
                        data: Object.values(response.data.isolation_values),
                        fill: false,
                        borderColor: '#42A5F5',
                        tension: 0.4
                    }
                ]
            }
            setIsolationvalues(linechartoptions);

        })

        axios.get('http://127.0.0.1:8000/other/socbusdetail/' + state.id).then(response =>{
            const linechartoptions2 = {
                labels: Object.values(response.data.fechas),
                datasets: [
                    {
                        label: 'Soc Values',
                        data: Object.values(response.data.soc_values),
                        fill: false,
                        borderColor: '#7542f5',
                        tension: 0.4
                    }
                    ]
            }
            setSocvalues(linechartoptions2);
        })

        axios.get('http://127.0.0.1:8000/electric/battvolt24values_bus/' + state.id).then(response =>{
            const linechartoptions3 = {
                labels: Object.values(response.data.fechas),
                datasets: [
                    {
                        label: 'Batt 24 Values',
                        data: Object.values(response.data.volt_24_values),
                        fill: false,
                        borderColor: '#7542f5',
                        tension: 0.4
                    }
                ]
            }
            setBatt24(linechartoptions3);
        })

    },[]);

    let {state} = useLocation();



    const header = (
        <img alt="profile_bus"
             src="/assets/layout/images/pages/ebus.png"
             onError={(e) =>e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );


    return (
        <div className="layout-dashboard">
            <div className="grid">
                <div className="col-12 md:col-3">
                    <div className="card">

                        <Card title={"Electric Bus" + " " + state.bus_name}
                              subTitle="Reborn - Link+"
                              header={header}>
                              <p className="m-0" style={{lineHeight: '1.5'}}>Marca : {busdetail.brand}</p>
                              <p className="m-0" style={{lineHeight: '1.5'}}>Cliente : {busdetail.cliente}</p>
                              <p className="m-0" style={{lineHeight: '1.5'}}>Patente : {busdetail.plate_number}</p>
                              <p className="m-0" style={{lineHeight: '1.5'}}>Serie : {busdetail.serie}</p>
                              <p className="m-0" style={{lineHeight: '1.5'}}>Sniffer : {busdetail.sniffer}</p>
                              <p className="m-0" style={{lineHeight: '1.5'}}>Vin : {busdetail.bus_vin}</p>
                        </Card>
                    </div>
                </div>

                <div className="col-12 md:col-3">
                    <div className="card"  >
                       <Card title="Actualizacion">
                           <h1 style={{fontSize:'2rem', textAlign:'center'}}>{state.actualizacion}</h1>
                           <h5 style={{textAlign:'center', color:'turquoise'}} >Ultima Actualizacion</h5>
                       </Card>
                    </div>

                    <div className="card"  >
                        <Card title="Kilometraje">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>{state.odometer}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Ultimo Kilometraje</h5>
                        </Card>
                    </div>

                </div>



                <div className="col-12 md:col-3">
                    <div className="card"  >
                        <Card title="Estado Data">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>{state.online}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Online / Offline</h5>
                        </Card>
                    </div>

                    <div className="card"  >
                        <Card title="Version Software">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>Proximamente</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Version Mark</h5>
                        </Card>
                    </div>

                </div>

                <div className="col-12 md:col-3">
                    <div className="card"  >
                        <Card title="Estado Bus">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>{busdetail.bus_state}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Estado</h5>
                        </Card>
                    </div>

                    <div className="card"  >
                        <Card title="Estado Carga">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>{state.soc + "%"}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Nivel Soc</h5>
                        </Card>
                    </div>

                </div>

                <div className="col-12 md:col-6">
                    <div className="card"  >
                        <Chart type="line" data={isolationvalues} />
                    </div>
                </div>

                <div className="col-12 md:col-6">
                    <div className="card widget-country-graph">
                        <div className="country-title" style={{fontSize:"15px"}}>Registro Historico Codigos Fusi Bus</div>
                        <div className="country-graph flex justify-content-center">
                            <Chart type="doughnut" data={historialfusicode} style={{ position: 'relative', width: '50%' }} />
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-6">
                    <div className="card"  >
                        <Chart type="line" data={socvalues} />
                    </div>
                </div>

                <div className="col-12 md:col-3">
                    <div className="card"  >
                        <Card title="Aislacion">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>{state.isolation} Ω</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Ultima Medicion</h5>
                        </Card>
                    </div>
                    <div className="card"  >
                        <Card title="Baterias 24 Volts">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>{lastbattvolt24.last_volt_24_bus} [v]</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Ultima Medicion</h5>
                        </Card>
                    </div>
                </div>

                <div className="col-12 md:col-3">
                    <div className="card"  >
                        <Card title="Temperatura Motor">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>{lastenginetemp.last_engine_temperature_bus} °</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Ultima Medicion</h5>
                        </Card>
                    </div>
                    <div className="card"  >
                        <Card title="Temperatura Pack Baterias">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>Proximamente °</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Ultima Medicion</h5>
                        </Card>
                    </div>
                </div>



                <div className="col-12 md:col-6">
                    <div className="card"  >
                        <Chart type="line" data={batt24} />
                    </div>
                </div>







            </div>
        </div>


    );
};

export default PerfilBusLink
