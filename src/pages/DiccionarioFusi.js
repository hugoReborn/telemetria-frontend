import React, {useEffect, useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const Diccionario = () => {


    const [diccionario, setDiccionario] = useState([]);
    const [selectedFusiCode, setSelectedFusiCode] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {

       axios.get('http://127.0.0.1:8000/info/fusimessage').then(response =>{
           setDiccionario(response.data);


       })

    }, []);

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Tabla Codigos De Falla</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );



    const codeBodyTemplate = (rowData) => {
        const codeClassName = classNames( {
            'text-white-400 font-bold': rowData.fusicode > 0
        });

        return(
            <div className = {codeClassName}> {rowData.fusicode}</div>
        )
    }

    const levelBodyTemplate = (rowData) => {

        if(rowData.level === 1){
            return(
                <Button className = 'p-button-rounded p-button-success mt-2'>Nivel {rowData.level}</Button>
            )

        } else if(rowData.level === 2){
            return(
                <Button className = 'p-button-rounded p-button-warning mt-2'>Nivel {rowData.level}</Button>
            )

        }else {
            return(
                <Button className = 'p-button-rounded p-button-info mt-2'>Nivel {rowData.level}</Button>
            )
        }

    }

    const imageBodyTemplate = (rowData) => {
        return <i className='pi pi-exclamation-triangle' style={{color:'#f2eb1b', fontSize:'1.5rem'}}></i>;
    }

    const totalFusiCodes = diccionario.length;
    const levelFusi2 = diccionario.filter((fusicode) => fusicode.level === 2).length;
    const levelFusi1 = diccionario.filter((fusicode) => fusicode.level === 1).length;
    const levelFusi3 = diccionario.filter((fusicode) => fusicode.level === 3).length;






    return (
        <div className="layout-dashboard">
            <div className="grid">
                <div className="col-12 md:col-8">
                    <div className="card widget-overview-box widget-overview-box-1" style={{height:'55rem'}}>
                        <Card title="Diccionario Codigos De Falla">
                            <Card >
                                <DataTable value={diccionario}
                                           size='large'
                                           paginator
                                           responsiveLayout='scroll'
                                           stripedRows
                                           selectionMode='single'
                                           selection={selectedFusiCode} onSelectionChange={e => setSelectedFusiCode(e.value)} dataKey='id'
                                           header={header}
                                           globalFilter={globalFilter}
                                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
                                           currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" rows={9} >
                                    <Column body={imageBodyTemplate} headerStyle={{width:'5rem'}}> </Column>
                                    <Column field = 'fusicode' body={codeBodyTemplate} headerStyle={{width:'10rem'}} header = 'Codigo Fusi' sortable></Column>
                                    <Column field = 'description' header = 'Descripcion' headerStyle={{width:'30rem'}} ></Column>
                                    <Column field = 'level' body={levelBodyTemplate} headerStyle={{width:'10rem'}} header = 'Nivel' sortable></Column>
                                </DataTable>
                            </Card>
                        </Card>

                    </div>

                </div>

                <div className="col-12 md:col-3">
                    <div className="card" style={{height:'55rem'}} >
                        <Card title="Datos Generales"
                              subTitle='Cantidad Total Codigos De Falla'>
                            <h1 style={{fontSize:'6rem', textAlign:'center'}}>{totalFusiCodes}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Codigos</h5>
                            <h1 style={{fontSize:'6rem', textAlign:'center'}}>{levelFusi1}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Codigos Nivel I</h5>
                            <h1 style={{fontSize:'6rem', textAlign:'center'}}>{levelFusi2}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Codigos Nivel II</h5>
                            <h1 style={{fontSize:'6rem', textAlign:'center'}}>{levelFusi3}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Codigos Nivel III</h5>
                        </Card>
                    </div>
                </div>




            </div>
        </div>

    );
};

export default Diccionario;
