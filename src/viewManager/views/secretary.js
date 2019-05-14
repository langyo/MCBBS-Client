import React from 'react';
import ReactDOM from 'react-dom';

class Secretary extends React.Component {
    componentDidMount() {
        loadlive2d("live2d", "./live2d/model/creeper/model.json");
    }

    render() {
        return <canvas width="300" height="450" id="live2d" style={{
            bottom: -100,
            left: 0,
            position: 'absolute'
        }}/>;
    }
}

export default Secretary;