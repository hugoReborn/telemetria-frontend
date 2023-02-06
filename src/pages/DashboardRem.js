import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Chart} from "primereact/chart";
import {ProgressBar} from "primereact/progressbar";
import { FaCarCrash } from "react-icons/fa"
import { FaBus } from "react-icons/fa"
import { GiRoad } from "react-icons/gi";
import { RiBusWifiFill } from "react-icons/ri";
import { MdMobiledataOff } from "react-icons/md";
import {Timeline} from "primereact/timeline";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

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
    const [busNoData, setBusNoData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);

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

        axios.get('http://127.0.0.1:8000/status/buslistnodata/').then(response => {
            setBusNoData(response.data);
        })


    }, []);

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Buses Sin Conexion</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const daysBodyTemplate = (rowData) => {
        if(rowData.days === 2) {
            return (
                <Button className = 'p-button-rounded p-button-success mt-2'>{rowData.days} Dias</Button>

            )

        }else if(rowData.days > 2 && rowData.days < 5){
            return (
                <Button className = 'p-button-rounded p-button-warning mt-2'>{rowData.days} Dias</Button>
            )
        }else{
            return (
                <Button className = 'p-button-rounded p-button-info mt-2'>{rowData.days} Dias</Button>
            )
        }
    }
    const busBodyTemplate = (rowData) => {
        return (
            <span style={{color: 'turquoise'}}>{rowData.bus}</span>
        )
    }

    const imageBusBodyTemplate = (rowData) => {
        return (
            <FaBus style={{color:'white', fontSize:'20px'}} />
        )
    }

    const buttonBodyAction = (rowData) => {
return (
            <Button icon='pi pi-info' className = "p-button-rounded p-button-warning p-button-outlined"> </Button>
        )
    }


    return (
        <div className="grid">

            <div className="col-12 md:col-3">
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
            </div>

            <div className="col-12 md:col-3">
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
            </div>

            <div className="col-12 md:col-3">
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
            </div>

            <div className="col-12 md:col-3">
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
            </div>

            <div className="col-12 md:col-2">
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






            <div className="col-12 md:col-4">
                <div className="card widget-table">
                    <div className="card-header">
                        <span style={{color:'turquoise'}}>Buses Sin Conexion</span>
                    </div>
                    <DataTable value={busNoData}
                               responsiveLayout='scroll'
                               stripedRows
                               selectionMode='single'
                               size='large'
                               header={header}
                               globalFilter={globalFilter}
                               paginator
                               paginatorTemplate='CurrenPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                               currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries' rows={9}
                               selection={selectedBus} onSelectionChange={e => setSelectedBus(e.value)} datakey='bus'>
                        <Column headerStyle={{width:'5rem'}} body={imageBusBodyTemplate}></Column>
                        <Column field="bus" header="Bus" headerStyle={{width:'5rem'}} body={busBodyTemplate} ></Column>
                        <Column field='last_data' header='Fecha' headerStyle={{width:'8rem'}}></Column>
                        <Column field='days' header='Dias' body={daysBodyTemplate} headerStyle={{width:'8rem'}} sortable></Column>
                        <Column headerStyle={{width:'5rem'}} body={buttonBodyAction}></Column>




                    </DataTable>

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
