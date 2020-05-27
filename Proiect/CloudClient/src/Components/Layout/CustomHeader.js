import {Layout, Menu} from 'antd';
import styled from "styled-components";
import {Link} from "react-router-dom";

const {Header} = Layout;
const {Item, SubMenu} = Menu;

const CustomHeader = () => {

    return (
        < Header
    className = "header"
    style = {
    {
        height: "auto"
    }
}>
<
    HeaderTitle >
    < Link
    to = '/'
    style = {
    {
        color: '#fff'
    }
}>
    Buy
    Some
    Food
    < /Link>
    < /HeaderTitle>
    < Menu
    theme = "dark"
    mode = "horizontal"
    style = {
    {
        display: "inline-block"
    }
}>
<
    Item
    key = "1" >
        < Link
    to = '/volunteer' / >
        Volunteer
        < /Item>
        < Item
    key = "2" >
        < Link
    to = '/order' / >
        Place
    order
    < /Item>
    < SubMenu
    key = "sub1"
    title = "History" >
        < Item
    key = "3" >
        < Link
    to = '/history/ordered' / >
        Ordered
        < /Item>
        < Item
    key = "4" >
        < Link
    to = '/history/delivered' / >
        Delivered
        < /Item>
        < /SubMenu>
        < Item
    key = "5" >
        < Link
    to = '/order/placed' / >
        Placed
    orders
    < /Item>
    < Item
    key = "6" >
        < Link
    to = '/order/active' / >
        Active
    order
    < /Item>
    < /Menu>
    < /Header>
)
    ;
}

const HeaderTitle = styled.div`
    font-size: 190%;
    font-weight: 500;
    letter-spacing: 2px;
    display: inline;
    margin-right: 40px;
`;

export default CustomHeader;