import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';



const Gps = () => {

    const [mapContainer, setMapContainer] = useState(null);

    const mapOptions = {
        zoom:12,
        center: {lat: -34.603722,
                lng: -58.381592},
    }
    return (
        <div className="grid">
            <div className="col-12 md:col-8">
                <div className="card" >
                    <GoogleMapsProvider googleMapsAPIKey='AIzaSyAid8SkYMhLveGCdiIQRxNN_SZYoab1uqI'
                                        mapOptions={mapOptions}>


                    </GoogleMapsProvider>


                </div>
            </div>

        </div>
    );
};

export default Gps;
