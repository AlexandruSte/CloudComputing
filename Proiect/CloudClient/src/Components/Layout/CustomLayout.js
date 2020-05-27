import {Layout} from 'antd';
import CustomContent from "./CustomContent";
import CustomHeader from "./CustomHeader";

const CustomLayout = () => {
    return (
        < Layout >
        < CustomHeader / >
        < CustomContent / >
        < /Layout>
)
}

export default CustomLayout;