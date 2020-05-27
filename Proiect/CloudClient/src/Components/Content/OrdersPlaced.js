import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import CustomSpinner from "../Layout/CustomSpinner";
import {Button, Card, Modal} from "antd";

const OrdersPlaced = () => {
    const [orders, setOrders] = useState([]);
    const [cookies] = useCookies(['email']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/getAllOrders', {
            params: {
                clnt: cookies['email']
            }
        }).then(response => {
            setOrders(response.data);
        }).then(() => {
            setLoading(false);
        });
    }, []);

    const cancelCommand = (client) => {
        axios.get('/delete', {
            params: {
                table: 'orders',
                clnt: client
            }
        }).then(response => {
            console.log(response);
            Modal.success({
                title: 'Order deleted.',
                content: 'You have deleted your order with success.',
                width: 500,
                onOk: () => window.location.replace('/'),
            });
        });
    };

    const RenderOrders = () => {
        if (orders.length < 1)
            return
    <
        h1 > You
        have
        no
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
        cancelCommand(order.clnt)
    }
        danger
        >
        Cancel
        < /Button>
        < /Card>
    )
    };

    return (
        < >
        {loading && < CustomSpinner / >
}
    {
        !loading && < RenderOrders / >
    }
<
    />
)
    ;
};

export default OrdersPlaced;