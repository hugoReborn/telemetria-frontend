import React, {useEffect, useState} from 'react';
import axios from "axios";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

const Fleet = () => {

    const [fleet, setFleet] = useState({});
    const [layout, setLayout] = useState('grid');

    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/bus/busesdata_view/').then(response =>{
            const hola = {
                bus_name: response.data.bus_name,
            }
            setFleet(hola);

        })
    },[])

    const renderListItem = (fleet) => {
        return(
            <div className="col-12">
                <div className="product-list-item">
                    <div className="product-list-detail">
                        <div className="product-name">{fleet.bus_name}</div>

                        <div className="product-description">{fleet.sniffer}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{fleet.plate_number}</span>
                    </div>
                </div>
            </div>
        )
    }

    const renderGridItem = (data) => {
        return(
            <div className="col-12 col-sm-6 col-lg-3">
                <div className="product-grid-item card">
                    <div className="product-image-container">
                    </div>
                    <div className="product-detail">
                        <div className="product-name">{data.bus_name}</div>
                        <div className="product-description">{data.sniffer}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.plate_number}</span>
                    </div>
                </div>
            </div>
        )
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">

                <div className="col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();

    console.log(setFleet)





    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <DataView value={fleet} itemTemplate={itemTemplate} paginator rows={9}/>
                </div>
            </div>
        </div>
    );
};

export default Fleet;
