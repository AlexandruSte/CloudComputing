import {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";

const Default = () => {
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [cookies] = useCookies(['email']);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        console.log(lat + ',' + long);
        if (lat !== 0 && long !== 0) {
            axios.get('/updateLocation', {
                params: {
                    id: cookies['email'],
                    coords: lat + ',' + long
                }
            }).then(resp => {
                console.log(resp);
            }).then(err => {
                console.log(err);
            });
        }
    },);

    return (
        < Wrapper >
        < h1
    style = {
    {
        textAlign: "center", fontSize
    :
        "350%"
    }
}>
    Buy
    Some
    Food < /h1>
    < h1
    style = {
    {
        textAlign: "center", fontSize
    :
        "250%", marginTop
    :
        "50px"
    }
}>
    Choose
    what
    you
    want
    to
    do</h1>
    < div
    style = {
    {
        display: 'grid',
            gridTemplateColumns
    :
        '50% 50%',
            marginTop
    :
        "80px"
    }
}
>
<
    div
    style = {
    {
        textAlign: "center"
    }
}>
<
    h1 > Deliver < /h1>
    < Link
    to = '/volunteer' >
        < img
    src = {require('./delivery.jpg'
)
}
    style = {
    {
        width: "700px", height
    :
        "400px"
    }
}
    alt = "deliver"
        / >
        < /Link>
        < /div>
        < div
    style = {
    {
        textAlign: "center"
    }
}>
<
    h1 > Order < /h1>
    < Link
    to = '/order' >
        < img
    src = {require('./food.jpg'
)
}
    style = {
    {
        width: "500px", height
    :
        "380px"
    }
}
    alt = "food"
        / >
        < /Link>
        < /div>
        < /div>
        < /Wrapper>
)
    ;
};

const Wrapper = styled.div`
    margin: 0 auto;
    width: 80%;
`;

export default Default;