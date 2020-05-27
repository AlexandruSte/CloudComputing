import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Button, Card} from "antd";
import GoogleMaps from "./GoogleMaps";
import CustomSpinner from "../Layout/CustomSpinner";

const ActiveOrder = () => {
    const [order, setOrder] = useState([]);
    const [cookies] = useCookies(['email']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/getActive', {
            params: {
                'id': cookies['email']
            }
        }).then(data => {
            if (data.data !== undefined && data.data.length !== 0) {
                setOrder(data.data[0]);
                console.log(order);
            }
        }).then(() => {
            setLoading(false);
        });
    }, []);

    const finnishDelivery = (volunteer, client) => {
        axios.get('/confirmDelivery', {
            params: {
                vol: volunteer,
                clnt: client
            }
        }).then(response => {
            console.log(response);
        })
    };

    const RenderActive = () => {
        console.log(order.vol);
        if (Object.keys(order).length === 0)
            return
    <
        h2 > No
        active
        order. < /h2>
    else
        return (
            < >
            < Card
        title = "Current order"
        style = {
        {
            width: "30%"
        }
    }
    >
        {
            order.msg
        }
    <
        p
        style = {
        {
            textAlign: "end"
        }
    }>
        Address: {
            order.addr
        }
    <
        /p>
        < p
        style = {
        {
            textAlign: "end"
        }
    }>
        Status: {
            order.status
        }
    <
        /p>
        {
            (cookies['email'] === order.vol) &&
            < Button
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
            finnishDelivery(order.vol, order.clnt)
        }
        >
            Finish
            delivery
            < /Button>
        }
    <
        /Card>
        < div >
        < GoogleMaps / >
        < /div>
        < />
    )
    };

    return (
        < >
        {loading && < CustomSpinner / >
}
    {
        !loading && < RenderActive / >
    }
<
    />
)
    ;
};

export default ActiveOrder;