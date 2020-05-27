import {useEffect, useState} from "react";
import {Button, Card, Modal} from "antd";
import axios from "axios";
import {useCookies} from "react-cookie";
import CustomSpinner from "../Layout/CustomSpinner";

const Volunteer = () => {
    const [coords, setCoords] = useState('');
    const [orders, setOrders] = useState([]);
    const [cookies] = useCookies(['email']);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCoords(position.coords.latitude + ',' + position.coords.longitude);
        });

        console.log(coords);
    }, []);

    useEffect(() => {
        setLoading1(true);
        setLoading2(true);
        if (coords.substring(coords.length - 2) !== ',0') {
            axios.get('/getCurrentCity', {
                params: {
                    'coords': coords
                }
            }).then(resp => {
                axios.get('/getAllOrders', {
                    params: {
                        'city': resp.data,
                        'vol': cookies['email']
                    }
                }).then((data) => {
                    setOrders(data.data);
                    console.log(data.data);
                }).then(() => {
                    setLoading1(false);
                });
            }).then(() => {
                setLoading2(false);
            });
        }
    }, [coords]);

    const takeCommand = (client) => {
        console.log('Clientul ' + client);
        axios.get('/tookOrder', {
            params: {
                'vol': cookies['email'],
                'clnt': client
            }
        }).then(response => {
            console.log(response);
            Modal.success({
                title: 'Order taken.',
                content: 'You have taken an order with success.',
                width: 500,
                onOk: () => window.location.replace('/'),
            });
        });
    }

    const renderOrders = () => {
        if (orders.length < 1)
            return
    <
        h1 > No
        orders
        available. < /h1>
    else
        return orders.map(order =>
            < Card
        title = {"Order #" +(orders.indexOf(order) + 1)}
        style = {
        {
            width: "60%", margin
        :
            "0 auto", marginBottom
        :
            "50px"
        }
    }
    >
        {
            order.msg
        }
    <
        Button
        style = {
        {
            marginTop: "20px", display
        :
            "block", marginLeft
        :
            "auto"
        }
    }
        onClick = {()
    =>
        takeCommand(order.clnt)
    }
    >
        Take
        order
        < /Button>
        < /Card>
    )
    };

    return (
        < >
        {(loading1 === true || loading2 === true) && < CustomSpinner / >
}
<
    div
    style = {
    {
        textAlign: "center",
            display
    :
        "grid",
            gridTemplateColumns
    :
        "30% 30% 30%"
    }
}
>
    {
        !loading1 && !loading2 && renderOrders()
    }
<
    /div>
    < />
)
};

export default Volunteer;