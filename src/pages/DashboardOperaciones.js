import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import axios from "axios";
import {Column} from "primereact/column";
import {Button} from "primereact/button";

const Operaciones = () => {

    const [mixMantenimiento, setMixMantenimiento] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/bus/operacionestable/').then(response =>{
            setMixMantenimiento(response.data);
            console.log(response.data)




        })
    }, []);

    const onlineDataBodyTemplate = (rowData) => {
        if(rowData.online === 'online'){
            return(
                <Button className = 'p-button-rounded p-button-success mt-2' >Online</Button>
            )
        } else if(rowData.online === 'offline'){
            return(
                <Button className = 'p-button-rounded p-button-danger mt-2'>Offline</Button>
            )
        }
    }

    const codigoFusiBodyTemplate = (rowData) => {
        if (rowData.fusi_activo === 0){
            return(
            <Button className = 'p-button-rounded p-button-success mt-2' icon={'pi pi-check'}></Button>
            )
        } else if(rowData.fusi_activo > 0){
            return(
                <Button className = 'p-button-rounded p-button-warning mt-2' icon={'pi pi-bolt'}>{" "+
                    " "+ rowData.fusi_activo + " " + "activos "}</Button>
            )
        }
    }

    const socBodyTemplate = (rowData) => {
        if(rowData.soc < 30){
            return
        }
    }









    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Tabla Operacion Buses Mantenimiento</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    return (
        <div className="layout-dashboard">
            <div className="grid">
                <div className="col-12 md:col-12">
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
                            <Column field="online" header="Online/Offline" headerStyle={{width:'5rem'}} body={onlineDataBodyTemplate} />
                            <Column field="id" header="Id Bus" sortable  />
                            <Column field="bus_name" header="Bus" sortable />
                            <Column field="soc" header="Estado Carga" sortable />
                            <Column field="odometer" header="Kilometraje" sortable />
                            <Column field="isolation" header="Aislacion Bus" sortable />
                            <Column field="fusi_activo" header="Codigo Fusi" sortable body={codigoFusiBodyTemplate} />
                            <Column field="actualizacion" header="Ultima Actualizacion" sortable />


                        </DataTable>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Operaciones;
