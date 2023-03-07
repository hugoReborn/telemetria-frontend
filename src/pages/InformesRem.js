import React, {useEffect, useState} from 'react';
import { Editor } from 'primereact/editor';
import {Dropdown} from "primereact/dropdown";
import { InputText } from 'primereact/inputtext';
import {Card} from "primereact/card";
import axios from 'axios';
import {Calendar} from "primereact/calendar";
import { Carousel } from 'primereact/carousel';
import {Button} from "primereact/button";




const InformesRem = () => {

    const [parte, setParte] = useState('Ingresar Detalles Parte')
    const [motivo, setMotivo] = useState('');
    const [dropdownBus, setDropdownBus] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [azotador, setAzotador] = useState([]);
    const [selectedAzotador, setSelectedAzotador] = useState(null);
    const [date, setDate] = useState(null);
    const [carouselValue, setCarouselValue] = useState([]);
    const [parteValue, setParteValue] = useState({});


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/bus/buslist_dropdown/').then(response =>{
            setDropdownBus(response.data);

        })

        axios.get('http://127.0.0.1:8000/info/azotadores/').then(response =>{
            setAzotador(response.data);
        })
        axios.get('http://127.0.0.1:8000/info/carousell_azotador/').then(response =>{
            setCarouselValue(response.data);
        })
        axios.get('http://127.0.0.1:8000/info/datapartes/').then(response =>{
            setParteValue(response.data);
        })


    }, [])


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 4,
            numScroll: 4
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

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

    const carouselTeplate = ((item) => {
        return (

            <div className="card mr-3">
                <div className="customer-item-content">
                    <div className="mb-3">
                        <img style={{width:'10rem', height:'10rem' }} src='assets/layout/images/azotadores.png' onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt='azotador' className="product-image" />
                    </div>
                    <div>
                        <h5 className="mb-1">{item.azotador}</h5>
                        <h6 className="mt-0 mb-3" style={{color:"darkturquoise"}}>Total Partes : {item.cantidad}</h6>
                    </div>
                    <div className="template">
                        <Button label="Tecnico Rem" className="p-button-info" />
                    </div>
                </div>
            </div>

        );
    })




    //console.log(selectedBus)
    //console.log(selectedAzotador)
    //console.log(motivo)
    //console.log(parte)
    //console.log(date)
    //console.log(dropdownBus)

    const seccionValues = ['fabrica', 'bus']











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
                    <span><Dropdown value={seccionValues}  optionLabel="name" placeholder="Seleccione Seccion" /></span><br/>
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
                    <Editor style={{height:'31rem'}} value={parte} onTextChange={(e) => setParte(e.htmlValue)} />

                </div>
            </div>
            <div className="col-12 md:col-2">

                    <Card title="Informacion General"
                    subTitle="Estadisticas Partes"
                    aria-orientation="horizontal">

                        <div className="card">
                            <h1 style={{fontSize:'5rem', textAlign:'center'}}>{parteValue.total_partes}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Total Partes</h5>
                        </div>

                        <div className="card">
                            <h1 style={{fontSize:'5rem', textAlign:'center'}}>{parteValue.total_fabrica}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Fabrica</h5>
                        </div>

                        <div className="card">
                            <h1 style={{fontSize:'5rem', textAlign:'center'}}>{parteValue.total_bus}</h1>
                            <h5 style={{textAlign:'center', color:'turquoise'}} >Buses</h5>
                        </div>

                    </Card>

            </div>

            <div className="col-12 widget-customer-carousel">
                <Carousel value={carouselValue} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions}
                          itemTemplate={carouselTeplate} autoplayInterval={3000} header={<h5>Estadisticas Por Tecnico</h5>} />

            </div>







        </div>
    );
};

export default InformesRem
