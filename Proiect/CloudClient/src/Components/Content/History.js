import {useEffect, useState} from "react";
import {Card} from "antd";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useLocation} from 'react-router-dom';
import CustomSpinner from "../Layout/CustomSpinner";

const History = () => {
    const [orders, setOrders] = useState([]);
    const [cookies] = useCookies(['email']);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const url = location.pathname.includes('ordered') ? '/getHistoryReceived' : '/getHistoryDelivered';
        axios.get(url, {
            params: {
                'id': cookies['email']
            }
        }).then((data) => {
            setOrders(data.data);
        }).catch(e => {
            console.log(e);
        }).then(() => {
            setLoading(false);
        });
    }, []);

    const renderOrders = () => {
        if (Object.keys(orders).length === 0)
            if (location.pathname.includes('ordered'))
                return
    <
        h2 > You
        have
        not
        ordered
        anything
        yet. < /h2>
    else
        return
    <
        h2 > You
        have
        not
        delivered
        anything
        yet. < /h2>
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
    <
        p
        style = {
        {
            textAlign: "start"
        }
    }>
        {
            order.msg
        }
    <
        /p>
        < p
        style = {
        {
            textAlign: "end", fontSize
        :
            "110%", color
        :
            "#444"
        }
    }
    >
        Status: {
            order.status
        }
    <
        /p>
        < /Card>
    )
    };

    return (
        < >
        {loading && < CustomSpinner / >
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
        !loading && renderOrders()
    }
<
    /div>
    < />
)
};

export default History;