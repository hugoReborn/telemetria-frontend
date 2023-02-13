import React, {useEffect, useState} from 'react';
import { Editor } from 'primereact/editor';
import {Dropdown} from "primereact/dropdown";
import { InputText } from 'primereact/inputtext';
import {Card} from "primereact/card";
import axios from 'axios';
import {Calendar} from "primereact/calendar";




const InformesRem = () => {

    const [parte, setParte] = useState('Ingresar Detalles Parte')
    const [motivo, setMotivo] = useState('');
    const [dropdownBus, setDropdownBus] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [azotador, setAzotador] = useState([]);
    const [selectedAzotador, setSelectedAzotador] = useState(null);
    const [date, setDate] = useState(null);

    console.log(parte)
    console.log(motivo)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/bus/buslist_dropdown/').then(response =>{
            setDropdownBus(response.data);

        })

        axios.get('http://127.0.0.1:8000/info/azotadores/').then(response =>{
            setAzotador(response.data);
        })
    }, []);

    const onBusChange = (e) => {
        setSelectedBus(e.value);
    }

    const onAzotadorChange = (e) => {
        setSelectedAzotador(e.value);
    }

    const mapBus = dropdownBus.map((bus) => {
        return(
            {'name':bus.bus_name}
        )

    })

    const mapAzotador = azotador.map((azotador) => {
        return(
            {'azotador':azotador.nombre}
        )
    })

    //console.log(selectedBus)
    //console.log(selectedAzotador)
    //console.log(motivo)
    //console.log(parte)
    //console.log(date)








    return (
        <div className="grid">
            <div className="col-12 md:col-2">
                <div className="card">
                    <span>Seleccione Bus</span>
                    <br/>
                    <br/>
                        <Dropdown optionLabel="name" value={selectedBus} options={mapBus} onChange={onBusChange} placeholder="Seleccione un Bus" />
                </div>

                <div className="card">
                    <span>Seleccione Tecnico</span>
                    <br/>
                    <br/>
                    <Dropdown value={selectedAzotador}  optionLabel="azotador" options={mapAzotador} onChange={onAzotadorChange} placeholder="Seleccione Tecnico" />
                </div>



                <div className="card">
                    <span>Componente en Falla</span>
                    <br/>
                    <br/>
                    <span><Dropdown value=''  optionLabel="name" placeholder="Seleccione Componente" /></span><br/>
                    <br/>
                    <span><Dropdown value=''  optionLabel="name" placeholder="Seleccione Componente" /></span><br/>
                    <br/>
                    <span><Dropdown value=''  optionLabel="name" placeholder="Seleccione Componente" /></span>



                </div>

                <div className="card">
                    <span>Seleccione Fecha</span>
                    <br/>
                    <br/>
                    <Calendar value={date} onChange={(e => setDate(e.value))} showIcon/>

                </div>





            </div>

            <div className="col-12 md:col-8">
                <div className="card">
                    <span>Motivo Parte</span>
                    <br/>
                    <br/>
                    <span className="p-float-label p-input-icon-left">

                        <InputText style={{width:"50rem"}} id="lefticon" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                    </span>
                </div>
                <div className="card">
                    <h5> Ingresar Detalles Acciones Parte</h5>
                    <Editor style={{height:'24rem'}} value={parte} onTextChange={(e) => setParte(e.htmlValue)} />

                </div>
            </div>
            <div className="col-12 md:col-2">
                <div className="card">
                    <Card title="Informacion General"
                    subTitle="Estadisticas Partes"
                    aria-orientation="horizontal">
                        <h1 style={{fontSize:'5rem', textAlign:'center'}}>00</h1>
                        <h5 style={{textAlign:'center', color:'turquoise'}} >Total Partes</h5>
                        <h1 style={{fontSize:'5rem', textAlign:'center'}}>00</h1>
                        <h5 style={{textAlign:'center', color:'turquoise'}} >Fabrica</h5>
                        <h1 style={{fontSize:'5rem', textAlign:'center'}}>00</h1>
                        <h5 style={{textAlign:'center', color:'turquoise'}} >Buses</h5>

                    </Card>
                </div>
            </div>



        </div>
    );
};

export default InformesRem
