import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Chart} from "primereact/chart";

import { FaCarCrash } from "react-icons/fa"
import { FaBus } from "react-icons/fa"
import { GiRoad } from "react-icons/gi";
import { RiBusWifiFill } from "react-icons/ri";


import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

const Rem = () => {


    const [totalBuses, SetTotalBuses] = useState({});
    const [totalOdometer, setTotalOdometer] = useState({});
    const [busFS, setBusFS] = useState({});
    const [operative, setOperative] = useState({});
    const [lastFusi, setLastFusi] = useState({});
    const [busNoData, setBusNoData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);
    const [avgSignals, setAvgSignals] = useState({});
    const [historicalFusi, setHistoricalFusi] = useState({});
    const [selectedFusiCode, setSelectedFusiCode] = useState(null);
    const [fusilist, setFusilist] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/status/prom_fleet_signals/').then(response => {

            const chartOptions = {
                labels: ['Valores Promedio Señal'],

                datasets: [
                    {
                        label:"Presion Aire",
                        backgroundColor: '#974ae8',
                        data: Object.values(response.data.avgpressure+'p'),
                    },
                    {
                        label : 'Voltaje Bat. 24 V',
                        backgroundColor: '#5035e8',
                        data: Object.values(response.data.avgbatt24),
                    },
                    {
                        label:'Temperatura de Baterias',
                        backgroundColor: '#35e2e8',
                        data: Object.values(response.data.avgbatttemp),
                    },
                    {
                        label:'Temperatura Motor',
                        backgroundColor: '#a52af7',
                        data: Object.values(response.data.avgengine),
                    }

                ]
            }
            setAvgSignals(chartOptions);
        })

        axios.get('http://127.0.0.1:8000/status/historical_fusi_chart/').then(response =>{
            const pieOptions ={
                labels: Object.values(response.data.labels),
                datasets: [{
                    data: Object.values(response.data.valores),
                    backgroundColor: [ "#974ae8", "#35e2e8", "#1428db", "#570b87","#9807f2","#07abad"]

                }]


            }
            setHistoricalFusi(pieOptions);

        })


        axios.get('http://127.0.0.1:8000/bus/total_buses/').then(response =>{
            SetTotalBuses(response.data);

        })

        axios.get('http://127.0.0.1:8000/status/fusicode_list/').then(response =>{
            setFusilist(response.data);
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

    const percentageBodyTemplate = (rowData) => {
        return (
            <span style={{color: 'turquoise'}}>{rowData.total}</span>
        )
    }

    const imageBusBodyTemplate = (rowData) => {
        return (
            <FaBus style={{color:'white', fontSize:'20px'}} />
        )
    }
    const options = {
        legend: {
            display: true,
        }
    };

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
                        <span>Último Mensaje De Falla</span><i className="pi pi-spin pi-exclamation-circle" style={{fontSize:'20px'}}></i>
                    </div>
                    <div className="content">
                        <h3 style={{textAlign:'center', color:'turquoise'}}>Código</h3>
                        <h1 style={{textAlign:'center', color:'white'}}>{lastFusi.fusi_code}</h1>
                        <h3 style={{textAlign:'center', color:'turquoise'}}>Descripción</h3>
                        <h5 style={{textAlign:'center', color:'white'}}>{lastFusi.description}</h5>
                        <h3 style={{textAlign:'center', color:'turquoise'}}>Fecha</h3>
                        <h3 style={{textAlign:'center', color:'white'}}>{lastFusi.timestamp}</h3>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card widget-table">
                    <div className="card-header">
                        <span style={{color:'turquoise'}}>Buses Sin Conexión</span>
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

            <div className="col-12 md:col-6">
                <div className="card widget-country-graph">
                    <i className="pi pi-spin pi-bolt" style={{color:"yellow", fontSize:'2rem'}} />
                    <div className="country-title">Promedio Señales Flota</div>
                    <div className="country-graph flex justify-content-center">
                    </div>
                    <div className="country-content">
                        <Chart type="bar" data={avgSignals} options={options} />
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card widget-country-graph">
                    <div className="country-title" style={{fontSize:"20px"}}>Registro Historico Flota Codigos Fusi</div>
                    <div className="country-graph flex justify-content-center">
                        <Chart type="doughnut" data={historicalFusi} style={{ position: 'relative', width: '70%' }} />
                    </div>

                    <div className="country-content">
                        <DataTable
                        value={fusilist}
                        paginator={true}
                        responsiveLayout='scroll'
                        stripedRows
                        selectionMode='single'
                        paginatorTemplate='CurrenPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                        currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries' rows={9}
                        selection={selectedFusiCode} onSelectionChange={e => setSelectedFusiCode(e.value)} datakey='id'>
                            <Column field="dtc" header="Código" headerStyle={{width:'15rem', color:'turquoise'}} ></Column>
                            <Column field="quantity" header="Repeticiones" headerStyle={{width:'15rem'}} sortable ></Column>
                            <Column field="total" header="Porcentaje" body={percentageBodyTemplate} ></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-4">


            </div>


















        </div>
    );
};

export default Rem;
