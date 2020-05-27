import {Layout} from "antd";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {GoogleLogin} from 'react-google-login';
import {useCookies} from "react-cookie";

const Login = () => {
    const [cookies, setCookie] = useCookies(['email']);

    const responseGoogle = (response) => {
        setCookie('email', response.profileObj.email);
        window.location.reload();
    }

    return (
        < Layout >
        < Layout.Header
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
    < /Layout.Header>
    < LoginWrapper >
    < h1
    style = {
    {
        marginBottom: "30px"
    }
}>
    Login
    into
    the
    application. < /h1>
    < GoogleLogin
    clientId = "51725532114-na7ho0hbptr2v5bvl5m0q5b1cpdembru.apps.googleusercontent.com"
    buttonText = "Login"
    onSuccess = {responseGoogle}
    onFailure = {responseGoogle}
    />
    < /LoginWrapper>
    < /Layout>
)
}

const HeaderTitle = styled.div`
    font-size: 190%;
    font-weight: 500;
    letter-spacing: 2px;
    display: inline;
    margin-right: 40px;
`;

const LoginWrapper = styled.div`
    width: 30%;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 20px;
`;

export default Login;