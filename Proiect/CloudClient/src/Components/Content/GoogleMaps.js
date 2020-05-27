import {useEffect, useState} from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import GoogleMapsPoint from "./GoogleMapsPoint";
import {useCookies} from "react-cookie";
import CustomSpinner from "../Layout/CustomSpinner";

const GoogleMaps = () => {
    const [cookies] = useCookies(['email']);
    const zoom = 13;
    const [center, setCenter] = useState({});
    const [volunteer, setVolunteer] = useState({});
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        setLoading1(true);
        setLoading2(true);
        axios.get('/getActive', {
            params: {
                'id': cookies['email']
            }
        }).then(resp1 => {
            if (resp1.data !== undefined && resp1.data.length !== 0) {
                axios.get('/getLocation', {
                    params: {
                        id: resp1.data[0].vol
                    }
                }).then(resp2 => {
                    if (resp2.data) {
                        setVolunteer({
                            lat: parseFloat(resp2.data[0].coords.split(',')[0]),
                            lng: parseFloat(resp2.data[0].coords.split(',')[1]),
                        });
                        console.log(volunteer)
                    }
                }).then(() => {
                    setLoading1(false);
                });

                axios.get('/getLocation', {
                    params: {
                        id: resp1.data[0].clnt
                    }
                }).then(resp2 => {
                    if (resp2.data) {
                        setCenter({
                            lat: parseFloat(resp2.data[0].coords.split(',')[0]),
                            lng: parseFloat(resp2.data[0].coords.split(',')[1]),
                        });
                        console.log(center)
                    }
                }).then(() => {
                    setLoading2(false);
                });
            }
        });
    }, []);

    return (
        < >
        {
    !loading1 && !loading2 &&
    < div
    style = {
    {
        height: '60vh', width
    :
        '60%', marginTop
    :
        "50px"
    }
}>
<
    GoogleMapReact
    bootstrapURLKeys = {
    {
        key: "AIzaSyB8qllNDF7QlJKRXvFVQ7RkSm7GqtHCmmw"
    }
}
    defaultCenter = {center}
    defaultZoom = {zoom}
        >
        < GoogleMapsPoint
    {...
        center
    }
    text = 'A' / >
        < GoogleMapsPoint
    {...
        volunteer
    }
    text = 'B' / >
        < /GoogleMapReact>
        < /div>
}
    {
        (loading1 === true || loading2 === true) && < CustomSpinner / >
    }
<
    />
)
    ;
}

export default GoogleMaps;