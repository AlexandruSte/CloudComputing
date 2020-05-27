import {Component} from "react";

const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '2px solid black',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

export default class GoogleMapsPoint extends Component {
    static defaultProps = {
        text: 'A'
    };

    render() {
        return (
            < div
        style = {greatPlaceStyle} >
            {this.props.text}
            < /div>
    )
        ;
    }
}

