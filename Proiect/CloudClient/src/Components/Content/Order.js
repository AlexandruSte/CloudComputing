import {useEffect, useState} from "react";
import styled from "styled-components";
import {Button, Form, Input, Modal} from "antd";
import {useCookies} from "react-cookie";
import axios from "axios";
import CustomSpinner from "../Layout/CustomSpinner";

const {Item} = Form;

const Order = () => {
    const [cookies] = useCookies(['email']);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [hasActiveOrder, setHasActiveOrder] = useState(false);
    const [loading, setLoading] = useState(true);

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        setLoading(true);
        axios.get('/getActive', {
            params: {
                'id': cookies['email']
            }
        }).then(data => {
            if (data.data !== undefined && data.data.length !== 0) {
                setHasActiveOrder(true);
            } else
                setHasActiveOrder(false);
        }).then(() => {
            setLoading(false);
        });
    }, []);

    const onFinish = values => {
        let url = '/getAddress';
        console.log(lat + ',' + long)
        axios.get(url, {
            params: {
                'coords': lat + ',' + long
            }
        }).then((resp1) => {
            url = '/getCurrentCity'
            axios.get(url, {
                params: {
                    'coords': lat + ',' + long
                }
            }).then((resp2) => {
                url = '/placeOrder';
                axios.get(url, {
                    params: {
                        'clnt': cookies['email'],
                        'msg': values.order,
                        'addr': resp1.data,
                        'city': resp2.data
                    }
                }).then((resp) => {
                    console.log(resp);
                }).then(() => {
                    Modal.success({
                        title: 'Order complete.',
                        content: 'You have placed the order with success.',
                        width: 500,
                        onOk: () => window.location.replace('/'),
                    });
                });
            })
        });
    };

    const renderOrder = () => {
        if (hasActiveOrder) {
            return
        <
            h2 > You
            already
            have
            an
            active
            order. < /h2>
        } else {
            return (
                < >
                < h2 > Place
            your
            order:<
            /h2>
            < Form
            {...
                layout
            }
            name = "placeOrder"
            style = {
            {
                marginTop: "40px"
            }
        }
            onFinish = {onFinish}
                >
                < Item
            name = "order"
            label = "Order"
            rules = {[{required: true}]} >
                < Input.TextArea
            autoSize = {
            {
                minRows: 4, maxRows
            :
                12
            }
        }
            />
            < /Item>

            < Item
            wrapperCol = {
            {...
                layout.wrapperCol, offset
            :
                8
            }
        }>
        <
            Button
            type = "primary"
            htmlType = "submit" >
                Submit
                < /Button>
                < /Item>

                < /Form>
                < />
        )
        }
    };

    return (
        < >
        {loading && < CustomSpinner / >
}
<
    Wrapper >
    {
    !loading && renderOrder()
}
<
    /Wrapper>
    < />
)
};

const Wrapper = styled.div`
    margin-top: 50px;
    width: 30%;
`;

export default Order;