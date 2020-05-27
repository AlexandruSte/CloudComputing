import './App.css';
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider, useCookies} from "react-cookie";
import CustomLayout from "./Components/Layout/CustomLayout";
import Login from "./Components/Login";


function App() {

    const [cookies] = useCookies(['email']);

    const RenderApp = () => {
        if ('email' in cookies && cookies['email'] !== undefined && cookies['email'] !== '')
            return
    <
        CustomLayout / >
    else
        {
            return
        <
            Login / >
        }
    }

    return (
        < BrowserRouter >
        < CookiesProvider >
        < RenderApp / >
        < /CookiesProvider>
        < /BrowserRouter>
)
    ;
}

export default App;
