import React, {useEffect, useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';


const Aws = () => {

    const [aws, setAws] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedAws, setSelectedAws] = useState(null);
    const [dataAws, setTDataAws] = useState({});

    useEffect(() =>{

        axios.get('http://127.0.0.1:8000/info/pathsbucket/').then(response =>{
            setAws(response.data)
        });

        axios.get('http://127.0.0.1:8000/info/totalaws/').then(response =>{
            setTDataAws(response.data)
        });

    },[]);


    const statusBodyTemplate = (rowData) => {
        if(rowData.path_status === 'en espera'){
            return(
                <Button className = 'p-button-rounded p-button-warning mt-2'>En Espera</Button>
            )
        }
    }

    const fechaBodyTemplate = (rowData) => {
        return(
            <Button className = 'p-button-rounded p-button-success mt-2'>{rowData.creation_date}</Button>
        )
    }


    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Tabla Codigos De Falla</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const imageBodyTemplate = (rowData) => {
        return <i className='pi pi-cloud-upload' style={{color:'#f2eb1b', fontSize:'1.5rem'}}></i>;
    }



    return (
        <div className="grid">
            <div className="col-12 md:col-7">
                    <div className="card widget-overview-box widget-overview-box-1" style={{height:'55rem'}} >
                        <Card >
                            <DataTable value={aws}
                                       size='large'
                                       paginator
                                       responsiveLayout='scroll'
                                       stripedRows
                                       selectionMode='single'
                                       selection={selectedAws} onSelectionChange={e => setSelectedAws(e.value)} dataKey='bus'
                                       header={header}
                                       globalFilter={globalFilter}
                                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
                                       currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" rows={9} >
                                <Column headerStyle={{width:'5rem'}} body={imageBodyTemplate}></Column>
                                <Column headerStyle={{width:'10rem'}} field ='bus' header={'Bus'} ></Column>
                                <Column headerStyle={{width:'30rem'}} field ='path_name' header={'Directorio AWS-S3'} ></Column>
                                <Column headerStyle={{width:'15rem'}} field ='creation_date' body={fechaBodyTemplate} header={'Fecha De Subida'} ></Column>
                                <Column field ='path_status' body={statusBodyTemplate} header={'Estado Decodificacion'} ></Column>

                            </DataTable>
                        </Card>
                    </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card widget-overview-box widget-overview-box-1" style={{height:'55rem'}} >
                    <Card title="Datos Generales"
                          subTitle='Datos Archivos Subidos A AWS-S3'>
                        <h1 style={{fontSize:'5rem', textAlign:'center'}}>{dataAws.total}</h1>
                        <h5 style={{textAlign:'center', color:'turquoise'}} >Registros AWS-S3</h5>
                        <h1 style={{fontSize:'5rem', textAlign:'center'}}>{dataAws.ready}</h1>
                        <h5 style={{textAlign:'center', color:'turquoise'}} >Archivos Decodificados</h5>
                        <h1 style={{fontSize:'5rem', textAlign:'center'}}>{dataAws.espera}</h1>
                        <h5 style={{textAlign:'center', color:'turquoise'}} >Archivos Por Decodificar</h5>
                        <h1 style={{fontSize:'5rem', textAlign:'center'}}>{dataAws.bus}</h1>
                        <h5 style={{textAlign:'center', color:'turquoise'}} >Ultimo Archivo Subido</h5>
                    </Card>
                </div>
            </div>





        </div>
    );
};

export default Aws;
