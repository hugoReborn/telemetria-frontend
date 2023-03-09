import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import axios from "axios";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import './tableStyle.css';
import {FaBus, FaCarCrash} from "react-icons/fa";
import {GiRoad} from "react-icons/gi";
import {Link, NavLink, Redirect, Route, useLocation} from "react-router-dom";
import {Card} from "primereact/card";




const Mantenimiento = () => {

    const [mixMantenimiento, setMixMantenimiento] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [selectedCode, setSelectedCode] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [globalFilter2, setGlobalFilter2] = useState(null);
    const [totalBuses, SetTotalBuses] = useState({});
    const [busFS, setBusFS] = useState({});
    const [totalOdometer, setTotalOdometer] = useState({});
    const [openFusi, setOpenFusi] = useState([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/bus/operacionestable/').then(response =>{
            setMixMantenimiento(response.data);
            console.log(response.data)
        })

        axios.get('http://127.0.0.1:8000/bus/total_buses/').then(response =>{
            SetTotalBuses(response.data);
        })

        axios.get('http://127.0.0.1:8000/bus/buses_fs/').then(response => {
            setBusFS(response.data);
        })

        axios.get('http://127.0.0.1:8000/other/totalodometer').then(response => {
            setTotalOdometer(response.data);
        })

        axios.get('http://127.0.0.1:8000/status/fusicodeopenlist/').then(response => {
            setOpenFusi(response.data);
        })
    }, []);

    const onlineDataBodyTemplate = (rowData) => {
        if(rowData.online === 'online'){
            return(
                <i style={{color:"greenyellow"}} className="pi pi-circle-fill"></i>
            )
        } else if(rowData.online === 'offline'){
            return(
                <i style={{color:"orangered"}} className="pi pi-circle-fill" />
            )
        }
    }

    const codigoFusiBodyTemplate = (rowData) => {
        if (rowData.fusi_activo === 0){
            return(
                <Button icon="pi  pi-check" className="p-button-rounded p-button-success p-button-outlined" aria-label="Notification" />
            )
        } else if(rowData.fusi_activo > 0){
            return(
                <Button label={rowData.fusi_activo } icon="pi  pi-bell" className="p-button-rounded p-button-warning p-button-outlined" aria-label="Notification" />
            )
        }
    }

    const socBodyTemplate = (rowData) => {
        if(rowData.soc < 40){
            return(
                <Button label={rowData.soc + " " + "%" } className="p-button-rounded p-button-danger p-button-outlined" aria-label="Notification" />
            )
        } else if(rowData.soc > 40 && rowData.soc < 60){
            return(
                <Button label={rowData.soc + " " + "%"  } className="p-button-rounded p-button-warning p-button-outlined" aria-label="Notification" />
            )
        }else{
            return(
                <div>{rowData.soc + " " + "%"}</div>
            )
        }
    }

    const isolationBodyTemplate = (rowData) => {
        if(rowData.isolation === 0){
            return(
                <div>Sin Datos</div>
            )
        }else if (rowData.isolation > 0 && rowData.isolation < 1001.0){
            return(
                <Button label={rowData.isolation + " " + "Ω"  } className="p-button-rounded p-button-danger p-button-outlined" aria-label="Notification" />

            )
        }else {
            return(
                <div>{rowData.isolation + " " + "Ω"}</div>
            )
        }

    }

    const actionBodyTemplate = (rowData) => {
        return (

            <Link to={`/PerfilLink/`} state={rowData}><Button icon="pi pi-arrow-right" className="p-button-rounded p-button-info p-mr-2" ></Button></Link>

            //<Button icon="pi pi-arrow-right" className="p-button-rounded p-button-info p-mr-2" ></Button>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Buses Mantenimiento</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const header2 = (
        <div className="table-header">
            <h5 className="p-m-0"> Lista Codigos Fusi Activos</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter2(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    )

    const statusBodyTemplate = (rowData) => {
        return (
            <Button  className="p-button-rounded p-button-success p-button-outlined" aria-label="Notification" >{rowData.estado}</Button>
        )

    }

    const editBodyTemplate = (rowData) => {
        return (
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-button-outlined" aria-label="Notification" />
        )
    }

    const codeBodyTemplate = (rowData) => {
        return (
            <Button  className="p-button-rounded p-button-warning p-button-outlined" aria-label="Notification" >{rowData.fusi_code}</Button>
        )
    }





    return (
        <div className="layout-dashboard">
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
                    <div className="card widget-overview-box widget-overview-box-3">
                        <span className="overview-title" style={{color:'turquoise'}}>CODIGOS FUSI ACTIVOS</span>
                        <div className="flex justify-content-between">
                            <div className="overview-detail flex justify-content-between">
                                <div style={{backgroundColor:'#e0db3a'}} className="overview-badge flex justify-content-center align-items-center">
                                    <i className="pi pi-exclamation-triangle" style={{'fontSize': '2em', color:'black'}}></i>
                                </div>
                                <div style={{fontSize:'2rem'}} className="overview-text">{openFusi.length} codigos.</div>
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


                <div className="col-12 md:col-9">
                    <div className="card">
                        <DataTable value={mixMantenimiento}
                                   paginator
                                   responsiveLayout='scroll'
                                   stripedRows
                                   selectionMode='single'
                                   selection={selectedBus} onSelectionChange={e => setSelectedBus(e.value)} dataKey='id'

                                   header={header}
                                   globalFilter={globalFilter}
                                   paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
                                   currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" rows={15} >

                            <Column field="online" header="Online/Offline" headerStyle={{width:'5rem'}} body={onlineDataBodyTemplate}/>
                            <Column field="bus_name" header="Bus" sortable  />
                            <Column field="soc" header="Estado Carga" sortable body={socBodyTemplate} />
                            <Column field="odometer" header="Kilometraje" sortable />
                            <Column field="isolation" header="Aislacion Bus" sortable body={isolationBodyTemplate} />
                            <Column field="fusi_activo" header="Codigo Fusi" sortable body={codigoFusiBodyTemplate} />
                            <Column field="actualizacion" header="Ultima Actualizacion" sortable style={{color:"ghostwhite"}} />
                            <Column body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                </div>

                <div className="col-12 md:col-3">
                    <div className="card"  >
                        <Card title="Baterias 24 Volts">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>Proximamente [v]</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Ultima Medicion</h5>
                        </Card>
                    </div>

                    <div className="card"  >
                        <Card title="Baterias 24 Volts">
                            <h1 style={{fontSize:'2rem', textAlign:'center'}}>Proximamente [v]</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Ultima Medicion</h5>
                        </Card>
                    </div>
                </div>


                <div className="col-12 md:col-4">
                    <div className="card">
                        <DataTable value={openFusi}
                                   header={header2}
                                   globalFilter={globalFilter2}
                                   paginator
                                   responsiveLayout="scroll"
                                   paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
                                   currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" rows={14}
                                   selectionMode="single"
                                   selection = {selectedCode} onSelectionChange={e => setSelectedCode(e.value)} dataKey='bus'>
                            <Column field="fusi_code" header="Codigo" body={codeBodyTemplate} />
                            <Column field="bus" header="Bus" style={{fontWeight:"bold", color:"whitesmoke"}} />
                            <Column field='timestamp' header="Fecha" sortable />
                            <Column field='estado' header="Estado" body={statusBodyTemplate} />
                            <Column header='Editar' body={editBodyTemplate} />

                        </DataTable>


                    </div>
                </div>
            </div>
        </div>
    );
};


export default Mantenimiento
