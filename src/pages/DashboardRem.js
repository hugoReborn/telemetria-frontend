import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Chart} from "primereact/chart";
import {ProgressBar} from "primereact/progressbar";
import { FaCarCrash } from "react-icons/fa"
import { FaBus } from "react-icons/fa"
import { GiRoad } from "react-icons/gi";
import { RiBusWifiFill } from "react-icons/ri";

const Rem = () => {

    const [avgSoc, SetAvgSoc] = useState({});
    const [avgPressure, SetAvgPressure] = useState([]);
    const [avgIsolation, SetAvgIsolation] = useState([]);
    const [avgBattVolt24, SetAvgBattVolt24] = useState([]);
    const [totalBuses, SetTotalBuses] = useState({});
    const [totalOdometer, setTotalOdometer] = useState({});
    const [busFS, setBusFS] = useState({});
    const [operative, setOperative] = useState({});
    const [lastFusi, setLastFusi] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/other/avgsoc_fleet').then(response => {
            SetAvgSoc(response.data);
        })

        axios.get('http://127.0.0.1:8000/other/avgpressure_fleet').then(response => {
            SetAvgPressure(response.data);


        }).catch(error =>{console.log(error)})

        axios.get('http://127.0.0.1:8000/electric/avgisolation_fleet/').then(response => {
            SetAvgIsolation(response.data);
        })

        axios.get('http://127.0.0.1:8000/electric/avgbattvolt24_fleet/').then(response => {
            SetAvgBattVolt24(response.data);
        })

        axios.get('http://127.0.0.1:8000/bus/total_buses/').then(response =>{
            SetTotalBuses(response.data);

        })

        axios.get('http://127.0.0.1:8000/other/totalodometer').then(response => {
            setTotalOdometer(response.data);
        })

        axios.get('http://127.0.0.1:8000/bus/buses_fs/').then(response => {
            setBusFS(response.data);
        })

        axios.get('http://127.0.0.1:8000/bus/operative/').then(response =>{
            setOperative(response.data);
        })

        axios.get('http://127.0.0.1:8000/status/lastfusicode_fleet/').then(response => {
            setLastFusi(response.data);

        })


    }, []);

    return (
        <div className="grid">

            <div className="col-12 md:col-2">

                <div className="card widget-overview-box widget-overview-box-1">
                    <span className="overview-title" style={{color:'turquoise'}}>TOTAL FLOTA REBORN</span>
                    <div className="flex justify-content-between">
                        <div className="overview-detail flex justify-content-between">
                            <div style={{backgroundColor:'#e0db3a'}} className="overview-badge flex justify-content-center align-items-center">
                                <FaBus style={{color:'black', fontSize:'2rem'}} />
                            </div>
                            <div style={{fontSize:'2rem'}} className="overview-text">{totalBuses.total} buses.</div>
                        </div>

                    </div>
                </div>

                <div className="card widget-overview-box widget-overview-box-1">
                    <span className="overview-title" style={{color:'turquoise'}}>KILOMETRAJE TOTAL FLOTA</span>
                    <div className="flex justify-content-between">
                        <div className="overview-detail flex justify-content-between">
                            <div style={{backgroundColor:'#e0db3a'}} className="overview-badge flex justify-content-center align-items-center">
                                <GiRoad style={{color:'black', fontSize:'2rem'}} />
                            </div>
                            <div style={{fontSize:'2rem'}} className="overview-text">{totalOdometer.total_odometer} km.</div>
                        </div>
                    </div>
                </div>

                <div className="card widget-overview-box widget-overview-box-3">
                    <span className="overview-title" style={{color:'turquoise'}}>BUSES FUERA DE SERVICIO</span>
                    <div className="flex justify-content-between">
                        <div className="overview-detail flex justify-content-between">
                            <div style={{backgroundColor:'#e0db3a'}} className="overview-badge flex justify-content-center align-items-center">
                                <FaCarCrash style={{color:'black', fontSize:'2rem'}} />
                            </div>
                            <div style={{fontSize:'2rem'}} className="overview-text">{busFS.bus_fs} buses.</div>
                        </div>
                    </div>
                </div>

                <div className="card widget-overview-box widget-overview-box-1">
                    <span className="overview-title" style={{color:'turquoise'}}>BUSES OPERATIVOS</span>
                    <div className="flex justify-content-between">
                        <div className="overview-detail flex justify-content-between">
                            <div style={{backgroundColor:'#e0db3a'}} className="overview-badge flex justify-content-center align-items-center">
                                <RiBusWifiFill style={{color:'black', fontSize:'2rem'}} />
                            </div>
                            <div style={{fontSize:'2rem'}} className="overview-text">{operative.operative_buses} buses.</div>
                        </div>
                    </div>
                </div>

                <div className="card widget-target">
                    <div className="card-header">
                        <span>Ultimo Mensaje De Falla</span><i className="pi pi-spin pi-exclamation-circle" style={{fontSize:'20px'}}></i>
                    </div>
                    <div className="content">
                        <h3 style={{textAlign:'center', color:'turquoise'}}>Codigo</h3>
                        <h1 style={{textAlign:'center', color:'white'}}>{lastFusi.fusi_code}</h1>
                        <h3 style={{textAlign:'center', color:'turquoise'}}>Descripcion</h3>
                        <h5 style={{textAlign:'center', color:'white'}}>{lastFusi.description}</h5>
                        <h3 style={{textAlign:'center', color:'turquoise'}}>Fecha</h3>
                        <h3 style={{textAlign:'center', color:'white'}}>{lastFusi.timestamp}</h3>

                    </div>

                </div>





            </div>











            <div className="col-4">
                <div className="card widget-target">
                    <div className="card-header">
                        <span>Soc - Presion - Aislacion - Voltaje Bat 24</span><i className="pi pi-chart-bar"></i>
                    </div>
                    <div className="content">
                        <h3>Promedio Señales Flota</h3>
                    </div>
                    <div className="values">
                        <div className="item">
                            <span>Soc</span>
                            <ProgressBar  style={{backgroundColor:'lightgray'}} value={avgSoc.avg_soc_fleet} showValue={false}></ProgressBar>
                            <span className="day">{avgSoc.avg_soc_fleet}%</span>
                        </div>

                        <div className="item">
                            <span>Presion</span>
                            <ProgressBar style={{backgroundColor:'lightgray'}} value={avgPressure.avg_pressure_fleet*10} showValue={false}></ProgressBar>
                            <span className="day">{avgPressure.avg_pressure_fleet} [Bar]</span>
                        </div>

                        <div className="item">
                            <span>Aislacion</span>
                            <ProgressBar style={{backgroundColor:'lightgray'}} value={avgIsolation.avg_isolation_fleet/100} showValue={false}></ProgressBar>
                            <span className="day">{avgIsolation.avg_isolation_fleet} Ω</span>
                        </div>

                        <div className="item">
                            <span>Bat.24V</span>
                            <ProgressBar style={{backgroundColor:'lightgray'}} value={avgBattVolt24.avg_batt_24_fleet*3} showValue={false}></ProgressBar>
                            <span  className="day">{avgBattVolt24.avg_batt_24_fleet}[v]</span>
                        </div>



                    </div>


                </div>






            </div>
        </div>
    );
};

export default Rem;
