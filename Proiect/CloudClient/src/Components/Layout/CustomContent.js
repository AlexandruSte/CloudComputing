import {Layout} from 'antd';
import {Route} from 'react-router-dom';
import Volunteer from "../Content/Volunteer";
import Order from "../Content/Order";
import History from "../Content/History";
import ActiveOrder from "../Content/ActiveOrder";
import Default from "../Content/Default";
import OrdersPlaced from "../Content/OrdersPlaced";

const {Content} = Layout;

const CustomContent = () => {

    const contentStyle = {
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 500,
        paddingLeft: 50
    };

    return (
        < Content
    style = {contentStyle} >
        < Route
    exact
    path = '/volunteer'
    component = {Volunteer}
    />
    < Route
    exact
    path = '/order'
    component = {Order}
    />
    < Route
    exact
    path = '/history/ordered'
    component = {History}
    />
    < Route
    exact
    path = '/history/delivered'
    component = {History}
    />
    < Route
    exact
    path = '/order/active'
    component = {ActiveOrder}
    />
    < Route
    exact
    path = '/order/placed'
    component = {OrdersPlaced}
    />
    < Route
    exact
    path = '/'
    component = {Default}
    />
    < /Content>
)
    ;
}

export default CustomContent;